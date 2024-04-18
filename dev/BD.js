let Google_DB = {}

let carData = {}

let modelsArray = []

function innerGoogleBD() {
  // Проходимся по элементам Google_DB
  for (let i = 0; i < Google_DB.length; i++) {
    // Пропускаем первый элемент и проверяем наличие данных в текущем строковом массиве
    if (i === 0 || Google_DB[i].some((entry) => entry !== '')) {
      // Фильтруем пустые элементы и пропускаем первый элемент
      let filteredData = Google_DB[i].slice(1).filter((entry) => entry !== '')

      // Если есть данные в текущем строковом массиве
      if (filteredData.length > 0) {
        // Создаем объект для хранения данных текущей категории
        let categoryData = {}

        // Если текущая категория - модели
        if (Google_DB[i][0] === 'models') {
          // Проходимся по элементам данных и преобразуем строки в объекты
          for (let j = 0; j < filteredData.length; j++) {
            // Проверяем, является ли текущий элемент строкой
            if (typeof filteredData[j] === 'string') {
              // Удаляем лишние символы "{" и "}", а также лишние пробелы и разбиваем строку на ключ и значение
              let parts = filteredData[j]
                .replace('{', '')
                .replace('}', '')
                .trim()
                .split(':')
              // Если удалось разделить строку
              if (parts.length === 2) {
                // Извлекаем ключ и значение и добавляем данные в объект
                let key = parts[0].trim()
                let value = JSON.parse(parts[1].trim())
                categoryData[key] = value
              }
            }
          }
        } else {
          // Проходимся по элементам данных и парсим их в объекты
          for (let j = 0; j < filteredData.length; j++) {
            // Проверяем, является ли текущий элемент строкой
            if (typeof filteredData[j] === 'string') {
              // Разбиваем строку на ключ и значение по разделителю ":"
              let parts = filteredData[j].split(':')
              // Если удалось разделить строку
              if (parts.length === 2) {
                // Удаляем лишние пробелы в ключе и значении и добавляем данные в объект
                let key = parts[0].trim()
                let value = parts[1].trim()
                categoryData[key] = value
              }
            }
          }
        }

        // Добавляем данные текущей категории в объект carData
        carData[Google_DB[i][0]] = categoryData
      }
    }
  }

  // Выводим объект с данными в консоль
  console.log(carData)
}

function convertModelsData(modelsData) {
  // Проходимся по элементам массива данных о моделях, начиная с второго элемента
  for (let i = 1; i < modelsData.length; i++) {
    // Если текущий элемент не пустой
    if (modelsData[i]) {
      // Разделяем элемент на имя модели и данные о ней по символу '#'
      let [modelName, modelDataStr] = modelsData[i]
        .split('#')
        .map((str) => str.trim())

      // Инициализируем объект данных о модели
      let modelData = {}

      // Разделяем данные о модели на строки
      let modelDataLines = modelDataStr.split('\n')

      // Проходимся по каждой строке данных о модели
      modelDataLines.forEach((line) => {
        // Если строка не пустая
        if (line.trim() !== '') {
          // Разделяем строку на ключ и значение по символу ':'
          let [key, value] = line.split(':').map((str) => str.trim())
          // Если есть ключ и значение
          if (key && value) {
            // Приводим значение к числу, если это возможно
            value = !isNaN(value) ? parseFloat(value) : value
            // Добавляем пару ключ-значение к данным о модели
            modelData[key] = value
          }
        }
      })

      // Создаем объект модели для добавления в массив моделей
      let modelObject = { [modelName]: modelData }

      // Добавляем объект модели в массив моделей
      modelsArray.push(modelObject)
    }
  }

  return modelsArray
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
        console.log('result', Google_DB)
      } catch (e) {
        console.error('Error parsing JSON:', e)
      }
    }
  }
  xhr.send()
}
gExel()

let carState = {
  model: ['Zeekr 001 NEW', 'We'], // выбранная модель
  models: [
    // все модели, стоимости в юанях
    { We: { price: 269000, sale: 0 } },
    { We_4wd: { price: 269000, sale: 0 } },
    { Me: { price: 299000, sale: 0 } },
    { You: { price: 329000, sale: 0 } },
    { Zsport: { price: 279398, sale: 0 } },
  ],
  // ОПЦИИ
  options: {
    color: [
      0,
      'ХАКИ', // названия как в каруселях alt
      [
        {
          price: 0,
          sale: 78000,
          color: 'ХАКИ',
          show: false,
          models: ['We', 'We_4wd', 'Me', 'You'],
        },
        {
          price: 0,
          sale: 78000,
          color: 'ОРАНЖЕВЫЙ',
          show: false,
          models: ['We', 'We_4wd', 'Me', 'You', 'Zsport'],
        },
        {
          price: 0,
          sale: 78000,
          color: 'СИНИЙ',
          show: false,
          models: ['We', 'We_4wd', 'Me', 'You', 'Zsport'],
        },
        {
          price: 0,
          sale: 0,
          color: 'БЕЛЫЙ',
          show: false,
          models: ['We', 'We_4wd', 'Me', 'You'],
        },
        {
          price: 0,
          sale: 0,
          color: 'СЕРЫЙ',
          show: false,
          models: ['We', 'We_4wd', 'Me', 'You'],
        },
        {
          price: 0,
          sale: 0,
          color: 'ЧЕРНЫЙ',
          show: false,
          models: ['We', 'We_4wd', 'Me', 'You'],
        },
      ],
    ],
    // ВЫБОР КОЛЕСА
    wheels: [
      0,
      '21” DOUBLE STAR',
      [
        {
          color: '21” DOUBLE STAR',
          diametr: 21,
          price: 0,
          sale: 208000,
          show: false,
          models: ['We', 'We_4wd', 'Me', 'You', 'Zsport'],
        },
        {
          color: '21” ARC PHANTOM',
          diametr: 21,
          price: 0,
          sale: 208000,
          show: false,
          models: ['We', 'We_4wd', 'Me', 'You'],
        },
        {
          color: '22” MULTI SPOKE SPORT',
          diametr: 22,
          price: 260000,
          sale: 0,
          models: ['We', 'We_4wd', 'Me', 'You'],
        },
      ],
      true,
    ],
    // ВЫБОР ЦВЕТА САЛОНА
    interiorColor: [
      0,
      'СЕРЫЙ', // названия как в каруселях alt
      [
        {
          price: 0,
          sale: 0,
          color: 'СЕРЫЙ',
          show: false,
          models: ['We', 'We_4wd', 'Me', 'You'],
        },
        {
          price: 0,
          sale: 0,
          color: 'СЕРЫЙ С СИНЕЙ ПОЛОСОЙ',
          show: false,
          models: ['We', 'We_4wd', 'Me', 'You'],
        },
        {
          price: 0,
          sale: 0,
          color: 'БЕЖЕВЫЙ-СИНИЙ',
          show: false,
          models: ['We', 'We_4wd', 'Me', 'You'],
        },
        {
          price: 0,
          sale: 0,
          color: 'ЗЕЛЁНЫЙ',
          show: false,
          models: ['We', 'We_4wd', 'Me', 'You'],
        },
        {
          price: 0,
          sale: 0,
          color: 'СЕРЫЙ-ОРАНЖЕВЫЙ',
          show: false,
          models: ['Zsport'],
        },
      ],
    ],
    // ВЫБОР ДОПОЛНИТЕЛЬНОЙ ОПЦИИ
    runningBoards: [
      [
        // перечисления опций
        {
          price: 364000,
          sale: 0,
          show: false,
          check: true,
          title: 'ПНЕВМАТИЧЕСКАЯ ПОДВЕСКА',
          description:
            'Высота кузова меняется в диапазоне 117-200 мм, гибко адаптируясь к различным дорожным условиям',
          models: ['We', 'We_4wd'],
        },

        {
          price: 208000,
          sale: 0,
          show: false,
          check: true,
          title: 'ПАНОРАМНАЯ КРЫША ИЗ ЭЛЕКТРОХРОМНОГО СТЕКЛА ',
          description:
            'Цвет и рисунок стекла может варьироваться. Защита от ультрафиолета 99%',
          models: ['We', 'We_4wd', 'Me'],
        },

        {
          price: 208000,
          sale: 0,
          show: false,
          check: true,
          title: '4 СЕНСОРНЫЕ АВТОМАТИЧЕСКИЕ ДВЕРИ',
          description:
            'С ДАТЧИКАМИ ПРЕПЯТСТВИЙ И ЗАДНЯЯ ИНДУКЦИОННАЯ ДВЕРЬ С ПАМЯТЬЮ',
          models: ['We', 'We_4wd', 'Me'],
        },

        {
          price: 65000,
          sale: 0,
          show: false,
          check: true,
          title: '15.6 ДЮЙМОВЫЙ ПЛАВАЮЩИЙ ДИСПЛЕЙ',
          description: 'С интеллектуальным поворотным механизмом',
          models: ['We', 'We_4wd', 'Me'],
        },

        {
          price: 91000,
          sale: 0,
          show: false,
          check: true,
          title: 'ФАРКОП',
          description: 'Максимальная масса буксируемого прицепа 2 тонны',
          models: ['All'],
        },

        {
          price: 26000,
          sale: 0,
          show: false,
          check: true,
          title: 'КРЫША ЧЕРНОГО ЦВЕТА ',
          description: '',
          models: ['All'],
        },

        {
          price: 166400,
          sale: 0,
          show: true,
          check: false,
          title: 'ДОМАШНЯЯ ЗАРЯДКА 20 КВТ',
          description: 'ПРОВОД 30 МЕТРОВ',
          models: ['All'],
        },

        {
          price: 78000,
          sale: 0,
          show: true,
          check: false,
          title: 'ДОМАШНЯЯ ЗАРЯДКА 7 КВТ',
          description: 'ПРОВОД 30 МЕТРОВ',
          models: ['All'],
        },
      ],
      true, // если надо СКРЫТЬ то ставим false
    ],
  },
  delivery: {
    fromTurgartToBishkek: 1200, // Стоимость доставки из Тургарт в Бишкек в долларах
    customs: 4500, // Стоимость таможни в долларах
    otherExpenses: 1400, // Прочие расходы в долларах
    fromBishkekToRussia: 1200, // Стоимость доставки из Бишкека в РФ в долларах
  },
  labFees: 45000, // Стоимость лаборатории (СБКТС и ЭПТС) в рублях
  recyclingFee: 32600, // Стоимость утилизационного сбора в рублях
  carLocalization: 0, // Стоимость руссификации авто в рублях
  marga: [10, 2, 22], // Маржа в процентах (5%, 1.5%, 28%)
}
