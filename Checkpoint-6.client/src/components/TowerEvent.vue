<template>
  <div
    class="event-card card m-1"
    @click="selectTowerEvent"
    :style="`background-image: url(${towerEvent.coverImg});`"
  >
    <!-- this is not my image anymore not is on my background image -->
    <!-- <img class="img-fluid" :src="towerEvent.coverImg" alt="" /> -->
    <div class="text-block">
      <h5>{{ towerEvent.name }}</h5>
      <p>{{ towerEvent.description }}</p>
      <p>{{ towerEvent.location }}</p>
      <p>{{ towerEvent.startDate }}</p>
      <div class="text-end">
        <p>{{ towerEvent.capacity }}</p>
      </div>
      <!-- come back to this to fix the sold out tag not working -->
      <div v-if="towerEvent.capacity == 0" class="bg-danger rounded">
        <h6>Sold Out!</h6>
      </div>
      <div v-if="towerEvent.isCanceled == true" class="bg-danger rounded">
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
.text-block {
  background-color: black;
  color: white;
  padding-left: 20px;
  padding-right: 20px;
}
</style>