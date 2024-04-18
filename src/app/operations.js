
function roundNumberToNChars(number, n) {
    number = Math.ceil(number)
    if (typeof number !== 'number' || !Number.isInteger(number) || number < 0) {
      throw new Error('number должно быть положительным целым числом')
    }
  
    if (typeof n !== 'number' || !Number.isInteger(n) || n < 1) {
      throw new Error(
        'n должно быть положительным целым числом больше или равным 1'
      )
    }
  
    const multiplier = Math.pow(10, n - 1)
    const roundedNumber = Math.ceil(number / multiplier) * multiplier
  
    return roundedNumber
  }

// Функция для вычисления суммы с процентом без десятых
function calculateWithPercentage(sum, percentage) {
    return roundNumberToNChars(Math.ceil(sum * (1 + percentage / 100)), 4)
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

  
function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }
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
