<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
    <Modal id="create-towerEvent">
      <template #header>Create a Event</template>
      <template #body>
        <TowerEventForm />
      </template>
    </Modal>
  </main>
  <footer></footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
main {
  // position: relative;
  overflow-x: hidden;
}

@import "./assets/scss/main.scss";
</style>
