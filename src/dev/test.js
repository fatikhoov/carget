// плюс процент с округлением
function calculateWithPercentage(sum, percentage) {
  return roundNumberToNChars(
    Math.ceil(sum * (1 + percentage / 100)),
    4,
    'calculateWithPercentage'
  )
}
// пробелы
function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}
// округление
function roundNumberToNChars(number, n, where) {
  number = Math.ceil(number)
  if (typeof number !== 'number' || !Number.isInteger(number) || number < 0) {
    throw new Error('number должно быть положительным целым числом', where)
  }

  if (typeof n !== 'number' || !Number.isInteger(n) || n < 1) {
    throw new Error(
      'n должно быть положительным целым числом больше или равным 1',
      where
    )
  }

  const multiplier = Math.pow(10, n - 1)
  const roundedNumber = Math.ceil(number / multiplier) * multiplier

  return roundedNumber
}

totalPrice = numberWithSpaces(calculateWithPercentage(total, carState.marga))
