export const splitBy = <T>(
  arr: T[],
  condition: (i: T) => boolean,
): [T[], T[]] => {
  const itemsA: T[] = []
  const itemsB: T[] = []

  arr.forEach((item) => {
    if (condition(item)) {
      itemsA.push(item)
    } else {
      itemsB.push(item)
    }
  })

  return [itemsA, itemsB]
}
