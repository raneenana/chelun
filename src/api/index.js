import request from '../utils/request'

export function carBrant(){
  return request({
    url:'https://baojia.chelun.com/v2-car-getMasterBrandList.html',
    methods:'GET'
  })
}

export function carList(data){
  return request({
    url:`https://baojia.chelun.com/v2-car-getMakeListByMasterBrandId.html?_1557918963606&MasterID=${data.MasterID}`,
    methods: 'GET',
    // data
  })
}

export function details(data){
  return request({
    url:`https://baojia.chelun.com/v2-car-getInfoAndListById.html?_1557918963606&MasterID=${data.MasterID}&SerialID=${data.SerialID}`,
    methods:'GET'
  })
}

export function imgList(data){
  return request({
    url:`https://baojia.chelun.com/v2-car-getImageList.html?SerialID=${data.id}&_1557921987126`,
    methods:'GET'
  })
}

export function floor(data){
  console.log(data)
  return request({
    url:`https://baojia.chelun.com/v2-dealer-alllist.html?carId=${data.carId}&cityId=${data.cityId}&_1558403831794`,
    methods:"GET"
  })
}

// 默认的cityId
export function cityID(){
  return request({
    url:"https://baojia.chelun.com/location-client.html?_1558407013277",
    methods:"GET"
  })
}

// 获取所有的城市
export function city(){
  return request({
    url:"https://baojia.chelun.com/v1-city-alllist.html?_1558601474378",
    methods:'GET'
  })
}

// 获取所有的地区
export function provinces(data){
  return request({
    url:`https://baojia.chelun.com/v1-city-alllist.html?provinceid=${data.id}&_1558662922549`,
    methods:'GET'
  })
}

// 获取所有的颜色
export function colors(data){
  return request({
    url:`https://baojia.chelun.com/v2-car-getModelImageYearColor.html?SerialID=${data.id}&_1558697665508`,
    methods:"GET"
  })
}