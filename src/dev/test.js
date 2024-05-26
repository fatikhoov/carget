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
  let addedDiskImageSlides = new Set()

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
    updateCarouselDisk(`${carState.options.color[1]}-0`, 'checkWheels')
    processSlidesWheelsSalon(
      diskImage.swiper,
      savedSlides.diskImage,
      addedDiskImageSlides,
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
  areAllSlidesWithSameAlt(diskImage) ? removeDuplicateSlides(diskImage) : ''
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

  return true
}

// КАРУСЕЛИ НА НУЖНЫЙ СЛАЙД ОБНОВЛЕНИЯ
async function updateCaruselDisk(dc, where) {
  if (diskDiametr.swiper) {
    let consoleValue = { dc: dc, where: where }
    customConsoleLog(
      'updateCaruselDisk',
      consoleValue,
      'background: blue; color: white;',
      'font-weight: bold;'
    )

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

    // дополнительные операции...
    carState.options.wheels[0] = indexOption('wheels', 0, 'index').price
    carState.options.wheels[1] = indexOption('wheels', 0, 'index').color
    // Проверяем существование объекта diskDiametr и его свойства swiper
    if (diskDiametr.swiper) {
      // Вызываем метод slideTo для объекта diskDiametr.swiper
      diskDiametr.swiper.slideTo(diskDiametr.swiper.params.slidesPerView, 400)
      diskDiametr.swiper.update()
      diskImage.swiper.update()
    }

    diskDiametr.querySelectorAll('.elementor-swiper-button').forEach((e) => {
      if (diskDiametr.swiper.slides.length <= 1) {
        e.style.display = 'none'
      } else {
        e.style.display = 'inline-flex'
      }
    })

    // await compareAndSlide()
    updateTitlePrice('updateCaruselDisk')
  }
}

const compareAndSlide = async () => {
  let attempts = 0
  const maxAttempts = 10

  do {
    console.log('compareAndSlide work')
    TEST3 = ''
    TEST4 = ''

    // Находим TESTы
    carState.options.wheels[2].forEach((e) => {
      const activeSlideImg = diskDiametr.querySelector(
        '.swiper-slide-active img'
      )
      if (activeSlideImg && e.color === activeSlideImg.alt) {
        TEST3 = `${carState.options.color[1]}-${e.index}`
      }
    })

    const activeDiskImg = diskImage.querySelector('.swiper-slide-active img')
    if (activeDiskImg) {
      TEST4 = activeDiskImg.alt
    }

    // Проверка на совпадения
    if (TEST3 !== TEST4) {
      console.log(`Проверка совпадения нет: TEST3 = ${TEST3}, TEST4 = ${TEST4}`)
      await diskImage.swiper.slideNext()
      await new Promise((resolve) => setTimeout(resolve, 100))
      attempts++
    }
  } while (TEST3 !== TEST4 && attempts < maxAttempts)

  if (TEST3 === TEST4) {
    console.log(`Совпадение найдено: TEST3 = ${TEST3}, TEST4 = ${TEST4}`)
    diskImage.swiper.disable()
    return true
  } else {
    console.warn('Достигнут предел попыток, совпадение не найдено.')
    return false
  }
}

// Проверка на существование diskDiametr.swiper
if (diskDiametr && diskDiametr.swiper) {
  diskDiametr.swiper.params.centeredSlides = true

  diskDiametr.swiper.params.slideToClickedSlide = true
  // Обновляем swiper
  diskDiametr.swiper.update()

  diskDiametr.swiper.on('activeIndexChange', async (e) => {
    diskImage.swiper.enable()

    /* if (isUpdatingCarousel) {
        return
      }*/

    try {
      // isUpdatingCarousel = true

      const currentColor = indexOption('wheels', e.realIndex, 'index')
        ? indexOption('wheels', e.realIndex, 'index').color
        : ''
      const currentPrice = indexOption('wheels', e.realIndex, 'index')
        ? indexOption('wheels', e.realIndex, 'index').price
        : ''
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

      if (slideIndex !== -1 && diskDiametr.swiper) {
        carState.options.wheels[0] = currentPrice
        carState.options.wheels[1] = currentColor

        //  await compareAndSlide()

        await diskImage.swiper.slideTo(e.realIndex + 1, 400)
        await compareAndSlide()
        await updateTitlePrice('diskDiametr.swiper.on')
      }

      // isUpdatingCarousel = false
    } catch (error) {
      console.error('Error in diskDiametr activeIndexChange event:', error)
      // isUpdatingCarousel = false
    }
  })
}
