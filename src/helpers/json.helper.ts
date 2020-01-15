export const tryParseJSON = (value) => {
  try {
    return JSON.parse(value)
  } catch (error) {
    return null
  }
}
