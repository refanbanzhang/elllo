import { ref } from "vue"
import playerStore from "@/stores/player"

interface SpeedOption {
  label: string
  value: number
}

const sleepTimerOptions: SpeedOption[] = [
  { label: "1分钟", value: 1 },
  { label: "10分钟", value: 10 },
  { label: "30分钟", value: 30 },
  { label: "60分钟", value: 60 },
  { label: "90分钟", value: 90 },
  { label: "120分钟", value: 120 },
  { label: "150分钟", value: 150 },
]

const { pause } = playerStore

const sleepTimer = ref(0)
const remainingTime = ref(0)
const sleepTimerInterval = ref(0)

const saveSleepTimerState = () => {
  localStorage.setItem("sleepTimer", sleepTimer.value.toString())
  localStorage.setItem("remainingTime", remainingTime.value.toString())
}

const startSleepTimer = (useStoredTime: boolean = false) => {
  if (sleepTimerInterval.value) {
    clearInterval(sleepTimerInterval.value)
  }

  if (!useStoredTime) {
    // 转换为秒
    remainingTime.value = sleepTimer.value * 60
  }

  // 每秒更新一次剩余时间
  sleepTimerInterval.value = window.setInterval(() => {
    remainingTime.value -= 1
    if (remainingTime.value <= 0) {
      clearInterval(sleepTimerInterval.value)
      pause() // 时间到暂停播放
      sleepTimer.value = 0 // 重置定时器
    }
  }, 1000)
}

const setSleepTimer = (minutes: number) => {
  sleepTimer.value = minutes
  startSleepTimer()
  saveSleepTimerState()
}

const clearSleepTimer = () => {
  if (sleepTimerInterval.value) {
    clearInterval(sleepTimerInterval.value)
  }
  sleepTimer.value = 0
  remainingTime.value = 0
}

// 从本地存储中恢复定时器状态
const restoreSleepTimer = () => {
  const savedTimer = localStorage.getItem("sleepTimer")
  const savedRemainingTime = localStorage.getItem("remainingTime")

  if (savedTimer && savedRemainingTime) {
    sleepTimer.value = Number(savedTimer)
    remainingTime.value = Number(savedRemainingTime)

    if (remainingTime.value > 0) {
      startSleepTimer(true)
    }
  }
}

restoreSleepTimer()

window.addEventListener("beforeunload", saveSleepTimerState)

export default {
  sleepTimerOptions,
  sleepTimer,
  remainingTime,
  setSleepTimer,
  clearSleepTimer,
}
