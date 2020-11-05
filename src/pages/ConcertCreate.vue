<template>
  <ConcertForm>
    <template v-slot:actionButtonSlot>
      <base-button
          class="big-button blue-color"
          v-on:click="createConcert()">
        Create
      </base-button>
    </template>
  </ConcertForm>
</template>

<script>
import store from "@/store";
import {
  CREATE_CONCERT,
  RESET_CONCERT,
  FETCH_CONCERTS
} from "@/store/actions.type";
import { ConcertForm } from "@/components/index";

export default {
  components: { ConcertForm },
  methods: {
    resetConcert(){
      store.dispatch(RESET_CONCERT)
    },
    createConcert(){
      store.dispatch(CREATE_CONCERT)
      store.dispatch(FETCH_CONCERTS)
          .then(() => this.$router.push({ name: "concert-list" }))
    },
  },
  created() {
    this.resetConcert()
  }
}
</script>
