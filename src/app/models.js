async function updateOptions(selectedModel) {
  if (selectedModel !== previousModel) {
    previousModel = selectedModel

    if (carState.options.color[2][0].models) {
      carState.options.color[2] = [...originalColorOptions]
      carState.options.color[2] = carState.options.color[2].filter((option) =>
        option.models.includes(selectedModel)
      )
      colorCarousel.swiper.removeAllSlides()
      colorImageCarousel.swiper.removeAllSlides()
      let addedColorSlides = []
      let addedColorImageSlides = []
      carState.options.color[2].forEach((option) => {
        if (option.models.includes(selectedModel)) {
          const isSlideAlreadyAdded = addedColorSlides.some((slide) =>
            slide.innerHTML.includes(`alt="${option.color}"`)
          )

          if (!isSlideAlreadyAdded) {
            const filteredColorSlides = savedSlides.colorCarousel.filter(
              (slide) => slide.innerHTML.includes(`alt="${option.color}"`)
            )

            filteredColorSlides.forEach((slide) => {
              colorCarousel.swiper.appendSlide(slide)
              addedColorSlides.push(slide)
            })
          }
        }
      })
      carState.options.color[2].forEach((option) => {
        if (option.models.includes(selectedModel)) {
          // Фильтруем сохраненные слайды по цвету для colorImageCarousel
          const filteredColorImageSlides =
            savedSlides.colorImageCarousel.filter((slide) =>
              slide.innerHTML.includes(`alt="${option.color}"`)
            )

          // Создаем объект для хранения уникальных значений alt
          const uniqueAlts = {}

          // Проходимся по каждому отфильтрованному слайду
          filteredColorImageSlides.forEach((slide) => {
            // Получаем значение атрибута alt изображения
            const alt = slide
              .querySelector('.swiper-slide-image')
              .getAttribute('alt')

            // Если такого alt еще нет в объекте uniqueAlts, добавляем его в объект
            if (!(alt in uniqueAlts)) {
              uniqueAlts[alt] = true // Используем значение true для указания на уникальность
            } else {
              // Если такой alt уже есть, удаляем текущий слайд из DOM
              slide.remove()
            }
          })

          // Перебираем отфильтрованные и отфильтрованные от дубликатов слайды и добавляем их в карусель
          filteredColorImageSlides.forEach((slide) => {
            // Проверяем, добавлен ли уже этот слайд
            if (!addedColorImageSlides.includes(slide)) {
              colorImageCarousel.swiper.appendSlide(slide)
              addedColorImageSlides.push(slide)
            }
          })
        }
      })
      areAllSlidesWithSameAlt(colorCarousel)
        ? removeDuplicateSlides(colorCarousel)
        : ''
      if (colorCarousel.swiper.slides.length > 1) {
        setTimeout(() => {
          // Обновляем все карусели
          colorCarousel.swiper.params.centeredSlides = true
          colorCarousel.swiper.params.slideToClickedSlide = true

          colorCarousel.swiper.slideTo(
            colorCarousel.swiper.params.slidesPerView
          )
        }, 1000)
      }
    }

    if (carState.options.wheels[2][0].models) {
      carState.options.wheels[2] = [...originalWheelsOptions]
      carState.options.wheels[2] = carState.options.wheels[2].filter((option) =>
        option.models.includes(selectedModel)
      )
      diskDiametr.swiper.removeAllSlides()
      let addedDiskDiametrSlides = []
      carState.options.wheels[2].forEach((option) => {
        if (option.models.includes(selectedModel)) {
          const isSlideAlreadyAdded = addedDiskDiametrSlides.some((slide) =>
            slide.innerHTML.includes(`alt="${option.color}"`)
          )
          if (!isSlideAlreadyAdded) {
            const filteredDiskDiametrSlides = savedSlides.diskDiametr.filter(
              (slide) => slide.innerHTML.includes(`alt="${option.color}"`)
            )
            filteredDiskDiametrSlides.forEach((slide) => {
              diskDiametr.swiper.appendSlide(slide)
              addedDiskDiametrSlides.push(slide)
            })

            updateCaruselDisk(option.color)
          }
        }
      })
      areAllSlidesWithSameAlt(diskDiametr)
        ? removeDuplicateSlides(diskDiametr)
        : ''
      if (diskDiametr.swiper.slides.length > 1) {
        diskDiametr.swiper.slideNext()
      }
    }

    if (carState.options.interiorColor[2][0].models) {
      carState.options.interiorColor[2] = [...originalInteriorColorOptions]
      carState.options.interiorColor[2] =
        carState.options.interiorColor[2].filter((option) =>
          option.models.includes(selectedModel)
        )
      colorSalon.swiper.removeAllSlides()
      salonImage.swiper.removeAllSlides()
      let addedColorSalonSlides = []
      let addedSalonImageSlides = []
      carState.options.interiorColor[2].forEach((option) => {
        if (option.models.includes(selectedModel)) {
          const isSlideAlreadyAdded = addedColorSalonSlides.some((slide) =>
            slide.innerHTML.includes(`alt="${option.color}"`)
          )
          if (!isSlideAlreadyAdded) {
            const filteredColorSalonSlides = savedSlides.colorSalon.filter(
              (slide) => slide.innerHTML.includes(`alt="${option.color}"`)
            )
            filteredColorSalonSlides.forEach((slide) => {
              colorSalon.swiper.appendSlide(slide)
              addedColorSalonSlides.push(slide)
            })
          }
        }
      })
      carState.options.interiorColor[2].forEach((option) => {
        if (option.models.includes(selectedModel)) {
          const isSlideAlreadyAdded = addedSalonImageSlides.some((slide) =>
            slide.innerHTML.includes(`alt="${option.color}"`)
          )

          if (!isSlideAlreadyAdded) {
            const filteredSalonImageSlides = savedSlides.salonImage.filter(
              (slide) => slide.innerHTML.includes(`alt="${option.color}"`)
            )

            filteredSalonImageSlides.forEach((slide) => {
              salonImage.swiper.appendSlide(slide)
              addedSalonImageSlides.push(slide)
            })
          }
        }
      })
      areAllSlidesWithSameAlt(colorSalon)
        ? removeDuplicateSlides(colorSalon)
        : ''
      areAllSlidesWithSameAlt(salonImage)
        ? removeDuplicateSlides(salonImage)
        : ''
      if (colorSalon.swiper.slides.length > 1) {
        colorSalon.swiper.slideTo(colorSalon.swiper.params.slidesPerView)
        colorSalon.swiper.params.centeredSlides = true
        colorSalon.swiper.params.slideToClickedSlide = true

        colorSalon.swiper.update()
        salonImage.swiper.update()
      }
    }

    colorCarousel.swiper.update()
    colorImageCarousel.swiper.update()
    diskDiametr.swiper.update()
    diskImage.swiper.update()
    colorSalon.swiper.update()
    salonImage.swiper.update()

    colorSalon.querySelectorAll('.elementor-swiper-button').forEach((e) => {
      if (colorSalon.swiper.slides.length <= 1) {
        e.style.display = 'none'
      } else {
        e.style.display = 'inline-flex'
      }
    })

    await updateTitlePrice()
  }
}
//удаляем дубликаты, если один элемент
function removeDuplicateSlides(carouselElement) {
  // Создаем объект для хранения уникальных значений alt
  const uniqueAlts = {}

  // Получаем все слайды карусели
  const slides = carouselElement.querySelectorAll('.swiper-slide')

  // Проходимся по каждому слайду
  slides.forEach((slide) => {
    // Получаем значение атрибута alt изображения
    const alt = slide.querySelector('.swiper-slide-image').getAttribute('alt')

    // Если такого alt еще нет в объекте uniqueAlts, добавляем его в объект
    if (!(alt in uniqueAlts)) {
      uniqueAlts[alt] = true // Используем значение true для указания на уникальность
    } else {
      // Если такой alt уже есть, удаляем текущий слайд из DOM
      slide.remove()
    }
  })
  console.log('123', uniqueAlts)
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

// Обнуление после выбора другой модели
// Получаем все модели из carState.models
const modelNames = carState.models.map((model) => Object.keys(model)[0])

// Создаем динамически divPriceModel для каждой модели
const divPriceModels = {}

// Определение функции select
function select(selector) {
  return document.querySelectorAll(selector)
}

function getElementId(name, prefix = 'accordion-car-model-') {
  const id = `${prefix}${name.toLowerCase()}`
  return id
}

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

//сколько в ряд блоков ставим комплектаций
const updateFlexWrapModelsContainer = () => {
  const cargetModels = document.querySelector(
    '#carget-models .elementor-container'
  )
  if (cargetModels.children.length <= 4) {
    cargetModels.style.flexWrap = 'nowrap'
  } else if (cargetModels.children.length > 4) {
    cargetModels.style.flexWrap = 'wrap'
  }
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

// Определяем элементы для каждой модели
const modelElements = defineModelElements(carState.models)
modelNames.forEach((modelName) => {
  divPriceModels[modelName] = createDivPriceModel(modelName)
})
