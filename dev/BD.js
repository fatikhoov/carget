const carState = {
  model: ['AVATR 11', '90kwh_awd'], //выбранная модель
  models: [
    // все модели, стоимости в юанях
    {
      '90kwh_awd': {
        price: 325000,
        sale: 0,
      },
    },
    {
      '116kwh_awd': {
        price: 360000,
        sale: 0,
      },
    },
    {
      '90kwh_luxury_edition': {
        price: 350000,
        sale: 0,
      },
    },
    {
      '116kwh_luxury_edition': {
        price: 390000,
        sale: 0,
      },
    },
  ],
  // ОПЦИИ
  options: {
    // ВЫБОР ЦВЕТА КУЗОВА
    color: [
      0,
      'СЕРЫЙ', // названия как в каруселях alt
      [
        { price: 0, sale: 0, color: 'СЕРЫЙ' },
        { price: 130000, sale: 0, color: 'СЕРЫЙ МАТОВЫЙ' },
        { price: 78000, sale: 0, color: 'ЧЕРНЫЙ' },
        { price: 0, sale: 0, color: 'БЕЛЫЙ' },
        { price: 130000, sale: 0, color: 'БЕЛЫЙ МАТОВЫЙ' },
        { price: 78000, sale: 0, color: 'АКВА' },
      ],
    ],
    // ВЫБОР КОЛЕСА
    wheels: [
      0,
      '21” LOW WIND', // названия как в каруселях alt
      [
        {
          color: '21” LOW WIND', // названия как в каруселях alt
          diametr: 21,
          price: 0,
          sale: 0,
        },
        {
          color: '21” AIR', // названия как в каруселях alt
          diametr: 21,
          price: 26000,
          sale: 0,
        },
        {
          color: '22” ROTARY С СУППОРТАМИ BREMBO', // названия как в каруселях alt
          diametr: 21,
          price: 169000,
          sale: 0,
        },
        {
          color: '22” BEAM C СУППОРТАМИ BREMBO', // названия как в каруселях alt
          diametr: 21,
          price: 195000,
          sale: 0,
        },
      ],
      true, // если надо СКРЫТЬ то ставим false
    ],
    // ВЫБОР ЦВЕТА САЛОНА
    interiorColor: [
      0,
      'БОРДОВЫЙ', // названия как в каруселях alt
      [
        { price: 0, sale: 0, color: 'БОРДОВЫЙ' },
        { price: 0, sale: 0, color: 'ТЕМНО-СЕРЫЙ' },
        { price: 0, sale: 0, color: 'СВЕТЛО-СЕРЫЙ' },
      ],
    ],
    // ВЫБОР ДОПОЛНИТЕЛЬНОЙ ОПЦИИ
    runningBoards: [
      [
        // перечисления опций
        {
          price: 65000, //ЦЕНА
          sale: 0,
          show: false, //ВЫБОР ПО УМОЛЧАНИЮ
          title: 'HALO SCREEN ',
          description: 'Светодиодный матричный дисплей в верхней части капота ',
          models: ['90kwhawd', '116kwhawd', '90kwhluxuryedition'],
        },
        {
          price: 39000,
          sale: 0,
          show: false,
          title: 'ИНТЕЛЛЕКТУАЛЬНАЯ СИСТЕМА АРОМАТИЗАЦИИ САЛОНА',
          description: 'Встроенные 3 аромата с регулируемой концентрацией',
          models: ['All'],
        },
        {
          price: 325000,
          sale: 0,
          show: false,
          title: 'VIP пакет (4 места)',
          description:
            'вентиляция/массаж/обогрев всех сидений автомобиля, многофункциональные подлокотники на задних сиденьях, кнопка boss, беспроводная зарядка для мобильных телефонов сзади, экран HALO, эффекты окружающего освещения, заднее защитное стекло',
          models: ['90kwhawd', '116kwhawd', '90kwhluxuryedition'],
        },
      ],
      true, // если надо СКРЫТЬ то ставим false
    ],
  },
  delivery: {
    fromTurgartToBishkek: 1100, // Стоимость доставки из Тургарт в Бишкек в долларах
    customs: 4500, // Стоимость таможни в долларах
    otherExpenses: 1400, // Прочие расходы в долларах
    fromBishkekToRussia: 1300, // Стоимость доставки из Бишкека в РФ в долларах
  },
  labFees: 45000, // Стоимость лаборатории (СБКТС и ЭПТС) в рублях
  recyclingFee: 32600, // Стоимость утилизационного сбора в рублях
  carLocalization: 0, // Стоимость руссификации авто в рублях
  marga: [7, 1.5, 21.5], // Маржа в процентах (5%, 1.5%, 28%)
}

colorCarousel.querySelector('.swiper-slide.swiper-slide-active')
