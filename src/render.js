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
    a.href = post.link || '#'
    a.textContent = post.title
    a.target = '_blank'
    a.style.color = post.read ? '#888' : '#000'

    const button = document.createElement('button')
    button.textContent = 'Просмотр'
    button.addEventListener('click', () => {
      openModal(post)
      markPostAsRead(post.id)
      li.classList.add('read')
      a.style.color = '#888'
    })

    li.appendChild(a)
    li.appendChild(button)
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

const openModal = (post) => {
  const modal = document.getElementById('modal')
  const title = document.getElementById('modal-title')
  const desc = document.getElementById('modal-description')
  const link = document.getElementById('modal-link')
  const closeBtn = document.getElementById('modal-close')

  title.textContent = post.title

  let contentText = ''
  if (post.description && post.description.trim() !== '') {
    contentText = post.description
  }
  else if (post.content && post.content.trim() !== '') {
    contentText = post.content.slice(0, 200) + (post.content.length > 200 ? '...' : '')
  }
  else if (post.summary && post.summary.trim() !== '') {
    contentText = post.summary.slice(0, 200) + (post.summary.length > 200 ? '...' : '')
  }
  else {
    contentText = 'Описание недоступно.'
  }

  desc.textContent = contentText
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
