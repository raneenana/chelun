import React from "react"
import { inject, observer } from 'mobx-react'
import "./index.css"
@inject('img')
// @inject('index')
@observer

class Index extends React.Component{
  state = {
    num: 0,
    list:[],
    arr:[]
  }
  async componentDidMount(){
    let {id} =this.props.location.state
    // console.log(id)
    await this.props.img.colors({id:id})
    let {colorList} = this.props.img
    var arr = []
    if(colorList && colorList){
      for(var i in colorList){
        arr.push(i)
      }
    }
    arr = arr.sort((a,b)=>{return b-a})
    this.setState({arr:arr})
    this.setState({arr:arr,list:colorList[arr[0]]})
    console.log(this.state.list)
  }
  changeList(index){
    let {colorList} = this.props.img
    let arr = this.state.arr
    this.setState({num:index,list:colorList[arr[index]]})
  }
  back(text){
    console.log(text)
    let id = this.props.location.state.id
    this.props.history.push({pathname:'/img/'+id,state:{color_text:text}})
  }
  render(){
    return <div className="color_box" style={{transform: 'translateY(0%)','transition':'transform 0.3s linear 0s'}}>
      <div className="color_heade">
        <p>全部颜色</p>
      </div>
      <div className="color_main">
      {
        this.state.arr.map((item,index)=>{
          return <p onClick={()=>{this.changeList(index)}} className={this.state.num === index ? 'active' : ''} key={index}>{item}</p>
        })
      }
      </div>
      <ul className="color_list">
        {
          this.state.list.map((item,index)=>{
            return <li key={index} onClick={()=>{this.back(item.Name)}}>
              <span style={{background:item.Value}}></span>{item.Name}
            </li>
          })
        }
      </ul>
    </div>
  }
}
export default Index



