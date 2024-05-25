type Toolkit = {
  key: string,
  icon: string,
  tools: Tool[]
}

type Tool = {
  key: string
  route: string
  tags: Tag[],
  signatures?: string[]
}

type Tag = {
  key: string
}

/*
 * Electron
 */
interface Setting<T> {
  key: string
  value: T
}
