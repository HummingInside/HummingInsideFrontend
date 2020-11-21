<template>
  <div class="content">
    <div class="row">
      <div class="col-11" id="custom-header">
        <div class="row title">
        {{ concert.title }}
        </div>
        <div class="row" id="date">
          {{ dateFormat(concert.startDate) }} ~ {{ dateFormat(concert.endDate) }}
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-5 mb-5">
        <img id="concert-img" :src="imgPreview">
      </div>
      <div class="col-lg-7">
        <div class="row desc-row">
          <div class="col-lg-3 font-weight-bold text-left">Performer</div>
          <div class="col-lg-7 text-left desc-content">{{ concert.performer }}</div>
        </div>
        <div class="row desc-row">
          <div class="col-lg-3 font-weight-bold text-left">Running Time</div>
          <div class="col-lg-7 text-left desc-content">{{ concert.runningTime }}</div>
        </div>
        <div class="row desc-row">
          <div class="col-lg-3 font-weight-bold text-left">Remaining Seat</div>
          <div class="col-lg-7 text-left desc-content">
            {{ numberFormat(concert.maxAudience-concert.currentAudience) }}
            / {{ numberFormat(concert.maxAudience) }}
          </div>
        </div>
        <div class="row desc-row">
          <div class="col-lg-3 font-weight-bold text-left">Charge</div>
          <div class="col-lg-7 text-left desc-content">{{ numberFormat(concert.price) }} ￦</div>
        </div>
        <div class="row desc-row">
          <div class="col-lg-3 font-weight-bold text-left">Status</div>
          <div class="col-lg-7 text-left desc-content">{{ concert.status }}</div>
        </div>
        <div class="row desc-row">
          <div class="col-lg-3 font-weight-bold text-left">Description</div>
          <div class="col-lg-7 text-left desc-content">{{ concert.description }}</div>
        </div>
      </div>
    </div>
    <div class="row desc-row mt-1">
      <div class="col-lg-12 font-weight-bold">

        <template v-if="concert.hasOwnership && concert.status === 'UPCOMING'">
          <router-link :to="{ name: 'live-concert-performer', params: {pk :concert.id} }">
            <base-button class="big-button purple-color">
              Start
            </base-button>
          </router-link>
          <router-link :to="{ name: 'concert-update', params: {pk :concert.id} }">
            <base-button class="middle-button mint-color">
              Modify
            </base-button>
          </router-link>
        </template>
        <template v-else-if="!concert.hasOwnership">
          <template v-if="concert.status === 'UPCOMING'">
            <template v-if="!concert.hasPurchased && concert.maxAudience-concert.currentAudience > 0">
              <base-button
                  @click="pay"
                  class="big-button blue-color">
                Reservation
              </base-button>
            </template>
            <template v-else>
              <base-button
                  class="big-button gray-color">
                Reserved
              </base-button>
            </template>
          </template>
          <template v-else-if="concert.status === 'ON-AIR' && concert.hasPurchased">
            <router-link :to="{ name: 'live-concert-audience', params: {pk :concert.id} }">
              <base-button class="big-button purple-color">
                Enter
              </base-button>
            </router-link>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { FETCH_CONCERT } from "@/store/actions.type";
import { ConcertsService } from "@/common/api.service";
import {numberFormat, dateFormat, getImage} from "@/common/misc";

export default {
  methods: {
    loadConcert(){
      store.dispatch(FETCH_CONCERT, this.$route.params.pk)
    },
    numberFormat,
    dateFormat,
    getImage,
    pay(){
      const IMP = window.IMP;
      IMP.init('imp29667601');

      IMP.request_pay({
        pg : 'inicis', // version 1.1.0부터 지원.
        pay_method : 'card',
        name : this.concert.title,
        amount : this.concert.price
      }, rsp => {
        if (rsp.success) {
          ConcertsService.reserve(this.$route.params.pk)
          alert('Payment has been completed.\nCheck it out in My Tickets Page.');
          this.$router.push({ name: "concert-list" })
        } else {
          alert('Payment failed. User canceled payment.');
        }
      });
    }
  },
  computed: {
    ...mapGetters(['concert', 'imgPreview', 'currentUser'])
  },
  created() {
    this.loadConcert()
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
  #date{
    margin-top: 15px;
    margin-bottom: 21px;
    margin-left: -5px;
    font-size: 1rem;
  }
  .big-button {
    padding: 1rem 5rem;
    font-size: 1.1rem;
  }
  .small-button {
    margin-left: 0.5rem;
    padding: 1rem 1rem;
    font-size: 1.1rem;
  }
  .middle-button {
    margin-left: 0.5rem;
    padding: 1rem 1.5rem;
    font-size: 1.1rem;
  }
  .pink-color {
    background-color: #fd77a4 !important;
  }
  .blue-color {
    background-color: #419ef9 !important;
  }
  .purple-color {
    background-color: #ba54f5 !important;
  }
  .gray-color {
    background-color: #928c8c !important;
  }
  .mint-color {
    background-color: #71caa6 !important;
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
</style>
