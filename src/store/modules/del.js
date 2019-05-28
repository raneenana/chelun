import { observable,action } from 'mobx'
import {details,floor,cityID,city,provinces} from "../../api/index"
// import { async } from 'q';

export default class Index {
// 所有的state都用@observable观察，一旦改变就会触发引用组件更新
@observable detail
@observable floorData
@observable cityData
@observable arr
@observable cityList
@observable provinceList
  // 初始化
  constructor() {
    this.detail = {}
    this.floorData = {}
    this.cityData = {}
    this.arr=['全部']
    this.cityList = []
    this.provinceList = []
  }
  // 详情数据
  @action async getDetial(data){
    let date = await details(data)
    this.detail = date.data.data
    this.detail.list && this.detail.list.forEach((item) => {
      var val = item.market_attribute.year
      if(this.arr.indexOf(val) === -1){
        this.arr.push(val)
      }
    })
  }
  // 查询底价
  @action async floorPrice(data){
    let date = await floor(data)
    date.data.data.list.map((item)=>{
      return item.flag = false
    })
    this.floorData = date.data.data
    // console.log("data111",date.data.data)
  }
  // cityID
  @action async city(){
    let data = await cityID()
    this.cityData = data.data.data
    // console.log(this.cityData)
  }
  // 所有城市
  @action async cities(){
    let data = await city()
    this.cityList = data.data.data
    // console.log(data)
    // console.log(data.data.data)
  }
  @action async provinced(date){
    let data = await provinces(date)
    this.provinceList = data.data.data
    console.log(data)
    // console.log(data.data.data)
  }
}
