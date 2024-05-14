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

  // дополнительные операции...
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
    diskImage.swiper.slideTo(0, 0)
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

export { updateCaruselDisk }
