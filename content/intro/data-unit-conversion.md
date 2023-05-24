## 单位换算关系

各单位间的转换关系如下，这里没有列出 P/E/Z/Y 级别的单位，因为目前很少使用，根据此表类推即可：

<div class="grid grid-cols-1 md:grid-cols-2 gap-2">
<div class="w-full">

### 十进制单位

| 全名       | 缩写 | 倍率    |
|----------|----|-------|
| Kilobyte | KB | 10^3  |
| Megabyte | MB | 10^6  |
| Gigabyte | GB | 10^9  |
| Terabyte | TB | 10^12 |

</div>
<div class="w-full">

### 二进制单位

| 全名        | 缩写  | 倍率   |
|-----------|-----|------|
| Kibibyte  | KiB | 2^10 |
| Mebibyte  | MiB | 2^20 |
| Gibibyte  | GiB | 2^30 |
| Tebibyte] | TiB | 2^40 |

</div>
</div>

## 数据单位规范

Byte: 字节，计算机中最小的存储单位，一个字节等于 8 位二进制数，即 2^8 = 256 种状态。

Bit : 比特，计算机中最小的数据单位，一个比特只能表示 0 或 1 两种状态。

1 Byte = 8 Bit

KiB = "Kibi-" + "Byte" = Kibibyte ("千字节")

kB = "Kilo-" + "Byte" = Kilobyte ("千"字节)

kb = "Kilo-" + "bit"  = Kilobit  ("千"比特)

1 KiB = 2^10 Byte = 1024 Byte

1 kB = 10^3 Byte = 1000 Byte

为了消除歧义，这些规则是在《IEC 60027》第二修正案中被补充的：

二进制千字节：kB → KiB

二进制兆字节：MB → MiB

二进制吉字节：GB → GiB

以此类推...

即：

1 KiB = 1024 B ≠ 1000 B

1 kB = 1000 B ≠ 1024 B

以此类推...
