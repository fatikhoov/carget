// ОБНОВЛЕНИЕ ЧЕКА
async function updateCheck() {
  totalSaleCheck() // Предполагается, что totalSaleCheck() возвращает числовое значение скидки
  checkDopOtionShow()
  checkDopOptions()

  if (saleAll && saleAll !== 0) {
    ;(discountCheck.style.display = 'flex'),
      (priceItemDiscount.style.display = 'flex')
  } else {
    ;(discountCheck.style.display = 'none'),
      (priceItemDiscount.style.display = 'none')
  }

  await sumCarPrices(updatedCarState, myPriceModels)
  totalpriceElements.forEach((e) => {
    e.innerHTML = numberWithSpaces(sumCarPrices(carState, myPriceModels))
  })

  // Вставляем выбранные цвета, диски и салон В ЧЕК
  colorKuzovaElements.forEach((element) => {
    element.textContent = carState.options.color[1]
  })

  colorSalonaElements.forEach((element) => {
    element.textContent = carState.options.interiorColor[1]
  })

  diskElements.forEach((element) => {
    element.textContent = `${carState.options.wheels[1]}`
  })

  priceColorElements.forEach((element) => {
    element.textContent = ` ${numberWithSpaces(carState.options.color[0])} руб.`
  })

  priceColorSalonElements.forEach((element) => {
    element.textContent = `${numberWithSpaces(
      carState.options.interiorColor[0]
    )} руб.`
  })

  priceDiskElements.forEach((element) => {
    element.textContent = ` ${numberWithSpaces(
      carState.options.wheels[0]
    )} руб.`
  })

  // Вычисляем и вставляем общую скидку

  totalSaleCarElements.forEach((element) => {
    element.innerHTML =
      saleAll === 0 || saleAll === null || saleAll === undefined
        ? 'Нет'
        : `${saleAll} руб.`
  })
  // Вычисляем и вставляем общую стоимость
  totalPriceCarElements.forEach((element) => {
    element.textContent = `${numberWithSpaces(
      sumCarPrices(carState, myPriceModels)
    )} руб.`
  })
}

const totalSaleCheck = () => {
  // Сумма скидок для выбранной модели
  const model = carState.models.find((model) => model[carState.model[1]])?.[
    carState.model[1]
  ]

  const modelDiscount = model && model.hasOwnProperty('sale') ? model.sale : 0

  // Сумма скидок для выбранного цвета
  const colorDiscount =
    carState.options.color[2].find(
      (option) =>
        option.color === carState.options.color[1] &&
        option.hasOwnProperty('sale')
    )?.sale || 0

  // Сумма скидок для выбранных колес
  const wheelDiscount =
    carState.options.wheels[2].find(
      (wheel) => wheel.color === carState.options.wheels[1]
    )?.sale || 0

  // Сумма скидок для выбранного цвета салона
  const interiorColorDiscount =
    carState.options.interiorColor[2].find(
      (option) => option.color === carState.options.interiorColor[1]
    )?.sale || 0

  const runningBoardsDiscount = carState.options.runningBoards[0]
    .filter((option) => option.show && option.hasOwnProperty('sale'))
    .reduce((totalDiscount, option) => totalDiscount + (option.sale || 0), 0)

  // Общая сумма всех скидок
  const totalDiscount =
    modelDiscount +
    colorDiscount +
    wheelDiscount +
    interiorColorDiscount +
    runningBoardsDiscount
  saleAll = totalDiscount
  return totalDiscount
}

export { updateCheck, totalSaleCheck }
