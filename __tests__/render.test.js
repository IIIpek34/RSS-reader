import { state } from '../src/state.js'
import { renderFeeds, renderPosts, renderError } from '../src/render.js'

describe('render.js', () => {
  let feedContainer
  let postContainer
  let errorContainer

  beforeEach(() => {
    feedContainer = document.createElement('ul')
    postContainer = document.createElement('ul')
    errorContainer = document.createElement('div')

    state.feeds = []
    state.posts = []
    state.uiState.error = null
  })

  describe('renderFeeds', () => {
    test('рендерит список фидов', () => {
      state.feeds = [
        { id: 1, title: 'Фид 1', url: 'https://example.com/feed1' },
        { id: 2, title: 'Фид 2', url: 'https://example.com/feed2' },
      ]

      renderFeeds(feedContainer)
      const items = feedContainer.querySelectorAll('li')
      expect(items).toHaveLength(2)
      expect(items[0].textContent).toBe('Фид 1')
      expect(items[1].textContent).toBe('Фид 2')
    })
  })

  describe('renderPosts', () => {
    test('рендерит список постов и кликабельные ссылки для модалки', () => {
      state.posts = [
        { id: 1, feedId: 1, title: 'Новость 1', link: 'https://example.com/news1' },
        { id: 2, feedId: 1, title: 'Новость 2', link: 'https://example.com/news2' },
      ]

      renderPosts(postContainer)
      const items = postContainer.querySelectorAll('li')
      expect(items).toHaveLength(2)

      const firstLink = items[0].querySelector('a')
      expect(firstLink.textContent).toBe('Новость 1')
      expect(firstLink.getAttribute('href')).toBe('#')

      const secondLink = items[1].querySelector('a')
      expect(secondLink.textContent).toBe('Новость 2')
      expect(secondLink.getAttribute('href')).toBe('#')
    })
  })

  describe('renderError', () => {
    test('отображает сообщение об ошибке', () => {
      state.uiState.error = 'Ошибка!'
      renderError(errorContainer)
      expect(errorContainer.textContent).toBe('Ошибка!')
      expect(errorContainer.style.color).toBe('red')
    })

    test('очищает контейнер при отсутствии ошибки', () => {
      state.uiState.error = null
      errorContainer.textContent = 'Что-то было'
      renderError(errorContainer)
      expect(errorContainer.textContent).toBe('')
    })
  })
})
