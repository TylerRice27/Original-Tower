<template>
  <div class="about text-end">
    <img class="rounded-pill m-3" :src="account.picture" alt="" />
  </div>
  <section id="account-events">
    <h5>My Events</h5>
    <div id="events-container">
      <div></div>
    </div>
  </section>
  <section id="event-tickets">
    <h5>My Tickets for attending Events</h5>
    <div class="row">
      <!-- <TowerEvent
        v-for="t in towerEvents"
        :key="t.id"
        :towerEvent="t"
        class="col-md-4 selectable"
      /> -->
    </div>
    <!-- v-for="t in towerEvents" :key="t.id" -->
    <div class="row card">
      {{ towerEvents }}
    </div>
    <div class="events-container"></div>
  </section>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService'
import Pop from '../utils/Pop'
import { towerEventsService } from '../services/TowerEventsService'
export default {

  name: 'Account',

  setup(props) {

    onMounted(async () => {
      try {
        await accountService.getMyTickets()
        await towerEventsService.getEvents()
      } catch (error) {
        Pop.error(error)
      }


    })
    return {
      account: computed(() => AppState.account),
      towerEvents: computed(() => AppState.accountTickets),
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
