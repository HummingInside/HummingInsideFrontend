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
        <router-link v-if="concert.status === 'ON-AIR'" to="/">
          <base-button class="big-button purple-color">
            Enter
          </base-button>
        </router-link>
        <template v-else>
<!--          <router-link to="/">-->
            <base-button
                @click="pay"
                class="big-button blue-color">
              Reservation
            </base-button>
<!--          </router-link>-->
          <router-link
              v-if="concert.status !== 'ENDED'
               && concert.performer === currentUser.username"
              :to="{ name: 'concert-update', params: {pk :concert.id} }">
            <base-button class="middle-button mint-color">
              Modify
            </base-button>
          </router-link>
        </template>
        <base-button class="small-button pink-color">🤍</base-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import store from "@/store";
import { FETCH_CONCERT } from "@/store/actions.type";
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
        merchant_uid : 'merchant_' + new Date().getTime(),
        name : 'The play, History Boys',
        amount : 15000,
        buyer_email : 'iamport@siot.do',
        buyer_name : '구매자이름',
        buyer_tel : '010-1234-5678',
        buyer_addr : '서울특별시 강남구 삼성동',
        buyer_postcode : '123-456',
      }, rsp => {
        let msg
        if ( rsp.success ) {
          msg = 'Payment has been completed.\nYou can check the paid concert information in My Tickets Page.'
          msg += '고유ID : ' + rsp.imp_uid;
          msg += '상점 거래ID : ' + rsp.merchant_uid;
          msg += '결제 금액 : ' + rsp.paid_amount;
          msg += '카드 승인번호 : ' + rsp.apply_num;
        } else {
          msg = '결제에 실패하였습니다.';
          msg += '에러내용 : ' + rsp.error_msg;
        }
        alert(msg);
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
