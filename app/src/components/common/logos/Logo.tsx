import _ from 'clsx'
import type { SVGAttributes } from 'react'

function Logo({ width = 32, className, ...props }: SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      width={width}
      className={_('text-primary shrink-0', className)}
      {...props}
      viewBox="0 0 512 512"
    >
      <title>
        Launch Hero
      </title>
      <path
        fill="currentColor"
        fillRule="evenodd"
        stroke="none"
        d="M 33.364487 128.25 L 255.5 0 L 477.635498 128.25 L 477.635498 384.75 L 255.5 513 L 33.364487 384.75 L 33.364487 128.25 Z M 97.364487 165.200424 L 255.5 73.900833 L 413.635498 165.200424 L 413.635498 347.799591 L 255.5 439.099152 L 97.364487 347.799591 L 97.364487 165.200424 Z"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        stroke="none"
        d="M 256 128 L 145.148743 192 L 145.148743 320 L 256 384 L 366.851257 320 L 366.851257 192 Z"
      />
      <path
        fill="currentColor"
        fillRule="evenodd"
        stroke="none"
        d="M 145.148743 192 L 256 128 L 366.851257 192 L 366.851257 320 L 256 384 L 145.148743 320 L 145.148743 192 Z M 209.148743 228.950424 L 256 201.900833 L 302.851257 228.950424 L 302.851257 283.049591 L 256 310.099152 L 209.148743 283.049591 L 209.148743 228.950424 Z"
      />
    </svg>
  )
}

export default Logo
