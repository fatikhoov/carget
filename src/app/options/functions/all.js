//  СОХРАНЯЕМ СЛАЙДЫ АВТО ДИСКИ
function saveAllSlides(carousel) {
  const allSlides = []

  // Получите все слайды в карусели
  const slides = carousel.slides

  slides.forEach((slide) => {
    // Добавьте слайд в массив
    allSlides.push(slide)
  })

  return allSlides
}

const indexColor = (value, searchBy = 'color') => {
  if (searchBy === 'color') {
    const index = carState.options.color[2].findIndex((e) => e.color === value)
    return index
  } else if (searchBy === 'index') {
    if (value >= 0 && value < carState.options.color[2].length) {
      return carState.options.color[2][value].color
    }
  }
  return null
}
const indexOption = (property, value, searchBy = 'color') => {
  const option = carState.options[property]

  if (Array.isArray(option) && option.length > 2 && Array.isArray(option[2])) {
    if (searchBy === 'color') {
      const index = option[2].findIndex((e) => e.color === value)
      return index
    } else if (searchBy === 'index') {
      if (value >= 0 && value < option[2].length) {
        return option[2][value]
      }
    }
  }

  return null
}

export { saveAllSlides, indexColor, indexOption }
