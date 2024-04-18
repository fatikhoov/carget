// API курсы валют

async function fetchCurrencyRates() {
  try {
    const storedData = localStorage.getItem('currencyRates')
    if (!storedData) {
      const responseCNY = await fetch('https://open.er-api.com/v6/latest/CNY')
      const dataCNY = await responseCNY.json()
      const responseUSD = await fetch('https://open.er-api.com/v6/latest/USD')
      const dataUSD = await responseUSD.json()
      const rates = { CNY: dataCNY.rates.RUB, USD: dataUSD.rates.RUB }
      await saveCurrencyRatesToLocalStorage(rates)
    } else {
      const currencyRates = JSON.parse(storedData)
      const lastUpdated = new Date(currencyRates.lastUpdated)
      const currentDate = new Date()
      const currentDateString = `${currentDate.getDate()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getFullYear()}`
      const lastUpdatedString = `${lastUpdated.getDate()}-${
        lastUpdated.getMonth() + 1
      }-${lastUpdated.getFullYear()}`

      if (currentDateString !== lastUpdatedString) {
        const responseCNY = await fetch('https://open.er-api.com/v6/latest/CNY')
        const dataCNY = await responseCNY.json()
        const responseUSD = await fetch('https://open.er-api.com/v6/latest/USD')
        const dataUSD = await responseUSD.json()
        const rates = { CNY: dataCNY.rates.RUB, USD: dataUSD.rates.RUB }

        await saveCurrencyRatesToLocalStorage(rates)
      }
    }
  } catch (error) {
    console.error('Ошибка при загрузке курсов валют:', error)
    throw error // Обработка ошибки
  }
}
async function saveCurrencyRatesToLocalStorage(data) {
  const currentDate = new Date().toISOString() // Получить текущую дату и время
  const currencyRates = { rates: data, lastUpdated: currentDate }
  await localStorage.setItem('currencyRates', JSON.stringify(currencyRates))
  return data
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