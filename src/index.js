import parseRSS from './parser.js'

const decodeBase64 = (base64Content) => {
  const binary = atob(base64Content)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return new TextDecoder('utf-8').decode(bytes)
}

const renderNewsList = (newsArray, outputDiv) => {
  outputDiv.innerHTML = ''
  const ul = document.createElement('ul')
  newsArray.forEach(({ title, link }) => {
    const li = document.createElement('li')
    const a = document.createElement('a')
    a.href = link
    a.textContent = title
    a.target = '_blank'
    li.appendChild(a)
    ul.appendChild(li)
  })
  outputDiv.appendChild(ul)
}

const captureInputData = () => {
  const inputField = document.getElementById('userInput')
  const button = document.getElementById('submitButton')
  const outputDiv = document.getElementById('output')
  const proxy = 'https://api.allorigins.win/get?url='

  const buttonClick = () => {
    const inputValue = inputField.value.trim()
    if (!inputValue) {
      outputDiv.textContent = 'Пожалуйста, введите URL адрес!'
      outputDiv.style.color = 'red'
      return
    }

    fetch(`${proxy}${encodeURIComponent(inputValue)}`)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error, status = ${response.status}`)
        return response.json()
      })
      .then((dataXML) => {
        const base64Content = dataXML.contents.split('base64,')[1]
        const decoded = decodeBase64(base64Content)
        const newsArray = parseRSS(decoded)
        renderNewsList(newsArray, outputDiv)
      })
      .catch((error) => {
        outputDiv.textContent = `Ошибка: ${error.message}`
        outputDiv.style.color = 'red'
      })

    inputField.value = ''
    inputField.focus()
  }

  button.addEventListener('click', buttonClick)
  inputField.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') buttonClick()
  })
}

document.addEventListener('DOMContentLoaded', captureInputData)
