export function parseDateTime(input: string): Date {
  const [datePart, timePart] = input.split(" ")

  const [day, month, year] = datePart.split("/").map(Number)
  const [hour, minute, second] = (timePart || "00:00:00")
    .split(":")
    .map(Number)

  const localDate = new Date(year, month - 1, day, hour, minute, second)

  const utcDate = new Date(
    Date.UTC(
      localDate.getUTCFullYear(),
      localDate.getUTCMonth(),
      localDate.getUTCDate(),
      localDate.getUTCHours(),
      localDate.getUTCMinutes(),
      localDate.getUTCSeconds()
    )
  )

  return utcDate
}
