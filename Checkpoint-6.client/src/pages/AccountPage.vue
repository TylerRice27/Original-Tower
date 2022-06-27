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
    <h5 class="this">My Tickets for attending Events</h5>
    <div class="row">
      <!-- <TowerEvent
        v-for="t in towerEvents"
        :key="t.id"
        :towerEvent="t"
        class="col-md-4 ms-5 selectable"
      /> -->
    </div>

    <div
      class="row this card bg-dark text-center mt-4"
      v-for="t in towerEvents"
      :key="t.id"
    >
      <div class="col-md-12 p-2">
        <img class="ticket-image img-fluid" :src="t.event.coverImg" alt="" />
        <h6 class="p-1">Name</h6>
        {{ t.event?.name }}
        <h6 class="p-1 pt-2">Description</h6>
        {{ t.event?.description }}
      </div>
    </div>
    <!-- {{ towerEvents }} -->
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
      myTickets: computed(() => AppState.accountTickets),
      // this one allows my tickets with no info on it
      towerEvents: computed(() => AppState.accountTickets),
      // this one allows info on it but wont show any ticket info
      // on the screen
      // towerEvents: computed(() => AppState.events)
    }
  }
}
</script>

<style scoped>
.this {
  max-width: 500px;
  margin-left: 50px;
}
.ticket-image {
  max-height: 250px;
  min-width: 450px;
}

img {
  max-width: 100px;
}
</style>
