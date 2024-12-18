export const setAttributes = (el, attrs) => {
    const { class: className, style, ...otherAttrs } = attrs

    if (className) {
        setClass(el, className)
    }

    if (style) {
        Object.entries(style).forEach(([prop, value]) => {
            setStyle(el, prop, value)
        })
    }

    for (const [name, value] of Object.entries(otherAttrs)) {
        setAttribute(el, name, value)
    }
}

const setClass = (el, className) => {
    el.className = ''
  
    if (typeof className === 'string') {
      el.className = className
    }
  
    if (Array.isArray(className)) {
      el.classList.add(...className)
    }
}

export const setStyle = (el, name, value) => {
    el.style[name] = value
}
  
export const removeStyle = (el, name) => {
    el.style[name] = null
}

export const setAttribute = (el, name, value) => {
    if (value == null) {
        removeAttribute(el, name)
    } else if (name.startsWith('data-')) {
        el.setAttribute(name, value)
    } else {
        el[name] = value
    }
}

export const removeAttribute = (el, name) => {
    el[name] = null
    el.removeAttribute(name)
}