// noinspection JSValidateTypes,JSUnresolvedFunction

const Serial = function (onRecv, onError, onOpen = null, onClose = null) {
  const serial = this;
  serial._baud = 115200;
  serial._port = null;

  serial._textDecoder = null;
  serial._readableStreamClosed = null;
  serial._reader = null;

  serial._textEncoder = null;
  serial._writableStreamClosed = null;
  serial._writer = null;

  serial._onRecv = onRecv;
  serial._onError = onError;
  serial._onOpen = onOpen;
  serial._onClose = onClose;

  serial.open = async function (baud = 115200) {
    serial._baud = baud;
    try {
      serial._port = await navigator.serial.requestPort();
      await serial._port.open({
        baudRate: serial._baud
      });
      serial._textEncoder = new TextEncoderStream();
      serial._writableStreamClosed = serial._textEncoder.readable.pipeTo(serial._port.writable);
      serial._writer = serial._textEncoder.writable.getWriter();
      serial._emit('open');
      while (serial._port.readable) {
        serial._textDecoder = new TextDecoderStream();
        serial._readableStreamClosed = serial._port.readable.pipeTo(serial._textDecoder.writable);
        serial._reader = serial._textDecoder.readable.getReader();
        try {
          while (true) {
            const {value, done} = await serial._reader.read();
            if (done) {
              serial._reader.releaseLock();
              break;
            }
            serial._emit('data', value);
          }
        } catch (e) {
          serial._emit('error', e);
        }
      }
    } catch (e) {
      serial._emit('error', e);
    }
  }

  serial.write = async function (text, sendLineBreak = false) {
    if (sendLineBreak) text += '\r\n';
    try {
      await serial._writer.write(text);
    } catch (e) {
      serial._emit('error', e);
    }
  }

  serial.close = async function () {
    await serial._reader.cancel();
    await serial._readableStreamClosed.catch(() => {
      /* ignore exceptions */
    });
    await serial._writer.close();
    await serial._writableStreamClosed;
    await serial._port.close();
    serial._emit('close');
  }

  serial.getGrantedPorts = async function () {
    return await navigator.serial.getPorts();
  }

  serial._emit = function (event, message = null) {
    switch (event) {
      case 'data':
        serial._onRecv(message);
        break;
      case 'open':
        if (serial._onOpen) serial._onOpen(message);
        break;
      case 'close':
        if (serial._onClose) serial._onClose(message);
        break;
      case 'error':
        serial._onError(message);
        break;
      default:
        console.error(`Invalid event[${event}] emitted`);
        break;
    }
  }
}

module.exports = Serial;
