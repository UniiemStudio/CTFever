# 贡献指南

我们欢迎任何人与我们一起共建这个项目，包括但不限于新的功能、Bug 修复、国际化、改进文档等。

## 如何开始

1. Fork 这个仓库
2. 创建新的分支 `git checkout -b feat-new-feature`
3. 安装依赖（我们使用 [bun](https://bun.sh/docs/cli/install) 作为包管理器） `bun install`
4. 运行开发服务器 `bun run dev`
5. 在浏览器中打开 `http://localhost:3000`

## 项目结构

_此处对该项目特定的结构进行解释，未提及部分参阅 [Nuxt 官方文档](https://nuxt.com/docs/guide/directory-structure/app)_

- `pages/tools` - 工具页面的 Vue 组件
- `content/intro` - 工具页面的说明文档，支持多语言
- `libs` - 拓展的工具函数

## 新建工具

### 工具页面

> 为了保证页面的一致性，请使用下面的模板来创建新的工具页面

在 `pages/tools` 中新建一个 Vue 组件，使用小写字母和短横线命名，并使用下面的模板开始

```vue

<script lang="ts" setup>
  const { t } = useI18n({ useScope: 'local' })
  useSeoMeta({ title: t('title') })
</script>

<template>
  <ToolContainer>
    <!-- 页面内容 -->

    <!-- 工具说明和相关链接，references 属性可选 -->
    <IntroDocument
      :references="[
        { name: '引用链接', url: 'https://address' }
      ]"
    />
  </ToolContainer>
</template>

<i18n>
  en:
    title: "Tool Name"
    # other translations
  zh:
    title: "工具名称"
    # other translations
</i18n>
```

### 国际化(i18n)

> CTFever 是面向全球用户的项目，为了让用户更好地使用工具，我们需要提供多语言翻译
>
> CTFever 使用 [nuxt-i18n](https://i18n.nuxtjs.org/) 来实现多语言翻译

工具页面模板中的 `<i18n>` 标签用于定义页面的标题和其他文本的多语言翻译，其中 `en` 为英文，`zh` 为中文。

**示例**

```yaml
en:
  foo:
    bar: "baz"
zh:
  foo:
    bar: "巴兹"
```

如此定义后，可以在 Vue 组件中使用 `t('foo.bar')` 来获取对应的文本。

### 工具说明文档

> 为了让用户更好地了解工具的使用方法和相关信息，我们需要尽可能提供工具的说明文档

在 `content/intro` 中新建一个 Markdown 文件，文件名为 `工具页面名称.[zh/en].md`

