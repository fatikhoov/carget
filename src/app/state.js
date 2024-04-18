let savedSlides = {}
let originalColorOptions = {}
let originalWheelsOptions = {}
let originalInteriorColorOptions = {}
let previousModel = null
// ..... импорты ..... //

let saleAll = 0
let pdfDoc
let totalPrice = 0
let indexDisk = 0
let myArrowDiskImages
let myDiskImage, mySalonImage
let isUpdatingCarousel = false
let arrayImagesForPDF = [
  'https://carget.su/wp-content/uploads/2023/11/carget-logo.jpg',
  'https://carget.su/wp-content/uploads/2023/11/carget-logo.jpg',
  'https://carget.su/wp-content/uploads/2023/11/carget-logo.jpg',
]
const arrayTitlePrice = {
  color: '#carget-acordion-color-price span',
  wheels: '#carget-acordion-wheels-price span',
  interiorColor: '#carget-acordion-interiorColor-price span',
}

const arrayWrappers = [
  '.carget-color',
  '.carget-wheels',
  '.carget-interiorColor',
  '.carget-runningBoards',
]

// ЦЕНА В ШАПКЕ
const totalpriceElements = document.querySelectorAll('.header-totalprice')

// ЧЕКБОКСЫ ---------------------------------------- //
const checkbox = document.getElementById('myCheckbox')
const checkboxLabel = document.querySelector('.custom-checkbox-label')
const checkboxSpan = document.getElementById('custom-checkbox-span')

// ЧЕК --------------------------------------- //
const checkImages = document.querySelectorAll('.check-list-image')
const discountCheck = document.getElementById('check-list-items-discount')
const priceItemDiscount = document.getElementById('price-items-discount')
// Выбираем все элементы с классами для цвета, салона, дисков и дополнительных опций
const colorKuzovaElements = document.querySelectorAll('.check-color')
const colorSalonaElements = document.querySelectorAll('.check-color-salon')
const diskElements = document.querySelectorAll('.check-disk')
const dopOptionsElements = document.querySelector('.check-dop-option')
const totalPriceCarElements = document.querySelectorAll('.total-price-car')
const totalSaleCarElements = document.querySelectorAll('.total-discount')

// Вставляем стоимости
const priceColorElements = document.querySelectorAll('.check-color-price')
const priceColorSalonElements = document.querySelectorAll(
  '.check-color-salon-price'
)
const priceDiskElements = document.querySelectorAll('.check-disk-price')
const priceDopOptionsElements = document.querySelector(
  '.check-dop-option-price'
)

// Получаем элементы ВСЕХ каруселей
const colorCarousel = document
  .getElementById('carget-acordion-color')
  .querySelector('.swiper')
const colorImageCarousel = document
  .getElementById('carget-acordion-color-image')
  .querySelector('.swiper')
const diskDiametr = document
  .getElementById('carget-acordion-disk')
  .querySelector('.swiper')
const diskImage = document
  .getElementById('carget-acordion-disk-image')
  .querySelector('.swiper')
const colorSalon = document
  .getElementById('carget-acordion-salon')
  .querySelector('.swiper')
const salonImage = document
  .getElementById('carget-acordion-salon-color')
  .querySelector('.swiper')

const loader = document.getElementById('header-loader')
const cargetLoader = document.getElementById('carget-loader')

const data4 = [
  'Работаем за свои средства',
  'Белая и прозрачная структура договоров',
  'Официальные оплаты по счетам',
  'Быстрый возврат средств клиенту в случае нарушения условий договора',
  'Исключены таможенные риски',
  'Большой парк электромобилей в наличии в Москве',
  'Русификация авто и техническая поддержка',
]
const data5 = [
  {
    img: 'https://carget.su/wp-content/uploads/2023/11/phone-icon.png',
    contact: '+7 996 410-01-87',
  },
  {
    img: 'https://carget.su/wp-content/uploads/2023/11/whatsapp-icon.png',
    contact: '+7 996 410-01-87',
  },
  {
    img: 'https://carget.su/wp-content/uploads/2023/11/telegram-icon.png',
    contact: '+7 996 410-01-87',
  },
  {
    img: 'https://carget.su/wp-content/uploads/2023/11/email-icon.png',
    contact: 'carget@bk.ru',
  },
]

const tableBody4 = data4.map((item) => [
  {
    text: item,
    alignment: 'left',
    fontSize: 10,
    margin: [0, 0, 0, 8],
  },
])
