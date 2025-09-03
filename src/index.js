const captureInputData = () => {
  const inputField = document.getElementById('userInput')
  const button = document.getElementById('submitButton')
  const outputDiv = document.getElementById('output')

  const buttonClick = () => {
    const inputValue = inputField.value.trim()
    const proxy = 'https://api.allorigins.win/get?url='

    if (!inputValue) {
      outputDiv.textContent = 'Пожалуйста, введите URL адрес!'
      outputDiv.style.color = 'red'
      return
    }
    // https://lenta.ru/rss/news
    fetch(`${proxy}${encodeURIComponent(inputValue)}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error, status = ${response.status}`)
        }
        return response.json()
      })
      .then((dataXML) => {
        const objectDOM = new DOMParser().parseFromString(dataXML.contents, 'application/xml')
        outputDiv.textContent = objectDOM
      })

    inputField.value = ''
    inputField.focus()
  }

  button.addEventListener('click', buttonClick)

  inputField.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      buttonClick()
    }
  })
}

document.addEventListener('DOMContentLoaded', captureInputData)
