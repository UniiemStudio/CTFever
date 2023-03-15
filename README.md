# CTFever - A Toolkit for CTF fevers

![CTFever](https://socialify.git.ci/UniiemStudio/CTFever/image?description=1&descriptionEditable=A%20fantastic%20toolkit%20for%20CTFers%20and%20everyone.&font=KoHo&issues=1&logo=https%3A%2F%2Fgithub.com%2FUniiemStudio%2FCTFever%2Fraw%2Fmain%2Fstatic%2Ficon.png&name=1&owner=1&pulls=1&stargazers=1&theme=Light)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/UniiemStudio/CTFever/ci)
![GitHub commit activity](https://img.shields.io/github/commit-activity/w/UniiemStudio/CTFever)
![wakatime](https://wakatime.com/badge/user/589c46ee-6ba6-403c-bc9f-3a7aef5b206c/project/c477b34d-85f2-4fe0-b7c8-f74639d78dda.svg)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FUniiemStudio%2FCTFever.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FUniiemStudio%2FCTFever?ref=badge_shield)

## 计划更新
**Major Update** 计划于 `2023-03-11 09:30 - 2023-03-11 15:00 (UTC+08:00)` 对后端服务器进行计划停机并升级新的后端系统，部分工具 UI 将重构。

本次更新后将继续跟进 Todo List 中待完成工具的开发。

## 简介

**CTFever** (CTF Fevers) 是为 CTF [(什么是 CTF?)](https://baike.baidu.com/item/CTF) 发烧者准备的的常用工具套件，助你过关斩将、攻克难关。

## 使用

没有其他步骤，[马上开始使用](https://ctfever.uniiem.com/)

## 工具清单 & ToDo List

✅ **完成**
🧪 **试验性**
🚧 **进行中**
⏰ **未开始**
❌ **已取消**

| 工具                                                                  | 状态 | 工具                                                            | 状态 | 工具                                                             | 状态 |
| --------------------------------------------------------------------- | :--: | --------------------------------------------------------------- | :--: | ---------------------------------------------------------------- | ---- |
| [ASCII](https://ctfever.uniiem.com/tools/ascii)                       |  ✅  | [URL 编码](https://ctfever.uniiem.com/tools/url-encoding)       |  ✅  | [Base64](https://ctfever.uniiem.com/tools/base-series)           | ✅   |
| [ROT13](https://ctfever.uniiem.com/tools/rot-series)                  |  ✅  | [摩尔斯码](https://ctfever.uniiem.com/tools/morse-code)         |  ✅  | [UUID 生成校验](https://ctfever.uniiem.com/tools/uuid-generator) | ✅   |
| [摘要哈希计算](https://ctfever.uniiem.com/tools/message-digest)       |  ✅  | [凯撒密码](https://ctfever.uniiem.com/tools/caesar-cipher)      |  ✅  | [栅栏密码](https://ctfever.uniiem.com/tools/rail-fence-cipher)   | 🧪   |
| [猪圈密码](https://ctfever.uniiem.com/tools/pigpen)                   |  ✅  | [维吉尼亚密码](https://ctfever.uniiem.com/tools/vigenereCipher) |  ✅  | [Pyc 反编译](https://ctfever.uniiem.com/tools/pyc-decompiler)    | 🧪   |
| [JSFuck](https://ctfever.uniiem.com/tools/jsfuck)                     |  ✅  | [BrainFuck](https://ctfever.uniiem.com/tools/brain-fuck)        |  ✅  | [IP 归属地](https://ctfever.uniiem.com/tools/ip-geo)             | ✅   |
| [进制转换](https://ctfever.uniiem.com/tools/radix-conversion)         |  ✅  | [时间戳转换](https://ctfever.uniiem.com/tools/timestamp)        |  ✅  | [串口调试器](https://ctfever.uniiem.com/tools/serial)            | ✅   |
| [CRC 计算](https://ctfever.uniiem.com/tools/crc-checksum)             |  ✅  | Base64 图片转换                                                 |  ⏰  | 与佛伦禅                                                         | ❌   |
| [核心价值观密码](https://ctfever.uniiem.com/tools/core-values-cipher) |  ✅  | [端口分析](https://ctfever.uniiem.com/tools/port-scan)          |  🧪  | [Binwalk 分析](https://ctfever.uniiem.com/tools/bin-extractor)   | 🧪   |
| [UTF-8 转换](https://ctfever.uniiem.com/tools/utf8-conversion)        |  ✅  | 字典生成工具                                                    |  ⏰  | 盲水印提取                                                       | ⏰   |
| 云影密码                                                              |  🚧  | Wireshark 键盘输入数据提取                                      |  ⏰  |                                                                  |      |

## 截图

![首页](static/screenshots/screenshot_home.png)

![时间戳转换工具](static/screenshots/screenshot_timestamp.png)

## 特色

- 条理性，对 CTF 中常见的题型需要使用到的工具进行了分类
- 亲和力，UI 现代化，流畅简约，考虑用户的感受
- 积极性，开发团队活跃，频繁更新
- 互动性，接受用户的反馈和建议，第一时间做出合理更改
- 可定制，无服务器部分开源，可自由修改、定制 _(遵循 GPLv3 协议)_

## 目标和下一步计划

CTFever 的目标是涵盖大部分 CTF 题型所需要的工具。

我们目前正在着手构建新的后端系统，将支持插件式扩展功能，届时欢迎社区的大家参与 CTFever 的前端和后端开发，为 CTFever 的建设添砖加瓦。

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

# or use docker
$ docker build -t ctfever .
$ docker run -d -p 80:80 ctfever
```

### [贡献指南](https://github.com/UniiemStudio/CTFever/blob/main/CONTRIBUTING.md)

### 捐赠

[![](static/readme/afdian.jpg)](https://afdian.net/@hoshino_suzumi)

## License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FUniiemStudio%2FCTFever.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FUniiemStudio%2FCTFever?ref=badge_large)

<!-- 换 GPG Key 了，望周知 (GPG:9999666677777777) -->
