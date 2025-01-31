const popupStack: string[] = []

export const getTopPopupId = () => popupStack[popupStack.length - 1]

export const push = () => {
  const popupId = Math.random().toString(36).substring(2, 15)
  popupStack.push(popupId)
  return popupId
}

export const pop = () => {
  popupStack.pop()
}