import {autorun} from 'mobx'
// 引入模块
import Index from './modules/index'
import Img from './modules/img'
import Del from "./modules/del"
const index = new Index()
const img = new Img()
const del = new Del()

// 追踪数据变化
autorun(()=>{
  
})

export default {
  index,
  img,
  del
}
