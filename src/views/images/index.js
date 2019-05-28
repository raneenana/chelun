import React from "react"
import { inject, observer } from 'mobx-react'
import "./index.css"
@inject('img')
// @inject('index')
@observer

class Index extends React.Component{
  state = {
    color:"颜色",
    type:"车款"
  }
  componentDidMount(){
    let text = this.props.location.state && this.props.location.state.color_text
    console.log(text)
    if(text){
      this.setState({color:text})
    }
    let id = this.props.match.params.id
    this.props.img.getImg({id:id})
  }
  changeColor(){
    let id = this.props.match.params.id
    this.props.history.push({pathname:'/color',state:{id:id}})
  }
  render(){
    let {dataList} = this.props.img
    return <div className="wraps">
    <header>
      <p onClick={()=>{this.changeColor()}}>{this.state.color}</p>
      <p>{this.state.type}</p>
    </header>
    <div className="img_box">
      {
        dataList.map((item,index)=>{
          return <div key={index}>
            {
              item.List&&item.List.map((val,i)=>{
                return <div style={{background:'url('+val.Url+')',backgroundPosition:'center',backgroundSize:'auto'}} key={i}>
                  <img alt="" />
                  {i === 0 ? <div className="rgb">
                    <p>{item.Name}</p>
                    <p>{item.Count}</p>
                  </div>:""}
                </div>
              })
            }
          </div>
        })
      }
    </div>
    
    </div>
  }
}
export default Index