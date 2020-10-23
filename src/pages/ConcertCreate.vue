<template>
  <div class="content">
    <div class="row">
      <div class="col-11" id="custom-header">
        <div class="row title">
        {{ concert.title }}
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-5 m-4" id="blank-image">
        <div>
          <span data-notify="icon" class="tim-icons icon-upload" style="font-size: 45px;"></span>
          <div style="margin-top: 10px">
            Upload Title Image
          </div>
        </div>
<!--        <img id="concert-img" src="http://tkfile.yes24.com/upload2/perfblog/202009/20200911/20200911-37429_1.jpg/dims/quality/70/">-->
      </div>
      <div class="col-lg-6">
        <div class="row desc-row text-left">
          <base-input label="Title"
                      placeholder="Title"
                      class="col-lg-12"
                      v-model="concert.title">
          </base-input>
        </div>
        <div class="row desc-row text-left">
          <base-input label="Performer"
                      placeholder="Performer"
                      class="col-lg-12"
                      v-model="concert.performer">
          </base-input>
        </div>
        <div class="row desc-row text-left">
          <div class="col-lg-12">
            <label>State Date</label>
            <datetime placeholder="Start Date"
                      type="datetime"
                      class="form-control form-group theme-blue"
                      :phrases="{ok: 'OK', cancel: 'Exit'}"
                      :hour-step="2"
                      :minute-step="15"
                      :week-start="7"
                      use12-hour
                      v-model="concert.startDate">
            </datetime>
          </div>
        </div>
        <div class="row desc-row text-left">
          <div class="col-lg-12">
            <label>End Date</label>
            <datetime placeholder="End Date"
                      type="datetime"
                      class="form-control form-group theme-blue"
                      :phrases="{ok: 'OK', cancel: 'Exit'}"
                      :hour-step="2"
                      :minute-step="15"
                      :week-start="7"
                      use12-hour
                      v-model="concert.endDate">
            </datetime>
          </div>
        </div>
        <div class="row desc-row text-left">
          <base-input label="Max Seat"
                      placeholder="Max Seat"
                      class="col-lg-12"
                      v-model="concert.maxAudience">
          </base-input>
        </div>
        <div class="row desc-row text-left">
          <base-input label="Charge"
                      placeholder="Charge"
                      class="col-lg-12"
                      v-model="concert.price">
          </base-input>
        </div>
        <div class="row desc-row text-left">
          <base-input label="Description"
                      class="col-lg-12">
            <textarea rows="3" cols="80"
                      class="form-control"
                      placeholder="Description"
                      v-model="concert.description"></textarea>
          </base-input>
        </div>
<!--        <div class="row desc-row text-left">-->
<!--          <base-input label="Status"-->
<!--                      placeholder="Status"-->
<!--                      class="col-lg-12"-->
<!--                      v-model="concert.status"-->
<!--                      disabled>-->
<!--          </base-input>-->
<!--        </div>-->
      </div>
    </div>
    <div class="row desc-row mt-1">
      <div class="col-lg-11 font-weight-bold text-right">
        <base-button class="big-button blue-color">
          Create
        </base-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import {RESET_CONCERT, CREATE_CONCERT} from "@/store/actions.type";
import {numberFormat} from "@/common/misc";
import BaseInput from "@/components/Inputs/BaseInput";
import { Datetime } from 'vue-datetime';
import { Settings } from 'luxon'

Settings.defaultLocale = 'en'

export default {
  components: {
    BaseInput,
    datetime: Datetime
  },
  methods: {
    numberFormat,
    resetConcert(){
      store.dispatch(RESET_CONCERT)
    },
    createConcert(){
      store.dispatch(CREATE_CONCERT).then(() => this.$router.push({ name: "concert-list" }))
    }
  },
  computed: {
    ...mapGetters(['concert'])
  },
  created() {
    this.resetConcert()
  }
}
</script>

<style scoped="scss">
  @import url(http://fonts.googleapis.com/earlyaccess/notosanskr.css);

  .content {
    font-family: 'Noto Sans KR', sans-serif;
  }
  .font-weight-bold {
    font-weight: 800 !important;
    font-size: 1rem;
  }
  #concert-img {
    box-shadow: 0 2px 22px 0 rgba(0, 0, 0, 0.1), 0 4px 20px 0 rgba(0, 0, 0, 0.15);
  }
  #custom-header{
    margin-left: 13px;
    border-bottom: 2px solid #333;
    margin-bottom: 30px;
  }
  .big-button {
    padding: 1rem 5rem;
    font-size: 1.1rem;
  }
  .blue-color {
    background-color: #419ef9 !important;
  }
  .title{
    color: #333;
    font-size: 2rem;
  }
  .btn {
    background-image: none !important;
  }
  .desc-row{
    margin-bottom: 0.5rem;
  }
  .desc-content{
    line-height: 1.7rem;
  }
  .vdatetime >>> input {
    background-color: transparent !important;
    border: none !important;
    width: 100%;
  }
  .theme-blue >>> .vdatetime-popup {
    border-radius: 10px;
  }
  .theme-blue >>> .vdatetime-popup__header{
    background: #419ef9 !important;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .theme-blue >>> .vdatetime-calendar__month__day--selected > span > span,
  .theme-blue >>> .vdatetime-calendar__month__day--selected:hover > span > span {
    background: #419ef9 !important;
  }

  .theme-blue >>> .vdatetime-year-picker__item--selected,
  .theme-blue >>> .vdatetime-time-picker__item--selected,
  .theme-blue >>> .vdatetime-popup__actions__button {
    color: #419ef9 !important;
  }
  #blank-image {
    border: dashed 2px black;
    border-radius: 10px;
    display:flex;
    justify-content: center;
    align-items: center
  }
</style>
