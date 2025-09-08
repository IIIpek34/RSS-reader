import { state } from '../src/state.js'
import { addFeed, isDuplicateFeed, clearError, setError } from '../src/stateHelpers.js'

beforeEach(() => {
  state.feeds = []
  state.posts = []
  state.uiState.error = null
})

test('isDuplicateFeed возвращает true для существующего URL', () => {
  addFeed('Feed 1', 'https://example.com/rss')
  expect(isDuplicateFeed('https://example.com/rss')).toBe(true)
})

test('isDuplicateFeed возвращает false для нового URL', () => {
  addFeed('Feed 1', 'https://example.com/rss')
  expect(isDuplicateFeed('https://another.com/rss')).toBe(false)
})

test('addFeed не добавляет дубликаты и возвращает null', () => {
  addFeed('Feed 1', 'https://example.com/rss')
  const duplicate = addFeed('Feed 1 Duplicate', 'https://example.com/rss')
  expect(duplicate).toBeNull()
  expect(state.feeds.length).toBe(1)
})

test('setError устанавливает сообщение об ошибке', () => {
  setError('Ошибка')
  expect(state.uiState.error).toBe('Ошибка')
})

test('clearError очищает сообщение об ошибке', () => {
  setError('Ошибка')
  clearError()
  expect(state.uiState.error).toBeNull()
})
