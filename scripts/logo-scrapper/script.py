#!/usr/bin/env python3
"""
Download logos for a list of websites and convert to PNG 256x256.

Usage:
    pip install -r requirements.txt
    python download_logos.py --workers 8

Reads from directories.json in the same directory.
"""

import argparse
import io
import json
import logging
import os
import re
import shutil
import sys
import tempfile
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup
from PIL import Image, ImageOps

# Optional: for SVG -> PNG conversion
try:
    import cairosvg
    HAS_CAIROSVG = True
except Exception:
    HAS_CAIROSVG = False

# Optional: for multi-image ICO handling Pillow usually supports ICO, but ensure it's available
# Requirements in requirements.txt below

logging.basicConfig(level=logging.INFO,
                    format="%(asctime)s - %(levelname)s - %(message)s")
USER_AGENT = "logo-downloader/1.0 (+https://example.org)"


def normalize_site(s: str) -> str:
    s = s.strip()
    if not s:
        return ""
    if not re.match(r"^https?://", s):
        s = "https://" + s
    return s


def fetch_html(url, timeout=10):
    headers = {"User-Agent": USER_AGENT}
    try:
        r = requests.get(url, headers=headers,
                         timeout=timeout, allow_redirects=True)
        r.raise_for_status()
        return r.text, r.url
    except Exception as e:
        logging.debug("fetch_html failed for %s: %s", url, e)
        return None, None


def guess_logo_urls_from_html(html, base_url):
    soup = BeautifulSoup(html, "html.parser")
    candidates = []

    # # 1) Open Graph image
    # og = soup.find("meta", property="og:image")
    # if og and og.get("content"):
    #     candidates.append(urljoin(base_url, og.get("content")))

    # # 2) Twitter image
    # tw = soup.find("meta", property="twitter:image")
    # if tw and tw.get("content"):
    #     candidates.append(urljoin(base_url, tw.get("content")))

    # 3) apple-touch-icon (often good)
    for linkrel in ("apple-touch-icon", "apple-touch-icon-precomposed"):
        link = soup.find("link", rel=lambda v: v and linkrel in v)
        if link and link.get("href"):
            candidates.append(urljoin(base_url, link.get("href")))

    # 4) icons (favicon)
    for link in soup.find_all("link", rel=lambda v: v and ("icon" in v or "shortcut icon" in v)):
        if link.get("href"):
            candidates.append(urljoin(base_url, link.get("href")))

    # 5) look for big images with class/id including 'logo'
    imgs = soup.find_all("img", src=True)
    for img in imgs:
        src = img.get("src")
        if src:
            idcls = " ".join(filter(None, [img.get("id", ""), img.get(
                "class") and " ".join(img.get("class")) or ""]))
            scoretext = (idcls + " " + (img.get("alt") or "")).lower()
            if "logo" in scoretext or "brand" in scoretext or "header" in scoretext:
                candidates.append(urljoin(base_url, src))

    # De-dup while preserving order
    seen = set()
    out = []
    for c in candidates:
        if c not in seen:
            seen.add(c)
            out.append(c)
    return out


def fallback_favicon_urls(site_url):
    # Common favicon locations
    parsed = urlparse(site_url)
    base = f"{parsed.scheme}://{parsed.netloc}"
    return [
        urljoin(base, "/favicon.ico"),
        urljoin(base, "/favicon.png"),
        urljoin(base, "/favicon.svg"),
        urljoin(base, "/apple-touch-icon.png"),
        urljoin(base, "/apple-touch-icon-precomposed.png"),
    ]


def download_binary(url, timeout=15):
    headers = {"User-Agent": USER_AGENT}
    try:
        r = requests.get(url, headers=headers, timeout=timeout,
                         stream=True, allow_redirects=True)
        r.raise_for_status()
        content = r.content
        content_type = r.headers.get("Content-Type", "")
        return content, content_type, r.url
    except Exception as e:
        logging.debug("download_binary failed %s: %s", url, e)
        return None, None, None


def save_image_bytes_to_png256(img_bytes, content_type, out_path):
    """
    Convert bytes (could be svg, ico, png, jpeg) to PNG 256x256
    """
    # Determine type from content_type or bytes signature
    # Handle SVG
    is_svg = False
    if content_type and "svg" in content_type:
        is_svg = True
    else:
        # rough check for xml/svg header
        if img_bytes[:200].lstrip().startswith(b"<") and b"svg" in img_bytes[:200].lower():
            is_svg = True

    try:
        if is_svg:
            if not HAS_CAIROSVG:
                raise RuntimeError(
                    "SVG found but cairosvg not installed. Install with `pip install cairosvg`.")
            # cairosvg converts to PNG bytes
            png_bytes = cairosvg.svg2png(
                bytestring=img_bytes, output_width=256, output_height=256)
            img = Image.open(io.BytesIO(png_bytes)).convert("RGBA")
            img = ImageOps.pad(img, (256, 256), color=(
                255, 255, 255, 0))  # pad if needed
            img.save(out_path, format="PNG")
            return True

        # For ICO: Pillow can open multi-frame ICO and we want the largest frame
        bio = io.BytesIO(img_bytes)
        img = Image.open(bio)

        # If ICO or animated, choose largest frame by size
        if getattr(img, "is_animated", False):
            frames = []
            try:
                for i in range(img.n_frames):
                    img.seek(i)
                    frames.append(img.copy())
            except Exception:
                frames = [img.copy()]
            # pick the frame with max area
            img = max(frames, key=lambda im: im.width * im.height)

        # convert to RGBA
        img = img.convert("RGBA")

        # create 256x256 padded/resized image while preserving aspect ratio
        img = ImageOps.pad(img, (256, 256), color=(255, 255, 255, 0))
        img.save(out_path, format="PNG")
        return True
    except Exception as e:
        logging.debug("save_image_bytes_to_png256 failed: %s", e)
        return False


def process_site(directory_entry, out_dir, tmp_dir):
    directory_id = directory_entry.get("id")
    site_raw = directory_entry.get("url")

    site = normalize_site(site_raw)
    if not site:
        return directory_id, False, "empty input"

    logging.info("Processing %s (id: %s)", site, directory_id)
    html, final_url = fetch_html(site)
    candidates = []
    if html:
        candidates = guess_logo_urls_from_html(html, final_url or site)
    # Add fallbacks
    candidates += fallback_favicon_urls(final_url or site)

    # Ensure unique preserve order
    seen = set()
    candidates_uniq = []
    for c in candidates:
        if c and c not in seen:
            seen.add(c)
            candidates_uniq.append(c)

    # attempt to download candidates in order
    success = False
    last_err = None
    out_filename = None
    for idx, url in enumerate(candidates_uniq):
        logging.debug("Trying candidate %s", url)
        data = download_binary(url)
        if data and data[0]:
            img_bytes, content_type, resolved = data
            # Try saving with directory ID as filename
            out_filename = os.path.join(out_dir, f"{directory_id}.png")
            ok = save_image_bytes_to_png256(
                img_bytes, content_type, out_filename)
            if ok:
                logging.info("Saved logo for %s -> %s (source: %s)",
                             site, out_filename, url)
                success = True
                break
            else:
                last_err = f"conversion failed for {url}"
        else:
            last_err = f"download failed for {url}"

    return directory_id, success, last_err or "no-candidates"


def main():
    parser = argparse.ArgumentParser(
        description="Download and convert website logos to PNG 256x256")
    parser.add_argument("--workers", "-w", type=int,
                        default=6, help="Parallel workers")
    args = parser.parse_args()

    # Get script directory and read directories.json
    script_dir = os.path.dirname(os.path.abspath(__file__))
    json_path = os.path.join(script_dir, "directories.json")
    out_dir = os.path.join(script_dir, "logos")

    if not os.path.exists(json_path):
        logging.error("directories.json not found at %s", json_path)
        sys.exit(1)

    with open(json_path, "r", encoding="utf-8") as f:
        directories = json.load(f)

    if not os.path.exists(out_dir):
        os.makedirs(out_dir, exist_ok=True)

    tmp_dir = tempfile.mkdtemp(prefix="logo_dl_")
    results = []

    try:
        with ThreadPoolExecutor(max_workers=args.workers) as ex:
            futures = {ex.submit(process_site, directory,
                                 out_dir, tmp_dir): directory for directory in directories}
            for fut in as_completed(futures, timeout=60):
                directory_entry = futures[fut]
                try:
                    directory_id, ok, msg = fut.result()
                    results.append((directory_id, ok, msg))
                except Exception as e:
                    logging.exception(
                        "Exception processing %s: %s", directory_entry.get("id"), e)
                    results.append((directory_entry.get("id"), False, str(e)))

    finally:
        shutil.rmtree(tmp_dir, ignore_errors=True)

    # Write a small report
    report_path = os.path.join(out_dir, "download_report.csv")
    with open(report_path, "w", encoding="utf-8") as f:
        f.write("directory_id,success,message\n")
        for directory_id, ok, msg in results:
            f.write(f"{directory_id},{ok},{msg}\n")

    logging.info("Done. Report: %s", report_path)
    print("Finished. Check output directory:", out_dir)


if __name__ == "__main__":
    main()
