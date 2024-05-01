async function updateOptions(selectedModel) {
  carState.options.color[1] === ''
    ? (selectedColor = carState.options.color[2][0].color)
    : (selectedColor = carState.options.color[1])
  document.querySelectorAll(arrayWrappers[1]).forEach((e) => {
    if (diskDiametr.swiper.slides.length >= 1 && !carState.options.wheels[3]) {
      e.style.display = 'block'
    }
  })

  if (selectedModel && selectedModel !== previousModel) {
    previousModel = selectedModel

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
      await updateTitlePrice()
    }
    colorCarousel.swiper.update()
    colorImageCarousel.swiper.update()

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
      areAllSlidesWithSameAlt(diskDiametr)
        ? removeDuplicateSlides(diskDiametr)
        : ''

      if (diskDiametr.swiper.slides.length > 1) {
        document.querySelectorAll(arrayWrappers[1]).forEach((e) => {
          e.style.display = 'block'
        })
        diskDiametr.swiper.slideNext()
      } else {
        document.querySelectorAll(arrayWrappers[1]).forEach((e) => {
          e.style.display = 'none'
        })
      }
      await updateTitlePrice()
    }
    diskDiametr.swiper.update()
    diskImage.swiper.update()

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

      if (colorSalon.swiper.slides.length > 1) {
        setTimeout(() => {
          colorSalon.swiper.slideTo(colorSalon.swiper.params.slidesPerView)
          colorSalon.swiper.params.centeredSlides = true
          colorSalon.swiper.params.slideToClickedSlide = true
        }, 1500)
      }
      await updateTitlePrice()
    }
    colorSalon.swiper.update()
    salonImage.swiper.update()

    colorSalon.querySelectorAll('.elementor-swiper-button').forEach((e) => {
      if (colorSalon.swiper.slides.length <= 1) {
        e.style.display = 'none'
      } else {
        e.style.display = 'inline-flex'
      }
    })
  } else {
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
      diskImage.swiper.removeAllSlides()
      let addedDiskDiametrSlides = []
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
        }
      })

      areAllSlidesWithSameAlt(diskDiametr)
        ? removeDuplicateSlides(diskDiametr)
        : ''
      if (diskDiametr.swiper.slides.length > 1) {
        document.querySelectorAll(arrayWrappers[1]).forEach((e) => {
          e.style.display = 'block'
        })
        diskDiametr.swiper.slideNext()
      } else {
        document.querySelectorAll(arrayWrappers[1]).forEach((e) => {
          e.style.display = 'none'
        })
      }
      await updateTitlePrice()
    }
    diskDiametr.swiper.update()
    diskImage.swiper.update()

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
      setTimeout(() => {
        colorSalon.swiper.slideTo(colorSalon.swiper.params.slidesPerView)
          ? colorSalon.swiper.slideTo(colorSalon.swiper.params.slidesPerView)
          : colorSalon.swiper.slideTo(0)
        colorSalon.swiper.params.centeredSlides = true
        colorSalon.swiper.params.slideToClickedSlide = true
      }, 1500)
      await updateTitlePrice()
    }
    colorSalon.swiper.update()
    salonImage.swiper.update()

    colorSalon.querySelectorAll('.elementor-swiper-button').forEach((e) => {
      if (colorSalon.swiper.slides.length <= 1) {
        e.style.display = 'none'
      } else {
        e.style.display = 'inline-flex'
      }
    })
  }
}
