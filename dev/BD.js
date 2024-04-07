const carState = {
  model: ['Zeekr 001 NEW', 'Performance'], // выбранная модель
  models: [
    // все модели, стоимости в юанях
    { We: { price: 269000, sale: 0 } },
    { We_4wd: { price: 269000, sale: 0 } },
    { Me: { price: 299000, sale: 0 } },
    { You: { price: 329000, sale: 0 } },
    {
      Performance: {
        price: 279398,
        sale: 0,
      },
    },
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
          models: ['We', 'We_4wd', 'Me', 'You'],
        },
        {
          price: 0,
          sale: 78000,
          color: 'СИНИЙ',
          show: false,
          models: ['We', 'We_4wd', 'Me', 'You'],
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
        {
          price: 0,
          sale: 0,
          color: 'ЖЕЛТЫЙ',
          show: false,
          models: ['Performance'],
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
          models: ['We', 'We_4wd', 'Me', 'You'],
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
        {
          color: '20” PERFORMANCE FORGED С СУППОРТАМИ АКЕБОНО',
          diametr: 21,
          show: false,
          price: 0,
          sale: 0,
          models: ['Performance'],
        },
      ],
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
          color: 'СЕРЫЙ-БЕЖЕВЫЙ',
          show: false,
          models: ['We', 'We_4wd', 'Me', 'You'],
        },
        {
          price: 0,
          sale: 0,
          color: 'СЕРЫЙ-ОРАНЖЕВЫЙ',
          show: false,
          models: ['Performance'],
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
          show: false, //ВЫБОР ПО УМОЛЧАНИЮ
          title: 'ПНЕВМАТИЧЕСКАЯ ПОДВЕСКА',
          description:
            'Высота кузова меняется в диапазоне 117-200 мм, гибко адаптируясь к различным дорожным условиям',
          models: ['We', 'We_4wd'],
        },

        {
          price: 208000,
          sale: 0,
          show: false, //ВЫБОР ПО УМОЛЧАНИЮ
          title: 'ПАНОРАМНАЯ КРЫША ИЗ ЭЛЕКТРОХРОМНОГО СТЕКЛА ',
          description:
            'Цвет и рисунок стекла может варьироваться. Защита от ультрафиолета 99%',
          models: ['We', 'We_4wd', 'Me'],
        },

        {
          price: 208000,
          sale: 0,
          show: false, //ВЫБОР ПО УМОЛЧАНИЮ
          title: '4 СЕНСОРНЫЕ АВТОМАТИЧЕСКИЕ ДВЕРИ',
          description:
            'С ДАТЧИКАМИ ПРЕПЯТСТВИЙ И ЗАДНЯЯ ИНДУКЦИОННАЯ ДВЕРЬ С ПАМЯТЬЮ',
          models: ['We', 'We_4wd', 'Me'],
        },

        {
          price: 65000,
          sale: 0,
          show: false, //ВЫБОР ПО УМОЛЧАНИЮ
          title: '15.6 ДЮЙМОВЫЙ ПЛАВАЮЩИЙ ДИСПЛЕЙ',
          description: 'С интеллектуальным поворотным механизмом',
          models: ['We', 'We_4wd', 'Me'],
        },

        {
          price: 91000,
          sale: 0,
          show: false, //ВЫБОР ПО УМОЛЧАНИЮ
          title: 'ФАРКОП',
          description: 'Максимальная масса буксируемого прицепа 2 тонны',
          models: ['All'],
        },

        {
          price: 26000,
          sale: 0,
          show: false,
          title: 'КРЫША ЧЕРНОГО ЦВЕТА ',
          description: '',
          models: ['All'],
        },

        {
          price: 455000,
          sale: 0,
          show: false,
          title: 'ПАКЕТ Z-SPORT',
          description:
            'Оранжевый кузов, спортивные кованые диски R22, серо-оранжевый салон из алькантары, адаптивные гоночные сиденья',
          models: ['You'],
        },

        {
          price: 166400,
          sale: 0,
          show: false,
          title: 'ДОМАШНЯЯ ЗАРЯДКА 20 КВТ',
          description: 'ПРОВОД 30 МЕТРОВ',
          models: ['All'],
        },

        {
          price: 78000,
          sale: 0,
          show: false,
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

async function updateOptions(selectedModel) {
  // Удаляем все текущие слайды
  colorCarousel.swiper.removeAllSlides()
  colorImageCarousel.swiper.removeAllSlides()

  // Проходим по каждой опции цвета кузова
  await carState.options.color[2].forEach((option) => {
    // Проверяем, если выбранная модель содержится в списке моделей данной опции
    if (option.models.includes(selectedModel)) {
      // Фильтруем сохраненные слайды по цвету
      const filteredSlides = savedSlides.colorCarousel.filter((slide) =>
        slide.innerHTML.includes((alt = option.color))
      )
      myTest = filteredSlides

      // Добавляем каждый найденный слайд в карусель
      filteredSlides.forEach((slide) => {
        colorCarousel.swiper.appendSlide(slide)
        colorCarousel.swiper.update()
      })
      carState.options.color[0] = option.price
      carState.options.color[1] = option.color
    }
  })

  await carState.options.color[2].forEach((option) => {
    // Проверяем, если выбранная модель содержится в списке моделей данной опции
    if (option.models.includes(selectedModel)) {
      // Фильтруем сохраненные слайды по цвету
      const filteredSlides = savedSlides.colorImageCarousel.filter((slide) =>
        slide.innerHTML.includes((alt = option.color))
      )

      // Добавляем каждый найденный слайд в карусель
      filteredSlides.forEach((slide) => {
        colorImageCarousel.swiper.appendSlide(slide)
        colorImageCarousel.swiper.update()
      })
    }
  })
}
