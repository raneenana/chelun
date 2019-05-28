import React from "react"
import { inject, observer } from 'mobx-react'
import City from '@/components/city.js'
import "./index.css"
@inject('del')
@observer

class Index extends React.Component{
  state={
    flag:true,
    showCity:false,
    cityData:{}
  }
  async componentDidMount(){
    let {cityId,carId} =this.props.location.state
    await this.props.del.floorPrice({
      cityId:cityId,
      carId:carId
    })
    await this.props.del.city()
    let {cityData} = this.props.del
    this.setState({cityData:cityData})
    var info = document.querySelector(".dealer-info")
    info.addEventListener('scroll', this.onScroll.bind(this));
  }
  onScroll(){

  }
  changeProp(item){
    let obj = item || {}
    this.setState({
      showCity:false,
      cityData:obj
    })
  }
  changeState(){
    let show = !this.state.showCity
    this.setState({showCity:show})
    console.log(this.state.showCity)
  }
  changeFlag(index){
    let {floorData} = this.props.del
    floorData.list[index].flag = !floorData.list[index].flag
  }
  ask(){

  }
  render(){
    let {floorData} = this.props.del
    return <div className="floor">
      <p>可向多个商家咨询最低价，商家及时回复</p>
      <div className="cont">
        <div className="mains">
          <div className="box" onClick={()=>{
            console.log(this.props.history.push("/type"))
          }}>
            <div>
              <img src={floorData.details&&floorData.details.serial.Picture} alt="" />
            </div>
            <div>
              <h3>{floorData.details&&floorData.details.serial.AliasName}</h3>
              <p>{floorData.details&&floorData.details.market_attribute.year} {floorData.details&&floorData.details.car_name}</p>
            </div>
            <div><img src='/public/right.png' alt="" /></div>
          </div>
          <div className="form">
            <p>个人信息</p>
            <ul className="list">
              <li>
                <span>姓名</span>
                <input type="text" placeholder="请输入真实姓名" maxLength="4"/>
              </li>
              <li>
                <span>手机号</span>
                <input type="tel" placeholder="请输入手机号码" maxLength="11"/>
              </li>
              <li onClick={()=>{this.changeState()}}>
                <span>城市</span>
                <span>{this.state.cityData.CityName}</span>
              </li>
            </ul>
            <div className="quotation">
              <button onClick={()=>{this.ask()}}>询问底价</button>
            </div>
          </div>
        </div>
        <div className="dealer-info" onScroll={()=>{this.onScroll()}}>
          <p>选择保价经销商</p>
          <ul>
            {
              floorData.list && floorData.list.map((item,index)=>{
              return  <li key={index} onClick={()=>{this.changeFlag(index)}} className={ item.flag ? "active":""}>
                <p><span>{item.dealerShortName}</span><span>{Math.floor(item.promotePrice)}万</span></p>
                <p><span>{item.address}</span><span>{item.saleRange}</span></p>
              </li>
              })
            }
          </ul>
        </div>

      </div>
      {
        this.state.flag?<div className="footer">
          <button>询问低价</button>
        </div>:""
      }
      {
        this.state.showCity?<City flag={this.state.showCity} changeProp={this.changeProp.bind(this)}/>:""
      }
    </div>
  }
}
export default Index