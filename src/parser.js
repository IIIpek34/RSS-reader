export default (xmlString) => {
  const objectDOM = new DOMParser().parseFromString(xmlString, 'application/xml')
  const allItems = objectDOM.querySelectorAll('item')
  return Array.from(allItems).map((item) => {
    const title = item.querySelector('title')?.textContent || 'Без заголовка'
    const link = item.querySelector('link')?.textContent || '#'
    return { title, link }
  })
}
