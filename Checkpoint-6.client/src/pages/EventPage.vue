<template>
  <div class="event-page">
    <section id="towerEvent">
      <img :src="towerEvent.coverImg" alt="" />
      <div>
        <h4>{{ towerEvent.name }}</h4>
      </div>
    </section>
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
      towerEvent: computed(() => AppState.activeEvent)
    }
  }
}
</script>
