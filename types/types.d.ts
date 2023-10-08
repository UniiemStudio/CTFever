type Toolkit = {
    title: string,
    description: string,
    icon: string,
    tools: Tool[]
}

type Tool = {
    label: 'meta.title' | string
    description: 'meta.description' | string
    route: string
    tags?: Tag[]
}

type Tag = {
    label: string
    description: string
}
