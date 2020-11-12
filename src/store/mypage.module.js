import ApiService from "@/common/api.service";

import {
    MY_CONCERTS, STATISTICS_ONE,
} from "./actions.type";

import {
    SET_ERROR,
    SET_MY_CONCERTS,
    SET_STATISTICS
} from "./mutations.type";
import * as chartConfigs from "@/components/Charts/config";
import config from "@/pages/config";

export const state = {
    errors: null,
    concerts: [],
    reservations: [],
    totalRevenue: [],
    concertRevenue: [],
    expStatistics: {},
    isLoading: true,
    bigLineChart: {
        chartData: {
            labels: [],
            datasets: [{
                fill: true,
                borderColor: config.colors.primary,
                borderWidth: 2,
                borderDash: [],
                borderDashOffset: 0.0,
                pointBackgroundColor: config.colors.primary,
                pointBorderColor: 'rgba(255,255,255,0)',
                pointHoverBackgroundColor: config.colors.primary,
                pointBorderWidth: 20,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 15,
                pointRadius: 4,
                data: []
            }]
        },
        extraOptions: chartConfigs.purpleChartOptions,
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0]
    },
    greenLineChart: {
        extraOptions: chartConfigs.greenChartOptions,
        chartData: {
            labels: [],
            datasets: [{
                label: "Revenue",
                fill: true,
                borderColor: config.colors.primary,
                borderWidth: 2,
                borderDash: [],
                borderDashOffset: 0.0,
                pointBackgroundColor: config.colors.primary,
                pointBorderColor: 'rgba(255,255,255,0)',
                pointHoverBackgroundColor: config.colors.primary,
                pointBorderWidth: 20,
                pointHoverRadius: 4,
                pointHoverBorderWidth: 15,
                pointRadius: 4,
                data: [],
            }]
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.2, 0],
    },
    blueBarChart: {
        extraOptions: chartConfigs.barChartOptions,
        chartData: {
            labels: [],
            datasets: [{
                label: "Audience",
                fill: true,
                borderColor: config.colors.info,
                borderWidth: 2,
                borderDash: [],
                borderDashOffset: 0.0,
                data: [],
            }]
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
    },
    purpleLineChart: {
        extraOptions: chartConfigs.purpleChartOptions,
        chartData: {
            labels: [],
            datasets: [{
                label: "Expenditure",
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
    bigLineChartData(state){
        return state.bigLineChart.chartData;
    },
    bigLineChartColors(state){
        return state.bigLineChart.gradientColors;
    },
    bigLineChartStops(state){
        return state.bigLineChart.gradientStops;
    },
    bigLineChartOptions(state){
        return state.bigLineChart.extraOptions;
    },
    greenLineChartData(state){
        return state.greenLineChart.chartData;
    },
    greenLineChartColors(state){
        return state.greenLineChart.gradientColors;
    },
    greenLineChartStops(state){
        return state.greenLineChart.gradientStops;
    },
    greenLineChartOptions(state){
        return state.greenLineChart.extraOptions;
    },
    blueBarChartData(state){
        return state.blueBarChart.chartData;
    },
    blueBarChartStops(state){
        return state.blueBarChart.gradientStops;
    },
    blueBarChartOptions(state){
        return state.blueBarChart.extraOptions;
    },
    purpleLineChartData(state){
        return state.purpleLineChart.chartData;
    },
    purpleLineChartStops(state){
        return state.purpleLineChart.gradientStops;
    },
    purpleLineChartOptions(state){
        return state.purpleLineChart.extraOptions;
    },
    isMyPageLoading(state){
        return state.isLoading;
    }
};

function setStatistics(list, index){
    state.expStatistics = {};

    list.forEach(data => {
        let target = JSON.stringify(data);
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

        if(index != 2){
            if(Object.keys(state.expStatistics).includes(date)){
                state.expStatistics[date] = state.expStatistics[date] + price;
            }else{
                state.expStatistics[date] = price;
            }
        }else{
            if(Object.keys(state.expStatistics).includes(date)){
                state.expStatistics[date] = state.expStatistics[date] + count;
            }else{
                state.expStatistics[date] = count;
            }
        }
    });
}

export const actions = {
    [MY_CONCERTS](context){
        ApiService.get("/my-page")
            .then(({ data }) => {
                context.commit(SET_MY_CONCERTS, data);
            })
            .catch(() => {
                context.commit(SET_ERROR);
            });
    },
    [STATISTICS_ONE](context, credentials){
        return new Promise(resolve => {
            ApiService.post("/my-page/statistics", credentials)
                .then(({ data }) => {
                    context.commit(SET_STATISTICS, data);
                    resolve(data);
                })
                .catch(() => {
                    context.commit(SET_ERROR);
                });
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
        state.totalRevenue = concert[2];
        state.concertRevenue = concert[3];

        setStatistics(state.totalRevenue, 0);

        state.bigLineChart.chartData.labels = Object.keys(state.expStatistics);
        state.bigLineChart.chartData.datasets[0].data = Object.values(state.expStatistics);

        setStatistics(state.concertRevenue, 1);

        state.greenLineChart.chartData.labels = Object.keys(state.expStatistics);
        state.greenLineChart.chartData.datasets[0].data = Object.values(state.expStatistics);

        setStatistics(state.concertRevenue, 2);

        state.blueBarChart.chartData.labels = Object.keys(state.expStatistics);
        state.blueBarChart.chartData.datasets[0].data = Object.values(state.expStatistics);

        setStatistics(state.reservations, 3);

        state.purpleLineChart.chartData.labels = Object.keys(state.expStatistics);
        state.purpleLineChart.chartData.datasets[0].data = Object.values(state.expStatistics);

        state.isLoading = false;
    },
    [SET_STATISTICS](state, concert){
        state.concertRevenue = concert[0];

        setStatistics(state.concertRevenue, 1);

        state.greenLineChart.chartData.labels = Object.keys(state.expStatistics);
        state.greenLineChart.chartData.datasets[0].data = Object.values(state.expStatistics);

        setStatistics(state.concertRevenue, 2);

        state.blueBarChart.chartData.labels = Object.keys(state.expStatistics);
        state.blueBarChart.chartData.datasets[0].data = Object.values(state.expStatistics);

        state.isLoading = false;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
