import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

type User = {
  avatar: string,
  name: string,
  userId: number | string,
}

export const useVoteStore = defineStore('voteStore', () => {
  const user = ref<null | User>(null)

  async function getUserInfo() {
    try {
      var userInfo = await axios.get('/account/current-user')
      user.value = userInfo.data.result
    } catch (e: any) {
      if (e.isAxiosError) {
        console.log('user not login.')
      } else {
        throw e
      }
    }
  }

  return { user, getUserInfo }
})
