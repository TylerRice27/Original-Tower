<template>
  <div class="card elevation-2 text-dark m-3 p-2">
    <h2 class="d-flex text-end">
      <img
        class="profile-img selectable me-2"
        :src="comment.creator.picture"
        alt="User profile pic"
      />
      {{ comment.creator.name }}
    </h2>

    <h6>{{ comment.body }}</h6>
    <div class="d-flex justify-content-between col-md-12"></div>
    <button
      v-show="comment.creatorId == account.id"
      class="
        delete-button
        col-md-1
        btn
        trash
        btn-danger
        rounded-pill
        selectable
      "
      @click="removeComment"
    >
      <i class="mdi mdi-delete-forever"></i>
    </button>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { AppState } from '../AppState'
import { commentsService } from '../services/CommentsService'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
export default {
  props: { comment: { type: Object, required: true } },
  setup(props) {
    const router = useRouter()
    return {
      account: computed(() => AppState.account),


      async removeComment() {
        try {
          if (await Pop.confirm("Do you want to Delete?")) {
            await commentsService.removeComment(props.comment.id);
          }
        } catch (error) {
          Pop.toast(error.message, 'error')
          logger.error(error)
        }
      }

    }
  }
}
</script>


<style lang="scss" scoped>
</style>