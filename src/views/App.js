import React from 'react'
import './App.css';
import { inject, observer } from 'mobx-react'
import CarBrant from './carBrand'
import Cars from './detail'
import Img from './images'
import FloorPrice from './floorPrice'
import TypeCar from "./carType/typecar"
import Color from './color/index'
import Echarts from './echarts/index'
import Map from './map/index'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'


// 获取根据组件注入的数据，如果有多个把 模块的名字追加到后面
@inject('index')
@observer

class App extends React.Component {
  render() {
    return (<div className="App">
    <Router>
      <Switch>
        <Route path="/car" component={Cars}/>
        <Route exact path="/" component={CarBrant}/>
        <Route path="/img/:id" component={Img}/>
        <Route path="/quotation" component={FloorPrice}/>
        <Route path="/type" component={TypeCar}/>
        <Route path="/color" component={Color}/>
        <Route path="/echarts" component={Echarts}/>
        <Route path="/map" component={Map}/>
      </Switch>
    </Router>
      {/* <CarBrant></CarBrant> */}
    </div>);
  }
}

export default App;
