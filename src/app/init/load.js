async function loadConfigutation() {
  console.log('Загрузка ...')
  // Ожидаем, пока слайдер будет инициализирован
  const waitForSlider = (maxAttempts = 50, interval = 100) => {
    return new Promise((resolve, reject) => {
      let attempts = 0

      const checkSlider = () => {
        if (colorCarousel && colorCarousel.swiper) {
          console.log('Слайдер готов.')
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
            console.log(
              `Попытка ${attempts}: Слайдер ещё не готов, повторная проверка через ${interval}мс...`
            )
            setTimeout(checkSlider, interval)
          }
        }
      }

      checkSlider()
    })
  }
  try {
    await waitForSlider()
    console.log('Слайдер успешно инициализирован.')
    updateDopOptions()
    fetchCurrencyRates().then((data) => {
      updatedCarState = convertCarState(carState)
      if (updatedCarState) {
        myPriceModels = sumCarModelsPrices(updatedCarState)
      }
      if (myPriceModels) {
        sumCarPrices(updatedCarState, myPriceModels)
        updateWebsite()
        console.log('Сайт загружен и готов к работе')
        colorSalon.swiper.slideTo(0)
        myPDF()
        // Определение элементов каждой модели в аккордионах
        cargetLoader.style.display = 'none'
        loader.style.display = 'none'
      }
    })

    if (colorCarousel && colorCarousel.swiper) {
      colorCarousel.swiper.on('activeIndexChange', handleColorCarouselChange)
    }
    if (colorImageCarousel && colorImageCarousel.swiper) {
      colorImageCarousel.swiper.on(
        'activeIndexChange',
        handleColorImageCarouselChange
      )
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
        if (isUpdatingCarousel) {
          return
        }

        // Установите флаг блокировки
        try {
          salonImage.swiper.enable()
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
          let activeSlideAlt
          if (colorSalon.querySelector('.swiper-slide-active img')) {
            activeSlideAlt = colorSalon.querySelector(
              '.swiper-slide-active img'
            ).alt
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
          updateTitlePrice()
          isUpdatingCarousel = false
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
          isUpdatingCarousel = false
        }
      })
    }
    if (salonImage && salonImage.swiper) {
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
    }
    // Проверка на существование diskDiametr.swiper
    if (diskDiametr && diskDiametr.swiper) {
      diskDiametr.swiper.params.centeredSlides = true

      diskDiametr.swiper.params.slideToClickedSlide = true
      // Обновляем swiper
      diskDiametr.swiper.update()

      diskDiametr.swiper.on('activeIndexChange', async (e) => {
        if (isUpdatingCarousel) {
          return
        }

        try {
          isUpdatingCarousel = true

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
            diskImage.swiper.enable()
            diskImage.swiper.slideTo(e.realIndex + 1, 400)
            diskImage.swiper.disable()
            updateTitlePrice()
          }

          isUpdatingCarousel = false
        } catch (error) {
          console.error('Error in diskDiametr activeIndexChange event:', error)
          isUpdatingCarousel = false
        }
      })
    }
    if (diskImage && diskImage.swiper) {
      diskImage.swiper.on('activeIndexChange', async (e) => {
        if (isUpdatingCarousel) {
          return
        }

        try {
          isUpdatingCarousel = true

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
    }

    //обработкак скачивания PDF
    document.querySelectorAll('.generate-pdf').forEach((e) => {
      e.addEventListener('click', async function () {
        e.style.opacity = '0.4'
        e.style.pointerEvents = 'none'
        await myPDF()
        if (pdfDoc) {
          console.log('pdf download success', pdfDoc)
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

document.addEventListener('DOMContentLoaded', () => {
  getCarStateFromLocalStorageForGoogleSheets()
})
