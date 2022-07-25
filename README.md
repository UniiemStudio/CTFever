# CTFever - A Toolkit for CTF fevers

![CTFever](https://socialify.git.ci/UniiemStudio/CTFever/image?description=1&descriptionEditable=A%20fantastic%20toolkit%20for%20CTFers%20and%20everyone.&font=KoHo&issues=1&logo=https%3A%2F%2Fraw.githubusercontent.com%2FUniiemStudio%2FCTFever%2Fmain%2Fstatic%2Ficon.svg&owner=1&pattern=Floating%20Cogs&pulls=1&stargazers=1&theme=Light)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/UniiemStudio/CTFever/ci)
![GitHub commit activity](https://img.shields.io/github/commit-activity/w/UniiemStudio/CTFever)
![wakatime](https://wakatime.com/badge/user/589c46ee-6ba6-403c-bc9f-3a7aef5b206c/project/c477b34d-85f2-4fe0-b7c8-f74639d78dda.svg)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FUniiemStudio%2FCTFever.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FUniiemStudio%2FCTFever?ref=badge_shield)

---
> ### **近日训练学习任务繁重，可能更新较迟缓，欢迎大家加入我们的开发，欢迎 Pull Request**
---

## 简介

**CTFever** (CTF Fevers) 是为 CTF [(什么是CTF?)](https://baike.baidu.com/item/CTF) 发烧者准备的的常用工具套件，助你过关斩将、攻克难关。

## 使用

没有其他步骤，[马上开始使用](https://ctfever.uniiem.com/)

## 工具清单 & ToDo List

✅ **完成**
🧪 **试验性**
🚧 **进行中**
⏰ **未开始**
❌ **已取消**

| 工具                                                             | 状态  | 工具                                                        | 状态  | 工具                                                           | 状态  |
|----------------------------------------------------------------|:---:|-----------------------------------------------------------|:---:|--------------------------------------------------------------|-----|
| [ASCII](https://ctfever.uniiem.com/tools/ascii)                |  ✅  | [URL 编码](https://ctfever.uniiem.com/tools/url-encoding)   |  ✅  | [Base64](https://ctfever.uniiem.com/tools/base-series)       | ✅   |
| [ROT13](https://ctfever.uniiem.com/tools/rot-series)           |  ✅  | [摩尔斯码](https://ctfever.uniiem.com/tools/morse-code)       |  ✅  | [UUID 生成校验](https://ctfever.uniiem.com/tools/uuid-generator) | ✅   |
| [摘要哈希计算](https://ctfever.uniiem.com/tools/message-digest)      |  ✅  | [凯撒密码](https://ctfever.uniiem.com/tools/caesar-cipher)    |  ✅  | [栅栏密码](https://ctfever.uniiem.com/tools/rail-fence-cipher)   | 🧪  |
| [猪圈密码](https://ctfever.uniiem.com/tools/pigpen)                |  ✅  | [维吉尼亚密码](https://ctfever.uniiem.com/tools/vigenereCipher) |  ✅  | [Pyc 反编译](https://ctfever.uniiem.com/tools/pyc-decompiler)   | 🧪  |
| [JSFuck](https://ctfever.uniiem.com/tools/jsfuck)              |  ✅  | [BrainFuck](https://ctfever.uniiem.com/tools/brain-fuck)  |  ✅  | [IP 归属地](https://ctfever.uniiem.com/tools/ip-geo)            | ✅   |
| [进制转换](https://ctfever.uniiem.com/tools/radix-conversion)      |  ✅  | [时间戳转换](https://ctfever.uniiem.com/tools/timestamp)       |  ✅  | [串口调试器](https://ctfever.uniiem.com/tools/serial)             | ✅   |
| [CRC 计算](https://ctfever.uniiem.com/tools/crc-checksum)        |  ✅  | Base64 图片转换                                               |  ⏰  | 与佛伦禅                                                         | ❌   |
| [核心价值观密码](https://ctfever.uniiem.com/tools/core-values-cipher) |  ✅  | [端口分析](https://ctfever.uniiem.com/tools/port-scan)        | 🧪  | [Binwalk 分析](https://ctfever.uniiem.com/tools/bin-extractor) | 🧪  |
| [UTF-8 转换](https://ctfever.uniiem.com/tools/utf8-conversion)   |  ✅  | 字典生成工具                                                    |  ⏰  | 盲水印提取                                                        | ⏰   |

## 截图

![首页](static/screenshots/screenshot_home.png)

![时间戳转换工具](static/screenshots/screenshot_timestamp.png)

## 特色

* 条理性，对 CTF 中常见的题型需要使用到的工具进行了分类
* 亲和力，UI 现代化，流畅简约，考虑用户的感受
* 积极性，开发团队活跃，频繁更新
* 互动性，接受用户的反馈和建议，第一时间做出合理更改
* 可定制，无服务器部分开源，可自由修改、定制 *(遵循 GPLv3 协议)*

## 目标和下一步计划

CTFever 的目标是涵盖大部分 CTF 题型所需要的工具。

~下一步我们将着手开发如 **pyc 在线反编译** 、**在线执行 binwalk** 、**端口分析工具** 等依赖服务器运行的特色功能，并逐步释出更新，尽情期待！~

目前基础功能和一部分高级功能已经完成，工具库仍在逐渐扩大中

## Stargazers 趋势

[![Stargazers over time](https://starchart.cc/UniiemStudio/CTFever.svg)](https://starchart.cc/UniiemStudio/CTFever)

## 贡献

### 开发环境和部署

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate

# or build docker image
$ docker build -t ctfever .
```

### [贡献指南](https://github.com/UniiemStudio/CTFever/blob/main/CONTRIBUTING.md)

### 捐赠

[![](static/readme/afdian.jpg)](https://afdian.net/@hoshino_suzumi)

## License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FUniiemStudio%2FCTFever.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FUniiemStudio%2FCTFever?ref=badge_large)
