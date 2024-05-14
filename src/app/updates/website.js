// Первое  ОБНОВЛЕНИЕ САЙТА (КАРУСЕЛИ, АККОРДИОН, ШАПКА)

const updateWebsite = () => {
  cargetModels.style.display = 'flex'
  if (cargetModels.children.length <= 4) {
    cargetModels.style.flexWrap = 'nowrap'
  }
  if (cargetModels.children.length >= 5) {
    cargetModels.style.flexWrap = 'wrap'
  }

  // Сохраняем слайды
  savedSlides.colorCarousel = colorCarousel.swiper.slides
  savedSlides.colorImageCarousel = colorImageCarousel.swiper.slides
  savedSlides.diskDiametr = diskDiametr.swiper.slides
  savedSlides.diskImage = diskImage.swiper.slides
  savedSlides.colorSalon = colorSalon.swiper.slides
  savedSlides.salonImage = salonImage.swiper.slides

  //сохраняем объект стейта
  originalColorOptions = [...carState.options.color[2]]
  originalWheelsOptions = [...carState.options.wheels[2]]
  originalInteriorColorOptions = [...carState.options.interiorColor[2]]

  carState.options.runningBoards[0].forEach((option, index) => {
    const child = children[index]
    const checkbox = document.getElementById(child.id)
    const checkboxInput = checkbox.querySelector(`#${child.id}`)
    if (!option.check) {
      checkboxInput.checked = true
    }
  })

  //Вычисляем количество моделей для выравнивания
  const m = document.querySelectorAll('#carget-models .elementor-column').length
  let divisor
  if (m === 1) {
    divisor = 1
  } else if (m % 2 === 0) {
    divisor = 2
  } else {
    divisor = 3
  }
  document.querySelectorAll('#carget-models .elementor-column').forEach((e) => {
    e.style.width = `${96 / divisor}%`
  })

  // ПРОВЕРКА НА ДИСКИ TRUE FALSE
  if (carState.options.wheels[3] === true) {
    myArrowDiskImages = saveAllSlides(diskImage.swiper)

    updateCaruselDisk(`${carState.options.color[1]}-0`)
    // Другие операции с дисками или что угодно, что нужно выполнить, если wheels[3] === true
  } else if (
    carState.options.wheels[3] === false &&
    colorImageCarousel.swiper
  ) {
    myArrowDiskImages = saveAllSlides(colorImageCarousel.swiper)

    document.querySelectorAll(arrayWrappers[1]).forEach((e) => {
      e.style.display = 'none'
    })
  }

  checkDopOtionShow()

  closeAccordions()
  updateButtonState(carState)
  updateCheck(totalPrice)
  innerPriceHeader()
  innerPriceTitleModels()
  updateTitlePrice()
  myPDF()
}
