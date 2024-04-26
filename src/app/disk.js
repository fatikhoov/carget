const diskDiametr = document
  .getElementById('carget-acordion-disk')
  .querySelector('.swiper')
const diskImage = document
  .getElementById('carget-acordion-disk-image')
  .querySelector('.swiper')

document.addEventListener('DOMContentLoaded', async (event) => {
  if (diskDiametr && diskDiametr.swiper) {
    diskDiametr.swiper.params.centeredSlides = true
    diskDiametr.swiper.params.slideToClickedSlide = true
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
})

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
  // Проверяем существование объекта diskDiametr и его свойства swiper
  if (diskDiametr) {
    // Вызываем метод slideTo для объекта diskDiametr.swiper
    diskDiametr.swiper.slideTo(2, 0)
  }

  // Проверяем существование объекта diskImage и его свойства swiper
  if (diskImage) {
    // Вызываем метод slideTo и update для объекта diskImage.swiper
    diskImage.swiper.slideTo(1, 0)
    diskImage.swiper.update()
  }

  updateTitlePrice()
}
