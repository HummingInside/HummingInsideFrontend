<template>
  <ConcertForm>
    <template v-slot:buttonSlot>
      <base-button
          class="big-button blue-color"
          v-on:click="updateConcert()">
        Update
      </base-button>
    </template>
  </ConcertForm>
</template>

<script>
import store from "@/store";
import {
  FETCH_CONCERT,
  FETCH_CONCERTS,
  UPDATE_CONCERT
} from "@/store/actions.type";
import { ConcertForm } from "@/components/index";

export default {
  components: { ConcertForm },
  methods: {
    loadConcert(){
      store.dispatch(FETCH_CONCERT, this.$route.params.pk)
    },
    updateConcert(){
      store.dispatch(UPDATE_CONCERT, this.$route.params.pk)
      store.dispatch(FETCH_CONCERTS)
          .then(() => this.$router.push({ name: "concert-list" }))
    }
  },
  created() {
    this.loadConcert()
  }
}
</script>
