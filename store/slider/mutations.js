export function set_list(state, payload) {
  state.list = payload;
}

export function update_list(state, payload) {
  state.list.push({...payload});
}
