import Vuex from 'vuex';
import slider from './slider';

export default function () {
  return new Vuex.Store({
    namespaced: true,
    modules: {
      slider,
    },
  });
}
