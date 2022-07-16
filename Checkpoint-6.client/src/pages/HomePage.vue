<template>
  <div class="home container">
    <div class="mt-2 justify-content-center img-fluid">
      <img class="cool img-fluid" src="" alt="" />
    </div>
    <div class="row card bg-dark px-3 rounded mt-4">
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

    <div class="mt-4 row justify-content-center events-row">
      <TowerEvent
        v-for="t in towerEvents"
        :key="t.id"
        :towerEvent="t"
        class="col-md-3 selectable"
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
  setup(props) {
    const towerFilter = ref('')
    onMounted(async () => {
      try {
        await towerEventsService.getEvents()
      } catch (error) {
        Pop.error(error)
      }


    })
    return {
      towerFilter,
      towerEvents: computed(() => AppState.events.filter(e => towerFilter.value ? e.type == towerFilter.value : true)),



    }

  }
}
</script>

<style scoped lang="scss">
.cool {
  height: 24vh;
  width: 100vw;
  object-fit: cover;

  border: solid;
  border-color: #3500d3;
  border-width: 2px;
}
</style>
