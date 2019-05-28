import React from 'react'
import echarts from 'echarts'
import "./index.css"
export default class Index extends React.Component {
  componentDidMount() {
    const el = document.querySelector(".echarts")
    var myChart = echarts.init(el);
    var data = []
    for (var i = 0; i <= 360; i++) {
      var t = i / 180 * Math.PI
      var r = Math.sin(2 * t) * Math.cos(2 * t)
      data.push([r, i])
    }
    var option = {
      title: {
        text: '极坐标双数值轴'
      },
      // legend: {
      //   data: ['line']
      // },
      polar: {
        center: ['50%', '35%']
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      angleAxis: {
        type: 'value',
        startAngle: 0
      },
      radiusAxis: {
        min: 0
      },
      series: [{
        coordinateSystem: 'polar',
        name: 'line',
        type: 'line',
        showSymbol: false,
        data: data
      }],
      animationDuration: 2000
    };
    myChart.setOption(option);
    
  }
  render() {
    return <div className="echarts">
      {/* hahahah */}
    </div>
  }
}