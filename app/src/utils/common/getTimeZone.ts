function getTimeZone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone
}

export default getTimeZone
