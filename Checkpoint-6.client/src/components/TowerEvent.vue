<template>
  <div
    class="event-card card m-2 border-dark elevation-5"
    @click="selectTowerEvent"
    :style="`background-image: url(${towerEvent.coverImg});`"
  >
    <!-- this is not my image anymore not is on my background image -->
    <!-- <img class="img-fluid" :src="towerEvent.coverImg" alt="" /> -->
    <div class="text-block p-2">
      <h5>{{ towerEvent.name }}</h5>
      <p class="m-0">{{ towerEvent.location }}</p>
      <p class="m-0" v-if="towerEvent.startDate">
        {{ formatDate(towerEvent.startDate) }}
      </p>
      <p class="m-0 capitalize">{{ towerEvent.type }}</p>
      <div class="text-end">
        <p>{{ towerEvent.capacity }}</p>
      </div>
      <!-- come back to this to fix the sold out tag not working -->
      <div v-if="towerEvent.capacity == 0" class="bg-danger p-1 rounded">
        <h6>Sold Out!</h6>
      </div>
      <div v-if="towerEvent.isCanceled == true" class="bg-danger p-1 rounded">
        <h6>Cancelled!</h6>
      </div>
    </div>
  </div>
</template>


<script>

import { useRouter } from 'vue-router'

export default {
  props: { towerEvent: { type: Object, required: true } },
  setup(props) {
    const router = useRouter()

    return {

      selectTowerEvent() {
        router.push({ name: 'EventDetails', params: { id: props.towerEvent.id } })
      },


      formatDate(rawDate) {
        let time = new Date(rawDate)
        // let month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(time)
        let day = time.toDateString()
        // let year = time.getUTCFullYear()
        return ` ${day}`
      }



      // come back later to figure out how to format the date
      // time() {
      // towerEvent.startDate = formatDate.toDateString()

      //  moment().format("MMM DD YY");
    }
  }
}




</script>


<style lang="scss" scoped>
.event-card {
  background-position: center;
  background-clip: border-box;
  background-size: cover;
}
.text-block {
  background: rgb(0, 0, 0); /* Fallback color */
  background: rgba(0, 0, 0, 0.5); /* Black background with 0.5 opacity */
  color: #f1f1f1;
  margin-top: 144px;
  padding: 2px;
  position: bottom;
}

.capitalize {
  text-transform: capitalize;
}

// .text-block {
//   background-color: rgb(0, 0, 0); /* Fallback color */
//   background-color: rgba(0, 0, 0, 0.4); /* Black w/opacity/see-through */
//   color: white;
//   font-weight: bold;
//   border: 3px solid #f1f1f1;
//   z-index: 2;
//   text-align: center;
// }

// .text-block {
//   background-color: black;
//   color: white;
//   padding-left: 20px;
//   padding-right: 20px;
// }
</style>