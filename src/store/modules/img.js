import { observable,action } from 'mobx'
import {imgList,colors} from "../../api/index"

export default class Index {
// 所有的state都用@observable观察，一旦改变就会触发引用组件更新
  @observable dataList
  @observable colorList
  // 初始化
  constructor() {
    this.dataList = []
    this.colorList = []
  }
  // 所有行为用@action修饰，在这里修改state
  @action async getImg(data){
    let date = await imgList({id:data.id})
    date.data.data.forEach((item,index)=>{
      // console.log(item)
      item.List.forEach((val,ind)=>{
        // let str = 3
        val.Url = val.Url.replace('{0}',3)
        // var num = val.Url.indexOf("{0}")
        // val.Url.splice(num,3,'{3}')
      })
    })
    
    this.dataList = date.data.data
  }
  // 所有车的颜色
  @action async colors(data){
    let date = await colors(data)
    this.colorList = date.data.data
    console.log(this.colorList)
  }
}
