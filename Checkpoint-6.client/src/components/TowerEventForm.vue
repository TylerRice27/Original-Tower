<template>
  <form id="towerEvent-form">
    <label>Event Name</label>
    <input v-model="editable.name" type="text" required />
    <label>Event Description</label>
    <input v-model="editable.description" type="text" required />
    <label>Cover Image</label>
    <input v-model="editable.coverImg" type="text" required />
    <label>Capacity</label>
    <input v-model="editable.capacity" type="number" required />
    <label>Date</label>
    <input v-model="editable.startDate" type="date" />
    <label>Type</label>
    <select name="" id="">
      <option value="">Concert</option>
      <option value="">Convention</option>
      <option value="">Sport</option>
      <option value="">Digital</option>
    </select>
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