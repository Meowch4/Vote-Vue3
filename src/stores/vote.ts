import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useVoteStore = defineStore('voteStore', () => {
  const user = ref(null)

  async function getUserInfo() {
    try {
      var userInfo = await axios.get('/account/current-user')
      user.value = userInfo.data
    } catch (e) {
      if (e.isAxiosError) {
        console.log('user not login.')
      } else {
        throw e
      }
    }
  }

  return { user, getUserInfo }
})
