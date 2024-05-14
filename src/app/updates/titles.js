// СКИДКА заголовки параметров
const updateTitlePrice = async () => {
  for (const option in arrayTitlePrice) {
    const selector = arrayTitlePrice[option]
    const optionSelect = carState.options[option][2].find(
      (obj) => obj.color === carState.options[option][1]
    )
    document.querySelector(selector).innerHTML = `
          <div style="display:flex;flex-direction:column;">
              <span style="font-weight:700;">${
                carState.options[option][1]
              }</span>
              ${
                optionSelect && optionSelect.sale !== undefined
                  ? `<span style="font-weight:700;  display: flex; justify-content: center; gap: 8px;">${carState.options[option][0]} руб. <del style="text-decoration-color:#D10000; font-weight:300;">${optionSelect.sale} руб.</del></span>`
                  : `<span>${carState.options[option][0]} руб.</span>`
              }
          </div>`
  }

  // Проверка состояния колес и наличия diskImage
  if (carState.options.wheels[3] === true && diskImage) {
    // ФОТО АВТО В ЧЕК
    myDiskImage = diskImage.querySelector('.swiper-slide-active')
    if (myDiskImage) {
      // Копируем src изображения перед обновлением массива
      await updateImages(myDiskImage)
    }
  } else if (carState.options.wheels[3] === false && colorImageCarousel) {
    myDiskImage = colorImageCarousel.querySelector('.swiper-slide-active')
    if (myDiskImage) {
      // Копируем src изображения перед обновлением массива
      await updateImages(myDiskImage)
    }
  } else {
    myDiskImage = colorImageCarousel.querySelector('.swiper-slide')
    // Копируем src изображения перед обновлением массива
    await updateImages(myDiskImage)
  }

  if (
    salonImage &&
    salonImage.swiper &&
    salonImage.querySelector('.swiper-slide-active img')
  ) {
    arrayImagesForPDF[2] = salonImage.querySelector(
      '.swiper-slide-active img'
    )?.src
  } else if (
    salonImage &&
    salonImage.swiper &&
    salonImage.querySelector('.swiper-slide img')
  ) {
    arrayImagesForPDF[2] = salonImage.querySelector('.swiper-slide img')?.src
  }

  updateCheck()
}

const innerPriceHeader = () => {
  // ЗАПИСЬ В ШАПКУ ТОТАЛ ПРАЙС
  totalpriceElements.forEach((e) => {
    e.innerHTML = numberWithSpaces(totalPrice)
  })
}
