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
                    <!-- label id="1" class="btn btn-success btn-sm btn-simple">
                      <input type="radio" @click="initBigChart(1)" name="options" autocomplete="off">
                      Audience
                    </label> -->
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
                <h3 class="card-title" ><i class="tim-icons icon-coins text-primary"></i>{{greenLineChartTotal}}</h3>
              </div>
            </template>
            <line-chart
                v-if="!isMyPageLoading"
                class="chart-area"
                ref="greenChart"
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
                <h3 class="card-title"><i class="tim-icons icon-single-02 text-info "></i>{{blueBarChartTotal}}</h3>
              </div>
            </template>
            <bar-chart
                v-if="!isMyPageLoading"
                class="chart-area"
                ref="barChart"
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
                <h3 class="card-title"><i class="tim-icons icon-paper text-success "></i>{{purpleLineChartTotal}}</h3>
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
import TaskList from './Dashboard/TaskList'
import {MY_CONCERTS} from "@/store/actions.type";
import {mapGetters} from "vuex";

export default {
  components: {
    Card,
    LineChart,
    BarChart,
    TaskList
  },
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
              "greenLineChartTotal",
              "blueBarChartData",
              "blueBarChartStops",
              "blueBarChartOptions",
              "blueBarChartTotal",
              "purpleLineChartData",
              "purpleLineChartStops",
              "purpleLineChartOptions",
              "purpleLineChartTotal",
              "isMyPageLoading"
            ]
    ),
  },
  methods:{
  },
  mounted(){
  },
  created() {
    this.$store.dispatch(MY_CONCERTS);
  }
}
</script>
<style>
</style>
