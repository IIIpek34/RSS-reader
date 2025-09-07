import { state } from './state.js'

let feedIdCounter = 1
let postIdCounter = 1

export const addFeed = (title, url) => {
  const feed = { id: feedIdCounter++, title, url }
  state.feeds.push(feed)
  return feed
}

export const addPosts = (feedId, postsArray) => {
  const postsWithIds = postsArray.map(post => ({
    id: postIdCounter++,
    feedId,
    ...post,
  }))
  state.posts.push(...postsWithIds)
  return postsWithIds
}

export const setError = (message) => {
  state.uiState.error = message
}

export const clearError = () => {
  state.uiState.error = null
}

export const setLoading = (isLoading) => {
  state.uiState.loading = isLoading
}
