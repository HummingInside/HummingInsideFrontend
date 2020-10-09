<template>
  <div class="card" :class="[type && `card-${type}`]">
    <div class="card-image" v-if="img">
      <img :src="img">
    </div>
    <div class="card-header text-right" v-if="title">
      <div class="card-title">{{ title }}</div>
    </div>
    <div class="card-body text-right">
      <div v-if="date">{{ date }}</div>
      <div v-if="performer">{{ performer }}</div>
      <span class="badge badge-pill mr-1 badge-primary likesCount">🤍 <span>{{ likesCount }}</span></span>
      <span class="badge badge-pill" :class="status">{{ status }}</span>
    </div>
  </div>
</template>
<script>
export default{
  name:"card",
  props: {
    title: String,
    performer: String,
    img: String,
    likesCount: Number,
    status: String,
    date: String
  },
  computed:{
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
}
.UPCOMING {
  background-color: #0082f2;
}
.ONAIR {
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
