document.addEventListener('DOMContentLoaded', async (event) => {
  if (colorCarousel && colorCarousel.swiper) {
    colorCarousel.swiper.params.centeredSlides = true
    colorCarousel.swiper.params.slideToClickedSlide = true
    colorCarousel.swiper.update()

    colorCarousel.swiper.on('activeIndexChange', async (e) => {
      // Проверьте, не выполняется ли уже обновление карусели
      if (isUpdatingCarousel) {
        return
      }

      try {
        // Установите флаг блокировки
        isUpdatingCarousel = true

        const currentColor = indexOption('color', e.realIndex, 'index').color
        const currentPrice = indexOption('color', e.realIndex, 'index').price

        carState.options.color[0] = currentPrice
        carState.options.color[1] = currentColor

        colorImageCarousel.swiper.slideTo(e.realIndex + 1, 400)
          ? console.log('true')
          : colorImageCarousel.swiper.slideTo(e.realIndex + 2, 400)
        if (carState.options.wheels[3] === true) {
          await updateCaruselDisk(`${currentColor}-${indexDisk}`)
        }
        updateTitlePrice()

        isUpdatingCarousel = false
      } catch (error) {
        console.error('Error in diskDiametr activeIndexChange event:', error)
        isUpdatingCarousel = false
      }
    })
  }

  if (colorImageCarousel && colorImageCarousel.swiper) {
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
        updateCaruselDisk(
          `${indexOption('color', e.realIndex, 'index').color}-0`
        )
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
  }
})

const colorCarousel = document
  .getElementById('carget-acordion-color')
  .querySelector('.swiper')
const colorImageCarousel = document
  .getElementById('carget-acordion-color-image')
  .querySelector('.swiper')
