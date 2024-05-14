//функции прослушиватели
const handleColorCarouselChange = async (e) => {
  colorCarousel.swiper.params.centeredSlides = true
  colorCarousel.swiper.params.slideToClickedSlide = true
  colorCarousel.swiper.update()
  if (isUpdatingCarousel) {
    return
  }

  try {
    colorImageCarousel.swiper.enable()
    // Установите флаг блокировки
    isUpdatingCarousel = true
    let currentColor, currentPrice

    //здесь была прокрутка на 2 слайда
    if (colorImageCarousel.swiper.slideTo(e.realIndex + 1, 400)) {
      colorImageCarousel.swiper.slideTo(e.realIndex + 1, 400)
      const index = carState.options.color[2].length <= 1 ? 0 : e.realIndex
      currentColor = await indexOption('color', index, 'index').color
      currentPrice = await indexOption('color', index, 'index').price
    } else {
      colorImageCarousel.swiper.slideTo(e.realIndex + 2, 400)
      const index = carState.options.color[2].length <= 1 ? 0 : e.realIndex + 1
      currentColor = await indexOption('color', index, 'index').color
      currentPrice = await indexOption('color', index, 'index').price
    }

    carState.options.color[0] = currentPrice
    carState.options.color[1] = currentColor
    updateCaruselDisk(`${currentColor}-0`)
    // сменил цвет кузова отработал смену диска и салона
    updateOptions(carState.model[1])

    isUpdatingCarousel = false
    colorCarousel.querySelectorAll('.elementor-swiper-button').forEach((e) => {
      if (colorCarousel.swiper.slides.length <= 1) {
        e.style.display = 'none'
      } else {
        e.style.display = 'inline-flex'
      }
    })
    colorImageCarousel.swiper.disable()
  } catch (error) {
    console.error('Error in handleColorCarouselChange event:', error)
    isUpdatingCarousel = false
  }
}
const handleColorImageCarouselChange = async (e) => {
  colorCarousel.swiper.params.slideToClickedSlide = true
  colorCarousel.swiper.update()

  // Проверяем, не выполняется ли уже обновление карусели
  if (isUpdatingCarousel) {
    return
  }
  // Устанавливаем флаг блокировки
  isUpdatingCarousel = true

  carState.options.color[0] = carState.options.color[2][e.realIndex].price
  carState.options.color[1] = indexColor(e.realIndex, 'index')

  if (carState.options.wheels[3] === true) {
    updateCaruselDisk(
      `${
        carState.options.color[2].length <= 1
          ? indexOption('color', 0, 'index').color
          : indexOption('color', e.realIndex, 'index').color
      }-0`
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

  // Сбрасываем флаг после завершения обновления карусели
  isUpdatingCarousel = false
}

export { handleColorCarouselChange, handleColorImageCarouselChange }
