document.addEventListener('DOMContentLoaded', async (event) => {
  if (colorSalon && colorSalon.swiper) {
    colorSalon.swiper.params.centeredSlides = true
    colorSalon.swiper.params.slideToClickedSlide = true
    colorSalon.swiper.update()

    colorSalon.swiper.on('activeIndexChange', async (e) => {
      // Проверьте, не выполняется ли уже обновление карусели
      if (isUpdatingCarousel) {
        return
      }

      try {
        // Установите флаг блокировки
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
          salonImage.swiper.slideTo(e.realIndex + 1, 400)
          updateTitlePrice()
        }
        isUpdatingCarousel = false
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
})

const colorSalon = document
  .getElementById('carget-acordion-salon')
  .querySelector('.swiper')
const salonImage = document
  .getElementById('carget-acordion-salon-color')
  .querySelector('.swiper')
