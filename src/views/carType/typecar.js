import React from 'react'
import "./index.css"

export default class Index extends React.Component{
  state={
    num:0
  }
  render(){
    let data = JSON.parse(window.localStorage.getItem("data"));
    // console.log("hahahahahh",data)
    let arrYear = []
    data.forEach((item)=>{
      let y = arrYear.findIndex(val=>val === item.market_attribute.year)
      if(y===-1){
        arrYear.push(item.market_attribute.year)
      }
    })
    var arr = []
    data.forEach((item)=>{
      if(item.market_attribute.year === arrYear[this.state.num]){
        arr.push(item)
      }
    })
    let newList = []
    arr.forEach(item=>{
      let index = newList.findIndex(value=>value.type === item.type);
      if (index === -1){
        newList.push({
          type: item.type,
          list: [item]
        })
      }else{
        newList[index].list.push(item);
      }
    })
    return <div className="type_car">
      <p>{
        arrYear.map((item,index)=>{
          return <span className={index === this.state.num? "back":""} onClick={()=>{this.setState({num:index})}} key={index}>{item}</span>
        })
      }</p>
      <div className="min_box">
        {
          newList.map((val,ind)=>{
            return <div key={ind}>
              <p>{val.type}</p>
              {
                val.list.map((item,index)=>{
                  return <div className="li" key={index} onClick={()=>{
                    this.props.history.goBack()
                  }}>
                    <p><span>{item.market_attribute.year}款{item.car_name}</span><span>{item.market_attribute.dealer_price_min}起</span></p>
                    <p><span>{item.horse_power}马力{item.gear_num}{item.trans_type}</span><span>指导价{item.market_attribute.dealer_price_max}</span></p>
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