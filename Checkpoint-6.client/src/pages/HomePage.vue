<template>
  <div class="home container">
    <div class="mt-2 row justify-content-center">
      <div class="cool mt-2" alt=""></div>
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
import { AppState } from '../AppState'
import { towerEventsService } from '../services/TowerEventsService'
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
  background-position: 1110px -342px;
  // filter: blur(2px);
  border: solid;
  border-color: #3500d3;
  border-width: 2px;
  background-image: url(https://images.unsplash.com/photo-1546707012-c46675f12716?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8Nnx8fGVufDB8fHx8&w=1000&q=80);
}
</style>
