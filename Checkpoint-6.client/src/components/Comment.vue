<template>
  <div class="card row elevation-2 bg-dark text-white m-3 p-2">
    <h2 class="d-flex">
      <img
        class="profile-img img-fluid rounded-pill ms-2 selectable me-2"
        :src="comment.creator.picture"
        alt="User profile pic"
      />
      {{ comment.creator.name }}
    </h2>
    <div class="col-md-12 d-flex">
      <h4 class="bord bg-white p-2 m-2 text-black">{{ comment.body }}</h4>
    </div>
    <div class="d-flex justify-content-end">
      <button
        type="button"
        v-show="comment.creatorId == account.id"
        class="
          me-2
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
        <i class="mdi mdi-delete-forever">Delete</i>
      </button>
    </div>
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






      // come back to this later
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
.profile-img {
  width: 125px;
  height: 125px;
}

.bord {
  border: solid;
  border-color: #282828;
  border-width: 3px;
}
</style>