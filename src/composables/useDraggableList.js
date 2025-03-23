import { ref } from "vue"

export function useDraggableList(initialItems, options = {}) {
  const { itemHeight = 110 } = options

  const items = ref(initialItems)
  const isDragging = ref(false)
  const dragIndex = ref(-1)
  const targetIndex = ref(-1)
  const startY = ref(0)
  const offset = ref(0)

  const addGlobalListeners = () => {
    window.addEventListener("touchend", onTouchEnd)
    window.addEventListener("touchcancel", onTouchEnd)
  }

  const removeGlobalListeners = () => {
    window.removeEventListener("touchend", onTouchEnd)
    window.removeEventListener("touchcancel", onTouchEnd)
  }

  const getTargetIndex = (index, deltaY) => {
    const targetIndex = index + Math.round(deltaY / itemHeight)
    const minBound = Math.max(0, targetIndex)
    const maxIndex = items.value.length - 1
    return Math.min(maxIndex, minBound)
  }

  const reset = () => {
    isDragging.value = false
    dragIndex.value = -1
    targetIndex.value = -1
    startY.value = 0
    offset.value = 0

    removeGlobalListeners()
  }

  const onTouchStart = (event, index) => {
    const y = event.touches[0].clientY

    isDragging.value = true
    startY.value = y
    offset.value = 0
    dragIndex.value = index
    targetIndex.value = index

    addGlobalListeners()
  }

  const onTouchMove = (event, index) => {
    const y = event.touches[0].clientY

    if (!isDragging.value) {
      return
    }

    if (dragIndex.value !== index) {
      return
    }

    const deltaY = y - startY.value
    const minOffsetY = -dragIndex.value * itemHeight
    const maxOffsetY = (items.value.length - 1 - dragIndex.value) * itemHeight

    let nextDeltaY = deltaY
    if (deltaY < minOffsetY) {
      nextDeltaY = minOffsetY
    } else if (deltaY > maxOffsetY) {
      nextDeltaY = maxOffsetY
    }

    targetIndex.value = getTargetIndex(dragIndex.value, nextDeltaY)
    offset.value = nextDeltaY
  }

  const onTouchEnd = () => {
    if (!isDragging.value) {
      return
    }

    if (targetIndex.value !== dragIndex.value) {
      const temp = items.value[dragIndex.value]
      items.value.splice(dragIndex.value, 1)
      items.value.splice(targetIndex.value, 0, temp)
    }

    reset()
  }

  const getItemStyle = (index) => {
    if (!isDragging.value) {
      return {}
    }

    if (dragIndex.value === index) {
      return {
        border: "2px dashed gray",
        transform: `translateY(${offset.value}px)`,
        transition: "none",
        opacity: 0.7,
        zIndex: 10
      }
    }

    const minIndex = Math.min(dragIndex.value, targetIndex.value)
    const maxIndex = Math.max(dragIndex.value, targetIndex.value)

    if (minIndex <= index && index <= maxIndex) {
      const direction = targetIndex.value > dragIndex.value ? -1 : 1
      return {
        transform: `translateY(${direction * itemHeight}px)`,
        transition: isDragging.value ? "transform 0.15s ease-out" : "transform 0.3s ease-out",
        zIndex: 5
      }
    }

    return {
      transform: "translateY(0px)",
      transition: "transform 0.3s ease-out",
      zIndex: 1
    }
  }

  return {
    items,
    onTouchStart,
    onTouchMove,
    getItemStyle
  }
}