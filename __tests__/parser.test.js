import { readFileSync } from 'fs'
import { join } from 'path'
import parseRSS from '../src/parser.js'

const loadFixture = name =>
  readFileSync(join(__dirname, '..', '__fixtures__', 'parser', name), 'utf-8')

describe('parseRSS', () => {
  test('Парсит корректный RSS', () => {
    const xml = loadFixture('valid-rss.xml')
    expect(parseRSS(xml)).toEqual([
      { title: 'Новость 1', link: 'https://example.com/news1' },
      { title: 'Новость 2', link: 'https://example.com/news2' },
    ])
  })

  test('Возвращает пустой массив для пустого RSS', () => {
    const xml = loadFixture('empty-rss.xml')
    expect(parseRSS(xml)).toEqual([])
  })

  test('Возвращает пустой массив для некорректного XML', () => {
    const xml = loadFixture('bad-rss.xml')
    expect(parseRSS(xml)).toEqual([])
  })

  test('Подставляет значения по умолчанию, если нет title или link', () => {
    const xml = loadFixture('missing-fields-rss.xml')
    expect(parseRSS(xml)).toEqual([
      { title: 'Без заголовка', link: '#' },
      { title: 'Без заголовка', link: 'https://example.com/only-link' },
    ])
  })
})
