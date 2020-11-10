<template>
  <div class="content">
    <div class="row">
      <div class="col-12">
        <card type="chart">
          <template slot="header">
            <div class="row">
              <div class="col-sm-6" :class="'text-left'">
                <template>
                  <h5 class="card-category">Total</h5>
                </template>
                <template>
                  <h2 class="card-title">Daily</h2>
                </template>
              </div>
              <div class="col-sm-6">
                <div class="btn-group btn-group-toggle"
                     data-toggle="buttons"
                     :class="'float-right'">
                  <template>
                    <label id="0" class="btn btn-success btn-sm btn-simple active">
                      <input type="radio" @click="initBigChart(0)" name="options" autocomplete="off">
                      Revenue
                    </label>
                    <label id="1" class="btn btn-success btn-sm btn-simple">
                      <input type="radio" @click="initBigChart(1)" name="options" autocomplete="off">
                      Audience
                    </label>
                    <!--<label v-for="(option, index) in bigLineChartCategories"
                           :key="option"
                           class="btn btn-success btn-sm btn-simple"
                           :class="{active:bigLineChart.activeIndex === index}"
                           :id="index">
                      <input type="radio"
                             @click="initBigChart(index)"
                             name="options" autocomplete="off"
                             :checked="bigLineChart.activeIndex === index">
                      {{ option }}
                    </label>-->
                  </template>
                </div>
              </div>
            </div>
          </template>
          <line-chart
              v-if="!isMyPageLoading"
              class="chart-area"
              ref="bigChart"
              chart-id="big-line-chart"
              :chart-data="bigLineChartData"
              :gradient-colors="bigLineChartColors"
              :gradient-stops="bigLineChartStops"
              :extra-options="bigLineChartOptions">
          </line-chart>
        </card>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-md-12">
        <card type="tasks" style="height: 47.5%">
          <template slot="header">
            <div class="text-left">
              <template>
                <p class="card-category d-inline">Concerts</p>
              </template>
              <template>
                <h2 class="card-title">My Concerts List</h2>
              </template>
            </div>
          </template>
          <div class="table-full-width table-responsive">
            <task-list templateId="concerts" :data="myConcerts"></task-list>
          </div>
        </card>
        <card type="tasks" style="height: 47%">
          <template slot="header">
            <div class="text-left">
              <template>
                <p class="card-category d-inline">Reservations</p>
              </template>
              <template>
                <h2 class="card-title">My Reservations</h2>
              </template>
            </div>
          </template>
          <div class="table-full-width table-responsive">
            <task-list templateId="reservations" :data="myReservations"></task-list>
          </div>
        </card>
      </div>
      <div class="col-lg-6">
        <div class="row">
          <card type="chart" cardCol>
            <template slot="header">
              <div style="text-align: left !important;">
                <h5 class="card-category">Daily Concert Revenue</h5>
                <h3 class="card-title"><i class="tim-icons icon-bell-55 text-primary"></i> 763,215</h3>
              </div>
            </template>
            <line-chart
                v-if="!isMyPageLoading"
                class="chart-area"
                chart-id="green-line-chart"
                :chart-data="greenLineChartData"
                :gradient-colors="greenLineChartColors"
                :gradient-stops="greenLineChartStops"
                :extra-options="greenLineChartOptions">
            </line-chart>
          </card>
        </div>
        <div class="row">
          <card type="chart" cardCol>
            <template slot="header">
              <div style="text-align: left !important;">
                <h5 class="card-category">Concert Purchaser Count</h5>
                <h3 class="card-title"><i class="tim-icons icon-delivery-fast text-info "></i> 3,500€</h3>
              </div>
            </template>
            <bar-chart
                v-if="!isMyPageLoading"
                class="chart-area"
                chart-id="blue-bar-chart"
                :chart-data="blueBarChartData"
                :gradient-stops="blueBarChartStops"
                :extra-options="blueBarChartOptions">
            </bar-chart>
          </card>
        </div>
        <div class="row">
          <card type="chart" cardCol>
            <template slot="header">
              <div style="text-align: left !important;">
                <h5 class="card-category">My Expenditure</h5>
                <h3 class="card-title"><i class="tim-icons icon-send text-success "></i> 12,100K</h3>
              </div>
            </template>
            <line-chart
                v-if="!isMyPageLoading"
                class="chart-area"
                chart-id="purple-line-chart"
                :chart-data="purpleLineChartData"
                :gradient-stops="purpleLineChartStops"
                :extra-options="purpleLineChartOptions">
            </line-chart>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import {
  Card
} from "@/components/index";

import LineChart from '@/components/Charts/LineChart';
import BarChart from '@/components/Charts/BarChart';
//import * as chartConfigs from '@/components/Charts/config';
import TaskList from './Dashboard/TaskList'
import config from './config';
import {MY_CONCERTS} from "@/store/actions.type";
import {mapGetters} from "vuex";

export default {
  components: {
    Card,
    LineChart,
    BarChart,
    TaskList
  },
  /*data(){
    return{
      bigLineChartCategories:[
        "Revenue",
        "Audiences"
      ],
      bigLineChart: {
        allData: [
          [100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100],
          [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120]
        ],
        activeIndex: 0,
        chartData: { datasets: [{ }]},
        extraOptions: chartConfigs.purpleChartOptions,
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
        categories: []
      },
      greenLineChart: {
        extraOptions: chartConfigs.greenChartOptions,
        chartData: {
          labels: ['JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
          datasets: [{
            label: "Data",
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
            data: [80, 100, 70, 80, 120, 80],
          }]
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.2, 0],
      },
      blueBarChart: {
        extraOptions: chartConfigs.barChartOptions,
        chartData: {
          labels: ['USA', 'GER', 'AUS', 'UK', 'RO', 'BR'],
          datasets: [{
            label: "Countries",
            fill: true,
            borderColor: config.colors.info,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            data: [53, 20, 10, 80, 100, 45],
          }]
        },
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
      },
    }
  },*/
  computed:{
    ...mapGetters(
            [
              "myConcerts",
              "myReservations",
              "bigLineChartData",
              "bigLineChartColors",
              "bigLineChartStops",
              "bigLineChartOptions",
              "greenLineChartData",
              "greenLineChartColors",
              "greenLineChartStops",
              "greenLineChartOptions",
              "blueBarChartData",
              "blueBarChartStops",
              "blueBarChartOptions",
              "purpleLineChartData",
              "purpleLineChartStops",
              "purpleLineChartOptions",
              "isMyPageLoading"
            ]
    ),
  },
  methods:{
    initBigChart(index) {
      let chartData = {
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
          data: this.bigLineChart.allData[index]
        }],
        labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
      }
      this.$refs.bigChart.updateGradients(chartData);
      this.bigLineChart.chartData = chartData;
      this.bigLineChart.activeIndex = index;
    }
  },
  mounted(){
    //this.initBigChart(0);
  },
  created() {
    this.$store.dispatch(MY_CONCERTS);

  }
}
</script>
<style>
</style>
