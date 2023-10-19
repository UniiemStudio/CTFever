export const debouncedRef = <T>(value: T, delay: number = 1000) => {
  return customRef<T>((track, trigger) => {
    let timeout: any
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      }
    }
  })
}