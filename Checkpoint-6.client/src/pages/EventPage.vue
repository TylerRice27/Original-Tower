<template>
  <div class="event-page card bg-dark m-3">
    <section class="d-flex m-3 row" id="towerEvent">
      <img class="tower-pic img-fluid" :src="towerEvent.coverImg" alt="" />
      <div class="m-3 col-md-4">
        <h4>{{ towerEvent.name }}</h4>
        <h5 class="text-success">{{ towerEvent.location }}</h5>
        <h6 class="p-1" v-if="towerEvent.startDate">
          Event Date: {{ formatDate(towerEvent.startDate) }}
        </h6>
        <p class="mt-5">{{ towerEvent.description }}</p>
        <h3 class="mt-5 pt-3">{{ towerEvent.capacity }} Spots Left</h3>
        <button class="btn btn-primary mt-5" @click="createTicket">
          Attend <i class="mdi mdi-thumb-up"></i>
        </button>
      </div>
    </section>
  </div>
  <p class="m-3">Who is Attending</p>
  <!-- <div class="row"> -->
  <div class="col-md-12 card bg-dark">
    <Ticket />
  </div>
  <!-- </div> -->
  <div class="row mt-2 justify-content-center">
    <form
      class="pb-4 d-flex rounded flex-column bg-dark col-md-8"
      @submit.prevent="createComment"
    >
      <h3 class="text-center m-2">Create a Comment!</h3>
      <textarea
        name="commentBody"
        id="commentBody"
        cols="30"
        rows="4"
        placeholder="Tell Us What You Think!"
      >
      </textarea>
      <div class="col-md-12 d-flex justify-content-end">
        <button class="btn btn-primary mt-2">Create!</button>
      </div>
    </form>
    <!-- <Comment /> -->
  </div>
</template>

<script>
import { computed, watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import Pop from '../utils/Pop'
import { towerEventsService } from '../services/TowerEventsService'
import { ticketsService } from '../services/TicketsService'
import { AppState } from '../AppState'
import { commentsService } from '../services/CommentsService'
export default {
  name: 'EventPage',
  setup() {
    const route = useRoute()
    watchEffect(async () => {
      try {
        AppState.comments = [];
        await commentsService.getComments(route.params.id)
        await towerEventsService.getEvent(route.params.id)
        await ticketsService.getTicketsByEvent(route.params.id)
      } catch (error) {
        Pop.toast(error)
      }
    })

    return {
      towerEvent: computed(() => AppState.activeEvent),
      tickets: computed(() => AppState.tickets),
      account: computed(() => AppState.account),
      comments: computed(() => AppState.comments),

      async createTicket() {
        try {
          if (!AppState.account.id) {
            Pop.toast("You must login to buy a ticket", "info")
            return
          }
          const ticket = AppState.eventTickets.find(e => e.eventId == route.params.id)
          // NOTE not done here need to make sure they dont already have a ticket
          // Sold out of tickets OR canceled event
        } catch (error) {

        }
      },


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