function processDataFromExcel(data) {
  // Обработка данных о моделях
  function processModelsData(modelsData) {
    let modelsArray = []

    for (let i = 0; i < modelsData.length; i++) {
      if (modelsData[i]) {
        let modelInfo = modelsData[i].split('#')
        let modelName = modelInfo[0].trim()
        let priceAndSale = modelInfo[1].match(/\d+/g)
        let show = /"show"\s*:\s*(\w+)/.exec(modelInfo[1])
        if (show) {
          show = show[1].trim().toLowerCase() === 'true'
        } else {
          show = false
        }
        // Проверяем, показывать ли модель
        if (show) {
          let modelObject = {}
          modelObject[modelName] = {
            price: parseInt(priceAndSale[0]),
            sale: parseInt(priceAndSale[1]),
            show: show,
          }
          modelsArray.push(modelObject)
        }
      }
    }
    carState.models = modelsArray
    carState.model[0] = document.title
    carState.model[1] = Object.keys(carState.models[0])[0]

    // Получаем все модели из carState.models
    modelNames = carState.models.map((model) => Object.keys(model)[0])
    // Определяем элементы для каждой модели
    modelElements = defineModelElements(carState.models)
    modelNames.forEach((modelName) => {
      divPriceModels[modelName] = createDivPriceModel(modelName)
    })
    return modelsArray
  }
  // Обработка цвет, диск, цвет
  function processData(data) {
    let processedData = []

    for (let i = 0; i < data.length; i++) {
      if (data[i]) {
        // Разбиваем строку на отдельные поля
        let info = data[i].split(/\r?\n/).filter(Boolean)

        // Создаем объект для хранения данных
        let obj = {}

        // Перебираем каждое поле и обрабатываем его
        info.forEach((field) => {
          let [key, value] = field.split(':')
          key = key.trim().replace(/["']/g, '') // Убираем лишние кавычки

          if (value !== undefined) {
            // Убеждаемся, что значение не пустое
            value = value ? value.trim().replace(/["']/g, '') : ''

            // Определяем, какое поле мы обрабатываем
            switch (key) {
              case 'price':
              case 'sale':
              case 'diametr':
                obj[key] = parseInt(value)
                break
              case 'color':
                obj.color = value
                break
              case 'show':
                obj.show = value === 'true'
                break
              case 'models':
                // Обрабатываем строку с моделями
                obj.models = value
                  .split(',')
                  .map((model) => model.trim().replace(/['"]/g, ''))
                break
              case 'colors':
                // Обрабатываем строку с цветами
                obj.colors = value
                  .split(',')
                  .map((color) => color.trim().replace(/['"]/g, ''))
                break
              default:
                console.error(`Неизвестный ключ: ${key}`)
                break
            }
          } else {
            console.error(
              `Значение не определено для ключа: ${key}`,
              value,
              field
            )
          }
        })

        // Проверяем, были ли добавлены какие-либо данные в объект
        if (Object.keys(obj).length > 0 && obj.show) {
          processedData.push(obj)
        }
      }
    }

    return processedData
  }
  // Обработка доп опций
  function processOptionsData(optionsData) {
    let processedOptions = []

    for (let i = 0; i < optionsData.length; i++) {
      if (optionsData[i]) {
        let optionInfo = optionsData[i].split('\n').filter(Boolean)
        let option = {}

        optionInfo.forEach((field) => {
          let [key, value] = field.split(':')
          key = key.trim().replace(/["']/g, '') // Убираем лишние кавычки

          // Убеждаемся, что значение не пустое
          value = value ? value.trim().replace(/["']/g, '') : ''

          switch (key) {
            case 'price':
            case 'sale':
              option[key] = parseInt(value)
              break
            case 'show':
            case 'check':
            case 'showOption':
              option[key] = value === 'true'
              break
            case 'title':
            case 'description':
              option[key] = value
              break
            case 'models':
              // Обрабатываем строку с моделями
              option.models = value
                .split(',')
                .map((model) => model.trim().replace(/['"]/g, ''))
              break
            default:
              console.error(`Неизвестный ключ: ${key}`)
              break
          }
        })

        // Проверяем, были ли добавлены какие-либо данные в объект и опция должна быть отображена
        if (Object.keys(option).length > 0 && option.showOption) {
          processedOptions.push(option)
        }
      }
    }

    return processedOptions
  }
  // обработка и запись показ./скрыть блок значений
  function updateOptionsInCarState(blocks) {
    for (let key in blocks) {
      if (blocks.hasOwnProperty(key)) {
        const optionKey = key
        if (carState.options.hasOwnProperty(optionKey)) {
          switch (optionKey) {
            case 'wheels':
            case 'interiorColor':
              carState.options[optionKey][3] = blocks[key]
              break
            case 'runningBoards':
              carState.options[optionKey][1] = blocks[key]
              break
            default:
              break
          }
        }
      }
    }
  }
  function processShowBlocksData(data) {
    const blocks = {}
    const lines = data[0].split('\n')
    lines.forEach((line) => {
      const [key, value] = line.split(':').map((item) => item.trim())
      blocks[key] = value === 'true'
    })

    updateOptionsInCarState(blocks)
  }
  // обработка доставки
  function processDeliveryData(data) {
    const delivery = {}
    const lines = data[0].split('\n')
    lines.forEach((line) => {
      const [key, value] = line.split(':').map((item) => item.trim())
      delivery[key] = parseInt(value) // Преобразуем значение в число, если это возможно
    })
    return delivery
  }
  // обработка остального
  function updateOtherInCarState(other) {
    for (let key in other) {
      if (other.hasOwnProperty(key)) {
        const optionKey = key
        if (carState.hasOwnProperty(optionKey)) {
          switch (optionKey) {
            case optionKey:
              carState[optionKey] = other[key]
              break
            default:
              break
          }
        }
      }
    }
  }
  function processOtherData(data) {
    const other = {}
    const lines = data[0].split('\n')
    lines.forEach((line) => {
      const [key, value] = line.split(':').map((item) => item.trim())
      other[key] = parseInt(value) // Преобразуем значение в число, если это возможно
    })
    updateOtherInCarState(other)
  }

  for (let i = 0; i < data.length; i++) {
    let fieldName = data[i][0]
    let fieldData = data[i].slice(1).filter(Boolean) // Удаляем пустые значения

    // В зависимости от имени поля обрабатываем данные по-разному
    switch (fieldName) {
      case 'models':
        processModelsData(fieldData)
        break
      case 'color':
        carState.options.color[2] = processData(fieldData)
        break
      case 'wheels':
        carState.options.wheels[2] = processData(fieldData)
        break
      case 'interiorColor':
        carState.options.interiorColor[2] = processData(fieldData)
        break
      case 'runningBoards':
        carState.options.runningBoards[0] = processOptionsData(fieldData)
        break
      case 'delivery':
        carState.delivery = processDeliveryData(fieldData)
        break
      case 'other':
        processOtherData(fieldData)
        break
      case 'showBlocks':
        processShowBlocksData(fieldData)
        break
    }
  }

  loadConfigutation()
}

function gExel() {
  const sheetName = document.title
  const URL_GOOGLE_SHEET =
    'https://script.google.com/macros/s/AKfycbzt3Vbt7jOPOLf5DdyMuBYaJj30_3rHubG_hkRog6EX574wBRkZIuLWB1wKefZtemR5/exec?sheetName='
  const app = URL_GOOGLE_SHEET + sheetName

  let xhr = new XMLHttpRequest()

  xhr.open('GET', app)
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return

    if (xhr.status == 200) {
      try {
        var r = JSON.parse(xhr.responseText)
        Google_DB = r['result']
        processDataFromExcel(Google_DB)
      } catch (e) {
        console.error('Error parsing JSON:', e)
      }
    }
  }
  xhr.send()
}
gExel()