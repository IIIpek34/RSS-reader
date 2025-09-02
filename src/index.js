const captureInputData = () => {
  const inputField = document.getElementById('userInput')
  const button = document.getElementById('submitButton')
  const outputDiv = document.getElementById('output')

  const buttonClick = () => {
    const inputValue = inputField.value.trim()

    if (!inputValue) {
      outputDiv.textContent = 'Пожалуйста, введите текст!'
      outputDiv.style.color = 'red'
      return
    }

    outputDiv.innerHTML = `
            <strong>Вы ввели:</strong> ${inputValue}
            <br><small>Длина текста: ${inputValue.length} символов</small>
        `
    outputDiv.style.color = 'green'

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
