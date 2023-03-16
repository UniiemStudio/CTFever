**反编译工具**

此工具使用 CTF 比赛中惯用的两款开源反编译库，根据两款库对 Python 版本不同程度的支持，选择合适的工具进行反编译。

* **Python 3.9 及以上** `Decompyle++ (pycdc)`
* **Python 3.9 以下** `decompyle3`

**反编译过程**

* 提取 `magic number` (文件首 4 字节) 识别 Python 版本
* 根据 Python 版本选择反编译工具
* 返回反编译结果

