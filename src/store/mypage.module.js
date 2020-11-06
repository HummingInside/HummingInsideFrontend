import ApiService from "@/common/api.service";

import {
    MY_CONCERTS,
} from "./actions.type";

import {
    SET_ERROR,
    SET_MY_CONCERTS
} from "./mutations.type";
import * as chartConfigs from "@/components/Charts/config";
import config from "@/pages/config";

export const state = {
    errors: null,
    concerts: [],
    reservations: [],
    expStatistics: {},
    isLoading: true,
    purpleLineChart: {
        extraOptions: chartConfigs.purpleChartOptions,
        chartData: {
            labels: [],
            datasets: [{
                label: "My First dataset",
                fill: true,
                borderColor: config.colors.danger,
                borderWidth: 2,
                borderDash: [],
                borderDashOffset: 0.0,
                pointBackgroundColor: config.colors.danger,
                pointBorderColor: 'rgba(255,255,255,0)',
                pointHoverBackgroundColor: config.colors.danger,
                pointBorderWidth: 20,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 15,
                pointRadius: 4,
                data: [],
            }]
        },
        gradientColors: ['rgba(66,134,121,0.15)', 'rgba(66,134,121,0.0)', 'rgba(66,134,121,0)'],
        gradientStops: [1, 0.4, 0],
    }
};

const getters = {
    myConcerts(state){
        return state.concerts;
    },
    myReservations(state){
        return state.reservations;
    },
    purpleLineChartData(state){
        console.log(state.purpleLineChart.chartData);
        return state.purpleLineChart.chartData;
    },
    purpleLineChartGradient(state){
        return state.purpleLineChart.gradientStops;
    },
    purpleLineChartExtra(state){
        return state.purpleLineChart.extraOptions;
    },
    isMyPageLoading(state){
        return state.isLoading;
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

        state.purpleLineChart.chartData.labels = Object.keys(state.expStatistics);
        console.log(state.purpleLineChart.chartData.labels);
        state.purpleLineChart.chartData.datasets[0].data = Object.values(state.expStatistics);

        state.isLoading = false;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
