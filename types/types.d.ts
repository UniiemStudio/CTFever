type Toolkit = {
    key: string,
    icon: string,
    tools: Tool[]
}

type Tool = {
    key: string
    route: string
    tags?: Tag[]
}

type Tag = {
    key: string
}
