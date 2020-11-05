import Vue from 'vue';
import {ConcertsService} from "@/common/api.service";

import {
    CREATE_CONCERT,
    UPDATE_CONCERT,
    DELETE_CONCERT,
    FETCH_CONCERT,
    FETCH_CONCERTS,
    RESET_CONCERT,
    LOAD_IMAGE
} from "@/store/actions.type";

import {
    FETCH_START,
    FETCH_END,
    SET_CONCERT,
    RESET_STATE,
    SET_IMAGE,
    SET_UPLOAD_IMAGE
} from './mutations.type'

import {getImage} from "@/common/misc";

const initialState = {
    concert: {
        title: "",
        category: {
          id: 0,
          name: ""
        },
        performer: "",
        startDate: "",
        endDate: "",
        runningTime: "",
        description: "",
        currentAudience: 0,
        maxAudience: '0',
        price: 0,
        likesCount: 0,
        status: "UPCOMING",
        img: "",
        time: 0
    },
    concerts: [],
    concertsCount: 0,
    isLoading: true,
    imgFile: "",
    imgPreview: ""
}

const getters = {
    concert(state){
        return state.concert;
    },
    concerts(state){
        return state.concerts;
    },
    concertsCount(state) {
        return state.concertsCount;
    },
    isLoading(state) {
        return state.isLoading;
    },
    imgPreview(state) {
        return state.imgPreview
    }
}

export const state = { ...initialState};

export const actions = {
    async [FETCH_CONCERT](context, concertPk, prevConcert){
        // avoid extronuous network call if article exists
        // if(prevConcert !== undefined){
        //     return context.commit(SET_CONCERT, prevConcert)
        // }
        const { data } = await ConcertsService.get(concertPk)
        context.commit(SET_CONCERT, data)
        return data
    },
    [FETCH_CONCERTS]({ commit }, params){
        commit(RESET_STATE);
        commit(FETCH_START);
        return ConcertsService.query(params)
            .then(({ data }) => {
                commit(FETCH_END, data)
            })
            .catch(error => {
                throw new Error(error)
            })
    },
    async [CREATE_CONCERT]({ commit, state }){
        const { data } = await ConcertsService.upload(state.imgFile)
        commit(SET_UPLOAD_IMAGE, data)

        const concert = state.concert
        const param = {
            title: concert.title,
            categoryId: 53, // TODO 리스트 형식으로 불러오기
            startDate: concert.startDate,
            endDate: concert.endDate,
            description: concert.description,
            maxAudience: concert.maxAudience,
            price: concert.price,
            imgUrl: concert.img
        }
        ConcertsService.create(param)
        commit(RESET_STATE)
    },
    async [UPDATE_CONCERT]({ commit, state }, pk){
        if(state.imgFile !== ''){
            const { data } = await ConcertsService.upload(state.imgFile)
            console.log(data)
            commit(SET_UPLOAD_IMAGE, data)
        }
        console.log('temp1')
        const concert = state.concert
        const param = {
            title: concert.title,
            categoryId: 53, // TODO 리스트 형식으로 불러오기
            startDate: concert.startDate,
            endDate: concert.endDate,
            description: concert.description,
            maxAudience: concert.maxAudience,
            price: concert.price,
            imgUrl: concert.img
        }
        console.log('temp2')
        console.log(pk)
        console.log('temp3')
        ConcertsService.update(pk, param)
        commit(RESET_STATE)
    },
    [DELETE_CONCERT](context, pk){
        return ConcertsService.destroy(pk)
    },
    [RESET_CONCERT]({ commit }){
        commit(RESET_STATE)
    },
    [LOAD_IMAGE]({ commit }, file){
        commit(SET_IMAGE, file)
    }
}

export const mutations = {
    [SET_CONCERT](state, concert){
        state.concert = concert
        state.imgPreview = getImage(concert.imgUrl)
    },
    [FETCH_START](state){
        state.isLoading = true
    },
    [FETCH_END](state, concerts){
        state.concerts = concerts
        state.concertsCount = concerts.length
        state.isLoading = false
    },
    [RESET_STATE](state){
        for (let f in state){
            Vue.set(state, f, initialState[f])
        }
    },
    [SET_IMAGE](state, imgUrl){
        state.imgFile = imgUrl
        state.concert.img = imgUrl.name
        state.imgPreview = URL.createObjectURL(imgUrl)
    },
    [SET_UPLOAD_IMAGE](state, img){
        state.concert.img = img
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}