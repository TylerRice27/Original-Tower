<template>
  <div class="event-page card bg-dark m-3">
    <section class="d-flex m-3" id="towerEvent">
      <img class="tower-pic img-fluid" :src="towerEvent.coverImg" alt="" />
      <div class="m-3">
        <h4>{{ towerEvent.name }}</h4>
        <h5 class="text-success">{{ towerEvent.location }}</h5>
        <p class="mt-5">{{ towerEvent.description }}</p>
        <h3 class="mt-5 pt-3">{{ towerEvent.capacity }} Spots Left</h3>
        <button class="btn btn-primary mt-5">
          Attend <i class="mdi mdi-thumb-up"></i>
        </button>
      </div>
      <h6 class="text-end" v-if="towerEvent.startDate">
        {{ formatDate(towerEvent.startDate) }}
      </h6>
    </section>
  </div>
  <p class="m-3">Who is Attending</p>
  <div class="row">
    <div class="col-md-12 card bg-dark"></div>
  </div>
</template>

<script>
import { computed, watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { towerEventsService } from '../services/TowerEventsService'
import { AppState } from '../AppState'
export default {
  name: 'EventPage',

  setup() {
    const route = useRoute()
    watchEffect(async () => {
      try {
        await towerEventsService.getEvent(route.params.id)

      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })

    return {
      towerEvent: computed(() => AppState.activeEvent),





      formatDate(rawDate) {
        let time = new Date(rawDate)
        // let month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(time)
        let day = time.toDateString()
        // let year = time.getUTCFullYear()
        return ` ${day}`
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.tower-pic {
  width: 500px;
}
</style>