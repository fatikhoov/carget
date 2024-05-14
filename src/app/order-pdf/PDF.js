const myPDF = async () => {
  const image1 = await loadImageAsDataURL(data5[0].img)
  const image2 = await loadImageAsDataURL(data5[1].img)
  const image3 = await loadImageAsDataURL(data5[2].img)
  const image4 = await loadImageAsDataURL(data5[3].img)

  const data = [
    { label: 'МОДЕЛЬ:', value: carState.model[0] },
    { label: 'КОМПЛЕКТАЦИЯ:', value: carState.model[1] },
    { label: 'ГОД ВЫПУСКА:', value: new Date().getFullYear() },
    { label: 'ЦВЕТ КУЗОВА:', value: carState.options.color[1] },
    {
      label: 'ДИСКИ:',
      value: `${carState.options.wheels[2][indexDisk].color}`,
    },
    { label: 'ЦВЕТ САЛОНА:', value: carState.options.interiorColor[1] },
  ]

  const totalCarPrice = roundNumberToNChars(
    sumCarPrices(carState, myPriceModels),
    4
  )

  const data2 = [
    saleAll && saleAll !== 0
      ? {
          label: 'СУММАРНАЯ СКИДКА:',
          value: `${saleAll} руб.`,
        }
      : '',
    {
      label:
        saleAll && saleAll !== 0
          ? 'ИТОГОВАЯ СТОИМОСТЬ\nс учетом скидки:'
          : 'ИТОГОВАЯ СТОИМОСТЬ',
      value: `${numberWithSpaces(totalCarPrice)} руб.`,
    },
    {
      label: 'СТОИМОСТЬ Б/Н БЕЗ НДС:',
      value: `${numberWithSpaces(
        calculateWithPercentage(totalCarPrice, carState.marga) + 40000
      )} руб.`,
    },
    {
      label: 'СТОИМОСТЬ Б/Н С НДС 20%:',
      value: `${numberWithSpaces(
        calculateWithPercentage(totalCarPrice, carState.marga) + 40000
      )} руб.`,
    },
    { label: 'СРОК ПОСТАВКИ:', value: '45-60 ДНЕЙ' },
  ]

  // Ваш массив данных
  const runningBoards = carState.options.runningBoards[0]
  // Вывод доп опций
  const filteredLabels = runningBoards.filter((label) => label.show)
  const optionsText = filteredLabels.map((label) => label.title).join(', ')

  // Получаем списки с классами accordion-ul-items-complect и accordion-ul-items-description
  const complectList = modelElements[
    carState.model[1]
  ].model[0].querySelectorAll('.accordion-ul-items-complect li')
  const descriptionList = modelElements[
    carState.model[1]
  ].model[0].querySelectorAll('.accordion-ul-items-description li')

  // Функция для извлечения текста из элементов списка и создания массива данных
  function extractTextFromList(list) {
    return Array.from(list).map((item) => {
      const text = item.innerHTML.trim()
      const cleanedText = text
        .replace(/<[^>]*>/g, '') // Удаляем все HTML-теги и их содержимое
        .replace(/\n+/g, ' ') // Заменяем все переносы строк на пробелы
        .replace(/\s+/g, ' ') // Заменяем последовательности пробелов на одиночные пробелы
      return cleanedText.trim() // Удаляем пробелы в начале и конце строки
    })
  }

  // Извлекаем текст из списков
  const complectData = extractTextFromList(complectList)
  const descriptionData = extractTextFromList(descriptionList)

  const tableBodycomplectData = complectData.map((item) => [
    {
      text: item,
      alignment: 'left',
      fontSize: 10,
      margin: [0, 0, 0, 8],
    },
  ])
  const tableBodydescriptionData = descriptionData.map((item) => [
    {
      text: item,
      alignment: 'left',
      fontSize: 10,
      margin: [0, 0, 0, 8],
    },
  ])
  const tableBody = data.map(({ label, value }) => [
    {
      text: label,
      alignment: 'left',
      border: [0, 0, 0, 0],
      fontSize: 10,
      margin: [2, 4, 2, 4],
    },
    {
      text: value,
      alignment: 'left',
      border: [0, 0, 0, 0],
      margin: [-16, 4, 2, 4],
      fontSize: 10,
      bold: true,
    },
  ])
  const tableBody2 = data2.map(({ label, value }) => [
    {
      text: label,
      alignment: 'left',
      border: [0, 0, 0, 0],
      fontSize: 10,
      margin: [0, 0, -64, 0],
    },
    {
      text: value,
      alignment: 'left',
      border: [0, 0, 0, 0],
      fontSize: 10,
      bold: true,
      margin: [40, 0, 0, 0],
    },
  ])

  var pdfContent = {
    defaultFileName: `${carState.model[0]} ${carState.model[1]}.pdf`,
    pageOrientation: 'portrait',
    pageSize: {
      width: 600,
      height: 1000,
    },
    pageMargins: [32, 64, 32, 64],
    info: {
      title: `${carState.model[0]} ${carState.model[1]}`,
      author: 'CARGET',
      keywords: ['CARGET', `${carState.model[0]} ${carState.model[1]}`],
    },
    header: {
      columns: [
        {
          image: await loadImageAsDataURL(arrayImagesForPDF[0]),
          width: 196,
          height: 40,
          margin: [16, 16, 0, 0],
        },
        {
          text: 'CARGET.SU\nГ. МОСКВА, УЛ. КУЛАКОВА Д.20 К1, ОФ.213\nООО «ВОСТОКИМПОРТ»',
          alignment: 'right',
          margin: [0, 16, 16, 0],
          height: 40,
          fontSize: 10,
        },
      ],
    },
    footer: {
      columns: [
        { text: 'CARGET.SU', alignment: 'left' },
        { text: 'ООО «ВОСТОКИМПОРТ»', alignment: 'center' },
        { text: '+7 996 410-01-87', alignment: 'right' },
      ],
      margin: [16, 16, 16, 16],
    },
    content: [
      {
        canvas: [
          {
            type: 'rect',
            x: -16,
            y: 0,
            w: 563, // Ширина прямоугольника (можете настроить под ваш макет)
            h: 0.5, // Высота прямоугольника (толщина линии)
            color: '#000000', // Цвет черной полосы
          },
        ],
      },
      {
        text: 'КОММЕРЧЕСКОЕ ПРЕДЛОЖЕНИЕ',
        fontSize: 22,
        alignment: 'center',
        margin: [32, 32, 32, 8],
        bold: true,
      },
      {
        text: `${carState.model[0]} ${carState.model[1]}`,
        fontSize: 18,
        margin: [0, 0, 0, 8],

        alignment: 'center',
        bold: true,
      },
      {
        text: 'Предлагаем Вам рассмотреть возможность приобретения данного автомобиля.\nС комплектацией, стоимостью и условиями Вы можете ознакомиться ниже',
        fontSize: 10,
        margin: [0, 8, 0, 32],
        alignment: 'left',
      },

      // КАРТОЧКИ - ЧЕК

      {
        columns: [
          {
            margin: [0, 0, 0, 0],
            table: {
              widths: [120, 120],
              body: tableBody,
            },
          },
          {
            margin: [0, 0, 0, 0],
            table: {
              widths: ['*', '*'],
              marginTop: -100,
              body: [
                [
                  {
                    text: 'ДОП. ОПЦИИ:',
                    alignment: 'left',
                    border: [0, 0, 0, 0],
                    fontSize: 9,
                    margin: [4, 4, 0, 4],
                  },
                  {
                    border: [0, 0, 0, 0],
                    text: '',
                  },
                ],
                [
                  {
                    text: '',
                    alignment: 'left',
                    border: [0, 0, 0, 0],
                    fontSize: 9,
                    margin: [4, 4, 4, 4],
                  },
                  {
                    fontSize: 10,
                    border: [0, 0, 0, 0],
                    stack:
                      optionsText !== ''
                        ? [{ text: optionsText, border: [0, 0, 0, 0] }]
                        : [{ text: 'Нет', border: [0, 0, 0, 0] }],
                    margin: [-130, 0, 4, 4],
                  },
                ],
                ...tableBody2,
                [
                  {
                    text: '',
                    border: [0, 0, 0, 0],
                    margin: [0, 26, 0, 0],
                  },
                  {
                    text: '*Стоимость растаможенного автомобиля по ставкам ЕАЭС под ключ в Москве, включающая все возможные затраты.',
                    border: [0, 0, 0, 0],
                    fontSize: 8,
                    margin: [-132, 16, 16, 0],
                  },
                ],
              ],
            },
          },
        ],
      },

      // ФОТО АВТО И САЛОНА
      {
        image: await loadImageAsDataURLWithLogging(arrayImagesForPDF[1]),
        width: 400,
        margin: [0, 32, 0, 0],
        alignment: 'center',
      },
      {
        image: await loadImageAsDataURLWithLogging(arrayImagesForPDF[2]),
        width: 340,
        margin: [0, 16, 0, 0],
        alignment: 'center',
        pageBreak: 'after',
      },

      {
        text: `КОМПЛЕКТАЦИЯ - ${carState.model[0]} ${carState.model[1]}`,
        margin: [0, 32, 0, 16],
        fontSize: 16,
        bold: true,
      },
      { ul: tableBodycomplectData, margin: [0, 0, 0, 16] },
      { ul: tableBodydescriptionData, margin: [0, 0, 0, 16] },
      {
        text: 'ПОЧЕМУ СТОИТ ВЫБРАТЬ CARGET?',
        margin: [0, 32, 0, 16],
        fontSize: 16,
        bold: true,
      },
      { ul: tableBody4 },
      {
        margin: [0, 32, 0, 32],
        canvas: [
          {
            type: 'rect',
            x: -16,
            y: 0,
            w: 563, // Ширина прямоугольника (можете настроить под ваш макет)
            h: 0.5, // Высота прямоугольника (толщина линии)
            color: '#000000', // Цвет черной полосы
          },
        ],
      },
      {
        text: 'ПО ВСЕМ ИНТЕРЕСУЮЩИМ ВОПРОСАМ\nБУДЕМ РАДЫ ВАМ ОТВЕТИТЬ:',
        margin: [0, 0, 0, 16],
        fontSize: 16,
        bold: true,
      },
      {
        columns: [
          [
            {
              image: image1,
              width: 24,
              height: 24,
              margin: [0, 0, 0, 16],
            },
            {
              text: data5[0].contact,
              alignment: 'left',
              fontSize: 12,
              margin: [32, -36, 0, 16],
            },
          ],
          [
            {
              image: image2,
              width: 24,
              height: 24,
              margin: [0, 0, 0, 16],
            },
            {
              text: data5[1].contact,
              alignment: 'left',
              fontSize: 12,
              margin: [32, -36, 0, 16],
            },
          ],
          [
            {
              image: image3,
              width: 24,
              height: 24,
              margin: [0, 0, 0, 16],
            },
            {
              text: data5[2].contact,
              alignment: 'left',
              fontSize: 12,
              margin: [32, -36, 0, 16],
            },
          ],
          [
            {
              image: image4,
              width: 24,
              height: 24,
              margin: [0, 0, 0, 16],
            },
            {
              text: data5[3].contact,
              alignment: 'left',
              fontSize: 12,
              margin: [32, -36, 0, 16],
            },
          ],
        ],
      },
    ],
    styles: {
      header: {
        fontSize: 14,
        color: '#222222',
        bold: false,
      },
    },
  }

  // Создайте PDF
  pdfDoc = pdfMake.createPdf(pdfContent)
}

export { myPDF }
