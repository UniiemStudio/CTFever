// noinspection DuplicatedCode

"use strict";

function CRC(data) {
  const crcHandler = {};
  if (typeof data === 'string') {
    data = data.split("").map(c => c.charCodeAt(0));
  }
  crcHandler.CRC16_CCITT = () => {
    let crc = 0x0000;
    for (let i = 0; i < data.length; i++) {
      crc = crc ^ data[i];
      for (let j = 0; j < 8; j++) {
        if ((crc & 0x0001) !== 0) {
          crc = crc >>> 1 ^ 0x8408;
        } else {
          crc = crc >>> 1;
        }
      }
    }
    return crc ^ 0x0000;
  };
  crcHandler.CRC16_CCITT_FALSE = () => {
    let crc = 0xffff;
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < 8; j++) {
        let bit = ((data[i] >>> (7 - j) & 0x01) === 0x01);
        let c15 = ((crc >>> 15 & 0x01) === 0x01);
        crc = crc << 1;
        if (c15 ^ bit) {
          crc = crc ^ 0x1021;
        }
      }
    }
    crc = crc & 0xffff;
    return crc ^ 0x0000;
  };
  crcHandler.CRC16_XMODEM = () => {
    let crc = 0x0000;
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < 8; j++) {
        let bit = ((data[i] >>> (7 - j) & 0x01) === 0x01);
        let c15 = ((crc >>> 15 & 0x01) === 0x01);
        crc = crc << 1;
        if (c15 ^ bit) {
          crc = crc ^ 0x1021;
        }
      }
    }
    crc = crc & 0xffff;
    return crc ^ 0x0000;
  };
  crcHandler.CRC16_X25 = () => {
    let crc = 0xffff;
    for (let i = 0; i < data.length; i++) {
      crc = crc ^ data[i];
      for (let j = 0; j < 8; j++) {
        if ((crc & 0x0001) !== 0) {
          crc = crc >>> 1 ^ 0x8408;
        } else {
          crc = crc >>> 1;
        }
      }
    }
    return crc ^ 0xffff;
  }
  crcHandler.CRC16_MODBUS = () => {
    let crc = 0xffff;
    for (let i = 0; i < data.length; i++) {
      crc = crc ^ data[i];
      for (let j = 0; j < 8; j++) {
        if ((crc & 0x0001) !== 0) {
          crc = crc >>> 1 ^ 0xa001;
        } else {
          crc = crc >>> 1;
        }
      }
    }
    return crc ^ 0x0000;
  }
  crcHandler.CRC16_IBM = () => {
    let crc = 0x0000;
    for (let i = 0; i < data.length; i++) {
      crc = crc ^ data[i];
      for (let j = 0; j < 8; j++) {
        if ((crc & 0x0001) !== 0) {
          crc = crc >>> 1 ^ 0xa001;
        } else {
          crc = crc >>> 1;
        }
      }
    }
    return crc ^ 0x0000;
  }
  crcHandler.CRC16_MAXIM = () => {
    let crc = 0x0000;
    for (let i = 0; i < data.length; i++) {
      crc = crc ^ data[i];
      for (let j = 0; j < 8; j++) {
        if ((crc & 0x0001) !== 0) {
          crc = crc >>> 1 ^ 0xa001;
        } else {
          crc = crc >>> 1;
        }
      }
    }
    return crc ^ 0xffff;
  }
  crcHandler.CRC16_USB = () => {
    let crc = 0xffff;
    for (let i = 0; i < data.length; i++) {
      crc = crc ^ data[i];
      for (let j = 0; j < 8; j++) {
        if ((crc & 0x0001) !== 0) {
          crc = crc >>> 1 ^ 0xa001;
        } else {
          crc = crc >>> 1;
        }
      }
    }
    return crc ^ 0xffff;
  }
  crcHandler.CRC16_DNP = () => {
    let crc = 0x0000;
    for (let i = 0; i < data.length; i++) {
      crc = crc ^ data[i];
      for (let j = 0; j < 8; j++) {
        if ((crc & 0x0001) !== 0) {
          crc = crc >>> 1 ^ 0xa6bc;
        } else {
          crc = crc >>> 1;
        }
      }
    }
    return crc ^ 0xffff;
  }

  return crcHandler;
}

module.exports = CRC;
