export const addEventListener = (eventName, handler, el) => {
    el.addEventListener(eventName, handler)
    return handler
}

export const addEventListeners = (listeners = {}, el) => {
    Object.entries(listeners).forEach(([eventName, handler]) => {
      const listener = addEventListener(eventName, handler, el)
      listeners[eventName] = listener
    })
  
    return listeners
}

export const removeEventListeners = (listeners = {}, el) => {
    Object.entries(listeners).forEach(([eventName, handler]) => {
      el.removeEventListener(eventName, handler)
    })
}

export const onClick = f => ({
    type: "event",
    click: f
});