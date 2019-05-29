import React from 'react'
export default class Index extends React.Component {
  componentDidMount() {

    // ip 定位
    function myFun(result) {
      console.log(result);
      var cityName = result.name;
      map.setCenter(cityName);
      var point = new window.BMap.Point(result.center.lng, result.center.lat);
      map.centerAndZoom(point, 15)
    }
    var myCity = new window.BMap.LocalCity();
    myCity.get(myFun);

    // 定义自定义覆盖物的构造函数  
    function SquareOverlay(center, length, color) {
      this._center = center;
      this._length = length;
      this._color = color;
    }
    // 继承API的BMap.Overlay
    SquareOverlay.prototype = new window.BMap.Overlay();
    // 实现初始化方法  
    SquareOverlay.prototype.initialize = function (map) {
      // 保存map对象实例
      this._map = map;
      // 创建div元素，作为自定义覆盖物的容器
      var div = document.createElement("img");
      div.src=require('@/asset/1234.gif')
      div.style.position = "absolute";
      // 可以根据参数设置元素外观
      div.style.width = this._length + "px";
      div.style.height = this._length + "px";
      // div.style.background = this._color;
      // 将div添加到覆盖物容器中
      map.getPanes().markerPane.appendChild(div);
      // 保存div实例
      this._div = div;
      // 需要将div元素作为方法的返回值，当调用该覆盖物的show、
      // hide方法，或者对覆盖物进行移除时，API都将操作此元素。
      return div;
    }
    // 实现绘制方法   
    SquareOverlay.prototype.draw = function () {
      // 根据地理坐标转换为像素坐标，并设置给容器    
      var position = this._map.pointToOverlayPixel(this._center);
      this._div.style.left = position.x - this._length / 2 + "px";
      this._div.style.top = position.y - this._length / 2 + "px";
    }
    
    var map = new window.BMap.Map("container")      // 创建地图实例  
    var point = new window.BMap.Point(116.404, 39.915)  // 创建点坐标    
    map.centerAndZoom(point, 15);
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    // 添加自定义覆盖物   
    var mySquare = new SquareOverlay(map.getCenter(), 50, "red");
    map.addOverlay(mySquare);
  }
  render() {
    return <div style={{ width: '100%', height: '100%' }} className="map_box">
      <div style={{ width: '100%', height: '100%' }} id="container"></div>
    </div>
  }
}