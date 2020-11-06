import ApiService from "@/common/api.service";

import {
    MY_CONCERTS,
} from "./actions.type";

import {
    SET_ERROR,
    SET_MY_CONCERTS
} from "./mutations.type";

export const state = {
    errors: null,
    concerts: [],
    reservations: [],
    expStatistics: {},
    expStatisticsKey: [],
    expStatisticsValue: []
};

const getters = {
    myConcerts(state){
        return state.concerts;
    },
    myReservations(state){
        return state.reservations;
    },
    myExpenditureKey(state){
        console.log(Object.keys(state.expStatistics));
        return Object.keys(state.expStatistics);
    },
    myExpenditureValue(state){

        return Object.values(state.expStatistics);
    }
};

export const actions = {
    [MY_CONCERTS](context){
        ApiService.get("/my-page")
            .then(({ data }) => {
                context.commit(SET_MY_CONCERTS, data);
            })
            .catch(() => {
                context.commit(SET_ERROR);
            });
    }
};

export const mutations = {
    [SET_ERROR](state, error) {
        state.errors = error;
    },
    [SET_MY_CONCERTS](state, concert){
        state.concerts = concert[0];
        state.reservations = concert[1];
        //state.expStatistics = {};

        state.reservations.forEach(reservation => {
            let target = JSON.stringify(reservation);
            let count, date, price;
            JSON.parse(target, function(key, value){
                if(key === 'purchaseCount'){
                    count = Number(value);
                }else if(key === 'price'){
                    price = Number(value) * count;
                }else if(key === 'createdDate') {
                    date = value;
                }
            });

            if(Object.keys(state.expStatistics).includes(date)){
                state.expStatistics[date] = state.expStatistics[date] + price;
            }else{
                state.expStatistics[date] = price;
            }
        });

        console.log("set statistics");
        console.log(state.expStatistics);
        console.log(Object.keys(state.expStatistics));
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
