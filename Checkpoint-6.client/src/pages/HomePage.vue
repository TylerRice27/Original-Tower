<template>
  <div class="home container">
    <div class="row card bg-dark rounded mt-4">
      <div class="d-flex justify-content-between col-md-12">
        <h5 class="selectable" @click="towerFilter = ''">All</h5>
        <h5 class="selectable" @click="towerFilter = 'concert'">Concerts</h5>
        <h5 class="selectable" @click="towerFilter = 'convention'">
          Conventions
        </h5>
        <h5 class="selectable" @click="towerFilter = 'sport'">Sports</h5>
        <h5 class="selectable" @click="towerFilter = 'digital'">Digital</h5>
      </div>
    </div>

    <div class="row events-row">
      <TowerEvent
        v-for="t in towerEvents"
        :key="t.id"
        :towerEvent="t"
        class="col-md-4 selectable"
      />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { towerEventsService } from '../services/TowerEventsService'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    const filterTowerEvent = ref('')
    onMounted(async () => {
      try {
        await towerEventsService.getEvents()
      } catch (error) {
        Pop.error(error)
      }


    })
    return {
      filterTowerEvent,
      towerEvents: computed(() => AppState.events.filter(e => filterTowerEvent.value ? e.type == filterTowerEvent.value : true)),



    }

  }
}
</script>

<style scoped lang="scss">
</style>
