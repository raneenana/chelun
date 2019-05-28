import React from 'react'
import { inject, observer } from 'mobx-react'
import './index.css'
import {
  Link
} from 'react-router-dom'
@inject('del')
@observer
class Index extends React.Component {
  state = {
    num: 0,
    date: []
  }
  async componentDidMount() {
    // console.log(this.props.location.state)
    let { masterID, SerialID } = this.props.location.state
    await this.props.del.getDetial({ MasterID: masterID, SerialID: SerialID })
    let { detail } = this.props.del
    var data = []
    if (detail && detail.list) {
      data = [...detail.list]
      let sortData = this.changeSort(data)
      this.setState({ date: sortData })
    }
  }
  
  changeDate(data, item, index){
    let sortData = []
    if (item === '全部') {
      var arr = [...data]
      sortData = this.changeSort(arr)
      // console.log(sortData)
      this.setState({ date: sortData, num: index })
    } else {
      var dataArr = []
      data.forEach((val) => {
        if (val.market_attribute.year === item) {
          dataArr.push(val)
        }
      })
      sortData = this.changeSort(dataArr)
      // window.localStorage.setItem(`${item}`,JSON.stringify(sortData))
      this.setState({ date: sortData, num: index })
    }
  }
  changeSort(data){
    data.sort((a,b) => {
      if(a.market_attribute.year !== b.market_attribute.year){
        return b.market_attribute.year - a.market_attribute.year
      }else if(a.max_power !== b.max_power){
        return a.max_power - b.max_power
      }else if(a.exhaust !== b.exhaust){
        return a.exhaust - b.exhaust
      }else if(a.inhale_type !== b.inhale_type && a.inhale_type === "自然吸气"){
        return a.inhale_type - b.inhale_type
      }
    })
    data.forEach(item=>{
      item.type = `${item.exhaust_str}/${item.max_power_str} ${item.inhale_type}`
    })
    window.localStorage.setItem(`data`,JSON.stringify(data))
    // 合并参数相同的车型
    let newList = [];
    data.forEach(item => {
      let index = newList.findIndex(value => value.type === item.type);
      if (index === -1){
        newList.push({
          type: item.type,
          list: [item]
        })
      }else{
        newList[index].list.push(item);
      }
    })
    return newList
  }
  async linkFloor(id){
    await this.props.del.city()
    let { CityID } = this.props.del.cityData
    this.props.history.push({ pathname: "/quotation", state: { cityId: CityID, carId: id } })
  }
  render() {
    let { detail, arr } = this.props.del
    return <div className="wrap">
      <div className="content">
        <div className="img">
          {/* ,query:{SerialID:detail.SerialID}} */}
          <Link to={'/img/' + detail.SerialID}>
            <img src={detail.CoverPhoto} alt="" />
          </Link>
        </div>
        <div className="info">
          {
            detail.market_attribute && <div className="price">
              <p>{detail.market_attribute.dealer_price && detail.market_attribute.dealer_price}</p>
              <p>指导价{detail.market_attribute.official_refer_price && detail.market_attribute.official_refer_price}</p>
            </div>
          }
          <button>询问底价</button>
        </div>
        <div className="carList">
          <div className="title">
            {
              arr.map((item, index) => {
                return <span className={index === this.state.num ? 'active' : ''} onClick={() => { this.changeDate(detail.list, item, index) }} key={index}>{item}</span>
              })
            }
          </div>
          <div className="main">
            {
              this.state.date.map((val, ind) => {
                return <div key={ind}>
                  <p>{val.type}</p>
                  {
                    val.list.map((item,index)=>{
                      return <div className="li" key={index}>
                        <p>{item.market_attribute.year}款{item.car_name}</p>
                        <p>{item.horse_power}马力{item.gear_num}{item.trans_type}</p>
                        <p>指导价{item.market_attribute.dealer_price_max}<span>{item.market_attribute.dealer_price_min}起</span></p>
                        <button onClick={() => { this.linkFloor(item.car_id) }}>询问底价</button>
                      </div>
                    })
                  }
                </div>
              })
            }
          </div>
        </div>
      </div>
      <div className="bottom">
        <p>询问底价</p>
        <p>本地经销商为你报价</p>
      </div>
    </div>
  }
}
export default Index