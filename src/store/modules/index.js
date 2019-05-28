import { observable,action } from 'mobx'
import {carBrant,carList} from "../../api/index"

export default class Index {
// 所有的state都用@observable观察，一旦改变就会触发引用组件更新
  @observable index
  @observable carLists
  @observable letter
  @observable cars
  @observable flag
  // 初始化
  constructor() {
    this.carLists = {}
    this.letter = []
    this.cars = []
    this.flag = 0
  }
  // 所有行为用@action修饰，在这里修改state

  // 所有车的品牌
  @action async getCarList() {
    let result = await carBrant()
    // console.log('data',result)
    let dateList = result.data.data
    let cities={};
    dateList.forEach((item)=>{
      let alpha = item.Spelling[0]
      if(cities[alpha]){
        cities[alpha].push(item)
      }else{
        cities[alpha]=[item]
      }
    })
    this.carLists = cities
    //console.log(cities,'result.data')
    dateList.forEach((item,index)=>{
      if(this.letter.indexOf(item.Spelling.slice(0,1)) === -1) {
        this.letter.push(item.Spelling.slice(0,1))
      }
    })
    // console.log(this.letter,this.carLists)
  }
  // 同一品牌下的所有的车
  @action async getCars(data){
    var date = await carList(data)
    // console.log('同一品牌的车',date.data.data)
    this.cars = date.data.data
  }
}
