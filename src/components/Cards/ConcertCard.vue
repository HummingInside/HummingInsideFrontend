<template>
  <router-link class="card" :to="{ name: 'concert-detail', params: {pk :concert.id} }">
    <div class="card-image" v-if="concert.imgUrl">
      <img :src="concert.imgUrl">
    </div>
    <div class="card-header text-right" v-if="concert.title">
      <div class="card-title">{{ concert.title }}</div>
    </div>
    <div class="card-body text-right">
      <div v-if="concert.startDate" style="color: #2c3e50 !important;">{{ concert.startDate }}</div>
      <div v-if="concert.performer" style="color: #2c3e50 !important;">{{ concert.performer }}</div>
      <span class="badge badge-pill mr-1 badge-primary likesCount">🤍 <span>{{ numberFormat(concert.likesCount) }}</span></span>
      <span class="badge badge-pill" :class="concert.status">{{ concert.status }}</span>
    </div>
  </router-link>
</template>

<script>
import {numberFormat} from "@/common/misc";

export default{
  name:"card",
  props: {
    concert: {
      type: Object,
      required: true
    }
  },
  methods : {
    numberFormat
  }
}
</script>

<style>
@import url(http://fonts.googleapis.com/earlyaccess/notosanskr.css);

.badge{
  color: #ffffff;
  margin-top: 0.5rem;
  margin-right: -0.2rem;
}

.card {
  font-family: 'Noto Sans KR', sans-serif;
  padding: 0 !important;
}
.UPCOMING {
  background-color: #0082f2;
}
.ON-AIR {
  background-color: #e14e77;
}
.ENDED {
  background-color: #606063;
}
.card-header{
  height: 4rem;
}
.card-title {
  font-weight: 800 !important;
  font-size: 1.1rem;
  margin-bottom: 0 !important;
}
.likesCount {
  position: absolute;
  top: 0rem;
  right: 0.1rem;
}
.likesCount span{
  font-size: 0.7rem;
}
</style>
