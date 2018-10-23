// 进制转换

/*
  16进制字符串转uint8数组
*/
function hexStr2UInts(str) {
  var len = str.length;
  if (len % 2 != 0) {
    return null;
  }
  var ary = new Array();
  for (var i = 0; i < len; i += 2) {
    var s = str.substr(i, 2);
    var v = parseInt(s, 16);
    ary.push(v);
  }

  return ary;
}

/*
  uint8数组转buffer
*/
function uint8Array2Buffer(arr) {
  let buffer = new ArrayBuffer(arr.length)
  let dataView = new DataView(buffer)
  for (let i = 0; i < arr.length; i++) {
    dataView.setUint8(i, arr[i])
  }

  return buffer
}

/*
  16进制字符串转buffer
*/
function hexString2Buffer(str) {
  let arr = hexStr2Ints(str)
  return array2Buffer(arr)
}

/*
  ArrayBuffer转16进制字符串
*/
function arrayBuffer2HexStr(buffer) {
  var str = "";
  let dataView = new DataView(buffer)
  for (let i = 0; i < dataView.byteLength; i++) {
    var tmp = dataView.getUint8(i).toString(16)
    if (tmp.length == 1) {
      tmp = "0" + tmp
    }
    str += tmp
  }
  return str;
}

function stringToByte(str) {
  var bytes = new Array();
  var len, c;
  len = str.length;
  for (var i = 0; i < len; i++) {
    c = str.charCodeAt(i);
    if (c >= 0x010000 && c <= 0x10FFFF) {
      bytes.push(((c >> 18) & 0x07) | 0xF0);
      bytes.push(((c >> 12) & 0x3F) | 0x80);
      bytes.push(((c >> 6) & 0x3F) | 0x80);
      bytes.push((c & 0x3F) | 0x80);
    } else if (c >= 0x000800 && c <= 0x00FFFF) {
      bytes.push(((c >> 12) & 0x0F) | 0xE0);
      bytes.push(((c >> 6) & 0x3F) | 0x80);
      bytes.push((c & 0x3F) | 0x80);
    } else if (c >= 0x000080 && c <= 0x0007FF) {
      bytes.push(((c >> 6) & 0x1F) | 0xC0);
      bytes.push((c & 0x3F) | 0x80);
    } else {
      bytes.push(c & 0xFF);
    }
  }

  return array2Buffer(bytes);
}

module.exports = {
  hexStr2UInts: hexStr2UInts,
  uint8Array2Buffer, uint8Array2Buffer,
  hexString2Buffer, hexString2Buffer,
  arrayBuffer2HexStr: arrayBuffer2HexStr,
  // stringToByte: stringToByte,
}