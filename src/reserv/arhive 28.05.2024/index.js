const isExelLoadingFinish = false
let Google_DB = {}

let carData = {}

const customConsoleLog = async (
  description,
  value,
  descriptionStyle,
  valueStyle
) => {
  await console.log(`%c${description}`, descriptionStyle, value)
}

/*
customConsoleLog(
  'ДО фильтра опции колес',
  carState.options.wheels[2],
  'background: brown; color: white;',
  'font-weight: bold;'
)
*/
let TEST3, TEST4

let modelsArray = []
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

let carState = {
  model: [],
  models: [],
  options: {
    color: [0, '', []],
    wheels: [0, '', [], true],
    interiorColor: [0, '', []],
    runningBoards: [[], true],
  },
  delivery: {},
  labFees: 0,
  recyclingFee: 0,
  carLocalization: 0,
  marga: [],
}

let savedSlides = {}
let originalColorOptions = {}
let originalWheelsOptions = {}
let originalInteriorColorOptions = {}
// Создаем динамически divPriceModel для каждой модели
const divPriceModels = {}
let previousModel,
  previousColor = null
// ..... импорты ..... //

let saleAll = 0
let pdfDoc
let totalPrice = 0
let indexDisk = 0
let myArrowDiskImages
let myDiskImage, mySalonImage
// let isUpdatingCarousel = false

let modelNames, modelElements

let arrayImagesForPDF = [
  'https://carget.su/wp-content/uploads/2023/11/carget-logo.jpg',
  'https://carget.su/wp-content/uploads/2023/11/carget-logo.jpg',
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

const cargetModels = document.querySelector(
  '#carget-models .elementor-container'
)

// ЦЕНА В ШАПКЕ
const totalpriceElements = document.querySelectorAll('.header-totalprice')

// ЧЕКБОКСЫ ---------------------------------------- //
const checkbox = document.getElementById('myCheckbox')
const checkboxLabel = document.querySelector('.custom-checkbox-label')
const checkboxSpan = document.getElementById('custom-checkbox-span')

// ЧЕК --------------------------------------- //
const checkImages = document.querySelectorAll('.check-list-image')
const discountCheck = document.getElementById('check-list-items-discount')
const priceItemDiscount = document.getElementById('price-items-discount')
// Выбираем все элементы с классами для цвета, салона, дисков и дополнительных опций
const colorKuzovaElements = document.querySelectorAll('.check-color')
const colorSalonaElements = document.querySelectorAll('.check-color-salon')
const diskElements = document.querySelectorAll('.check-disk')
const dopOptionsElements = document.querySelector('.check-dop-option')
const totalPriceCarElements = document.querySelectorAll('.total-price-car')
const totalSaleCarElements = document.querySelectorAll('.total-discount')

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
const diskDiametr = document.getElementById('carget-acordion-disk')
  ? document.getElementById('carget-acordion-disk').querySelector('.swiper')
  : ''
const diskImage = document.getElementById('carget-acordion-disk-image')
  ? document
      .getElementById('carget-acordion-disk-image')
      .querySelector('.swiper')
  : ''
const colorSalon = document
  .getElementById('carget-acordion-salon')
  .querySelector('.swiper')
const salonImage = document
  .getElementById('carget-acordion-salon-color')
  .querySelector('.swiper')

const loader = document.getElementById('header-loader')
const cargetLoader = document.getElementById('carget-loader')
function showLoader() {
  loader.style.display = 'block'
  cargetLoader.style.display = 'block'
}
function hideLoader() {
  loader.style.display = 'none'
  cargetLoader.style.display = 'none'
}
// Создаем элемент иконки автомобиля от Google Fonts
const loaderCar = document.createElement('div')
loaderCar.id = 'loader-car'
loaderCar.className = 'loaderCar-text'
loaderCar.textContent = 'CARGET'
// Создаем элемент текста загрузки
const loaderText = document.createElement('div')
loaderText.id = 'loader-text'
loaderText.className = 'loader-text'
loaderText.textContent = 'Подгружаем данные'
// Добавляем элемент текста в загрузчик
loader.appendChild(loaderCar)
loader.appendChild(loaderText)
// Тексты для смены
const texts = [
  'Настраиваем конфигуратор',
  'Почти готово',
  'Загружаем настройки',
  'Финальные штрихи',
]
let textIndex = 0
function changeLoaderText() {
  loaderText.textContent = texts[textIndex]
  textIndex = (textIndex + 1) % texts.length
}
// Меняем текст каждые 2 секунды
const textChangeInterval = setInterval(changeLoaderText, 2000)

let selectedColor

const processSlidesColor = (
  carousel,
  savedSlides,
  addedSlides,
  option,
  attribute
) => {
  // Проверяем, был ли слайд уже добавлен
  const isSlideAlreadyAdded = addedSlides.some((slide) =>
    slide.innerHTML.includes(`alt="${option.color}"`)
  )

  // Если слайд не был добавлен, фильтруем и добавляем уникальные слайды
  if (!isSlideAlreadyAdded) {
    const filteredSlides = savedSlides.filter((slide) =>
      slide.innerHTML.includes(`alt="${option.color}"`)
    )

    // Для carousels, которые содержат изображения, удаляем дублирующие слайды по alt
    if (attribute) {
      const uniqueAlts = {}

      filteredSlides.forEach((slide) => {
        const alt = slide.querySelector(attribute).getAttribute('alt')

        if (!(alt in uniqueAlts)) {
          uniqueAlts[alt] = true
        } else {
          slide.remove()
        }
      })
    }

    filteredSlides.forEach((slide) => {
      carousel.swiper.appendSlide(slide)
      addedSlides.push(slide)
    })
  }
}
const processSlidesWheelsSalon = (
  swiper,
  savedSlides,
  addedSlides,
  option,
  attribute,
  selectedModel,
  selectedColor
) => {
  // Проверяем, соответствует ли опция выбранной модели и цвету
  if (
    (option.models.includes(selectedModel) || option.models.includes('All')) &&
    (option.colors.includes(selectedColor) || option.colors.includes('All'))
  ) {
    // Проверяем, был ли слайд уже добавлен
    const isSlideAlreadyAdded = Array.from(addedSlides).some((slide) =>
      slide.innerHTML.includes(`alt="${option.color}"`)
    )

    // Если слайд не был добавлен, фильтруем и добавляем уникальные слайды
    if (!isSlideAlreadyAdded) {
      const filteredSlides = savedSlides.filter((slide) =>
        slide.innerHTML.includes(`alt="${option.color}"`)
      )

      // Для carousels, которые содержат изображения, удаляем дублирующие слайды по alt
      if (attribute) {
        const uniqueAlts = {}
        filteredSlides.forEach((slide) => {
          const alt = slide.querySelector(attribute).getAttribute('alt')
          if (!(alt in uniqueAlts)) {
            uniqueAlts[alt] = true
          } else {
            slide.remove()
          }
        })
      }

      filteredSlides.forEach((slide) => {
        swiper.appendSlide(slide)
        addedSlides.add(slide)
      })
    }
  }
}

const checkColor = (selectedModel) => {
  if (carState.options.color[2][0].models) {
    carState.options.color[2] = [...originalColorOptions]

    carState.options.color[2] = carState.options.color[2].filter(
      (option) =>
        option.models.includes(selectedModel) || option.models.includes('All')
    )

    colorCarousel.swiper.removeAllSlides()
    colorImageCarousel.swiper.removeAllSlides()
    let addedColorSlides = []
    let addedColorImageSlides = []

    carState.options.color[2].forEach((option) => {
      // Обрабатываем слайды для карусели цвета
      processSlidesColor(
        colorCarousel,
        savedSlides.colorCarousel,
        addedColorSlides,
        option,
        '.swiper-slide-image'
      )
      // Обрабатываем слайды для карусели изображений цвета
      processSlidesColor(
        colorImageCarousel,
        savedSlides.colorImageCarousel,
        addedColorImageSlides,
        option,
        '.swiper-slide-image'
      )
    })

    areAllSlidesWithSameAlt(colorCarousel)
      ? removeDuplicateSlides(colorCarousel)
      : ''
    areAllSlidesWithSameAlt(colorImageCarousel)
      ? removeDuplicateSlides(colorImageCarousel)
      : ''

    colorCarousel.swiper.update()
    colorImageCarousel.swiper.update()
  }

  if (colorCarousel.swiper.slides.length > 1) {
    setTimeout(() => {
      colorCarousel.swiper.slideTo(colorCarousel.swiper.params.slidesPerView)
      colorCarousel.swiper.params.centeredSlides = true
      colorCarousel.swiper.params.slideToClickedSlide = true
    }, 1000)
  } else if (colorCarousel.swiper.slides.length <= 1) {
    setTimeout(() => {
      carState.options.color[1] = colorCarousel.querySelector(
        '.swiper-slide-active img'
      ).alt
    }, 1500)
  } else {
    console.log('сработал не известный сценарий checkColor')
  }
  return true
}

const checkWheels = (selectedModel) => {
  // Показать блок диски, если есть хотя бы один слайд и активирована опция колес
  document.querySelectorAll(arrayWrappers[1]).forEach((e) => {
    if (diskDiametr.swiper.slides.length >= 1 || carState.options.wheels[3]) {
      e.style.display = 'block'
    }
  })

  customConsoleLog(
    'ДО фильтра опции колес',
    diskImage.swiper.slides.length,
    'background: brown; color: white;',
    'font-weight: bold;'
  )
  // Работа с базой - Копируем исходные опции колес
  carState.options.wheels[2] = [...originalWheelsOptions]
  // Фильтруем опции колес по выбранной модели и цвету
  carState.options.wheels[2] = carState.options.wheels[2].filter(
    (option) =>
      (option.models.includes(selectedModel) ||
        option.models.includes('All')) &&
      (option.colors.includes(previousColor ? previousColor : selectedColor) ||
        option.colors.includes('All'))
  )

  // Работа с каруселью - Удаляем все слайды из каруселей диаметра и изображений дисков
  diskDiametr.swiper.removeAllSlides()
  diskImage.swiper.removeAllSlides()
  let addedDiskDiametrSlides = new Set()

  // Обрабатываем слайды для диаметра и изображений дисков
  carState.options.wheels[2].forEach((option) => {
    processSlidesWheelsSalon(
      diskDiametr.swiper,
      savedSlides.diskDiametr,
      addedDiskDiametrSlides,
      option,
      '.swiper-slide-image',
      selectedModel,
      selectedColor
    )
  })

  customConsoleLog(
    'ПОСЛЕ фильтра опции колес',
    diskImage.swiper.slides.length,
    'background: brown; color: white;',
    'font-weight: bold;'
  )
  // Проверяем и удаляем дубликаты слайдов
  areAllSlidesWithSameAlt(diskDiametr) ? removeDuplicateSlides(diskDiametr) : ''
  // Обновляем карусели
  diskDiametr.swiper.update()
  diskImage.swiper.update()

  // Сценарии для карусели
  if (diskDiametr.swiper.slides.length > 1) {
    customConsoleLog(
      'diskDiametr > 1',
      diskDiametr.swiper.slides.length,
      'background: yellow; color: black;',
      'font-weight: bold;'
    )
    setTimeout(() => {
      // diskDiametr.swiper.params.centeredSlides = true
      // diskDiametr.swiper.params.slideToClickedSlide = true
      diskDiametr.querySelectorAll('.elementor-swiper-button').forEach((e) => {
        e.style.display = 'inline-flex'
      })
    }, 1500)
  } else if (diskDiametr.swiper.slides.length <= 1) {
    customConsoleLog(
      'diskDiametr <= 1',
      diskDiametr.swiper.slides.length,
      'background: yellow; color: black;',
      'font-weight: bold;'
    )
    // Если один или меньше слайдов, скрываем кнопки переключения
    setTimeout(() => {
      carState.options.wheels[1] = diskDiametr.querySelector(
        '.swiper-slide-active img'
      ).alt
      diskDiametr.querySelectorAll('.elementor-swiper-button').forEach((e) => {
        e.style.display = 'none'
      })
    }, 1500)
  } else {
    console.log('нет такого СЦЕНАРИЯ для дисков')
    customConsoleLog(
      'нет такого СЦЕНАРИЯ для дисков',
      diskDiametr.swiper.slides.length,
      'background: yellow; color: black;',
      'font-weight: bold;'
    )
  }

  updateCarouselDisk(`${carState.options.color[1]}-0`, 'checkWheels')

  return true
}

const checkSalon = (selectedModel) => {
  carState.options.interiorColor[2] = [...originalInteriorColorOptions]
  carState.options.interiorColor[2] = carState.options.interiorColor[2].filter(
    (option) =>
      (option.models.includes(selectedModel) ||
        option.models.includes('All')) &&
      (option.colors.includes(previousColor ? previousColor : selectedColor) ||
        option.colors.includes('All'))
  )

  colorSalon.swiper.removeAllSlides()
  salonImage.swiper.removeAllSlides()
  let addedColorSalonSlides = []
  let addedSalonImageSlides = []
  carState.options.interiorColor[2].forEach((option) => {
    processSlidesColor(
      colorSalon,
      savedSlides.colorSalon,
      addedColorSalonSlides,
      option,
      '.swiper-slide-image'
    )
    processSlidesColor(
      salonImage,
      savedSlides.salonImage,
      addedSalonImageSlides,
      option,
      '.swiper-slide-image'
    )
  })

  areAllSlidesWithSameAlt(colorSalon) ? removeDuplicateSlides(colorSalon) : ''
  colorSalon.swiper.update()
  salonImage.swiper.update()
  //обновляю цвет салона, заголовок и цену
  if (colorSalon.swiper.slides.length > 1) {
    setTimeout(() => {
      colorSalon.swiper.slideTo(colorSalon.swiper.params.slidesPerView)
        ? colorSalon.swiper.slideTo(colorSalon.swiper.params.slidesPerView)
        : colorSalon.swiper.slideNext()
      colorSalon.swiper.params.centeredSlides = true
      colorSalon.swiper.params.slideToClickedSlide = true
      colorSalon.querySelectorAll('.elementor-swiper-button').forEach((e) => {
        e.style.display = 'inline-flex'
      })
    }, 1500)
  } else if (colorSalon.swiper.slides.length <= 1) {
    setTimeout(() => {
      carState.options.interiorColor[1] = colorSalon.querySelector(
        '.swiper-slide-active img'
      ).alt
      colorSalon.querySelectorAll('.elementor-swiper-button').forEach((e) => {
        e.style.display = 'none'
      })
    }, 1500)
  }
  return true
}

async function updateOptions(selectedModel) {
  const { options } = carState
  const { wheels, color } = options

  const wheelsCheckNeeded = wheels[3] === true
  const colorCheckNeeded = selectedModel && selectedModel !== previousModel
  const salonCheckNeeded = colorSalon.swiper ? true : false

  const runChecks = async ({
    isCheckColor = false,
    isCheckWheels = false,
    isCheckSalon = false,
  }) => {
    try {
      if (isCheckColor && colorCarousel.swiper) {
        await checkColor(selectedModel)
      }
      if (isCheckWheels && diskDiametr.swiper) {
        await checkWheels(selectedModel)
      }
      if (isCheckSalon && colorSalon.swiper) {
        await checkSalon(selectedModel)
      }
      await updateTitlePrice('updateOptions')
    } catch (error) {
      console.error('Ошибка при выполнении проверок:', error)
    }
  }

  try {
    // -------------------- МОДЕЛЬ ИЗМЕНИЛАСЬ
    if (colorCheckNeeded) {
      previousModel = selectedModel

      customConsoleLog(
        'МОДЕЛЬ ИЗМЕНИЛАСЬ',
        selectedModel,
        'background: seagreen; color: white;',
        'font-weight: bold;'
      )

      await runChecks({
        isCheckColor: colorCheckNeeded,
        isCheckWheels: wheelsCheckNeeded,
        isCheckSalon: salonCheckNeeded,
      })
    }
    // -------------------- ЦВЕТ КУЗОВА ИЗМЕНИЛСЯ
    else if (color[1] && color[1] !== previousColor) {
      previousColor = color[1]

      customConsoleLog(
        'ЦВЕТ КУЗОВА ИЗМЕНИЛСЯ',
        color[1],
        'background: seagreen; color: white;',
        'font-weight: bold;'
      )
      await runChecks({
        isCheckColor: colorCheckNeeded,
        isCheckWheels: wheelsCheckNeeded,
        isCheckSalon: salonCheckNeeded,
      })
    }
  } catch (error) {
    console.error('Ошибка при обновлении опций:', error)
  }
}

//удаляем дубликаты, если один элемент
function removeDuplicateSlides(carouselElement) {
  try {
    // Создаем Set для хранения уникальных значений alt
    const uniqueAlts = new Set()

    // Получаем все слайды карусели
    const slides = carouselElement.querySelectorAll('.swiper-slide')

    // Проходимся по каждому слайду
    slides.forEach((slide, index) => {
      const imgElement = slide.querySelector('.swiper-slide-image')
      if (imgElement) {
        // Получаем значение атрибута alt изображения
        const alt = imgElement.getAttribute('alt')

        // Если такого alt еще нет в Set, добавляем его
        if (!uniqueAlts.has(alt)) {
          uniqueAlts.add(alt)
        } else {
          // Если такой alt уже есть, удаляем текущий слайд из DOM
          slide.remove()
        }
      } else {
        console.warn(
          `Слайд ${
            index + 1
          } не содержит изображение с классом '.swiper-slide-image'`
        )
      }
    })
  } catch (error) {
    console.error('Ошибка в функции removeDuplicateSlides:', error)
  }
}

//проверяем на одинаковый alt у всех в карусели
function areAllSlidesWithSameAlt(carousel) {
  const slides = carousel.querySelectorAll('.swiper-slide')

  if (slides.length === 0) {
    // Если карусель пустая, считаем, что все слайды с одинаковым alt
    return true
  }

  // Получаем значение атрибута alt первого слайда
  const firstSlideAlt = slides[0]
    .querySelector('.swiper-slide-image')
    .getAttribute('alt')

  // Проверяем, совпадает ли значение атрибута alt у всех слайдов
  for (let i = 1; i < slides.length; i++) {
    const slideAlt = slides[i]
      .querySelector('.swiper-slide-image')
      .getAttribute('alt')
    if (slideAlt !== firstSlideAlt) {
      // Если хотя бы одно значение отличается, возвращаем false
      return false
    }
  }

  // Если все значения атрибута alt одинаковы, возвращаем true
  return true
}

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
async function updateCarouselDisk(dc, where) {
  // Включаем карусель diskImage и очищаем все слайды
  diskImage.swiper.removeAllSlides()

  const consoleValue = { dc, where }
  customConsoleLog(
    'updateCarouselDisk',
    consoleValue,
    'background: blue; color: white;',
    'font-weight: bold;'
  )

  const color = dc.split('-')[0]
  const matchingIndexes = []

  carState.options.wheels[2].forEach((option) => {
    // Проверяем, что у опции есть нужный цвет или 'All'
    if (option.colors.includes(color) || option.colors.includes('All')) {
      matchingIndexes.push(option.index) // Добавляем индекс в массив
    }
  })
  console.log('Matching indexes:', matchingIndexes)

  const exactMatchSlides = myArrowDiskImages.filter((slide) => {
    // Проверяем условия фильтрации для каждого слайда
    return matchingIndexes.some(
      (index) => slide.querySelector('img').alt === `${color}-${index}`
    )
  })

  console.log('Filtered slides:', exactMatchSlides)

  exactMatchSlides.forEach((slide) => {
    diskImage.swiper.appendSlide(slide)
  })

  diskImage.swiper.update()

  // Обновляем состояние carState
  carState.options.wheels[0] = indexOption('wheels', 0, 'index').price
  carState.options.wheels[1] = indexOption('wheels', 0, 'index').color

  if (diskDiametr.swiper) {
    diskDiametr.swiper.slideTo(diskDiametr.swiper.params.slidesPerView, 400)

    diskDiametr.swiper.update()
  }

  diskDiametr.querySelectorAll('.elementor-swiper-button').forEach((button) => {
    button.style.display =
      diskDiametr.swiper.slides.length <= 1 ? 'none' : 'inline-flex'
  })

  updateTitlePrice('updateCarouselDisk')
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

// ПРОВЕРКА НА ДИСКИ ДЛЯ ВЫГРУЗКИ ФОТО АВТО, ЕСЛИ FALSE ТО ВЫГРУЖАЮ ИЗ ПЕРВОЙ КАРУСЕЛИ

// Функция для установки содержимого изображения в чек и обновления массива изображений для PDF
async function updateImages(imageElement) {
  if (!imageElement) return
  const imgElement = imageElement.querySelector('img')
  if (!imgElement) return
  const src = imgElement.getAttribute('src')
  if (!src) return

  arrayImagesForPDF[1] = src
  checkImages[0].innerHTML = myDiskImage.outerHTML
}

async function loadImageAsDataURLWithLogging(imagePath) {
  try {
    const imageDataURL = await loadImageAsDataURL(imagePath)
    return imageDataURL
  } catch (error) {
    console.error('Error loading image:', error)
    throw error
  }
}
// Функция для преобразования изображения в Data URL
async function loadImageAsDataURL(imagePath) {
  // Проверяем, является ли переданный путь уже Data URL
  if (!imagePath || imagePath.startsWith('data:image')) {
    return imagePath // Если это пустое значение или Data URL, возвращаем его без изменений
  }
  try {
    const response = await fetch(imagePath)
    if (!response.ok) {
      throw new Error('Failed to fetch image')
    }

    let blob = await response.blob() // Изменили const на let
    const reader = new FileReader()

    // Проверяем, является ли тип изображения WebP или PNG
    const isWebP = blob.type === 'image/webp'

    if (isWebP) {
      // Если изображение в формате WebP или PNG, конвертируем его в другой формат
      const image = new Image()
      image.src = URL.createObjectURL(blob)
      await image.decode() // Дожидаемся загрузки изображения
      const canvas = document.createElement('canvas')
      canvas.width = image.width
      canvas.height = image.height
      const context = canvas.getContext('2d')
      context.drawImage(image, 0, 0)
      const convertedBlob = await new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Failed to convert image'))
          }
          resolve(blob)
        }) // Если изображение в формате PNG, конвертируем его в JPEG
      })

      blob = convertedBlob // Изменили присвоение значения константе
    }

    return new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  } catch (error) {
    throw new Error('Error loading image as Data URL: ' + error.message)
  }
}

// СКИДКА заголовки параметров
const updateTitlePrice = async (where) => {
  customConsoleLog(
    'updateTitlePrice',
    where,
    'background: blue; color: white;',
    'font-weight: bold;'
  )

  if (typeof arrayTitlePrice !== 'object' || arrayTitlePrice === null) {
    console.error('arrayTitlePrice не является объектом')
    return
  }

  Object.entries(arrayTitlePrice).forEach(([option, selector]) => {
    try {
      const optionData = carState.options[option]
      if (!optionData) return

      const [price, selectedColor, colorOptions] = optionData
      let selectedOption = colorOptions.find(
        ({ color }) => color === selectedColor
      )

      if (!selectedOption && colorOptions.length > 0) {
        selectedOption = colorOptions[0]
      }

      const element = document.querySelector(selector)
      if (element && selectedOption) {
        const saleHtml =
          selectedOption.sale !== undefined
            ? `<span style="font-weight:700; display: flex; justify-content: center; gap: 8px;">
               ${price} руб. <del style="text-decoration-color:#D10000; font-weight:300;">${selectedOption.sale} руб.</del>
             </span>`
            : `<span>${price} руб.</span>`

        element.innerHTML = `
          <div style="display:flex;flex-direction:column;">
            <span style="font-weight:700;">${
              selectedColor === selectedOption.color
                ? selectedColor
                : selectedOption.color
            }</span>
            ${saleHtml}
          </div>`
      }
    } catch (error) {
      console.error(`Error updating option ${option}:`, error)
    }
  })

  // Проверка состояния колес и наличия diskImage
  if (carState.options.wheels[3] === true && diskImage) {
    // ФОТО АВТО В ЧЕК
    myDiskImage = diskImage.querySelector('.swiper-slide-active')
      ? diskImage.querySelector('.swiper-slide-active')
      : diskImage.querySelector('.swiper-slide')
    if (myDiskImage) {
      // Копируем src изображения перед обновлением массива
      await updateImages(myDiskImage)
    }
  } else if (carState.options.wheels[3] === false && colorImageCarousel) {
    myDiskImage = colorImageCarousel.querySelector('.swiper-slide-active')
    if (myDiskImage) {
      // Копируем src изображения перед обновлением массива
      await updateImages(myDiskImage)
    }
  } else {
    myDiskImage = colorImageCarousel.querySelector('.swiper-slide')
    // Копируем src изображения перед обновлением массива
    await updateImages(myDiskImage)
  }

  if (salonImage && salonImage.querySelector('.swiper-slide-active img')) {
    arrayImagesForPDF[2] = salonImage.querySelector(
      '.swiper-slide-active img'
    )?.src
  } else if (salonImage && salonImage.querySelector('.swiper-slide img')) {
    arrayImagesForPDF[2] = salonImage.querySelector('.swiper-slide img')?.src
  }

  updateCheck()
}

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
    if (option.check) {
      option.show = false
      checkboxInput.checked = false
    }

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
    // СКИДКА доп опции
    checkboxLabel.textContent = option.title
    checkboxDescription.textContent = option.description
    checkboxSpan.innerHTML = `<div style="display:flex; gap:8px;">
        <span style="font-weight:700;">${numberWithSpaces(
          option.price
        )} руб.</span>
          ${
            option.sale !== 0 && option.sale
              ? `<del style="text-decoration-color:#D10000; font-weight:300; color: #000">${option.sale} руб.</del> `
              : ''
          } 
      </div>`

    // Добавление слушателей событий для чекбоксов
    const handleClick = () => {
      if (option.check) {
        checkboxInput.checked = !checkboxInput.checked
        option.show = checkboxInput.checked
        updateCheck()
      }
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
// ЗАКРЫТОЕ ПОЛОЖЕНИЕ АККОРДИОНОВ
async function closeAccordions() {
  modelNames.forEach((e) => {
    modelElements[e].accordionItem[0].click()
  })
}
// СОЗДАЕМ ЦЕНУ АККОРДИОНАМ
const innerPriceTitleModels = () => {
  // ЗАПИСЬ СТОИМОСТИ В ЗАГОЛОВКИ АККАРДИОНА
  // СКИДКА модели комплектации
  modelNames.forEach((modelName, index) => {
    divPriceModels[modelName].innerHTML = `
          <div style="display:flex;flex-direction:column; gap: 8px;">
          ${
            carState.models[index][modelName].sale !== 0 &&
            carState.models[index][modelName].sale
              ? `<span style="font-size:16; font-weight:300"><del style="color: white;">${carState.models[index][modelName].sale} руб.</del></span>`
              : ''
          }
          <span style="font-weight:700;">${numberWithSpaces(
            myPriceModels[index]
          )} руб.</span>
          </div>
      `
  })

  modelNames.forEach((modelName, index) => {
    const price = numberWithSpaces(myPriceModels[index])
    modelElements[modelName].acc.forEach((element) => {
      element.innerHTML = `
        <div style="display:flex;flex-direction:column; gap: 8px;">
          ${
            carState.models[index][modelName].sale !== 0 &&
            carState.models[index][modelName].sale
              ? `<span style="font-size:20px; font-weight:300"><del  style="color: white;">${carState.models[index][modelName].sale} руб.</del></span>`
              : ''
          }
          <span style="font-weight:700;">${price} руб.</span>
        </div>
      `
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

// Функция обновления состояния кнопок моделей
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
        updateOptions(modelName)
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
  // Конвертация МОДЕЛЕЙ в рубли
  const priceInRub = {}
  modelNames.forEach((modelName) => {
    const modelPrice = carState.models.find((model) => model[modelName])
    const modelPriceCNY = modelPrice ? modelPrice[modelName].price : 0
    priceInRub[modelName] = modelPriceCNY * cnyToRubExchangeRate
  })

  // Обновление объекта состояния с новыми значениями в рублях
  const updatedCarState = {
    ...carState,
    models: carState.models.map((model) => {
      const modelName = Object.keys(model)[0]
      const priceInRub = model[modelName].price * cnyToRubExchangeRate
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

    const totalWithMarga = total + total * (marga / 100)

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

  let total =
    modelPrice +
    color[0] +
    wheels[0] +
    interiorColor[0] /* - saleAll если нужно делать вычет */

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
const dopOptionsWrapper = document.querySelector(
  '.dop-options-wrapper .elementor-widget-wrap'
)
const children = dopOptionsWrapper.children

const updateWebsite = () => {
  cargetModels.style.display = 'flex'
  if (cargetModels.children.length <= 4) {
    cargetModels.style.flexWrap = 'nowrap'
  }
  if (cargetModels.children.length >= 5) {
    cargetModels.style.flexWrap = 'wrap'
  }

  // Сохраняем слайды
  savedSlides.colorCarousel = colorCarousel.swiper
    ? colorCarousel.swiper.slides
    : ''
  savedSlides.colorImageCarousel = colorImageCarousel.swiper
    ? colorImageCarousel.swiper.slides
    : ''
  savedSlides.diskDiametr = diskDiametr.swiper ? diskDiametr.swiper.slides : ''
  savedSlides.diskImage = diskImage.swiper ? diskImage.swiper.slides : ''
  savedSlides.colorSalon = colorSalon.swiper ? colorSalon.swiper.slides : ''
  savedSlides.salonImage = salonImage.swiper ? salonImage.swiper.slides : ''

  //сохраняем объект стейта
  originalColorOptions = [...carState.options.color[2]]
  originalWheelsOptions = [...carState.options.wheels[2]]
  originalInteriorColorOptions = [...carState.options.interiorColor[2]]

  carState.options.runningBoards[0].forEach((option, index) => {
    const child = children[index]
    const checkbox = document.getElementById(child.id)
    const checkboxInput = checkbox.querySelector(`#${child.id}`)
    if (!option.check) {
      checkboxInput.checked = true
    }
  })

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
  if (carState.options.wheels[3] === true && diskDiametr.swiper) {
    myArrowDiskImages = saveAllSlides(diskImage.swiper)

    // updateCarouselDisk(`${carState.options.color[1]}-0`, 'updateWebsite')
    // Другие операции с дисками или что угодно, что нужно выполнить, если wheels[3] === true
  } else if (carState.options.wheels[3] === false || !diskDiametr.swiper) {
    myArrowDiskImages = colorImageCarousel.querySelector('.swiper-slide-active')
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
  updateTitlePrice('updateWebsite')
  myPDF()
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
    { label: 'ГОД ВЫПУСКА:', value: new Date().getFullYear() },
    { label: 'ЦВЕТ КУЗОВА:', value: carState.options.color[1] },
    {
      label: 'ДИСКИ:',
      value: `${
        carState.options.wheels[2].length
          ? carState.options.wheels[2][indexDisk].color
          : ''
      }`,
    },
    { label: 'ЦВЕТ САЛОНА:', value: carState.options.interiorColor[1] },
  ]

  const totalCarPrice = roundNumberToNChars(
    sumCarPrices(carState, myPriceModels),
    4
  )

  const data2 = [
    saleAll && saleAll !== 0
      ? {
          label: 'СУММАРНАЯ СКИДКА:',
          value: `${saleAll} руб.`,
        }
      : '',
    {
      label:
        saleAll && saleAll !== 0
          ? 'ИТОГОВАЯ СТОИМОСТЬ\nс учетом скидки:'
          : 'ИТОГОВАЯ СТОИМОСТЬ',
      value: `${numberWithSpaces(totalCarPrice)} руб.`,
    },
    {
      label: 'СТОИМОСТЬ Б/Н БЕЗ НДС:',
      value: `${numberWithSpaces(
        calculateWithPercentage(totalCarPrice, carState.marga) + 40000
      )} руб.`,
    },
    {
      label: 'СТОИМОСТЬ Б/Н С НДС 20%:',
      value: `${numberWithSpaces(
        calculateWithPercentage(totalCarPrice, carState.marga) + 40000
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
      const text = item.innerHTML.trim()
      const cleanedText = text
        .replace(/<[^>]*>/g, '') // Удаляем все HTML-теги и их содержимое
        .replace(/\n+/g, ' ') // Заменяем все переносы строк на пробелы
        .replace(/\s+/g, ' ') // Заменяем последовательности пробелов на одиночные пробелы
      return cleanedText.trim() // Удаляем пробелы в начале и конце строки
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
                    stack:
                      optionsText !== ''
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
        image: await loadImageAsDataURLWithLogging(arrayImagesForPDF[1]),
        width: 400,
        margin: [0, 32, 0, 0],
        alignment: 'center',
      },
      {
        image: await loadImageAsDataURLWithLogging(arrayImagesForPDF[2]),
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
      { ul: tableBodydescriptionData, margin: [0, 0, 0, 16] },
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
let testEvent
//функции прослушиватели
const handleColorCarouselChange = async (e) => {
  testEvent = e
  colorCarousel.swiper.params.centeredSlides = true
  colorCarousel.swiper.params.slideToClickedSlide = true
  colorCarousel.swiper.update()

  /*if (isUpdatingCarousel) {
    return
  }*/

  try {
    colorImageCarousel.swiper.enable()

    // isUpdatingCarousel = true

    let currentColor, currentPrice
    const indexOffset = carState.options.color[2].length <= 1 ? 0 : e.realIndex

    const slideResult = colorImageCarousel.swiper.slideTo(e.realIndex + 1, 400)

    if (slideResult) {
      const index = indexOffset
      colorImageCarousel.swiper.slideTo(e.realIndex + 1, 400)
      const colorOption = await indexOption('color', index, 'index')
      currentColor = colorOption.color
      currentPrice = colorOption.price
    } else {
      colorImageCarousel.swiper.slideTo(e.realIndex + 2, 400)
      const index = indexOffset + 1
      const colorOption = await indexOption('color', index, 'index')
      currentColor = colorOption.color
      currentPrice = colorOption.price
    }

    carState.options.color[0] = currentPrice
    carState.options.color[1] = currentColor

    updateOptions(carState.model[1])

    // isUpdatingCarousel = false

    colorCarousel
      .querySelectorAll('.elementor-swiper-button')
      .forEach((button) => {
        button.style.display =
          colorCarousel.swiper.slides.length <= 1 ? 'none' : 'inline-flex'
      })

    colorImageCarousel.swiper.disable()
  } catch (error) {
    console.error(
      'Ошибка в обработчике события handleColorCarouselChange:',
      error
    )
    // isUpdatingCarousel = false
  }
}

async function loadConfigutation() {
  // Ожидаем, пока слайдер будет инициализирован
  const waitForSlider = (maxAttempts = 50, interval = 100) => {
    return new Promise((resolve, reject) => {
      let attempts = 0
      resolve()
      const checkSlider = () => {
        if (colorCarousel && colorCarousel.swiper) {
          resolve()
        } else {
          attempts++
          if (attempts >= maxAttempts) {
            console.error(
              'Слайдер не инициализировался за максимальное количество попыток.'
            )
            reject(
              new Error(
                'Слайдер не инициализировался за максимальное количество попыток.'
              )
            )
          } else {
            setTimeout(checkSlider, interval)
          }
        }
      }

      //  checkSlider()
    })
  }
  try {
    await waitForSlider()
    updateDopOptions()
    fetchCurrencyRates().then((data) => {
      updatedCarState = convertCarState(carState)
      if (updatedCarState) {
        myPriceModels = sumCarModelsPrices(updatedCarState)
      }
      if (myPriceModels) {
        sumCarPrices(updatedCarState, myPriceModels)
        updateWebsite()
        colorSalon.swiper ? colorSalon.swiper.slideTo(0) : ''
        myPDF()
        // Страница загружена, скрываем загрузчик loader
        hideLoader()
        clearInterval(textChangeInterval)
      }
    })

    if (colorCarousel && colorCarousel.swiper) {
      colorCarousel.swiper.on('activeIndexChange', handleColorCarouselChange)
    }

    // Проверка на существование colorSalon.swiper
    if (colorSalon && colorSalon.swiper) {
      // Устанавливаем значение centeredSlides
      colorSalon.swiper.params.centeredSlides = true
      // Устанавливаем значение slideToClickedSlide
      colorSalon.swiper.params.slideToClickedSlide = true
      // Обновляем swiper
      colorSalon.swiper.update()

      colorSalon.swiper.on('activeIndexChange', async (e) => {
        // Проверьте, не выполняется ли уже обновление карусели
        /*  if (isUpdatingCarousel) {
          return
        }*/

        // Установите флаг блокировки
        try {
          salonImage.swiper.enable()
          // isUpdatingCarousel = true

          const currentColor = indexOption(
            'interiorColor',
            e.realIndex,
            'index'
          )
            ? indexOption('interiorColor', e.realIndex, 'index').color
            : ''
          const currentPrice = indexOption(
            'interiorColor',
            e.realIndex,
            'index'
          )
            ? indexOption('interiorColor', e.realIndex, 'index').price
            : ''
          let activeSlideAlt
          if (colorSalon.querySelector('.swiper-slide-active img')) {
            activeSlideAlt = colorSalon.querySelector(
              '.swiper-slide-active img'
            )
              ? colorSalon.querySelector('.swiper-slide-active img').alt
              : ''
          } else {
            setTimeout(() => {
              activeSlideAlt = colorSalon.querySelector(
                '.swiper-slide-active img'
              ).alt
            }, 1000)
          }

          const slideIndex = findSlideIndexByAlt(colorSalon, activeSlideAlt)
          carState.options.interiorColor[0] = currentPrice
          carState.options.interiorColor[1] = currentColor

          if (slideIndex !== -1) {
            salonImage.swiper.slideTo(e.realIndex + 1, 400)
          }
          updateTitlePrice('colorSalon.swiper.on')
          // isUpdatingCarousel = false
          colorSalon
            .querySelectorAll('.elementor-swiper-button')
            .forEach((e) => {
              if (colorSalon.swiper.slides.length <= 1) {
                e.style.display = 'none'
              } else {
                e.style.display = 'inline-flex'
              }
            })
          salonImage.swiper.disable()
        } catch (error) {
          console.error('Error in diskDiametr activeIndexChange event:', error)
          // isUpdatingCarousel = false
        }
      })
    }

    // Проверка на существование diskDiametr.swiper
    if (diskDiametr && diskDiametr.swiper) {
      diskDiametr.swiper.params.centeredSlides = true

      diskDiametr.swiper.params.slideToClickedSlide = true
      // Обновляем swiper
      diskDiametr.swiper.update()

      diskDiametr.swiper.on('activeIndexChange', async (e) => {
        diskImage.swiper.enable()
        try {
          const currentColor = indexOption('wheels', e.realIndex, 'index').color
          const currentPrice = indexOption('wheels', e.realIndex, 'index').price
          let activeSlideAlt = null
          // Проверяем существование объекта diskDiametr и вызываем метод querySelector
          if (diskDiametr) {
            // Вызываем метод querySelector для объекта diskDiametr
            const activeSlide = diskDiametr.querySelector(
              '.swiper-slide-active img'
            )
            // Проверяем, что activeSlide не равен null или undefined
            if (activeSlide) {
              // Если activeSlide существует, получаем значение атрибута alt
              activeSlideAlt = activeSlide.alt
            }
          }

          const slideIndex = findSlideIndexByAlt(diskDiametr, activeSlideAlt)

          if (slideIndex !== -1) {
            carState.options.wheels[0] = currentPrice
            carState.options.wheels[1] = currentColor
            diskImage.swiper.slideTo(e.realIndex + 1, 400)
            updateTitlePrice('diskDiametr.swiper.on')
            diskImage.swiper.disable()
          }
        } catch (error) {
          console.error('Error in diskDiametr activeIndexChange event:', error)
        }
      })
    }

    //обработкак скачивания PDF
    document.querySelectorAll('.generate-pdf').forEach((e) => {
      e.addEventListener('click', async function () {
        e.style.opacity = '0.4'
        e.style.pointerEvents = 'none'
        await myPDF()
        if (pdfDoc) {
          pdfDoc.download(`${carState.model[0]} ${carState.model[1]}.pdf`)
          setTimeout(() => {
            e.style.opacity = '1'
            e.style.pointerEvents = 'auto'
          }, 200)
        }
      })
    })
  } catch (error) {
    console.error('Ошибка инициализации:', error)
  }
}
const initializeModels = () => {
  if (carState && carState.models) {
    modelNames = carState.models.map((model) => Object.keys(model)[0])
    modelElements = defineModelElements(carState.models)

    modelNames.forEach((modelName) => {
      divPriceModels[modelName] = createDivPriceModel(modelName)

      createAndAttachButtonClickHandler(modelName)
    })
    carState.options.color[1] === ''
      ? ((selectedColor = carState.options.color[2][0].color),
        (carState.options.color[1] = carState.options.color[2][0].color))
      : (selectedColor = carState.options.color[1])
    carState.options.interiorColor[1] === ''
      ? (carState.options.interiorColor[1] =
          carState.options.interiorColor[2][0].color)
      : ''
    if (carState.options.wheels[3]) {
      carState.options.wheels[1] === ''
        ? (carState.options.wheels[1] = carState.options.wheels[2][0].color)
        : ''
    }
  } else {
    console.error('carState или carState.models не определены.')
  }
}

function deepCopy(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj // Если obj не является объектом, возвращаем его
  }

  // Создаем новый объект или массив, в зависимости от типа obj
  const copy = Array.isArray(obj) ? [] : {}

  // Рекурсивно копируем свойства obj в новый объект или массив
  for (const key in obj) {
    copy[key] = deepCopy(obj[key])
  }
  return copy
}

function isCarStateFresh() {
  const key = document.title

  const serializedState = localStorage.getItem(key)
  if (serializedState === null) {
    return false
  }

  const savedState = JSON.parse(serializedState)
  const savedTime = new Date(savedState.lastUpdated)
  const currentTime = new Date()
  const hoursDifference = Math.abs(currentTime - savedTime) / 36e5

  if (hoursDifference >= 24) {
    localStorage.removeItem(key)
    return false
  }
  return true
}

function saveCarStateToLocalStorageForGoogleSheets(state) {
  const key = document.title
  const serializedState = JSON.stringify({
    lastUpdated: new Date().toISOString(),
    carState: state,
  })
  localStorage.setItem(key, serializedState)
}
function getCarStateFromLocalStorageForGoogleSheets() {
  const key = document.title
  const serializedState = localStorage.getItem(key)
  const savedState = JSON.parse(serializedState)

  const log = isCarStateFresh()

  if (!log) {
    gExel()
  } else {
    carState = deepCopy(savedState.carState)
    initializeModels()
    loadConfigutation()
  }
}

function processDataFromExcel(data) {
  // Обработка данных о моделях
  function processModelsData(modelsData) {
    let modelsArray = []

    for (let i = 0; i < modelsData.length; i++) {
      if (modelsData[i]) {
        let modelInfo = modelsData[i].split('#')
        let modelName = modelInfo[0].trim()
        let priceAndSale = modelInfo[1].match(/\d+/g)
        let show = /"show"\s*:\s*(\w+)/.exec(modelInfo[1])
        if (show) {
          show = show[1].trim().toLowerCase() === 'true'
        } else {
          show = false
        }
        // Проверяем, показывать ли модель
        if (show) {
          let modelObject = {}
          modelObject[modelName] = {
            price: parseInt(priceAndSale[0]),
            sale: parseInt(priceAndSale[1]),
            show: show,
          }
          modelsArray.push(modelObject)
        }
      }
    }
    carState.models = modelsArray
    carState.model[0] = document.title
    carState.model[1] = Object.keys(carState.models[0])[0]

    return modelsArray
  }
  // Обработка цвет, диск, цвет
  function processData(data) {
    function processModelsString(modelsString) {
      // Убираем кавычки, если они есть
      modelsString = modelsString.replace(/['"]/g, '')

      // Если строка содержит запятые, значит есть несколько моделей
      if (modelsString.includes(',')) {
        // Разбиваем строку по запятой и удаляем лишние пробелы
        return modelsString.split(',').map((model) => model.trim())
      } else {
        // Возвращаем массив из одной модели
        return [modelsString.trim()]
      }
    }

    let processedData = []

    for (let i = 0; i < data.length; i++) {
      if (data[i]) {
        // Разбиваем строку на отдельные поля
        let info = data[i].split(/\r?\n/).filter(Boolean)

        // Создаем объект для хранения данных
        let obj = {}

        // Перебираем каждое поле и обрабатываем его
        info.forEach((field) => {
          let [key, value] = field.split(':')
          key = key.trim().replace(/["']/g, '') // Убираем лишние кавычки

          if (value !== undefined) {
            // Убеждаемся, что значение не пустое
            value = value ? value.trim().replace(/["']/g, '') : ''

            // Определяем, какое поле мы обрабатываем
            switch (key) {
              case 'price':
              case 'sale':
              case 'diametr':
                obj[key] = parseInt(value)
                break
              case 'color':
                obj.color = value
                break
              case 'show':
                obj.show = value === 'true'
                break
              case 'models':
                obj.models = processModelsString(value)
                break
              case 'colors':
                // Обрабатываем строку с цветами
                obj.colors = value
                  .split(',')
                  .map((color) => color.trim().replace(/['"]/g, ''))
                obj.index = i
                break
              default:
                console.error(`Неизвестный ключ: ${key}`)
                break
            }
          } else {
            console.error(
              `Значение не определено для ключа: ${key}`,
              value,
              field
            )
          }
        })
        if (obj.show) {
          processedData.push(obj)
        }
      }
    }

    return processedData
  }
  // Обработка доп опций
  function processOptionsData(optionsData) {
    let processedOptions = []

    for (let i = 0; i < optionsData.length; i++) {
      if (optionsData[i]) {
        let optionInfo = optionsData[i].split('\n').filter(Boolean)
        let option = {}

        optionInfo.forEach((field) => {
          let [key, value] = field.split(':')
          key = key.trim().replace(/["']/g, '') // Убираем лишние кавычки

          // Убеждаемся, что значение не пустое
          value = value ? value.trim().replace(/["']/g, '') : ''

          switch (key) {
            case 'price':
            case 'sale':
              option[key] = parseInt(value)
              break
            case 'show':
            case 'check':
            case 'showOption':
              option[key] = value === 'true'
              break
            case 'title':
            case 'description':
              option[key] = value
              break
            case 'models':
              // Обрабатываем строку с моделями
              option.models = value
                .split(',')
                .map((model) => model.trim().replace(/['"]/g, ''))
              break
            default:
              console.error(`Неизвестный ключ: ${key}`)
              break
          }
        })

        // Проверяем, были ли добавлены какие-либо данные в объект и опция должна быть отображена
        if (Object.keys(option).length > 0 && option.showOption) {
          processedOptions.push(option)
        }
      }
    }

    return processedOptions
  }
  // обработка и запись показ./скрыть блок значений
  function updateOptionsInCarState(blocks) {
    for (let key in blocks) {
      if (blocks.hasOwnProperty(key)) {
        const optionKey = key
        if (carState.options.hasOwnProperty(optionKey)) {
          switch (optionKey) {
            case 'wheels':
            case 'interiorColor':
              carState.options[optionKey][3] = blocks[key]
              break
            case 'runningBoards':
              carState.options[optionKey][1] = blocks[key]
              break
            default:
              break
          }
        }
      }
    }
  }
  function processShowBlocksData(data) {
    const blocks = {}
    const lines = data[0].split('\n')
    lines.forEach((line) => {
      const [key, value] = line.split(':').map((item) => item.trim())
      blocks[key] = value === 'true'
    })

    updateOptionsInCarState(blocks)
  }
  // обработка доставки
  function processDeliveryData(data) {
    const delivery = {}
    const lines = data[0].split('\n')
    lines.forEach((line) => {
      const [key, value] = line.split(':').map((item) => item.trim())
      delivery[key] = parseInt(value) // Преобразуем значение в число, если это возможно
    })
    return delivery
  }
  // обработка остального
  function updateOtherInCarState(other) {
    for (let key in other) {
      if (other.hasOwnProperty(key)) {
        const optionKey = key
        if (carState.hasOwnProperty(optionKey)) {
          switch (optionKey) {
            case optionKey:
              carState[optionKey] = other[key]
              break
            default:
              break
          }
        }
      }
    }
  }
  function processOtherData(data) {
    const other = {}
    const lines = data[0].split('\n')
    lines.forEach((line) => {
      const [key, value] = line.split(':').map((item) => item.trim())
      other[key] = parseInt(value) // Преобразуем значение в число, если это возможно
    })
    updateOtherInCarState(other)
  }

  for (let i = 0; i < 50; i++) {
    // Проверяем, существует ли элемент data[i] и имеет ли он свойство data[i][0]
    if (!data[i] || !data[i][0]) {
      // Если элемент data[i][0] отсутствует, прерываем выполнение цикла
      break
    }
    let fieldName = data[i][0]
    let fieldData = data[i].slice(1).filter(Boolean) // Удаляем пустые значения

    // В зависимости от имени поля обрабатываем данные по-разному
    switch (fieldName) {
      case 'models':
        processModelsData(fieldData)
        break
      case 'color':
        carState.options.color[2] = processData(fieldData)
        break
      case 'wheels':
        carState.options.wheels[2] = processData(fieldData)
        break
      case 'interiorColor':
        carState.options.interiorColor[2] = processData(fieldData)
        break
      case 'runningBoards':
        carState.options.runningBoards[0] = processOptionsData(fieldData)
        break
      case 'delivery':
        carState.delivery = processDeliveryData(fieldData)
        break
      case 'other':
        processOtherData(fieldData)
        break
      case 'showBlocks':
        processShowBlocksData(fieldData)
        break
    }
  }

  // saveCarStateToLocalStorageForGoogleSheets(carState)
  loadConfigutation()
}

function gExel() {
  const sheetName = document.title

  const URL_GOOGLE_SHEET =
    'https://script.google.com/macros/s/AKfycbx4y_rXdz-EGRs2WbBDp5DmQ40wAMtAqcm9NW3Ki6c70dAy1-xj2T4I5a06gl6PkAUk/exec?sheetName='

  const app = URL_GOOGLE_SHEET + sheetName

  let xhr = new XMLHttpRequest()

  xhr.open('GET', app)
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return

    if (xhr.status == 200) {
      try {
        var r = JSON.parse(xhr.responseText)

        Google_DB = r['result']

        processDataFromExcel(Google_DB)
        initializeModels()
      } catch (e) {
        console.error('Ошибка при парсинге JSON:', e)
      }
    }
  }
  xhr.send()
}

document.addEventListener('DOMContentLoaded', () => {
  getCarStateFromLocalStorageForGoogleSheets()
})
