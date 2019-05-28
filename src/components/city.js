import React from 'react'
import { inject, observer } from 'mobx-react'
import img from "../asset/right .png"
@inject('del')
@observer
class Index extends React.Component {
  state={
    showModal:false,
    list:[]
  }
  async componentDidMount() {
    console.log()
    await this.props.del.city()
    await this.props.del.cities()
  }
  async province(id){
    // provinces
    // console.log(id)
    await this.props.del.provinced({id:id})
    let { provinceList } = this.props.del
    this.setState({
      list:[...provinceList],
      showModal:true
    })
  }
  show(item){
    this.props.changeProp(item)
  }
  render() {
    let { cityList, cityData } = this.props.del
    let { flag } = this.props
    return <div className="city_box" style={ flag ? {transform: 'translateY(0)','transition':'transform 0.3s linear 0s'}:{transform: 'translateY(100%)','transition':'transform 0.3s linear 0s'}} >
      <div className="main_city">
        <div>
          <p>自动定位</p>
          <ul>
            <li>{cityData.CityName}</li>
          </ul>
        </div>
        <div>
          <p>省份</p>
          <ul>
            {
              cityList && cityList.map((item, index) => {
                // console.log(item)
                return <li onClick={()=>{this.province(item.CityID)}} key={index}><span>{item.CityName}</span><img src={img} alt="" /></li>
              })
            }
          </ul>
        </div>
      </div>
      {
        this.state.showModal?<div className="modal">
          <div className="slide">
            {
              this.state.list.map((item,index)=>{
                return <div onClick={()=>{this.show(item)}} key={index} className="provinceLi">{item.CityName}</div>
              })
            }
          </div>
        </div>:""
      }
    </div>
  }
}
export default Index