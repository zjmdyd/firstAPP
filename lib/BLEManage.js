const tool = require('tool.js')
const ServiceUUID = "0000FFB0"
const WritePasswordCharacteristic = "0000FFB2"
const WriteNamedCharacteristic = "0000FFB3"

const UpdateCharacteristic = "0000FEC8"
const ReadCharacteristic = "0000FEC9"
var WriteDataType = -1

module.exports = class {
  constructor() {

  }

  initBLESetting() {
    this.openBLEAdapter()
    this.listenAdapterStateChange()
  }

  openBLEAdapter() {
    var that = this
    wx.openBluetoothAdapter({
      success: function (res) {
        that.openAdapter = true
        that.beganSearch()
      },
      fail: function (res) {
        that.openAdapter = false
        tool.showMention('请打开手机蓝牙', true)
      }
    })
  }

  /*  开始准备搜索蓝牙设备  */
  beganSearch() {
    wx.startBluetoothDevicesDiscovery({
      success: function (res) {
        console.log("准备开始搜索成功: ")
        console.log(res)
      }
    })
  }

  listenAdapterStateChange() {
    var that = this
    wx.onBluetoothAdapterStateChange(function (res) {
      console.log(res)

      if (res.available == false) {
        that.openAdapter = false
        tool.showMention('蓝牙不可用,请检查蓝牙是否打开', true)
      } else {
        if (that.openAdapter != true) {
          that.openBLEAdapter()
        }
      }
    })
  }

  // 搜索指定前缀的设备
  searchDevice(searchCallBack, prefix) {
    var that = this

    wx.getBluetoothDevices({
      success: function (res) {
        console.log('搜索到的设备-->')
        console.log(res)
        let devices = res.devices
        var mDevices = []

        for (let i = 0; i < devices.length; i++) {
          var device = devices[i]
          console.log(device.localName)
          if (device.name.indexOf(prefix) > -1) {
            console.log(device)
            mDevices.push(device)
          }
        }
        searchCallBack(mDevices)
      },
      fail: function (res) {
        console.log('搜索失败')
        console.log(res)
        searchCallBack([])
      }
    })
  }

  // 搜索指定名称的设备
  searchMatchDevice(searchCallBack, matchName) {
    var that = this   // 注意this的层级关系

    if (that.openAdapter == false) {
      tool.showMention('请打开手机蓝牙', true)
      searchCallBack(null, false) // 在定时搜索的时候用，第二个参数表示未打开蓝牙不需要
      return
    }
    wx.getBluetoothDevices({
      success: function (res) {
        let devices = res.devices
        for (let i = 0; i < devices.length; i++) {
          var device = devices[i]
          if (device.localName == matchName) {
            console.log(device)
            searchCallBack(device)
            return
          }
        }
        searchCallBack(null)
      },
      fail: function (res) {
        console.log('搜索失败')
        console.log(res)
        searchCallBack(null)
      }
    })
  }

  // 取消连接
  cancelBLEConnect() {
    var that = this
    wx.closeBLEConnection({
      deviceId: that.deviceID,
      success: function (res) {
        console.log('取消连接成功')
        console.log(res)
      },
      fail: function (res) {
        console.log('取消连接失败')
        console.log(res)
      }
    })
  }

  // 连接设备
  connectDevice(callBack, device) {
    var that = this

    if (device) {
      that.deviceID = device.deviceId
      that.deviceName = device.name
    }

    that.connCallBack = callBack
    wx.createBLEConnection({
      deviceId: that.deviceID,
      success: function (res) {
        console.log('连接成功')
        console.log(res)
        that.listenConnectState()
        that.findServices()
      },
      fail: function (res) {
        console.log('连接失败')
        console.log(res)
        that.connCallBack(false)
      }
    })
  }

  // 监听蓝牙连接状态
  listenConnectState() {
    var that = this
    wx.onBLEConnectionStateChange(function (res) {
      console.log("onBLEConnectionStateChange")
      console.log(res)

      if (that.connectStateCallBack) {
        that.connectStateCallBack(res.connected)
      }
    })
  }

  //查找服务
  findServices() {
    tool.showMention('正在处理蓝牙数据, 请稍后...', true)
    var that = this
    wx.getBLEDeviceServices({
      deviceId: that.deviceID,
      success: function (res) {
        console.log(res);
        let svs = res.services;
        if (res.services instanceof Array) {
          for(var i = 0; i < svs.length; i++) {
            let sv = svs[i]
            if (sv.uuid.indexOf(ServiceUUID) > -1) {
              console.log('搜索服务成功')

              that.matchService = sv
              that.findCharacteristics()
              break
            }else {
              console.log('搜索服务失败')
            }
          }
        }
      },
      fail: function (res) {
        console.log(res)
        tool.showMention('搜索服务失败', true)
      },
    })
  }

  /*
    查找特征
  */
  findCharacteristics() {
    var that = this

    wx.getBLEDeviceCharacteristics({
      deviceId: that.deviceID,
      serviceId: that.matchService.uuid,
      success: function (res) {
        console.log("查找特征成功")
        console.log(res)
        if (res.characteristics instanceof Array) {
          that.characteristics = res.characteristics
          that.dealCharacteristics()
        }
      },
      fail: function (res) {
        console.log(res)
        tool.showMention('查找特征失败', true)
      },
    })
  }

  dealCharacteristics() {
    var that = this
    let cts = that.characteristics;

    for (let i = 0; i < cts.length; i++) {
      let ct = cts[i]
      console.log(ct)
      if (ct.uuid.indexOf(UpdateCharacteristic) > -1) {
        // that.listenNotifyValueChange()
        // that.openNotify(ct);
      } else if (ct.uuid.indexOf(WritePasswordCharacteristic) > -1) {
        console.log('找到密码')
        that.WritePasswordCtID = ct.uuid
      } else if (ct.uuid.indexOf(WriteNamedCharacteristic) > -1) {
        console.log('找到name')
        that.WriteNamedCtID = ct.uuid
      }
    }
    that.connCallBack(true)
  }

  /*
    监听notify数据
  */
  listenNotifyValueChange() {
    var that = this
    wx.onBLECharacteristicValueChange(function (res) {
      console.log("收到数据")
      console.log('WriteDataType = ' + WriteDataType)

      let value = res.value
      console.log(tool.uint8Array2Str(value))

      let dataView = new DataView(value)
      let byte1 = dataView.getUint8(1)

      if (WriteDataType == 1) {        // 握手
        tool.showMention('数据处理完成', true)
        WriteDataType = -1
        that.connCallBack(true)
      } else if (WriteDataType == 2) { // 启动指令
        WriteDataType = -1
        that.workCallback(true)
      }
    })
  }

  /*
    打开数据订阅
  */
  openNotify(ct) {
    var that = this
    wx.notifyBLECharacteristicValueChange({
      deviceId: that.deviceID,
      serviceId: that.matchService.uuid,
      characteristicId: ct.uuid,
      state: true,
      success: function (res) {
        console.log("notify打开成功")
        console.log(res)
      },
      fail: function (res) {
        console.log("notify打开失败");
        console.log(res)
      },
    })
  }

  /*
     写名字指令
  */
  sendName(res) {
    var name = '{{' + res + '}}'
    console.log("name:" + name);
    WriteDataType = 1
    this.writeDataWithValue(tool.stringToByte(name), WriteDataType)
  }

  /*
     写密码指令
  */
  sendPassword(res) {
    var password = '{{' + res + '}}'
    console.log("password:" + password);
    WriteDataType = 2
    // console.log(tool.stringToByte(password))
    this.writeDataWithValue(tool.stringToByte(password), WriteDataType)
  }

  /*
    写入数据
  */
  writeDataWithValue(bytes, wType) {
    console.log('WriteDataType = ' + WriteDataType)
    var that = this

    var ctUUID
    if(wType == 1) {
      ctUUID = that.WriteNamedCtID
    }else {
      ctUUID = that.WritePasswordCtID
    }
    wx.writeBLECharacteristicValue({
      deviceId: that.deviceID,
      serviceId: that.matchService.uuid,
      characteristicId: ctUUID,
      value: bytes,
      success: function (res) {
        console.log("写入成功")
        console.log(res)
      },
      fail: function (res) {
        console.log("写入失败");
        console.log(res)
        tool.showMention('写入数据失败', true)
      },
    })
  }
}
/*

*/