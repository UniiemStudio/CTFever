"use strict";

/**
 * 验证数字字符串是否符合指定进制
 * @param {string} str - 要验证的字符串
 * @param {number} radix - 进制 (2-36)
 * @returns {boolean} 是否有效
 */
function isValidRadixString(str, radix) {
  if (!str || typeof str !== 'string') return false;
  
  const validChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.slice(0, radix);
  const regex = new RegExp(`^[${validChars}]+$`, 'i');
  return regex.test(str);
}

/**
 * 手动将任意进制字符串转换为 BigInt，避免 parseInt 的精度限制
 * @param {string} str - 要转换的字符串
 * @param {number} radix - 源进制 (2-36)
 * @returns {bigint} 转换后的 BigInt 值
 */
function convertToBigIntFromRadix(str, radix) {
  if (!str || str.length === 0) {
    return 0n;
  }
  
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const radixBigInt = BigInt(radix);
  let result = 0n;
  
  for (let i = 0; i < str.length; i++) {
    const char = str[i].toUpperCase();
    const digitValue = chars.indexOf(char);
    
    if (digitValue === -1 || digitValue >= radix) {
      throw new Error(`Invalid character '${char}' for radix ${radix}`);
    }
    
    result = result * radixBigInt + BigInt(digitValue);
  }
  
  return result;
}

/**
 * 进制转换函数，使用原生 BigInt 确保精度
 * @param {string|number|bigint} str - 要转换的数字
 * @param {number|string} from - 源进制 (2-36)
 * @param {number|string} to - 目标进制 (2-36)
 * @returns {string} 转换后的字符串
 * @throws {Error} 当输入无效时抛出错误
 */
function radixc(str, from, to) {
  // 转换参数类型
  const fromRadix = parseInt(from);
  const toRadix = parseInt(to);
  
  // 验证进制范围
  if (fromRadix < 2 || fromRadix > 36 || toRadix < 2 || toRadix > 36) {
    throw new Error('Radix must be between 2 and 36');
  }
  
  // 转换输入为字符串
  let inputStr = String(str).trim();
  if (!inputStr) {
    return '0';
  }
  
  // 处理负数
  const isNegative = inputStr.startsWith('-');
  if (isNegative) {
    inputStr = inputStr.slice(1);
  }
  
  // 验证输入字符串是否符合源进制
  if (!isValidRadixString(inputStr, fromRadix)) {
    throw new Error(`Invalid characters for radix ${fromRadix}`);
  }
  
  // 如果进制相同，直接返回标准化的字符串
  if (fromRadix === toRadix) {
    const result = inputStr.toUpperCase();
    return isNegative ? '-' + result : result;
  }
  
  try {
    // 使用手动转换确保大数字的精度
    let bigIntValue;
    
    if (fromRadix === 10) {
      // 十进制直接使用 BigInt
      bigIntValue = BigInt(inputStr);
    } else {
      // 对于非十进制，手动转换为避免 parseInt 的精度限制
      bigIntValue = convertToBigIntFromRadix(inputStr, fromRadix);
    }
    
    // 处理负数
    if (isNegative) {
      bigIntValue = -bigIntValue;
    }
    
    // 转换为目标进制
    const result = bigIntValue.toString(toRadix).toUpperCase();
    return result;
  } catch (error) {
    throw new Error(`Conversion failed: ${error.message}`);
  }
}

/**
 * 将十进制数字转换为可读格式 (使用 BigInt)
 * @param {string|number|bigint} n - 十进制数字
 * @returns {string} 可读格式字符串
 */
function decimal_to_readable(n) {
  try {
    let value = BigInt(n);
    
    if (value === 0n) {
      return '0B';
    }
    
    const isNegative = value < 0n;
    if (isNegative) {
      value = -value;
    }
    
    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const base = 1024n;
    const parts = [];
    
    let remainder = value;
    
    // 从最小单位开始处理
    for (let i = 0; i < units.length; i++) {
      if (remainder === 0n) break;
      
      const currentUnit = remainder % base;
      if (currentUnit > 0n) {
        parts.unshift(`${currentUnit}${units[i]}`);
      }
      remainder = remainder / base;
    }
    
    // 如果还有剩余，说明数值超出了最大单位的范围
    if (remainder > 0n) {
      // 计算完整的最大单位值
      const maxUnitIndex = units.length - 1;
      const maxUnitMultiplier = base ** BigInt(maxUnitIndex);
      const totalInMaxUnit = value / maxUnitMultiplier;
      const remainderInBytes = value % maxUnitMultiplier;
      
      // 如果剩余部分为0，只显示最大单位
      if (remainderInBytes === 0n) {
        return isNegative ? `-${totalInMaxUnit}${units[maxUnitIndex]}` : `${totalInMaxUnit}${units[maxUnitIndex]}`;
      } else {
        // 否则显示最大单位加上剩余部分的可读格式
        const remainderReadable = decimal_to_readable(remainderInBytes.toString());
        return isNegative ? `-${totalInMaxUnit}${units[maxUnitIndex]} ${remainderReadable}` : `${totalInMaxUnit}${units[maxUnitIndex]} ${remainderReadable}`;
      }
    }
    
    // 如果没有剩余，返回组合的结果
    if (parts.length === 0) {
      return '0B';
    }
    
    const result = parts.join(' ');
    return isNegative ? `-${result}` : result;
  } catch (error) {
    throw new Error(`Failed to convert to readable format: ${error.message}`);
  }
}

/**
 * 将可读格式字符串转换为十进制数字 (返回 BigInt)
 * @param {string} s - 可读格式字符串
 * @returns {bigint} 十进制 BigInt 值
 * @throws {Error} 当格式无效时抛出错误
 */
function readable_to_decimal(s) {
  if (!s || typeof s !== 'string') {
    throw new Error('Input must be a non-empty string');
  }
  
  try {
    let input = s.trim();
    const isNegative = input.startsWith('-');
    if (isNegative) {
      input = input.slice(1);
    }
    
    // 标准化输入：移除空格并统一单位格式
    input = input
      .split(/\s+/).join('')
      .toUpperCase()
      .replace(/IB/g, '')  // 移除 IB 后缀 (KiB -> K)
      .replace(/KB/g, 'K')
      .replace(/MB/g, 'M') 
      .replace(/GB/g, 'G')
      .replace(/TB/g, 'T')
      .replace(/PB/g, 'P')
      .replace(/EB/g, 'E')
      .replace(/ZB/g, 'Z')
      .replace(/YB/g, 'Y');
    
    const unitMultipliers = {
      'B': 1n,
      'K': 1024n,
      'M': 1024n ** 2n,
      'G': 1024n ** 3n,
      'T': 1024n ** 4n,
      'P': 1024n ** 5n,
      'E': 1024n ** 6n,
      'Z': 1024n ** 7n,
      'Y': 1024n ** 8n
    };
    
    let total = 0n;
    let currentNumber = '';
    
    for (let i = 0; i < input.length; i++) {
      const char = input[i];
      
      if (/\d/.test(char)) {
        currentNumber += char;
      } else if (unitMultipliers.hasOwnProperty(char)) {
        if (currentNumber === '') {
          throw new Error(`Invalid format: missing number before unit '${char}'`);
        }
        
        const value = BigInt(currentNumber);
        const multiplier = unitMultipliers[char];
        total += value * multiplier;
        currentNumber = '';
      } else {
        throw new Error(`Invalid character '${char}' in readable format`);
      }
    }
    
    // 如果最后还有数字但没有单位，按字节处理
    if (currentNumber !== '') {
      total += BigInt(currentNumber);
    }
    
    return isNegative ? -total : total;
  } catch (error) {
    throw new Error(`Failed to parse readable format: ${error.message}`);
  }
}

module.exports = {
  radixc, 
  decimal_to_readable, 
  readable_to_decimal,
  isValidRadixString
};
