<template>
  <form class="m-2" @submit.prevent="createTowerEvent" id="towerEvent-form">
    <div class="mb-3">
      <label>Event Name</label>
      <input
        class="form-control"
        v-model="editable.name"
        type="text"
        required
      />
    </div>
    <div class="mb-3">
      <label>Event Description</label>
      <input
        class="form-control"
        v-model="editable.description"
        type="text"
        required
      />
    </div>
    <div class="mb-3">
      <label>Cover Image</label>
      <input
        class="form-control"
        v-model="editable.coverImg"
        type="text"
        required
      />
    </div>
    <div class="mb-3">
      <label>Location</label>
      <input
        class="form-control"
        v-model="editable.location"
        type="text"
        required
      />
    </div>
    <div class="mb-3">
      <label>Capacity</label>
      <input
        class="form-control"
        v-model="editable.capacity"
        type="number"
        required
      />
    </div>
    <div class="mb-3">
      <label>Date</label>
      <input
        class="form-control"
        v-model="editable.startDate"
        type="date"
        required
      />
    </div>
    <div class="mb-3">
      <label>Type</label>
      <select class="form-control" v-model="editable.type" required>
        <option value="concert">Concert</option>
        <option value="convention">Convention</option>
        <option value="sport">Sport</option>
        <option value="digital">Digital</option>
      </select>
    </div>
    <button class="btn btn-primary m-1">Create Event!</button>
    <!-- </div> -->
  </form>
</template>


<script>
import { ref } from '@vue/reactivity'
import Pop from '../utils/Pop'
import { towerEventsService } from '../services/TowerEventsService'
import { Modal } from 'bootstrap'
import { useRouter } from 'vue-router'
import { AppState } from '../AppState'
export default {
  setup() {
    const editable = ref({})
    const router = useRouter()
    return {
      editable,
      async createTowerEvent() {
        try {
          // NOTE I need to get something back from this method... I should alias it out
          const tEvent = await towerEventsService.createTowerEvent(editable.value)
          Modal.getOrCreateInstance(document.getElementById('create-towerEvent')).hide()
          router.push({ name: 'EventDetails', params: { id: tEvent.id } })
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