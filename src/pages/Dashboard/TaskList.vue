<template>
  <base-table v-if="templateId === 'concerts'"  :data="myConcerts"
              thead-classes="text-primary">
    <template slot-scope="{row}">
      <td>
        <!--<base-checkbox v-model="row.done">
        </base-checkbox>-->
        <div class="card-image" v-if="row.imgUrl">
          <img :src="getImage(row.imgUrl)" style="height:110px;">
        </div>
      </td>
      <td class="text-left">
        <p class="title" style="font-size: 20px;">{{row.title}}</p>
        <p class="text-muted">{{row.startDate}}</p>
      </td>
      <td class="td-actions text-right">
        <base-button type="link" artia-label="edit button">
          <i class="tim-icons icon-pencil"></i>
        </base-button>
      </td>
    </template>
  </base-table>
  <base-table v-else :data="myReservations"
              thead-classes="text-primary">
    <template slot-scope="{row}">
      <td>
        <!--<base-checkbox v-model="row.done">
        </base-checkbox>-->
        <div class="card-image" v-if="row.imgUrl">
          <img :src="getImage(row.imgUrl)" style="height:110px;">
        </div>
      </td>
      <td class="text-left">
        <p class="title" style="font-size: 20px;">{{row.title}}</p>
        <p class="text-muted">{{row.startDate}}</p>
      </td>
      <td class="td-actions text-right">
        <base-button type="link" artia-label="edit button">
          <i class="tim-icons icon-pencil"></i>
        </base-button>
      </td>
    </template>
  </base-table>
</template>
<script>

  import BaseButton from '@/components/BaseButton';
  import BaseTable from '@/components/BaseTable';
  //import BaseCheckbox from '@/components/BaseCheckbox';
  import { MY_CONCERTS } from "@/store/actions.type";
  import { mapGetters } from "vuex";
  import { getImage } from "@/common/misc";

  export default {
    components: {
      BaseButton,
      BaseTable,
      //BaseCheckbox
    },
    methods:{
      getImage
    },
    computed: {
      ...mapGetters(["myConcerts"]),
      ...mapGetters(["myReservations"])
    },
    props:['templateId'],
    created() {
      this.$store.dispatch(MY_CONCERTS)
    }
  }
</script>
<style>
</style>
