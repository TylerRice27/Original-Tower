<template>
  <!-- <div class="tickets"> -->
  <!-- <div class="row card bg-dark"> -->
  <div class="col-md-1">
    <img
      class="img-tic rounded-pill selectable img-fluid m-1"
      :title="ticket.account?.name"
      :src="ticket.account?.picture"
      alt=""
    />
  </div>
  <!-- </div> -->
</template>


<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import { onMounted } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { ticketsService } from '../services/TicketsService'
export default {
  props: { ticket: { type: Object, required: true } },
  setup(props) {
    const route = useRoute()
    onMounted(async () => {
      try {
        await ticketsService.getTicketsByEvent(route.params.id)
      } catch (error) {
        Pop.error(error)
      }
    })
    return {
      tickets: computed(() => AppState.tickets)
    }
  }
}
</script>


<style lang="scss" scoped>
.img-tic {
  height: 100px;
  width: 100px;
}
</style>