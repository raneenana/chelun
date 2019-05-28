import React from 'react'
import {inject, observer} from 'mobx-react';
import './index.css'
import Slide from "../slide/index"
@inject( 'index')
@observer

class Index extends React.Component{
  state={
    SpageY:0,
    EpageY:0,
    num:0,
    letters: 'A',
    showLeter: 0,
    masterID:null
  }
  componentDidMount(){
    this.props.index.getCarList()
  }
  
  touchStart = (e,i) => {
    let { letter } = this.props.index
    var ind = Math.floor((e.touches[0].pageY-50)/25)
    if(ind>=0 && ind <=30){
      let letterBoxs = document.querySelectorAll('.letterBox')
      letterBoxs[ind].scrollIntoView(true)
    }
    this.setState({showLeter:1,letters:letter[ind]})
  }
  touchMove = (e) => {
    let { letter } = this.props.index
    this.setState({EpageY:e.touches[0].pageY})
    // 计算手指到达的元素与父盒子的距离
    let longs = this.state.EpageY*1 - document.querySelector('.right').offsetTop
    // 计算手指所触碰的当前元素的下标
    let num =Math.floor(longs/25)
    let letterBoxs = document.querySelectorAll('.letterBox')
    // 获取盒子与页面左侧的距离
    var leftpage = document.querySelector('.right').offsetLeft
    let page_left = Math.floor(e.touches[0].pageX - leftpage)
    if(page_left >= 0 && page_left <= 30 && num<letter.length && num >= 0){
      letterBoxs[num].scrollIntoView(true);
      this.setState({showLeter:1})
    }else {
      this.setState({showLeter:0})
    }
    this.setState({letters:letter[num]})
  }
  touchEnd = (e) => {
    this.setState({showLeter:0})
  }
  showCars = (e,index) =>{
    this.props.index.flag=1
    this.props.index.getCars({MasterID:index})
    this.setState({masterID:index})
  }
  render(){
    let {carLists,letter,cars} = this.props.index
    let { history } = this.props
    return (<div className="wrap">
      <div className="left">
      <div>
      {
        letter.map((item,index)=>{
          return <div className="letterBox" key={index}>
            <p>{item}</p>
            <div>
              {
                carLists[item] && carLists[item].map((val,ind)=>{
                  return <div key={ind} onClick={(e)=>{this.showCars(e,val.MasterID)}}>
                    <img src={val.CoverPhoto} alt="" />
                    <span>{val.Name}</span>
                  </div>
                })
              }
            </div>
          </div>
        })
      }
      </div>
      </div>
      <div className="right" onTouchStart={(e)=>{this.touchStart(e)}}  onTouchMove={(e)=>{this.touchMove(e)}}  onTouchEnd={(e)=>{this.touchEnd(e)}}>
        {
          letter && letter.map((item,index)=>{
            return <p key={index}>{item}</p>
          })
        }
      </div>
      <Slide data={{cars:cars,masterID:this.state.masterID,history:history}}/>
      {
        this.state.showLeter? 
        <div className="shows">
        {
          this.state.letters
        }
        </div>:""
      }
    </div>)
  }
}
export default Index
