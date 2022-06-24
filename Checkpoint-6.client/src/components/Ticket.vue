<template>
  <div class="tickets">
    <div v-for="t in tickets" :key="t.id">
      <img
        class="hv rounded-pill"
        :title="t.account?.name"
        :src="t.account?.picture"
        alt=""
      />
    </div>
  </div>
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
.hv:hover {
}
</style>