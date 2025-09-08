import { state } from '../src/state.js'
import { captureInputData } from '../src/index.js'

describe('Интеграционный тест index.js', () => {
  let input, button, output

  beforeEach(() => {
    document.body.innerHTML = `
      <input type="text" id="userInput" />
      <button id="submitButton">Выполнить</button>
      <div id="output"></div>
      <ul id="feed-list"></ul>
      <ul id="post-list"></ul>
    `
    input = document.getElementById('userInput')
    button = document.getElementById('submitButton')
    output = document.getElementById('output')

    state.feeds = []
    state.posts = []
    state.uiState.error = null
    state.uiState.loading = false

    captureInputData()
  })

  test('Показывает ошибку при пустом input', () => {
    input.value = ''
    button.click()
    expect(output.textContent).toBe('Пожалуйста, введите URL адрес!')
  })

  test('Показывает ошибку при некорректном URL', () => {
    input.value = 'htp://wrong'
    button.click()
    expect(output.textContent).toBe('Некорректный URL')
  })
})
