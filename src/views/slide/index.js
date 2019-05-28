import React from 'react'
import { inject, observer } from 'mobx-react'
@inject('index')
@observer
class Index extends React.Component {
  state={
    start:0,
    move: 0
  }
  changeRouter=(index)=>{
    // console.log(this.props.data)
    let { masterID } = this.props.data
    this.props.data.history.push({pathname:'/car',state:{masterID:masterID,SerialID:index}})
  }
  touchStart = (e) => {
    this.setState({start:e.touches[0].pageX})
  }
  touchMove = (e) => {
    let move = e.touches[0].pageX - this.state.start
    // if(e.touches[0].pageX - this.state.start > 0){
    //   setTimeout(()=>{
    //     this.props.index.flag = 0
    //   },200)
    // } 
    this.setState({move:move})
    
  }  
  touchEnd = () => {
    if(this.state.move > 0){
      setTimeout(()=>{
        this.props.index.flag = 0
      },200)
    }
  }
 
  render() {
    let { cars } = this.props.data
    return <div style={this.props.index.flag?{transform: 'translate(0)','transition':'transform 0.3s linear 0s',}:{transform: 'translate(100%)','transition':'transform 0.3s linear 0s'}} className="slides" onTouchStart={(e) => { this.touchStart(e)}} onTouchMove={(e) => { this.touchMove(e) }} onTouchEnd={() => { this.touchEnd() }}>
      {
        cars && cars.map((item, index) => {
          return <div className="brantCar" key={index}>
            <p>{item.GroupName}</p>
            {
              item.GroupList && item.GroupList.map((val, ind) => {
                return <div key={ind} onClick={()=>{this.changeRouter(val.SerialID)}}>
                  <img src={val.Picture} alt="" />
                  <div>
                    <p>{val.AliasName}</p>
                    <p className="red">{val.DealerPrice}</p>
                  </div>
                </div>
              })
            }
          </div>
        })
      }
    </div>
  }
}
// transform: translate(100%); transition: transform 0.3s ease 0s;
//  to="/car"
export default Index