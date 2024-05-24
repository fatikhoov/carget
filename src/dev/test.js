const updateTitlePrice = async (where) => {
  console.log('ОТКУДА', where)

  arrayTitlePrice.forEach(async (selector, option) => {
    try {
      const option = carState.options[index]
      if (!option) return

      const price = option[0]
      const selectedColor = option[1]
      const colorOptions = option[2]

      const selectedOption = colorOptions.find(
        ({ color }) => color === selectedColor
      )

      console.log('TITLE', selectedColor)

      const element = document.querySelector(selector)
      if (element) {
        const saleHtml =
          selectedOption && selectedOption.sale !== undefined
            ? `<span style="font-weight:700; display: flex; justify-content: center; gap: 8px;">
               ${price} руб. <del style="text-decoration-color:#D10000; font-weight:300;">${selectedOption.sale} руб.</del>
             </span>`
            : `<span>${price} руб.</span>`

        element.innerHTML = `
          <div style="display:flex;flex-direction:column;">
            <span style="font-weight:700;">${
              selectedColor === selectedOption.color
                ? selectedColor
                : selectedOption.color
            }</span>
            ${saleHtml}
          </div>`
      }
    } catch (error) {
      console.error(`Error updating option ${option}:`, error)
    }
  })
}
