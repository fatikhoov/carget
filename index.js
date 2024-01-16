// ..... импорты ..... //

let pdfDoc
let totalPrice = 0
let indexDisk = 0
let myArrowDiskImages
let myDiskImage
let isUpdatingCarousel = false
let arrayImagesForPDF = [
  'https://carget.su/wp-content/uploads/2023/11/carget-logo.jpg',
]

const arrayTitlePrice = {
  color: '#carget-acordion-color-price span',
  wheels: '#carget-acordion-wheels-price span',
  interiorColor: '#carget-acordion-interiorColor-price span',
}

const arrayWrappers = [
  '.carget-color',
  '.carget-wheels',
  '.carget-interiorColor',
  '.carget-runningBoards',
]

// ЦЕНА В ШАПКЕ
const totalpriceElements = document.querySelectorAll('.header-totalprice')

// ЧЕКБОКСЫ ---------------------------------------- //
const checkbox = document.getElementById('myCheckbox')
const checkboxLabel = document.querySelector('.custom-checkbox-label')
const checkboxSpan = document.getElementById('custom-checkbox-span')

// ЧЕК --------------------------------------- //
const checkImages = document.querySelectorAll('.check-list-image')
// Выбираем все элементы с классами для цвета, салона, дисков и дополнительных опций
const colorKuzovaElements = document.querySelectorAll('.check-color')
const colorSalonaElements = document.querySelectorAll('.check-color-salon')
const diskElements = document.querySelectorAll('.check-disk')
const dopOptionsElements = document.querySelector('.check-dop-option')
const totalPriceCarElements = document.querySelectorAll('.total-price-car')
// Вставляем стоимости
const priceColorElements = document.querySelectorAll('.check-color-price')
const priceColorSalonElements = document.querySelectorAll(
  '.check-color-salon-price'
)
const priceDiskElements = document.querySelectorAll('.check-disk-price')
const priceDopOptionsElements = document.querySelector(
  '.check-dop-option-price'
)

// Получаем элементы ВСЕХ каруселей
const colorCarousel = document
  .getElementById('carget-acordion-color')
  .querySelector('.swiper')
const colorImageCarousel = document
  .getElementById('carget-acordion-color-image')
  .querySelector('.swiper')
const diskDiametr = document
  .getElementById('carget-acordion-disk')
  .querySelector('.swiper')
const diskImage = document
  .getElementById('carget-acordion-disk-image')
  .querySelector('.swiper')
const colorSalon = document
  .getElementById('carget-acordion-salon')
  .querySelector('.swiper')
const salonImage = document
  .getElementById('carget-acordion-salon-color')
  .querySelector('.swiper')

const loader = document.getElementById('header-loader')
const cargetLoader = document.getElementById('carget-loader')

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

// КАРУСЕЛИ НА НУЖНЫЙ СЛАЙД ОБНОВЛЕНИЯ
async function updateCaruselDisk(dc) {
  diskImage.swiper.removeAllSlides()

  // Функция, которая находит видимый слайд с определенным цветом (игнорируя индекс)
  function findVisibleSlides(color) {
    const visibleSlides = myArrowDiskImages.filter((slide) => {
      // Проверяем, что слайд не имеет классов "swiper-slide swiper-slide-duplicate swiper-slide-prev"
      return (
        !slide.classList.contains('swiper-slide-duplicate') &&
        !slide.classList.contains('swiper-slide-prev')
      )
    })

    return visibleSlides.filter((slide) => {
      const slideAlt = slide.querySelector('.swiper-slide-image').alt
      // Проверяем соответствие цвета без учета индекса в альте слайда
      return slideAlt.startsWith(color + '-')
    })
  }

  // Получаем цвет из аргумента dc (игнорируем индекс)
  const color = dc.split('-')[0]
  // Поиск видимых слайдов с цветом исходного и цветом противоположного
  const exactMatchSlides = findVisibleSlides(color)

  exactMatchSlides.forEach((slide) => {
    diskImage.swiper.appendSlide(slide)
  })

  // Обновляем карусель
  diskImage.swiper.update()

  // Ваши дополнительные операции...
  carState.options.wheels[0] = indexOption('wheels', 0, 'index').price
  carState.options.wheels[1] = indexOption('wheels', 0, 'index').color
  diskDiametr.swiper.slideTo(2, 0)
  diskImage.swiper.slideTo(1, 0)
  diskImage.swiper.update()
  updateTitlePrice()
}

function findSlideIndexByAlt(slider, altAttribute) {
  const slides = slider.querySelectorAll('.swiper-slide')

  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i]
    const img = slide.querySelector('img')

    if (img && img.alt === altAttribute) {
      const dataIndex = slide.getAttribute('data-swiper-slide-index')
      return parseInt(dataIndex)
    }
  }
  return -1 // Возвращаем -1, если слайд с указанным alt не найден
}

async function updateCarousel(
  carouselElement,
  priceElementSelector,
  carStateOption,
  dc
) {
  carouselElement.swiper.slideTo(dc, 400)
  updateTitlePrice()
}

const updateTitlePrice = () => {
  for (const option in arrayTitlePrice) {
    const selector = arrayTitlePrice[option]
    document.querySelector(
      selector
    ).innerHTML = `${carState.options[option][1]} ${carState.options[option][0]} руб.`
  }

  // ПРОВЕРКА НА ДИСКИ ДЛЯ ВЫГРУЗКИ ФОТО АВТО, ЕСЛИ FALSE ТО ВЫГРУЖАЮ ИЗ ПЕРВОЙ КАРУСЕЛИ
  if (carState.options.wheels[3] === true) {
    // ФОТО АВТО В ЧЕК
    myDiskImage = diskImage.swiper.visibleSlides[0]
    checkImages.forEach((e) => {
      e.innerHTML = myDiskImage.innerHTML
    })
    arrayImagesForPDF[1] = myDiskImage.querySelector('.swiper-slide-image').src
    updateCheck()
  } else if (carState.options.wheels[3] === false) {
    myDiskImage = colorImageCarousel.querySelector('.swiper-slide-active')
    checkImages.forEach((e) => {
      e.innerHTML = myDiskImage.innerHTML
    })
    arrayImagesForPDF[1] = myDiskImage.querySelector('.swiper-slide-image').src
    updateCheck()
  }
}

document.addEventListener('DOMContentLoaded', async (event) => {
  // Ожидаем, пока слайдер будет инициализирован
  const waitForSlider = () => {
    return new Promise((resolve) => {
      const checkSlider = () => {
        if (colorCarousel && colorCarousel.swiper) {
          resolve()
        } else {
          // Если слайдер ещё не готов, проверяем снова через небольшой интервал
          setTimeout(checkSlider, 100)
        }
      }

      checkSlider()
    })
  }
  // Дожидаемся инициализации САЙТА
  await waitForSlider()
  diskDiametr.swiper.on('activeIndexChange', async (e) => {
    if (isUpdatingCarousel) {
      return
    }

    try {
      isUpdatingCarousel = true

      const currentColor = indexOption('wheels', e.realIndex, 'index').color
      const currentPrice = indexOption('wheels', e.realIndex, 'index').price
      const activeSlideAlt = diskDiametr.querySelector(
        '.swiper-slide-active img'
      ).alt
      const slideIndex = findSlideIndexByAlt(diskDiametr, activeSlideAlt)
      const slideIndex2 = findSlideIndexByAlt(diskImage, activeSlideAlt)

      if (slideIndex !== -1) {
        carState.options.wheels[0] = currentPrice
        carState.options.wheels[1] = currentColor
        diskImage.swiper.slideTo(e.realIndex + 1, 400)
        updateTitlePrice()
      }

      isUpdatingCarousel = false
    } catch (error) {
      console.error('Error in diskDiametr activeIndexChange event:', error)
      isUpdatingCarousel = false
    }
  })

  diskImage.swiper.on('activeIndexChange', async (e) => {
    if (isUpdatingCarousel) {
      return
    }

    try {
      isUpdatingCarousel = true

      const currentColor = indexOption('wheels', e.realIndex, 'index').color
      const currentPrice = indexOption('wheels', e.realIndex, 'index').price
      const activeSlideAlt = diskDiametr.querySelector(
        '.swiper-slide-active img'
      ).alt

      const slideIndex = findSlideIndexByAlt(diskDiametr, activeSlideAlt)
      const slideIndex2 = findSlideIndexByAlt(diskImage, activeSlideAlt)

      if (slideIndex !== -1) {
        carState.options.wheels[0] = currentPrice
        carState.options.wheels[1] = currentColor
        diskDiametr.swiper.slideTo(
          e.realIndex + diskDiametr.swiper.params.slidesPerView,
          400
        )
        updateTitlePrice()
      }

      isUpdatingCarousel = false
    } catch (error) {
      console.error('Error in diskImage activeIndexChange event:', error)
      isUpdatingCarousel = false
    }
  })
})

// Показать или скрыть ДОП ОПЦИИ
const checkDopOtionShow = () => {
  const displayValue = carState.options.runningBoards[1] ? 'flex' : 'none'
  document.querySelectorAll(arrayWrappers[3]).forEach((e) => {
    e.style.display = displayValue
  })
}
// Обнуление после выбора другой модели
const removeShowDopOptions = () => {
  const dopOptionsWrapper = document.querySelector(
    '.dop-options-wrapper .elementor-widget-wrap'
  )
  const selectedModel = carState.model[1] // Получаем текущую модель
  const children = dopOptionsWrapper.children
  const childrenArray = Array.from(children)

  carState.options.runningBoards[0].forEach((option, index) => {
    const child = children[index]

    const checkbox = document.getElementById(child.id)

    const checkboxInput = checkbox.querySelector(`#${child.id}`)
    // Установка состояния чекбокса в зависимости от условий

    option.show = false
    checkboxInput.checked = false

    const modelsToShow = option.models // Список моделей, для которых опция должна быть показана
    const showOption =
      modelsToShow.includes(selectedModel) || modelsToShow.includes('All')
    const displayValue = showOption ? 'flex' : 'none'

    childrenArray.forEach((el) => {
      if (el.id === child.id) {
        el.style.display = displayValue
      }
    })
  })
}
const updateDopOptions = () => {
  const selectedModel = carState.model[1] // Получаем текущую модель

  //ДОП ОПЦИИ
  const dopOptionsWrapper = document.querySelector(
    '.dop-options-wrapper .elementor-widget-wrap'
  )
  const children = dopOptionsWrapper.children
  const childrenArray = Array.from(children)

  carState.options.runningBoards[0].forEach((option, index) => {
    const child = children[index]
    const modelsToShow = option.models // Список моделей, для которых опция должна быть показана
    const showOption =
      modelsToShow.includes(selectedModel) || modelsToShow.includes('All')
    const displayValue = showOption ? 'flex' : 'none'

    childrenArray.forEach((el) => {
      if (el.id === child.id) {
        el.style.display = displayValue
      }
    })

    const checkbox = document.getElementById(child.id)

    const checkboxInput = checkbox.querySelector(`#${child.id}`)

    const checkboxLabel2 = checkbox.querySelector('.custom-checkbox-label')

    const checkboxLabel = checkbox.querySelector(`.dop-option-title`)
    const checkboxDescription = checkbox.querySelector(
      '.dop-option-description'
    )
    const checkboxSpan = checkbox.querySelector(`#span-${child.id}`)
    // Устанавливаем заголовок и описание из option.title и option.description
    checkboxLabel.textContent = option.title
    checkboxDescription.textContent = option.description
    checkboxSpan.textContent = `${numberWithSpaces(option.price)} руб.`

    // Добавление слушателей событий для чекбоксов
    const handleClick = () => {
      checkboxInput.checked = !checkboxInput.checked
      option.show = checkboxInput.checked
      updateCheck()
    }

    checkboxLabel2.addEventListener('click', handleClick)
    checkboxSpan.addEventListener('click', handleClick)
  })
}

const checkDopOptions = () => {
  // Получаем данные о дополнительных опциях, которые нужно отобразить
  const dopOptionsToShow = carState.options.runningBoards[0].filter(
    (option) => option.show
  )
  // Очищаем текстовое содержимое элементов dopOptionsElements и priceDopOptionsElements
  dopOptionsElements.textContent = ''
  priceDopOptionsElements.textContent = ''

  // Если есть отображаемые опции, выводим информацию о них
  if (dopOptionsToShow.length > 0 && carState.options.runningBoards[1]) {
    dopOptionsToShow.forEach((option) => {
      const title = option.title
      const price = option.price

      const titleElement = document.createElement('div')
      titleElement.textContent = title

      const priceElement = document.createElement('div')
      priceElement.textContent = `${numberWithSpaces(price)} руб.`

      dopOptionsElements.appendChild(titleElement)
      priceDopOptionsElements.appendChild(priceElement)
    })
  } else {
    // Если опций нет или показывать их не нужно, выводим информацию "Нет"
    const noOptionsElement = document.createElement('div')
    noOptionsElement.textContent = 'Нет'

    dopOptionsElements.appendChild(noOptionsElement)
    priceDopOptionsElements.appendChild(noOptionsElement)
  }
}

document.addEventListener('DOMContentLoaded', async (event) => {
  updateDopOptions()
})

// РАБОТА  С МОДЕЛЯМИ
// ---- НОВЫЙ МЕТОД --------

// Определение функции select
function select(selector) {
  return document.querySelectorAll(selector)
}

/**
 * Получение ID элемента на основе имени модели.
 * @param {string} name - Имя модели.
 * @param {string} prefix - Префикс ID (по умолчанию 'accordion-car-model-').
 * @returns {string} - ID элемента.
 */
function getElementId(name, prefix = 'accordion-car-model-') {
  const id = `${prefix}${name.toLowerCase()}`
  return id
}

/**
 * Создание объекта с элементами для модели.
 * @param {string} modelName - Название модели.
 * @param {object} modelInfo - Информация о модели.
 * @returns {object} - Объект с элементами для модели.
 */
function createModelElement(modelName, modelInfo) {
  const lowercaseName = modelName.toLowerCase()
  const elements = {
    model: select(`.${getElementId(lowercaseName)}`),
    acc: select(`.${getElementId(lowercaseName)} h4`),
    mobileButton: select(`.car-${lowercaseName}-mobile`),
    accordionItem: select(
      `.${getElementId(lowercaseName)} .elementor-tab-title`
    ),
  }
  return elements
}

/**
 * Определение элементов для каждой модели.
 * @param {array} models - Массив объектов с информацией о моделях.
 * @returns {object} - Объект с элементами для каждой модели.
 */
function defineModelElements(models) {
  const elements = {}
  models.forEach((model) => {
    const modelName = Object.keys(model)[0]
    elements[modelName] = createModelElement(modelName, model[modelName])
  })
  return elements
}

// СОЗДАНИЕ ЭЛЕМЕНТОВ - ПРАЙС В МОДЕЛИ
const createDivPriceModel = (modelName) => {
  const divPriceModel = document.createElement('div')
  divPriceModel.className = `car${modelName}Model` // Используем динамический класс
  divPriceModel.id = `carmodel-price-${modelName.toLowerCase()}`
  return divPriceModel
}

// Получаем все модели из carState.models
const modelNames = carState.models.map((model) => Object.keys(model)[0])
// Определяем элементы для каждой модели
const modelElements = defineModelElements(carState.models)
// Создаем динамически divPriceModel для каждой модели
const divPriceModels = {}
modelNames.forEach((modelName) => {
  divPriceModels[modelName] = createDivPriceModel(modelName)
})

// ЗАКРЫТОЕ ПОЛОЖЕНИЕ АККОРДИОНОВ
async function closeAccordions() {
  modelNames.forEach((e) => {
    modelElements[e].accordionItem[0].click()
  })
}
// СОЗДАЕМ ЦЕНУ АККОРДИОНАМ
const innerPriceTitleModels = () => {
  // ЗАПИСЬ СТОИМОСТИ В ЗАГОЛОВКИ АККАРДИОНА
  modelNames.forEach((modelName, index) => {
    divPriceModels[modelName].innerHTML = `<span>${numberWithSpaces(
      myPriceModels[index]
    )} руб.</span>`
  })

  modelNames.forEach((modelName, index) => {
    const price = numberWithSpaces(myPriceModels[index])

    modelElements[modelName].acc.forEach((element) => {
      element.innerHTML = `<span>${price} руб.</span>`
    })

    modelElements[modelName].accordionItem[0].appendChild(
      divPriceModels[modelName]
    )
  })
}

// Обновление кнопок
function createAndAttachButtonClickHandler(modelName) {
  const buttons = document.querySelectorAll(
    `.car-${modelName.toLowerCase()}-mobile`
  )

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      carState.model[1] = `${modelName}`
      updateButtonState(carState)
      removeShowDopOptions()
      updateCheck()
    })
  })
}

// Функция обновления состояния кнопок
function updateButtonState(carState) {
  modelNames.forEach((modelName) => {
    const isSelected = carState.model[1] === `${modelName}`
    const buttons = document.querySelectorAll(
      `.car-${modelName.toLowerCase()}-mobile`
    )

    buttons.forEach((button) => {
      const buttonTextElement = button.querySelector('.elementor-button-text')
      const elementorButton = button.querySelector('.elementor-button')

      button.style.cursor = 'pointer'
      button.style.borderRadius = '3px'

      if (isSelected) {
        // Если выбрано, измените фон и цвет текста
        button.style.backgroundColor = '#fff'
        elementorButton ? (elementorButton.style.backgroundColor = '#fff') : ''
        buttonTextElement.style.color = '#000'
      } else {
        // Если не выбрано, восстановите стандартные стили
        button.style.backgroundColor = '#DB2424'
        elementorButton
          ? (elementorButton.style.backgroundColor = '#DB2424')
          : ''
        buttonTextElement.style.color = '#fff'
      }

      buttonTextElement.textContent = isSelected ? 'ВЫБРАНО' : 'ВЫБРАТЬ'
    })
  })
}

let updatedCarState
let myPriceModels

function convertCarState(carState) {
  const storedData = localStorage.getItem('currencyRates')
  const currencyRates = JSON.parse(storedData)

  const usdToRubExchangeRate = currencyRates.rates.USD
  const cnyToRubExchangeRate = currencyRates.rates.CNY
  console.log('carrensy', usdToRubExchangeRate, cnyToRubExchangeRate)
  // Конвертация МОДЕЛЕЙ в рубли
  const priceInRub = {}
  modelNames.forEach((modelName) => {
    const modelPrice = carState.models.find((model) => model[modelName])
    const modelPriceCNY = modelPrice ? modelPrice[modelName] : 0
    priceInRub[modelName] = modelPriceCNY * cnyToRubExchangeRate
  })

  // Обновление объекта состояния с новыми значениями в рублях
  const updatedCarState = {
    ...carState,
    models: carState.models.map((model) => {
      const modelName = Object.keys(model)[0]
      const priceInRub = model[modelName] * cnyToRubExchangeRate
      return { [modelName]: priceInRub }
    }),
    delivery: {
      ...carState.delivery,
      fromTurgartToBishkek:
        carState.delivery.fromTurgartToBishkek * usdToRubExchangeRate,
      customs: carState.delivery.customs * usdToRubExchangeRate,
      otherExpenses: carState.delivery.otherExpenses * usdToRubExchangeRate,
      fromBishkekToRussia:
        carState.delivery.fromBishkekToRussia * usdToRubExchangeRate,
    },
    labFees: carState.labFees,
    recyclingFee: carState.recyclingFee,
    carLocalization: carState.carLocalization,
  }

  return updatedCarState
}

function sumCarModelsPrices(carState) {
  // Получение всех цен из объекта состояния БЕЗ ДОП ОПЦИЙ
  const {
    models,
    delivery: {
      fromTurgartToBishkek,
      customs,
      otherExpenses,
      fromBishkekToRussia,
    },
    labFees,
    recyclingFee,
    carLocalization,
    marga,
  } = carState

  // Суммирование всех цен
  const totalPrices = modelNames.map((modelName) => {
    const modelPriceCNY =
      models.find((model) => model[modelName])?.[modelName] || 0

    const total =
      modelPriceCNY +
      fromTurgartToBishkek +
      customs +
      otherExpenses +
      fromBishkekToRussia +
      labFees +
      recyclingFee +
      carLocalization

    const totalWithMarga = total + total * (marga[0] / 100)

    return roundNumberToNChars(totalWithMarga, 4)
  })

  return totalPrices
}

function sumCarPrices(carState, myPriceModels) {
  // Получение всех цен из объекта состояния БЕЗ ДОП ОПЦИЙ
  const {
    options: { color, wheels, interiorColor, runningBoards },
  } = carState
  const selectedModel = carState.model[1]
  const modelIndex = modelNames.indexOf(selectedModel)

  // Добавим консольные логи для отслеживания

  // Проверим, что modelIndex не равен -1
  if (modelIndex === -1) {
    console.error('Выбранная модель не найдена в modelNames.')
    return // Возвращаем undefined в случае ошибки
  }

  const modelPrice = myPriceModels[modelIndex]

  let total = modelPrice + color[0] + wheels[0] + interiorColor[0]

  if (carState.options.runningBoards[1]) {
    const options = carState.options.runningBoards[0]
    options.forEach((option) => {
      if (option.show) {
        total += option.price
      }
    })
  }
  totalPrice = total
  return total
}

function roundNumberToNChars(number, n) {
  number = Math.ceil(number)
  if (typeof number !== 'number' || !Number.isInteger(number) || number < 0) {
    throw new Error('number должно быть положительным целым числом')
  }

  if (typeof n !== 'number' || !Number.isInteger(n) || n < 1) {
    throw new Error(
      'n должно быть положительным целым числом больше или равным 1'
    )
  }

  const multiplier = Math.pow(10, n - 1)
  const roundedNumber = Math.ceil(number / multiplier) * multiplier

  return roundedNumber
}

const innerPriceHeader = () => {
  // ЗАПИСЬ В ШАПКУ ТОТАЛ ПРАЙС
  totalpriceElements.forEach((e) => {
    e.innerHTML = numberWithSpaces(totalPrice)
  })
}

// ОБНОВЛЕНИЕ ЧЕКА
async function updateCheck() {
  checkDopOtionShow()
  checkDopOptions()

  arrayImagesForPDF[2] = salonImage.querySelector(
    '.swiper-slide-active img'
  ).src

  await sumCarPrices(updatedCarState, myPriceModels)
  totalpriceElements.forEach((e) => {
    e.innerHTML = numberWithSpaces(sumCarPrices(carState, myPriceModels))
  })

  // Вставляем выбранные цвета, диски и салон
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

  // Вычисляем и вставляем общую стоимость
  totalPriceCarElements.forEach((element) => {
    element.textContent = `${numberWithSpaces(
      sumCarPrices(carState, myPriceModels)
    )} руб.`
  })
}

function numberWithSpaces(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}
//  СОХРАНЯЕМ СЛАЙДЫ АВТО ДИСКИ
function saveAllSlides(carousel) {
  const allSlides = []

  // Получите все слайды в карусели
  const slides = carousel.slides

  slides.forEach((slide) => {
    // Добавьте слайд в массив
    allSlides.push(slide)
  })

  return allSlides
}

const indexColor = (value, searchBy = 'color') => {
  if (searchBy === 'color') {
    const index = carState.options.color[2].findIndex((e) => e.color === value)
    return index
  } else if (searchBy === 'index') {
    if (value >= 0 && value < carState.options.color[2].length) {
      return carState.options.color[2][value].color
    }
  }
  return null
}
const indexOption = (property, value, searchBy = 'color') => {
  const option = carState.options[property]

  if (Array.isArray(option) && option.length > 2 && Array.isArray(option[2])) {
    if (searchBy === 'color') {
      const index = option[2].findIndex((e) => e.color === value)
      return index
    } else if (searchBy === 'index') {
      if (value >= 0 && value < option[2].length) {
        return option[2][value]
      }
    }
  }

  return null
}

// Первое  ОБНОВЛЕНИЕ САЙТА (КАРУСЕЛИ, АККОРДИОН, ШАПКА)
const updateWebsite = () => {
  //Вычисляем количество моделей для выравнивания
  const m = document.querySelectorAll('#carget-models .elementor-column').length
  let divisor
  if (m === 1) {
    divisor = 1
  } else if (m % 2 === 0) {
    divisor = 2
  } else {
    divisor = 3
  }
  document.querySelectorAll('#carget-models .elementor-column').forEach((e) => {
    e.style.width = `${96 / divisor}%`
  })

  // ПРОВЕРКА НА ДИСКИ TRUE FALSE
  if (carState.options.wheels[3] === true) {
    myArrowDiskImages = saveAllSlides(diskImage.swiper)

    updateCaruselDisk(`${carState.options.color[1]}-0`)
    // Другие операции с дисками или что угодно, что нужно выполнить, если wheels[3] === true
  } else if (carState.options.wheels[3] === false) {
    myArrowDiskImages = saveAllSlides(colorImageCarousel.swiper)

    document.querySelectorAll(arrayWrappers[1]).forEach((e) => {
      e.style.display = 'none'
    })
  }

  checkDopOtionShow()

  closeAccordions()
  updateButtonState(carState)
  updateCheck(totalPrice)
  innerPriceHeader()
  innerPriceTitleModels()
  updateTitlePrice()
}

const data4 = [
  'Работаем за свои средства',
  'Белая и прозрачная структура договоров',
  'Официальные оплаты по счетам',
  'Быстрый возврат средств клиенту в случае нарушения условий договора',
  'Исключены таможенные риски',
  'Большой парк электромобилей в наличии в Москве',
  'Русификация авто и техническая поддержка',
]
const data5 = [
  {
    img: 'https://carget.su/wp-content/uploads/2023/11/phone-icon.png',
    contact: '+7 996 410-01-87',
  },
  {
    img: 'https://carget.su/wp-content/uploads/2023/11/whatsapp-icon.png',
    contact: '+7 996 410-01-87',
  },
  {
    img: 'https://carget.su/wp-content/uploads/2023/11/telegram-icon.png',
    contact: '+7 996 410-01-87',
  },
  {
    img: 'https://carget.su/wp-content/uploads/2023/11/email-icon.png',
    contact: 'carget@bk.ru',
  },
]

// Функция для преобразования изображения в Data URL
async function loadImageAsDataURL(imagePath) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = function () {
      const reader = new FileReader()
      reader.onload = function () {
        resolve(reader.result)
      }
      reader.readAsDataURL(xhr.response)
    }
    xhr.onerror = reject
    xhr.open('GET', imagePath)
    xhr.responseType = 'blob'
    xhr.send()
  })
}
// Функция для вычисления суммы с процентом без десятых
function calculateWithPercentage(sum, percentage) {
  return roundNumberToNChars(Math.ceil(sum * (1 + percentage / 100)), 4)
}
const tableBody4 = data4.map((item) => [
  {
    text: item,
    alignment: 'left',
    fontSize: 10,
    margin: [0, 0, 0, 8],
  },
])

const myPDF = async () => {
  const image1 = await loadImageAsDataURL(data5[0].img)
  const image2 = await loadImageAsDataURL(data5[1].img)
  const image3 = await loadImageAsDataURL(data5[2].img)
  const image4 = await loadImageAsDataURL(data5[3].img)

  const data = [
    { label: 'МОДЕЛЬ:', value: carState.model[0] },
    { label: 'КОМПЛЕКТАЦИЯ:', value: carState.model[1] },
    { label: 'ГОД ВЫПУСКА:', value: '2023' },
    { label: 'ЦВЕТ КУЗОВА:', value: carState.options.color[1] },
    {
      label: 'ДИСКИ:',
      value: `${carState.options.wheels[2][indexDisk].color}`,
    },
    { label: 'ЦВЕТ САЛОНА:', value: carState.options.interiorColor[1] },
  ]
  const data2 = [
    {
      label: 'СТОИМОСТЬ:',
      value: `${numberWithSpaces(
        roundNumberToNChars(sumCarPrices(carState, myPriceModels), 4)
      )} руб.`,
    },
    {
      label: 'СТОИМОСТЬ Б/Н БЕЗ НДС:',
      value: `${numberWithSpaces(
        calculateWithPercentage(
          sumCarPrices(carState, myPriceModels),
          carState.marga[1]
        ) + 40000
      )} руб.`,
    },
    {
      label: 'СТОИМОСТЬ Б/Н С НДС 20%:',
      value: `${numberWithSpaces(
        calculateWithPercentage(
          sumCarPrices(carState, myPriceModels),
          carState.marga[2]
        ) + 40000
      )} руб.`,
    },
    { label: 'СРОК ПОСТАВКИ:', value: '45-60 ДНЕЙ' },
  ]

  // Ваш массив данных
  const runningBoards = carState.options.runningBoards[0]
  // Вывод доп опций
  const filteredLabels = runningBoards.filter((label) => label.show)
  const optionsText = filteredLabels.map((label) => label.title).join(', ')

  // Получаем списки с классами accordion-ul-items-complect и accordion-ul-items-description
  const complectList = modelElements[
    carState.model[1]
  ].model[0].querySelectorAll('.accordion-ul-items-complect li')
  const descriptionList = modelElements[
    carState.model[1]
  ].model[0].querySelectorAll('.accordion-ul-items-description li')

  // Функция для извлечения текста из элементов списка и создания массива данных
  function extractTextFromList(list) {
    return Array.from(list).map((item) => {
      const text = item.textContent.trim()
      return text.substring(text.indexOf('⚙️') + 1).trim()
    })
  }

  // Извлекаем текст из списков
  const complectData = extractTextFromList(complectList)
  const descriptionData = extractTextFromList(descriptionList)

  const tableBodycomplectData = complectData.map((item) => [
    {
      text: item,
      alignment: 'left',
      fontSize: 10,
      margin: [0, 0, 0, 8],
    },
  ])
  const tableBodydescriptionData = descriptionData.map((item) => [
    {
      text: item,
      alignment: 'left',
      fontSize: 10,
      margin: [0, 0, 0, 8],
    },
  ])
  const tableBody = data.map(({ label, value }) => [
    {
      text: label,
      alignment: 'left',
      border: [0, 0, 0, 0],
      fontSize: 10,
      margin: [2, 4, 2, 4],
    },
    {
      text: value,
      alignment: 'left',
      border: [0, 0, 0, 0],
      margin: [-16, 4, 2, 4],
      fontSize: 10,
      bold: true,
    },
  ])
  const tableBody2 = data2.map(({ label, value }) => [
    {
      text: label,
      alignment: 'left',
      border: [0, 0, 0, 0],
      fontSize: 10,
      margin: [0, 0, -64, 0],
    },
    {
      text: value,
      alignment: 'left',
      border: [0, 0, 0, 0],
      fontSize: 10,
      bold: true,
      margin: [40, 0, 0, 0],
    },
  ])

  const imageDataURL = await loadImageAsDataURL(arrayImagesForPDF[0])
  const tableBody5 = await Promise.all(
    data5.map(async ({ img, contact }) => {
      const i = await loadImageAsDataURL(img)
      return [
        {
          image: i,
          width: 24,
          height: 24,
          margin: [0, 0, 0, 16],
        },
        {
          text: contact,
          alignment: 'left',
          fontSize: 12,
          margin: [32, -36, 0, 16],
        },
      ]
    })
  )

  var pdfContent = {
    defaultFileName: `${carState.model[0]} ${carState.model[1]}.pdf`,
    pageOrientation: 'portrait',
    pageSize: {
      width: 600,
      height: 1000,
    },
    pageMargins: [32, 64, 32, 64],
    info: {
      title: `${carState.model[0]} ${carState.model[1]}`,
      author: 'CARGET',
      keywords: ['CARGET', `${carState.model[0]} ${carState.model[1]}`],
    },
    header: {
      columns: [
        {
          image: await loadImageAsDataURL(arrayImagesForPDF[0]),
          width: 196,
          height: 40,
          margin: [16, 16, 0, 0],
        },
        {
          text: 'CARGET.SU\nГ. МОСКВА, УЛ. КУЛАКОВА Д.20 К1, ОФ.213\nООО «ВОСТОКИМПОРТ»',
          alignment: 'right',
          margin: [0, 16, 16, 0],
          height: 40,
          fontSize: 10,
        },
      ],
    },
    footer: {
      columns: [
        { text: 'CARGET.SU', alignment: 'left' },
        { text: 'ООО «ВОСТОКИМПОРТ»', alignment: 'center' },
        { text: '+7 996 410-01-87', alignment: 'right' },
      ],
      margin: [16, 16, 16, 16],
    },
    content: [
      {
        canvas: [
          {
            type: 'rect',
            x: -16,
            y: 0,
            w: 563, // Ширина прямоугольника (можете настроить под ваш макет)
            h: 0.5, // Высота прямоугольника (толщина линии)
            color: '#000000', // Цвет черной полосы
          },
        ],
      },
      {
        text: 'КОММЕРЧЕСКОЕ ПРЕДЛОЖЕНИЕ',
        fontSize: 22,
        alignment: 'center',
        margin: [32, 32, 32, 8],
        bold: true,
      },
      {
        text: `${carState.model[0]} ${carState.model[1]}`,
        fontSize: 18,
        margin: [0, 0, 0, 8],

        alignment: 'center',
        bold: true,
      },
      {
        text: 'Предлагаем Вам рассмотреть возможность приобретения данного автомобиля.\nС комплектацией, стоимостью и условиями Вы можете ознакомиться ниже',
        fontSize: 10,
        margin: [0, 8, 0, 32],
        alignment: 'left',
      },

      // КАРТОЧКИ - ЧЕК

      {
        columns: [
          {
            margin: [0, 0, 0, 0],
            table: {
              widths: [120, 120],
              body: tableBody,
            },
          },
          {
            margin: [0, 0, 0, 0],
            table: {
              widths: ['*', '*'],
              marginTop: -100,
              body: [
                [
                  {
                    text: 'ДОП. ОПЦИИ:',
                    alignment: 'left',
                    border: [0, 0, 0, 0],
                    fontSize: 9,
                    margin: [4, 4, 0, 4],
                  },
                  {
                    border: [0, 0, 0, 0],
                    text: '',
                  },
                ],
                [
                  {
                    text: '',
                    alignment: 'left',
                    border: [0, 0, 0, 0],
                    fontSize: 9,
                    margin: [4, 4, 4, 4],
                  },
                  {
                    fontSize: 10,
                    border: [0, 0, 0, 0],
                    stack: carState.options.runningBoards[1]
                      ? [{ text: optionsText, border: [0, 0, 0, 0] }]
                      : [{ text: 'Нет', border: [0, 0, 0, 0] }],
                    margin: [-130, 0, 4, 4],
                  },
                ],
                ...tableBody2,
                [
                  {
                    text: '',
                    border: [0, 0, 0, 0],
                    margin: [0, 26, 0, 0],
                  },
                  {
                    text: '*Стоимость растаможенного автомобиля по ставкам ЕАЭС под ключ в Москве, включающая все возможные затраты.',
                    border: [0, 0, 0, 0],
                    fontSize: 8,
                    margin: [-132, 16, 16, 0],
                  },
                ],
              ],
            },
          },
        ],
      },

      // ФОТО АВТО И САЛОНА
      {
        image: await loadImageAsDataURL(arrayImagesForPDF[1]),
        width: 400,
        margin: [0, 32, 0, 0],
        alignment: 'center',
      },
      {
        image: await loadImageAsDataURL(arrayImagesForPDF[2]),
        width: 340,
        margin: [0, 16, 0, 0],
        alignment: 'center',
        pageBreak: 'after',
      },

      {
        text: `КОМПЛЕКТАЦИЯ - ${carState.model[0]} ${carState.model[1]}`,
        margin: [0, 32, 0, 16],
        fontSize: 16,
        bold: true,
      },
      { ul: tableBodycomplectData, margin: [0, 0, 0, 16] },
      { ul: tableBodydescriptionData },
      {
        text: 'ПОЧЕМУ СТОИТ ВЫБРАТЬ CARGET?',
        margin: [0, 32, 0, 16],
        fontSize: 16,
        bold: true,
      },
      { ul: tableBody4 },
      {
        margin: [0, 32, 0, 32],
        canvas: [
          {
            type: 'rect',
            x: -16,
            y: 0,
            w: 563, // Ширина прямоугольника (можете настроить под ваш макет)
            h: 0.5, // Высота прямоугольника (толщина линии)
            color: '#000000', // Цвет черной полосы
          },
        ],
      },
      {
        text: 'ПО ВСЕМ ИНТЕРЕСУЮЩИМ ВОПРОСАМ\nБУДЕМ РАДЫ ВАМ ОТВЕТИТЬ:',
        margin: [0, 0, 0, 16],
        fontSize: 16,
        bold: true,
      },
      {
        columns: [
          [
            {
              image: image1,
              width: 24,
              height: 24,
              margin: [0, 0, 0, 16],
            },
            {
              text: data5[0].contact,
              alignment: 'left',
              fontSize: 12,
              margin: [32, -36, 0, 16],
            },
          ],
          [
            {
              image: image2,
              width: 24,
              height: 24,
              margin: [0, 0, 0, 16],
            },
            {
              text: data5[1].contact,
              alignment: 'left',
              fontSize: 12,
              margin: [32, -36, 0, 16],
            },
          ],
          [
            {
              image: image3,
              width: 24,
              height: 24,
              margin: [0, 0, 0, 16],
            },
            {
              text: data5[2].contact,
              alignment: 'left',
              fontSize: 12,
              margin: [32, -36, 0, 16],
            },
          ],
          [
            {
              image: image4,
              width: 24,
              height: 24,
              margin: [0, 0, 0, 16],
            },
            {
              text: data5[3].contact,
              alignment: 'left',
              fontSize: 12,
              margin: [32, -36, 0, 16],
            },
          ],
        ],
      },
    ],
    styles: {
      header: {
        fontSize: 14,
        color: '#222222',
        bold: false,
      },
    },
  }

  // Создайте PDF
  pdfDoc = pdfMake.createPdf(pdfContent)
}

console.log('Загрузка ...')
document.addEventListener('DOMContentLoaded', async (event) => {
  // Ожидаем, пока слайдер будет инициализирован
  const waitForSlider = () => {
    return new Promise((resolve) => {
      const checkSlider = () => {
        if (colorCarousel && colorCarousel.swiper) {
          resolve()
        } else {
          // Если слайдер ещё не готов, проверяем снова через небольшой интервал
          setTimeout(checkSlider, 100)
        }
      }

      checkSlider()
    })
  }
  // Дожидаемся инициализации САЙТА
  await waitForSlider()
  //  ОБНОВЛЕНИЯ САЙТА (КАРУСЕЛИ, АККОРДИОН, ШАПКА)
  // ОБНОВИТЬ СТОИМОСТb В ШАПКЕ, В МОДЕЛЯХ H2
  colorCarousel.swiper.params.centeredSlides = true
  colorSalon.swiper.params.centeredSlides = true

  colorCarousel.swiper.params.slideToClickedSlide = true
  diskDiametr.swiper.params.slideToClickedSlide = true
  colorSalon.swiper.params.slideToClickedSlide = true

  diskDiametr.swiper.update()
  colorCarousel.swiper.update()
  colorSalon.swiper.update()

  fetchCurrencyRates().then((data) => {
    updatedCarState = convertCarState(carState)
    if (updatedCarState) {
      myPriceModels = sumCarModelsPrices(updatedCarState)
    }
    if (myPriceModels) {
      sumCarPrices(updatedCarState, myPriceModels)
      updateWebsite()
      console.log('Сайт загружен и готов к работе')
      myPDF()
      // Определение элементов каждой модели в аккордионах
      const modelElements = defineModelElements(carState.models)
      cargetLoader.style.display = 'none'
      loader.style.display = 'none'
    }
  })

  // СЛУШАТЕЛИ ----------------- СЛУШАТЕЛИ //
  // Обработчик для кнопки "ВЫБРАНО"
  modelNames.forEach((modelName) => {
    createAndAttachButtonClickHandler(modelName)
  })
  // СЛУШАЕМ ИЗМЕНЕНИЯ СЛАЙДЕРОВ
  colorCarousel.swiper.on('activeIndexChange', async (e) => {
    // Проверьте, не выполняется ли уже обновление карусели
    if (isUpdatingCarousel) {
      return
    }
    // Установите флаг блокировки
    isUpdatingCarousel = true
    if (
      carState.options.color[1] !==
      indexOption('color', e.realIndex, 'index').color
    ) {
      carState.options.color[0] = carState.options.color[2][e.realIndex].price
      carState.options.color[1] = indexColor(e.realIndex, 'index')

      let eRealIndex
      eRealIndex = e.realIndex + 1
      setTimeout(async () => {
        updateCarousel(
          colorImageCarousel,
          '#carget-acordion-color-price span',
          carState.options.color,
          eRealIndex
        )

        if (carState.options.wheels[3] === true) {
          updateCaruselDisk(`${indexColor(e.realIndex, 'index')}-${indexDisk}`)
        } else if (carState.options.wheels[3] === false) {
          updateTitlePrice()
        }

        // Сбросьте флаг после завершения обновления карусели
        isUpdatingCarousel = false
      }, 500)
    } else {
      let eRealIndex
      eRealIndex = e.realIndex
      setTimeout(async () => {
        // ОБНОВИЛИ КАРТИНКУ ЦВЕТА
        await updateCarousel(
          colorImageCarousel,
          '#carget-acordion-color-price span',
          carState.options.color,
          eRealIndex
        )
        if (carState.options.wheels[3] === true) {
          await updateCaruselDisk(
            `${indexOption('color', e.realIndex, 'index')}-${indexDisk}`
          )
        } else if (carState.options.wheels[3] === false) {
          updateTitlePrice()
        }

        isUpdatingCarousel = false
      }, 500)
    }
  })
  colorImageCarousel.swiper.on('activeIndexChange', async (e) => {
    // Проверьте, не выполняется ли уже обновление карусели
    if (isUpdatingCarousel) {
      return
    }

    // Установите флаг блокировки
    isUpdatingCarousel = true
    carState.options.color[0] = carState.options.color[2][e.realIndex].price
    carState.options.color[1] = indexColor(e.realIndex, 'index')

    if (carState.options.wheels[3] === true) {
      updateCaruselDisk(`${indexOption('color', e.realIndex, 'index').color}-0`)
    } else if (carState.options.wheels[3] === false) {
      setTimeout(() => {
        updateTitlePrice()
      }, 200)
    }

    colorCarousel.swiper.slideTo(
      e.realIndex + colorCarousel.swiper.params.slidesPerView,
      500
    )
    // Сбросьте флаг после завершения обновления карусели
    isUpdatingCarousel = false
  })

  colorSalon.swiper.on('activeIndexChange', async (e) => {
    // Проверьте, не выполняется ли уже обновление карусели
    if (isUpdatingCarousel) {
      return
    }

    // Установите флаг блокировки
    try {
      isUpdatingCarousel = true

      const currentColor = indexOption(
        'interiorColor',
        e.realIndex,
        'index'
      ).color
      const currentPrice = indexOption(
        'interiorColor',
        e.realIndex,
        'index'
      ).price
      const activeSlideAlt = colorSalon.querySelector(
        '.swiper-slide-active img'
      ).alt
      const slideIndex = findSlideIndexByAlt(colorSalon, activeSlideAlt)
      const slideIndex2 = findSlideIndexByAlt(salonImage, activeSlideAlt)

      if (slideIndex !== -1) {
        carState.options.interiorColor[0] = currentPrice
        carState.options.interiorColor[1] = currentColor
        salonImage.swiper.slideTo(e.realIndex + 1, 400)
        updateTitlePrice()
      }
      isUpdatingCarousel = false
    } catch (error) {
      console.error('Error in diskDiametr activeIndexChange event:', error)
      isUpdatingCarousel = false
    }
  })
  salonImage.swiper.on('activeIndexChange', async (e) => {
    // Проверьте, не выполняется ли уже обновление карусели
    if (isUpdatingCarousel) {
      return
    }

    try {
      isUpdatingCarousel = true

      const currentColor = indexOption(
        'interiorColor',
        e.realIndex,
        'index'
      ).color
      const currentPrice = indexOption(
        'interiorColor',
        e.realIndex,
        'index'
      ).price
      const activeSlideAlt = colorSalon.querySelector(
        '.swiper-slide-active img'
      ).alt

      const slideIndex = findSlideIndexByAlt(colorSalon, activeSlideAlt)
      const slideIndex2 = findSlideIndexByAlt(diskImage, activeSlideAlt)

      if (slideIndex !== -1) {
        carState.options.interiorColor[0] = currentPrice
        carState.options.interiorColor[1] = currentColor
        colorSalon.swiper.slideTo(
          e.realIndex + colorSalon.swiper.params.slidesPerView,
          400
        )
        updateTitlePrice()
      }

      isUpdatingCarousel = false
    } catch (error) {
      console.error('Error in diskImage activeIndexChange event:', error)
      isUpdatingCarousel = false
    }
  })

  document.querySelectorAll('.generate-pdf').forEach((e) => {
    e.addEventListener('click', async function () {
      e.style.opacity = '0.4'
      e.style.pointerEvents = 'none'
      await myPDF()
      if (pdfDoc) {
        console.log('pdfDoc', pdfDoc)
        pdfDoc.download(`${carState.model[0]} ${carState.model[1]}.pdf`)
        setTimeout(() => {
          e.style.opacity = '1'
          e.style.pointerEvents = 'auto'
        }, 200)
      }
    })
  })
})
