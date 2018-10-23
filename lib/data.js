// 数据处理

/*
  合并json数据
*/
function combineJson(json1, json2) {
  var json = {}
  for (var attr in json1) {
    json[attr] = json1[attr]
  }

  for (var attr in json2) {
    json[attr] = json2[attr]
  }

  return json
}

module.exports = {
  combineJson: combineJson,
}
