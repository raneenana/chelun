import React from 'react'
import echarts from 'echarts'
import "./index.css"
export default class Index extends React.Component {
  componentDidMount() {
    const el = document.querySelector(".echarts")
    var myChart = echarts.init(el);
    // var data = []
    // for (var i = 0; i <= 360; i++) {
    //   var t = i / 180 * Math.PI
    //   var r = Math.sin(2 * t) * Math.cos(2 * t)
    //   data.push([r, i])
    // }
    var option = {
      angleAxis: {
        type: 'category',
        data: ['其他资产', '房产', '交通运输工具', '土地使用权', '设备'],
        z: 10
      },
      radiusAxis: {
      },
      polar: {
      },
      color:['orange','green'],
      series: [{
        type: 'bar',
        data: [0, 0, 0, 3, 5],
        coordinateSystem: 'polar',
        animation:false,
        name: 'A',
        stack: 'a'
      },
       {
        type: 'bar',
        data: [5, 6, 5, 0, 0],
        coordinateSystem: 'polar',
        name: 'B',
        animation:false,
        stack: 'a'
      }, 
      // {
      //   type: 'bar',
      //   data: [1.5, 2.5, 3.5, 4.5, 3.5],
      //   coordinateSystem: 'polar',
      //   name: 'C',
      //   stack: 'a'
      // }
    ],
      // legend: {
      //   show: true,
      //   data: ['A', 'B', 'C']
      // }
    };
    myChart.setOption(option);

  }
  render() {
    return <div className="echarts">
      {/* hahahah */}
    </div>
  }
}