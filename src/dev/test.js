async function updateOptions(selectedModel) {
  carState.options.color[1] === ''
    ? (selectedColor = carState.options.color[2][0].color)
    : (selectedColor = carState.options.color[1])

  //показать блок диски если есть слайды
  document.querySelectorAll(arrayWrappers[1]).forEach((e) => {
    if (diskDiametr.swiper.slides.length >= 1 && carState.options.wheels[3]) {
      e.style.display = 'block'
    }
  })

  const checkColor = () => {
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
        if (
          option.models.includes(selectedModel) ||
          option.models.includes('All')
        ) {
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
        if (
          option.models.includes(selectedModel) ||
          option.models.includes('All')
        ) {
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
      colorCarousel.swiper.update()
      colorImageCarousel.swiper.update()
    }
  }
  const checkWheels = () => {
    if (carState.options.wheels[2][0].models) {
      carState.options.wheels[2] = [...originalWheelsOptions]
      carState.options.wheels[2] = carState.options.wheels[2].filter(
        (option) =>
          (option.models.includes(selectedModel) ||
            option.models.includes('All')) &&
          (option.colors.includes(selectedColor) ||
            option.colors.includes('All'))
      )

      diskDiametr.swiper.removeAllSlides()
      let addedDiskDiametrSlides = []
      diskImage.swiper.removeAllSlides()
      let addedDiskImageSlides = []

      carState.options.wheels[2].forEach((option) => {
        if (
          (option.models.includes(selectedModel) ||
            option.models.includes('All')) &&
          (option.colors.includes(selectedColor) ||
            option.colors.includes('All'))
        ) {
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
        } else {
          console.log('нет совпадений совсем')
        }
      })
      carState.options.wheels[2].forEach((option) => {
        if (
          (option.models.includes(selectedModel) ||
            option.models.includes('All')) &&
          (option.colors.includes(selectedColor) ||
            option.colors.includes('All'))
        ) {
          const isSlideAlreadyAdded = addedDiskImageSlides.some((slide) =>
            slide.innerHTML.includes(`alt="${option.color}"`)
          )
          if (!isSlideAlreadyAdded) {
            const filteredDiskImageSlides = savedSlides.diskImage.filter(
              (slide) => slide.innerHTML.includes(`alt="${option.color}"`)
            )
            filteredDiskImageSlides.forEach((slide) => {
              diskImage.swiper.appendSlide(slide)
              addedDiskImageSlides.push(slide)
            })
          }
        } else {
          console.log('нет совпадений совсем')
        }
      })

      areAllSlidesWithSameAlt(diskDiametr)
        ? removeDuplicateSlides(diskDiametr)
        : ''
      areAllSlidesWithSameAlt(diskImage) ? removeDuplicateSlides(diskImage) : ''

      diskDiametr.swiper.update()
      diskImage.swiper.update()
    }
  }
  const checkSalon = () => {
    if (carState.options.interiorColor[2][0].models) {
      carState.options.interiorColor[2] = [...originalInteriorColorOptions]
      carState.options.interiorColor[2] =
        carState.options.interiorColor[2].filter(
          (option) =>
            (option.models.includes(selectedModel) ||
              option.models.includes('All')) &&
            (option.colors.includes(selectedColor) ||
              option.colors.includes('All'))
        )
      colorSalon.swiper.removeAllSlides()
      salonImage.swiper.removeAllSlides()
      let addedColorSalonSlides = []
      let addedSalonImageSlides = []

      carState.options.interiorColor[2].forEach((option) => {
        if (
          (option.models.includes(selectedModel) ||
            option.models.includes('All')) &&
          (option.colors.includes(selectedColor) ||
            option.colors.includes('All'))
        ) {
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
        } else {
          option.remove()
        }
      })
      carState.options.interiorColor[2].forEach((option) => {
        if (
          (option.models.includes(selectedModel) ||
            option.models.includes('All')) &&
          (option.colors.includes(selectedColor) ||
            option.colors.includes('All'))
        ) {
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
        } else {
          option.remove()
        }
      })

      areAllSlidesWithSameAlt(colorSalon)
        ? removeDuplicateSlides(colorSalon)
        : ''
      colorSalon.swiper.update()
      salonImage.swiper.update()
    }
  }

  if (selectedModel && selectedModel !== previousModel) {
    previousModel = selectedModel

    checkColor()
    carState.options.wheels[3] === true ? checkWheels() : ''
    checkSalon()

    //обновляю цвет кузова, заголовок и цену
    if (colorCarousel.swiper.slides.length > 1) {
      setTimeout(() => {
        colorCarousel.swiper.slideTo(colorCarousel.swiper.params.slidesPerView)
        colorCarousel.swiper.params.centeredSlides = true
        colorCarousel.swiper.params.slideToClickedSlide = true
        updateTitlePrice()
      }, 1000)
    } else if (colorCarousel.swiper.slides.length <= 1) {
      setTimeout(() => {
        carState.options.color[1] = colorCarousel.querySelector(
          '.swiper-slide-active img'
        ).alt
        updateTitlePrice()
      }, 1500)
    }
  } else {
    carState.options.wheels[3] === true ? checkWheels() : ''
    checkSalon()
  }

  //скрыть блок диски или оставить
  if (diskDiametr.swiper.slides.length > 1) {
    setTimeout(() => {
      diskDiametr.swiper.slideTo(diskDiametr.swiper.params.slidesPerView)
        ? diskDiametr.swiper.slideTo(diskDiametr.swiper.params.slidesPerView)
        : diskDiametr.swiper.slideNext()
      diskDiametr.swiper.params.centeredSlides = true
      diskDiametr.swiper.params.slideToClickedSlide = true
      diskDiametr.querySelectorAll('.elementor-swiper-button').forEach((e) => {
        e.style.display = 'inline-flex'
      })
    }, 1500)
  } else if (diskDiametr.swiper.slides.length <= 1) {
    setTimeout(() => {
      carState.options.wheels[1] = diskDiametr.querySelector(
        '.swiper-slide-active img'
      ).alt
      diskDiametr.querySelectorAll('.elementor-swiper-button').forEach((e) => {
        e.style.display = 'none'
      })
    }, 1500)
  }
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
  updateCaruselDisk(`${selectedColor}-0`)
  updateTitlePrice()
}
function removeDuplicateSlides(carouselElement) {
  console.log('Функция removeDuplicateSlides вызвана')
  console.log('Элемент карусели:', carouselElement)

  try {
    // Создаем Set для хранения уникальных значений alt
    const uniqueAlts = new Set()

    // Получаем все слайды карусели
    const slides = carouselElement.querySelectorAll('.swiper-slide')
    console.log('Найдено слайдов:', slides.length)

    // Проходимся по каждому слайду
    slides.forEach((slide, index) => {
      const imgElement = slide.querySelector('.swiper-slide-image')
      if (imgElement) {
        // Получаем значение атрибута alt изображения
        const alt = imgElement.getAttribute('alt')
        console.log(`Слайд ${index + 1}: alt="${alt}"`)

        // Если такого alt еще нет в Set, добавляем его
        if (!uniqueAlts.has(alt)) {
          uniqueAlts.add(alt)
          console.log(`alt="${alt}" добавлен в Set уникальных значений`)
        } else {
          // Если такой alt уже есть, удаляем текущий слайд из DOM
          slide.remove()
          console.log(`Слайд ${index + 1} с alt="${alt}" удален как дубликат`)
        }
      } else {
        console.warn(
          `Слайд ${
            index + 1
          } не содержит изображение с классом '.swiper-slide-image'`
        )
      }
    })

    console.log('Обработка слайдов завершена')
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
