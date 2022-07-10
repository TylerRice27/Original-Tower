<template>
  <div>
    <div class="about text-end">
      <img class="rounded-pill m-3" :src="account.picture" alt="" />
    </div>
    <section id="account-events">
      <!-- <h5>My Events</h5> -->
      <div id="events-container"></div>
    </section>
    <section id="event-tickets">
      <h5 class="this text-white">My Tickets for attending Events</h5>
      <div class="row">
        <!-- <TowerEvent
        v-for="t in towerEvents"
        :key="t.id"
        :towerEvent="t.event"
        class="col-md-4 ms-5 selectable"
      /> -->

        <div
          class="col-md-4 this card bg-dark text-center mt-4"
          v-for="t in towerEvents"
          :key="t.id"
        >
          <div class="col-md-12 p-2">
            <img
              class="ticket-image img-fluid"
              :src="t.event.coverImg"
              alt=""
            />
            <h6 class="p-1">Name</h6>
            {{ t.event?.name }}
            <h6 class="p-1 pt-2">Description</h6>
            {{ t.event?.description }}
            <h6 class="p-1 pt-2">Event Date</h6>

            {{ formatDate(t.event?.startDate) }}
          </div>
          <button @click="deleteTicket(t.id)" class="btn btn-danger">
            Refund Ticket
          </button>
        </div>
      </div>
      <!-- {{ towerEvents }} -->
      <div class="events-container"></div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { AppState } from "../AppState";
import { accountService } from "../services/AccountService";
import Pop from "../utils/Pop";
import { towerEventsService } from "../services/TowerEventsService";
import { useRouter } from "vue-router";
import { ticketsService } from "../services/TicketsService";
import { logger } from "../utils/Logger";

export default {
  name: "Account",

  setup(props) {
    // const route = useRouter()
    onMounted(async () => {
      try {
        await accountService.getMyTickets();
        // await towerEventsService.getEvents()
        // await towerEventsService.getEvent(route.props.id)
      } catch (error) {
        Pop.error(error);
      }
    });
    return {
      // selectTowerEvent() {
      //   route.push({ name: 'EventDetails', params: { id: props.towerEvent.id } })
      // },
      async deleteTicket(ticketId) {
        try {
          debugger;
          // if (await Pop.confirm('Cancel Ticket?', 'are you sure?', 'info', 'yes delete it'))
          {
            await ticketsService.deleteTicket(ticketId);
          }
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
      formatDate(rawDate) {
        let time = new Date(rawDate);
        // let month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(time)
        let day = time.toDateString();
        // let year = time.getUTCFullYear()
        return ` ${day}`;
      },

      account: computed(() => AppState.account),
      tickets: computed(() => AppState.tickets),
      // myTickets: computed(() => AppState.accountTickets),
      // this one allows my tickets with no info on it
      towerEvents: computed(() => AppState.accountTickets),
      // this one allows info on it but wont show any ticket info
      // on the screen
      // towerEvents: computed(() => AppState.events)
    };
  },
};
</script>

<style scoped>
@media (min-width: 786px) {
  .this {
    max-width: 500px;
    margin-left: 50px;
  }
  .ticket-image {
    max-height: 250px;
    min-width: 450px;
  }
}
@media (min-width: 786px) {
  .this {
    max-width: 500px;
    margin-left: 50px;
  }
  .ticket-image {
    max-height: 250px;
    min-width: 450px;
  }
}
</style>
