export const state = () => ({
  searchResults: []
})

export const mutations = {
  updateSearchResult: (state, payload) => {
    state.searchResults = payload
  }
}
