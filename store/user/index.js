export const state = () => ({
  user: {
    userid: 0,
    username: '',
    tokenString: ''
  }
})

export const mutations = {
  updateUser: (state, payload) => {
    state.user = payload
  }
}
