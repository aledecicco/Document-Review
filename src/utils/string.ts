/**
 * Expresses an amount of a given word as a string, taking singulars and plurals into account.
 *
 * @param value - The count being displayed.
 * @param word - The noun being counted.
 * @param plural - The plural of the noun being counted. If `undefined`, the singular plus an 's' is used.
 */
export const pluralize = (
  value: number,
  word: string,
  plural: string = `${word}s`,
): string => {
  if (value === 1) {
    return `${value} ${word}`
  }

  return `${value} ${plural}`
}

/**
 * Turns a date into a human-readable string.
 *
 * @param timestamp - The date to display.
 */
export const dateToString = (timestamp: string | number | Date): string => {
  const date = new Date(timestamp)

  return `${date.toLocaleString('en-us', { dateStyle: 'long', timeStyle: 'short' })}`
}
