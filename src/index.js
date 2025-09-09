import parseRSS from './parser.js'
import {
  addFeed,
  addPosts,
  setError,
  clearError,
  setLoading,
  isDuplicateFeed,
} from './stateHelpers.js'
import { renderFeeds, renderPosts, renderError } from './render.js'
import isValidUrl from './utils/isValidUrl.js'

const decodeBase64 = (base64Content) => {
  const binary = atob(base64Content)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return new TextDecoder('utf-8').decode(bytes)
}

const captureInputData = () => {
  const inputField = document.getElementById('userInput')
  const button = document.getElementById('submitButton')
  const feedContainer = document.getElementById('feed-list')
  const postContainer = document.getElementById('post-list')
  const outputDiv = document.getElementById('output')
  const proxy = 'https://api.allorigins.win/get?url='

  const buttonClick = () => {
    const url = inputField.value.trim()

    if (!url) {
      setError('Пожалуйста, введите URL адрес!')
      renderError(outputDiv)
      return
    }

    if (!isValidUrl(url)) {
      setError('Некорректный URL')
      renderError(outputDiv)
      return
    }

    if (isDuplicateFeed(url)) {
      setError('Фид с таким URL уже существует')
      renderError(outputDiv)
      return
    }

    clearError()
    setLoading(true)
    renderError(outputDiv)

    fetch(`${proxy}${encodeURIComponent(url)}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error, status = ${res.status}`)
        return res.json()
      })
      .then((data) => {
        const base64Content = data.contents.split('base64,')[1]
        const decoded = decodeBase64(base64Content)
        const newsArray = parseRSS(decoded)

        if (newsArray.length === 0) setError('Нет постов для этого фида')

        const feed = addFeed(url, url)
        if (feed) addPosts(feed.id, newsArray)

        renderFeeds(feedContainer)
        renderPosts(postContainer)
        renderError(outputDiv)
      })
      .catch(() => {
        setError('Не удалось загрузить фид. Проверьте URL и доступность ресурса.')
        renderError(outputDiv)
      })
      .finally(() => setLoading(false))

    inputField.value = ''
    inputField.focus()
  }

  button.addEventListener('click', buttonClick)
  inputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') buttonClick()
  })
}

document.addEventListener('DOMContentLoaded', captureInputData)
export { captureInputData }
