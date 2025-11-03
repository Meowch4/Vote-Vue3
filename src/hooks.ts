import { onMounted, onUnmounted, ref } from 'vue'
import { useVoteStore } from './stores/vote'
import { useRoute, useRouter } from 'vue-router'

export function useSelectOne() {
  var selectedIdx = ref(-1)

  function setSelect(idx: number) {
    if (selectedIdx.value == idx) {
      selectedIdx.value = -1
    } else {
      selectedIdx.value = idx
    }
  }

  return [selectedIdx, setSelect] as const 
  // 如果不as const,则这个数组的类型会被推导为(xxx|yyy)[],
  // 解构出的第一项就是xxx|yyy
}

export function useLogin() {
  var voteStore = useVoteStore()
  var router = useRouter()
  var route = useRoute()

  if (voteStore.user == null) {
    router.replace('/login?next=' + route.fullPath)
    return false 
  }

  return true
}

var sizeRef:any = ref({
  width: window.innerWidth,
  height: window.innerHeight,
})

var listened = false

function resize(){
  sizeRef.value.width = window.innerWidth
  sizeRef.value.height = window.innerHeight
}

export function useWindowSize() {
  if (!listened) {
    onMounted(() => {
      listened = true
      window.addEventListener('resize', resize)
    })
    onUnmounted(() => {
      listened = false
      window.removeEventListener('resize', resize)
    })
  }

  return sizeRef
}