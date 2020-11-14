<template>
  <base-table v-if="templateId === 'concerts'"  :data="data"
              thead-classes="text-primary">
    <template slot-scope="{row}">
      <td>
        <div class="card-image" v-if="row.imgUrl">
          <img :src="getImage(row.imgUrl)" style="height:110px;">
        </div>
      </td>
      <td class="text-left">
        <a href="#" v-on:click.prevent="getStatistics(row.id)">
          <p class="title" style="font-size: 20px;">{{row.title}}</p>
        </a>
        <p class="text-muted">{{row.startDate}}</p>
      </td>
      <td class="td-actions text-right">
        <base-button type="link" artia-label="edit button">
          <i class="tim-icons icon-pencil"></i>
        </base-button>
      </td>
    </template>
  </base-table>
  <base-table v-else :data="data"
              thead-classes="text-primary">
    <template slot-scope="{row}">
      <td>
        <div class="card-image" v-if="row.imgUrl">
          <img :src="getImage(row.imgUrl)" style="height:110px;">
        </div>
      </td>
      <td class="text-left">
        <p class="title" style="font-size: 20px;">{{row.title}}</p>
        <p class="text-muted">{{row.startDate}}</p>
      </td>
      <!-- <td class="td-actions text-right">
        <base-button type="link" artia-label="edit button">
          <i class="tim-icons icon-pencil"></i>
        </base-button>
      </td> -->
    </template>
  </base-table>
</template>
<script>

  import BaseButton from '@/components/BaseButton';
  import BaseTable from '@/components/BaseTable';
  import { getImage } from "@/common/misc";
  import {STATISTICS_ONE} from "@/store/actions.type";

  export default {
    components: {
      BaseButton,
      BaseTable,
    },
    methods:{
      getImage,
      getStatistics:function(concertId){
        this.$store
            .dispatch(STATISTICS_ONE,{ concertId: concertId });
      }
    },
    computed: {
    },
    data() {
      return{
        concertId : null
      };
    },
    props:['templateId', 'data'],
    created() {
    }
  }
</script>
<style>
</style>
