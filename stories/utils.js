export function getBoxType(index, offset = 0) {
  const types = ['A', 'B', 'C', 'D', 'E']

  return types[(index + offset) % types.length]
}

export default getBoxType
