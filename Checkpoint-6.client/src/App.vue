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
@import url("https://fonts.googleapis.com/css2?family=Dosis:wght@600&family=Lobster&family=Permanent+Marker&display=swap");

* {
  font-family: "Dosis", sans-serif;
}

main {
  // position: relative;
  overflow-x: hidden;
}

@import "./assets/scss/main.scss";
</style>
