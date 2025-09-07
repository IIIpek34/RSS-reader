export const state = {
  feeds: [], // { id, title, url }
  posts: [], // { id, feedId, title, link }
  uiState: {
    loading: false,
    error: null,
    formInput: '',
  },
}
