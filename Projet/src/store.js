import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        appStatus: {
            message: null,
            state: 'loading'
        }
    },

    actions: {
        appStatus ({commit}, appStatus) {
            commit('setAppStatus', appStatus)
        },

        coordinates ({commit}, coordinates) {
            commit('setCoordinates', coordinates)
        }
    },

    mutations: {
        setAppStatus: (state, appStatus) => {
            state.appStatus.state = appStatus.state
            state.appStatus.message = appStatus.message
        }   
    }
})