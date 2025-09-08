import isValidUrl from '../src/utils/isValidUrl.js'

describe('isValidUrl', () => {
  test('возвращает false для некорректного URL', () => {
    expect(isValidUrl('htp://wrong')).toBe(false)
    expect(isValidUrl('not-a-url')).toBe(false)
    expect(isValidUrl('')).toBe(false)
    expect(isValidUrl('ftp://example.com')).toBe(false)
  })

  test('возвращает true для корректного http/https URL', () => {
    expect(isValidUrl('http://example.com')).toBe(true)
    expect(isValidUrl('https://example.com')).toBe(true)
  })

  test('возвращает true для URL с портом и путём', () => {
    expect(isValidUrl('https://example.com:8080/path/to/page')).toBe(true)
  })
})
