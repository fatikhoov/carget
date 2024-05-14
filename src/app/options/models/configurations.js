// РАБОТА  С МОДЕЛЯМИ
// ---- НОВЫЙ МЕТОД --------

// Определение функции select
function select(selector) {
  return document.querySelectorAll(selector)
}

/**
 * Получение ID элемента на основе имени модели.
 * @param {string} name - Имя модели.
 * @param {string} prefix - Префикс ID (по умолчанию 'accordion-car-model-').
 * @returns {string} - ID элемента.
 */
function getElementId(name, prefix = 'accordion-car-model-') {
  const id = `${prefix}${name.toLowerCase()}`
  return id
}

/**
 * Создание объекта с элементами для модели.
 * @param {string} modelName - Название модели.
 * @param {object} modelInfo - Информация о модели.
 * @returns {object} - Объект с элементами для модели.
 */
function createModelElement(modelName, modelInfo) {
  const lowercaseName = modelName.toLowerCase()
  const elements = {
    model: select(`.${getElementId(lowercaseName)}`),
    acc: select(`.${getElementId(lowercaseName)} h4`),
    mobileButton: select(`.car-${lowercaseName}-mobile`),
    accordionItem: select(
      `.${getElementId(lowercaseName)} .elementor-tab-title`
    ),
  }
  return elements
}

/**
 * Определение элементов для каждой модели.
 * @param {array} models - Массив объектов с информацией о моделях.
 * @returns {object} - Объект с элементами для каждой модели.
 */
function defineModelElements(models) {
  const elements = {}
  models.forEach((model) => {
    const modelName = Object.keys(model)[0]
    elements[modelName] = createModelElement(modelName, model[modelName])
  })
  return elements
}

// СОЗДАНИЕ ЭЛЕМЕНТОВ - ПРАЙС В МОДЕЛИ
const createDivPriceModel = (modelName) => {
  const divPriceModel = document.createElement('div')
  divPriceModel.className = `car${modelName}Model` // Используем динамический класс
  divPriceModel.id = `carmodel-price-${modelName.toLowerCase()}`
  return divPriceModel
}
// ЗАКРЫТОЕ ПОЛОЖЕНИЕ АККОРДИОНОВ
async function closeAccordions() {
  modelNames.forEach((e) => {
    modelElements[e].accordionItem[0].click()
  })
}
// СОЗДАЕМ ЦЕНУ АККОРДИОНАМ
const innerPriceTitleModels = () => {
  // ЗАПИСЬ СТОИМОСТИ В ЗАГОЛОВКИ АККАРДИОНА
  // СКИДКА модели комплектации
  modelNames.forEach((modelName, index) => {
    divPriceModels[modelName].innerHTML = `
              <div style="display:flex;flex-direction:column; gap: 8px;">
              ${
                carState.models[index][modelName].sale !== 0 &&
                carState.models[index][modelName].sale
                  ? `<span style="font-size:16; font-weight:300"><del style="color: white;">${carState.models[index][modelName].sale} руб.</del></span>`
                  : ''
              }
              <span style="font-weight:700;">${numberWithSpaces(
                myPriceModels[index]
              )} руб.</span>
              </div>
          `
  })

  modelNames.forEach((modelName, index) => {
    const price = numberWithSpaces(myPriceModels[index])
    modelElements[modelName].acc.forEach((element) => {
      element.innerHTML = `
            <div style="display:flex;flex-direction:column; gap: 8px;">
              ${
                carState.models[index][modelName].sale !== 0 &&
                carState.models[index][modelName].sale
                  ? `<span style="font-size:20px; font-weight:300"><del  style="color: white;">${carState.models[index][modelName].sale} руб.</del></span>`
                  : ''
              }
              <span style="font-weight:700;">${price} руб.</span>
            </div>
          `
    })

    modelElements[modelName].accordionItem[0].appendChild(
      divPriceModels[modelName]
    )
  })
}
// Обновление кнопок
function createAndAttachButtonClickHandler(modelName) {
  const buttons = document.querySelectorAll(
    `.car-${modelName.toLowerCase()}-mobile`
  )

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      carState.model[1] = `${modelName}`
      updateButtonState(carState)
      removeShowDopOptions()

      updateCheck()
    })
  })
}

// Функция обновления состояния кнопок моделей
function updateButtonState(carState) {
  modelNames.forEach((modelName) => {
    const isSelected = carState.model[1] === `${modelName}`
    const buttons = document.querySelectorAll(
      `.car-${modelName.toLowerCase()}-mobile`
    )

    buttons.forEach((button) => {
      const buttonTextElement = button.querySelector('.elementor-button-text')
      const elementorButton = button.querySelector('.elementor-button')

      button.style.cursor = 'pointer'
      button.style.borderRadius = '3px'

      if (isSelected) {
        // Если выбрано, измените фон и цвет текста
        button.style.backgroundColor = '#fff'
        elementorButton ? (elementorButton.style.backgroundColor = '#fff') : ''
        buttonTextElement.style.color = '#000'
        updateOptions(modelName)
      } else {
        // Если не выбрано, восстановите стандартные стили
        button.style.backgroundColor = '#DB2424'
        elementorButton
          ? (elementorButton.style.backgroundColor = '#DB2424')
          : ''
        buttonTextElement.style.color = '#fff'
      }

      buttonTextElement.textContent = isSelected ? 'ВЫБРАНО' : 'ВЫБРАТЬ'
    })
  })
}
export {
  select,
  getElementId,
  createModelElement,
  defineModelElements,
  createDivPriceModel,
  closeAccordions,
  innerPriceTitleModels,
  createAndAttachButtonClickHandler,
  updateButtonState,
}
