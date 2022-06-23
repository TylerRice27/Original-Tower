<template>
  <form id="towerEvent-form">
    <div class="col-md-12 d-flex justify-content-center m-2">
      <label>Event Name:</label>
      <input v-model="editable.name" type="text" required />
    </div>
    <div class="col-md-12 d-flex justify-content-center m-2">
      <label>Event Description:</label>
      <input v-model="editable.description" type="text" required />
    </div>
    <div class="col-md-12 d-flex justify-content-center m-2">
      <label>Cover Image:</label>
      <input v-model="editable.coverImg" type="text" required />
    </div>
    <div class="col-md-12 d-flex justify-content-center m-2">
      <label>Location:</label>
      <input v-model="editable.location" type="text" required />
    </div>
    <div class="col-md-12 d-flex justify-content-center m-2">
      <label>Capacity:</label>
      <input v-model="editable.capacity" type="number" required />
    </div>
    <div class="col-md-12 d-flex justify-content-center m-2">
      <label>Date:</label>
      <input v-model="editable.startDate" type="date" />
    </div>
    <div class="col-md-12 d-flex justify-content-center m-2">
      <label>Type:</label>
      <select name="" id="">
        <option value="">Concert</option>
        <option value="">Convention</option>
        <option value="">Sport</option>
        <option value="">Digital</option>
      </select>
    </div>
    <button type="button" @click="createTowerEvent">Create Event!</button>
  </form>
</template>


<script>
import { ref } from '@vue/reactivity'
import Pop from '../utils/Pop'
import { towerEventsService } from '../services/TowerEventsService'
import { Modal } from 'bootstrap'
export default {
  props: { towerEvent: { type: Object, required: false } },
  setup(props) {
    const editable = ref({})
    return {
      editable,
      async createTowerEvent() {
        try {
          await towerEventsService.createTowerEvent(editable.value)
          Modal.getOrCreateInstance(document.getElementById('create-towerEvent')).hide()
          Pop.toast('Event Created!')
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>