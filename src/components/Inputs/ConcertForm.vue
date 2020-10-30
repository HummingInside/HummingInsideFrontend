<template>
  <div class="content">
    <div class="row">
      <div class="col-11" id="custom-header">
        <div class="row title">
          {{ concert.title }}
        </div>
        <div class="row" id="date">
          <template v-if="concert.startDate.length > 0">
            {{ dateFormat(concert.startDate) }}
          </template>
          <template v-if="concert.endDate.length > 0">
            ~ {{ dateFormat(concert.endDate) }}
          </template>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-5 m-4" id="blank-image">
        <div style="padding: 1rem">
          <input ref="imageInput"
                 type="file" hidden @change="onChangeImages">
          <span data-notify="icon"
                v-if="imageUrl == null"
                id="image-button"
                class="tim-icons icon-upload"
                @click="onClickImageUpload"></span>
          <img v-if="imageUrl" :src="imageUrl" alt="Upload Title Image"
               id="upload-image"
               @click="onClickImageUpload">
          <div v-if="imageUrl == null" style="margin-top: 10px">
            Upload Title Image
          </div>
        </div>
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
          <base-input label="Category"
                      placeholder="Category"
                      class="col-lg-12"
                      v-model="concert.category">
          </base-input>
        </div>
        <div class="row desc-row text-left">
          <div class="col-lg-12">
            <label>State Date</label>
            <datetime placeholder="Start Date"
                      type="datetime"
                      class="form-control form-group theme-blue"
                      :phrases="{ok: 'OK', cancel: 'Exit'}"
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
      </div>
    </div>
    <div class="row desc-row mt-1">
      <div class="col-lg-1"></div>
      <div class="col-lg-11 font-weight-bold text-right">
        <base-button
            class="big-button blue-color"
            v-on:click="createConcert()">
          Create
        </base-button>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import {RESET_CONCERT, CREATE_CONCERT, LOAD_IMAGE} from "@/store/actions.type";
import {numberFormat, dateFormat} from "@/common/misc";
import BaseInput from "@/components/Inputs/BaseInput";
import { Datetime } from 'vue-datetime';
import { Settings } from 'luxon'

Settings.defaultLocale = 'en'

export default {
  props: {
    concert: {
      type: Object,
      required: true
    }
  },
  data(){
    return {
      imageUrl: null
    }
  },
  components: {
    BaseInput,
    datetime: Datetime
  },
  methods: {
    numberFormat,
    dateFormat,
    createConcert(){
      store.dispatch(CREATE_CONCERT)
          .then(() => this.$router.push({ name: "concert-list" }))
    },
    onClickImageUpload() {
      this.$refs.imageInput.click();
    },
    onChangeImages(e) {
      const file = e.target.files[0]; // Get first index in files
      this.imageUrl = URL.createObjectURL(file); // Create File URL
      store.dispatch(LOAD_IMAGE, file)
    }
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

#image-button {
  font-size: 45px;
}
#image-button:hover {
  cursor: pointer;
}
#upload-image {

}
#upload-image:hover {
  cursor: pointer;
}
</style>