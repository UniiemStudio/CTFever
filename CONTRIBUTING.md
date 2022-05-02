# 贡献指南

## 新增工具

要向 CTFever 添加新工具时，请完善以下信息：

### Javascript 库

`/libs`

自定义的 javascript 库存放在 `/libs` 目录下。命名清晰有辨识度，且不与内置的库名称冲突。

### 元信息

`/store/index.js`

工具的元信息包含了名称、介绍、标签等信息，使得 CTFever 可以对工具进行分类、筛选和更好地展示

`toolkits` 数组包含了工具分类的元信息，元素是一个对象，包含了分类名称、分类简介和工具列表。

`toolkits.tools` 数组包含了工具的元信息，元素是一个对象，包含了工具名称、工具介绍、工具标签和路由。路由必须定义为 `/tools/工具名称(横杠命名)`

它们看起来是这个样子

```javascript
toolkits: [
  {
    title: 'toolkit.EaD.title',
    description: 'toolkit.EaD.desc',
    icon: 'code-outline',
    tools: [
      {
        title: 'tool.ascii.title',
        description: 'tool.ascii.desc',
        route: '/tools/ascii',
        tags: ['字符编码'],
      },
      // ...
    ]
  },
  // ...
]
```

_元信息的任何部分(path 除外)都应使用 i18n 字符串，而不是直接定义内容_

### 国际化 i18n

`/lang/*.js`

`en-US` 是必选项，其他语言可选

### 工具模板

`/pages/tools/工具名称(横杠命名).vue`

每个工具都应使用这个模板开始

```vue

<template>
  <PrimaryContainer>
    <!--  Content  -->
  </PrimaryContainer>
</template>
<script>
export default {
  name: 'component-name',
  head() {
    return {
      title: this.$t("tool.[TOOL_META_NAME].title") + " - " + this.$t("app.name")
    };
  },
}
</script>
```

工具页面中的组件尽量使用 `/components/tool` 下的组件确保统一性

### 提交新工具

推送更改然后 Pull Request 到 UniiemStudio:dev 分支，然后等待我们 review

**感谢每一位可爱的贡献者**
