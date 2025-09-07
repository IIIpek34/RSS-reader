import { state } from './state.js'

export const renderFeeds = (container) => {
  container.innerHTML = ''
  state.feeds.forEach((feed) => {
    const li = document.createElement('li')
    li.textContent = feed.title
    container.appendChild(li)
  })
}

export const renderPosts = (container) => {
  container.innerHTML = ''
  state.posts.forEach((post) => {
    const li = document.createElement('li')
    const a = document.createElement('a')
    a.href = post.link
    a.textContent = post.title
    a.target = '_blank'
    li.appendChild(a)
    container.appendChild(li)
  })
}

export const renderError = (container) => {
  if (state.uiState.error) {
    container.textContent = state.uiState.error
    container.style.color = 'red'
  }
  else {
    container.textContent = ''
  }
}
