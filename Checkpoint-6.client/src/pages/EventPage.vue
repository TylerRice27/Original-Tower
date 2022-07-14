<template>
  <div class="event-page card bg-dark m-3">
    <section class="d-flex m-3 row" id="towerEvent">
      <img class="tower-pic img-fluid" :src="towerEvent.coverImg" alt="" />
      <div class="m-3 col-md-4">
        <div
          v-if="towerEvent.isCanceled == true"
          class="bg-danger rounded col-md-3"
        >
          <h6>Cancelled!</h6>
        </div>
        <div v-if="towerEvent.capacity == 0" class="bg-danger rounded col-md-3">
          <h6>Sold Out!</h6>
        </div>
        <h4>{{ towerEvent.name }}</h4>
        <h5 class="text-warning">{{ towerEvent.location }}</h5>
        <h6 class="p-1" v-if="towerEvent.startDate">
          Event Date: {{ formatDate(towerEvent.startDate) }}
        </h6>
        <p class="mt-5">{{ towerEvent.description }}</p>
        <h3 class="mt-5 pt-3">{{ towerEvent.capacity }} Spots Left</h3>
        <button
          v-if="towerEvent.isCanceled"
          class="btn btn-danger mt-5"
          disabled
        >
          Canceled <i class="mdi mdi-thumb-down"></i>
        </button>
        <!-- If it is sold out button goes away -->
        <button
          v-else-if="towerEvent.capacity == 0"
          class="btn btn-primary mt-5"
          disabled
        >
          Sold Out <i class="mdi mdi-thumb-up"></i>
        </button>
        <button v-else-if="isAttending" class="btn btn-warning mt-5" disabled>
          Already Attending <i class="mdi mdi-thumb-up"></i>
        </button>
        <button v-else class="btn btn-primary mt-5" @click="createTicket">
          Attend <i class="mdi mdi-thumb-up"></i>
        </button>

        <!-- canceled, sold out, has ticket, get ticket -->
        <button
          v-show="towerEvent.creatorId == account.id"
          class="btn btn-danger mt-5 ms-5"
          @click="cancelEvent"
        >
          Cancel Event
        </button>
      </div>
    </section>
  </div>
  <p class="m-3 text-white">Who is Attending</p>
  <!-- <div class="row"> -->
  <div>
    <Ticket v-for="t in tickets" :key="t.id" :ticket="t" />
  </div>
  <!-- </div> -->
  <!-- this div is creating the side scroll come back and fix -->
  <div class="row m-4 justify-content-center">
    <form
      v-if="account.id"
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
        v-model="editable.body"
      >
      </textarea>
      <div class="justify-content-end">
        <button class="btn btn-primary mt-2">Create!</button>
      </div>
    </form>
    <Comment class="mt-4" v-for="c in comments" :key="c.id" :comment="c" />
  </div>
</template>

<script>
import { computed, ref, watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import Pop from '../utils/Pop'
import { towerEventsService } from '../services/TowerEventsService'
import { ticketsService } from '../services/TicketsService'
import { AppState } from '../AppState'
import { commentsService } from '../services/CommentsService'
import { logger } from '../utils/Logger'
export default {
  name: 'EventPage',
  setup() {
    const editable = ref({ eventId: '' })
    const route = useRoute()
    watchEffect(async () => {
      try {
        if (route.params.id) {

          AppState.comments = [];
          await commentsService.getComments(route.params.id)
          await towerEventsService.getEvent(route.params.id)
          await ticketsService.getTicketsByEvent(route.params.id)
          editable.value.eventId = route.params.id
        }

      } catch (error) {
        Pop.toast(error)
      }
    })

    return {
      editable,
      towerEvent: computed(() => AppState.activeEvent),
      tickets: computed(() => AppState.tickets),
      account: computed(() => AppState.account),
      comments: computed(() => AppState.comments),



      // Try to finish this function later after writing out my account page

      isAttending: computed(() => AppState.tickets.find(t => AppState.activeEvent.id == t.eventId)),

      // TODO THIS IS ONE OF MY LAST REQUIREMENTS TO PASS
      // AppState.tickets.find(t => t.id == accountId)
      //NOTE have to do this
      // try to find if I have a ticket with this event Id
      // if i do, return true
      // return false
      // accountId == ticket = true


      async createComment() {
        try {
          editable.value.eventId = route.params.id
          await commentsService.createComment(editable.value)
        } catch (error) {
          Pop.toast(error.message)
          logger.error(error)
        }
      },

      async createTicket() {
        try {
          if (!AppState.account.id) {
            Pop.toast("You must login to buy a ticket", "info")
            return
          } else {
            // const ticket = AppState.eventTickets.find(e => e.eventId == route.params.id)
            const ticket = { accountId: AppState.account.id, eventId: route.params.id }
            await ticketsService.createTicket(ticket)
            //This allows the capacity update to the page automatically instead of having to refresh.
            this.towerEvent.capacity--
            Pop.toast("Enjoy the Event", 'success')
          }
          // NOTE not done here need to make sure they don't already have a ticket
          // Sold out of tickets OR canceled event
        } catch (error) {
          Pop.toast(error.message)
          logger.error(error)
        }
      },

      async cancelEvent() {
        try {
          const res = await towerEventsService.cancelEvent(route.params.id)

        } catch (error) {
          Pop.toast(error.message)
          logger.error(error)
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