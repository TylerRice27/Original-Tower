<template>
  <form class="m-2" @submit.prevent="editAccount" id="editAccount-form">
    <div class="mb-3">
      <label>Account Name</label>
      <input
        class="form-control"
        v-model="editable.name"
        type="text"
        required
      />
    </div>
    <div class="mb-3">
      <label>Account Image</label>
      <input class="form-control" v-model="editable.img" type="text" required />
    </div>
    <button class="btn btn-primary">Save Changes!</button>
  </form>
</template>


<script>
import { ref } from '@vue/reactivity'
import { accountService } from '../services/AccountService'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      async editAccount() {
        try {
          await accountService.editAccount(editable.value);

        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>