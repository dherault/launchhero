function extractInitials(name: string) {
  return name.split(' ')
    .map(name => name[0])
    .filter(Boolean)
    .filter((_x, i) => i < 2)
    .join('')
    .toUpperCase()
}

export default extractInitials
