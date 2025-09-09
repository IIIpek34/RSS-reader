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
    li.classList.toggle('read', post.read)

    const a = document.createElement('a')
    a.href = '#'
    a.textContent = post.title
    a.addEventListener('click', (e) => {
      e.preventDefault()
      openModal(post)
      markPostAsRead(post.id)
      li.classList.add('read')
    })

    const description = document.createElement('p')
    description.textContent = post.description || ''
    description.style.fontSize = '0.9em'
    description.style.color = '#555'

    li.appendChild(a)
    li.appendChild(description)
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

// открытие модального окна
const openModal = (post) => {
  const modal = document.getElementById('modal')
  const title = document.getElementById('modal-title')
  const desc = document.getElementById('modal-description')
  const link = document.getElementById('modal-link')
  const closeBtn = document.getElementById('modal-close')

  title.textContent = post.title
  desc.textContent = post.description || ''
  link.href = post.link || '#'

  modal.classList.remove('hidden')

  closeBtn.onclick = () => modal.classList.add('hidden')
  modal.onclick = (e) => {
    if (e.target === modal) modal.classList.add('hidden')
  }
}

const markPostAsRead = (postId) => {
  const post = state.posts.find(p => p.id === postId)
  if (post) post.read = true
}
