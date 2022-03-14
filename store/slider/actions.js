import axios from 'axios';

export async function fetchList({commit}) {
  try {

    const endpoint = 'https://622f618b3ff58f023c1ef56f.mockapi.io/images';

    function getImagesList() {
      return axios.get(endpoint);
    }

    const promises = await Promise.all([getImagesList()]);
    const data = promises.map(res => res.data)[0] || [];

    console.log(data);

    commit('set_list', data);
  } catch (e) {
    console.warn(e);
  }
}

export async function pushImages({commit}, images) {
  commit('update_list', images);
}
