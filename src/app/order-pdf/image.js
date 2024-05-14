// Функция для установки содержимого изображения в чек и обновления массива изображений для PDF
async function updateImages(imageElement) {
  if (!imageElement) return
  const imgElement = imageElement.querySelector('img')
  if (!imgElement) return
  const src = imgElement.getAttribute('src')
  if (!src) return

  arrayImagesForPDF[1] = src
  checkImages[0].innerHTML = myDiskImage.outerHTML
}

async function loadImageAsDataURLWithLogging(imagePath) {
  try {
    const imageDataURL = await loadImageAsDataURL(imagePath)
    return imageDataURL
  } catch (error) {
    console.error('Error loading image:', error)
    throw error
  }
}
// Функция для преобразования изображения в Data URL
async function loadImageAsDataURL(imagePath) {
  // Проверяем, является ли переданный путь уже Data URL
  if (!imagePath || imagePath.startsWith('data:image')) {
    return imagePath // Если это пустое значение или Data URL, возвращаем его без изменений
  }
  try {
    const response = await fetch(imagePath)
    if (!response.ok) {
      throw new Error('Failed to fetch image')
    }

    let blob = await response.blob() // Изменили const на let
    const reader = new FileReader()

    // Проверяем, является ли тип изображения WebP или PNG
    const isWebP = blob.type === 'image/webp'

    if (isWebP) {
      // Если изображение в формате WebP или PNG, конвертируем его в другой формат
      const image = new Image()
      image.src = URL.createObjectURL(blob)
      await image.decode() // Дожидаемся загрузки изображения
      const canvas = document.createElement('canvas')
      canvas.width = image.width
      canvas.height = image.height
      const context = canvas.getContext('2d')
      context.drawImage(image, 0, 0)
      const convertedBlob = await new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Failed to convert image'))
          }
          resolve(blob)
        }) // Если изображение в формате PNG, конвертируем его в JPEG
      })

      blob = convertedBlob // Изменили присвоение значения константе
    }

    return new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  } catch (error) {
    throw new Error('Error loading image as Data URL: ' + error.message)
  }
}

export { updateImages, loadImageAsDataURLWithLogging, loadImageAsDataURL }
