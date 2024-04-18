 

// КАРУСЕЛИ НА НУЖНЫЙ СЛАЙД ОБНОВЛЕНИЯ
async function updateCaruselDisk(dc) {
  diskImage.swiper.enable()
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
  // Проверяем существование объекта diskDiametr и его свойства swiper
  if (diskDiametr) {
    // Вызываем метод slideTo для объекта diskDiametr.swiper
    diskDiametr.swiper.slideTo(diskDiametr.swiper.params.slidesPerView, 400)
    diskDiametr.swiper.update()
  }

  // Проверяем существование объекта diskImage и его свойства swiper
  if (diskImage) {
    // Вызываем метод slideTo и update для объекта diskImage.swiper
    diskImage.swiper.slideTo(1, 0)
    diskImage.swiper.update()
  }

  diskDiametr.querySelectorAll('.elementor-swiper-button').forEach((e) => {
    if (diskDiametr.swiper.slides.length <= 1) {
      e.style.display = 'none'
    } else {
      e.style.display = 'inline-flex'
    }
  })
  diskImage.swiper.disable()
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
const updateTitlePrice = async () => {
  for (const option in arrayTitlePrice) {
    const selector = arrayTitlePrice[option]
    const optionSelect = carState.options[option][2].find(
      (obj) => obj.color === carState.options[option][1]
    )
    document.querySelector(selector).innerHTML = `
        <div style="display:flex;flex-direction:column;">
            <span style="font-weight:700;">${carState.options[option][1]}</span>
            ${
              optionSelect && optionSelect.sale !== undefined
                ? `<span style="font-weight:700;  display: flex; justify-content: center; gap: 8px;">${carState.options[option][0]} руб. <del style="text-decoration-color:#D10000; font-weight:300;">${optionSelect.sale} руб.</del></span>`
                : `<span>${carState.options[option][0]} руб.</span>`
            }
        </div>`
  }

  // Проверка состояния колес и наличия diskImage
  if (carState.options.wheels[3] === true && diskImage) {
    // ФОТО АВТО В ЧЕК
    myDiskImage = diskImage.querySelector('.swiper-slide-active')
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

  if (
    salonImage &&
    salonImage.swiper &&
    salonImage.querySelector('.swiper-slide-active img')
  ) {
    arrayImagesForPDF[2] = salonImage.querySelector(
      '.swiper-slide-active img'
    )?.src
  } else if (
    salonImage &&
    salonImage.swiper &&
    salonImage.querySelector('.swiper-slide img')
  ) {
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
 
  
console.log('Загрузка ...')
  