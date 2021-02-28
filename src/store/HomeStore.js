import { observable, action,toJS } from 'mobx'
import RestClient from '../api/RestClient'
import GovApiLinks  from '../consts/GovApiLinks'

const state = observable({
  date: '',
  time:'00:00:00',
  dateObj : null,
  timeObj : null,
  areas: [],
  cameras:[],
  locations:{},
  forecasts: {},
  selectedArea:''
})
const actions = {}
/**
 * When Location is clicked
 */
actions.clickArea = action((name)=>{
  console.log("clicked = "+name)
  state.selectedArea = name
})
/**
 * When Date is clicked
 */
actions.changeDate = action((date)=>{
  state.selectedArea = ''
  state.dateObj = date;
  let month = parseInt(date.getMonth()+1)
  if (month < 10) { month = '0' + month; }
  let day = date.getDate() 
  if (day < 10) { day = '0' + day; }
  state.date = date.getFullYear()+"-"+month+"-"+day
  actions.loadTraffic()
  actions.loadAreas()
})
/**
 * When Time is clicked
 */
actions.changeTime = action((date)=>{
  state.timeObj = date;
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  if (h < 10) { h = '0' + h; }
  if (m < 10) { m = '0' + m; }
  if (s < 10) { s = '0' + s; }
  state.time = h + ":" + m + ":" + s;
  actions.loadTraffic()
  actions.loadAreas()
})


/**
 * Searh Area Data and Find Area and Weather for camera
 */
actions.loadAreas = action(async () => {
  var datestr = ''
  if(state.date){
    datestr = "?date_time="+state.date+"T"+'00:00:00'
  }else{
    return
  }
  await RestClient.get(GovApiLinks.Weather_Url+datestr).then(res=>{
    console.log(res.data)
    var data = res.data
    if(data.area_metadata){
      state.areas = data.area_metadata
      let forecasts = data.items[0].forecasts
      let forecastsObj = {}
      for(let key in forecasts){
        let forecast = forecasts[key]
        forecastsObj[forecast.area] = forecast.forecast
      }
      state.forecasts = forecastsObj;
      findAreaAndWeather()
    }  
  })
})
/**
 * Searh Traffic Data and Find Area and Weather
 */
actions.loadTraffic = action(async () => {
  var datestr = ''
  if(state.date){
    datestr = "?date_time="+state.date+"T"+state.time
  }else{
    return
  }
  await RestClient.get(GovApiLinks.Traffic_Url+datestr).then(res=>{
    var data = res.data
    if(data.items && data.items[0].cameras){
      state.cameras = data.items[0].cameras
      findAreaAndWeather()
    }  
  })
})
/**
 * Find the camera area by compare latitude and longitude
 * 
 */
let findAreaAndWeather = ()=>{
  let areas = toJS(state.areas)
  let cameras = toJS(state.cameras)
  let forecasts = toJS(state.forecasts)
  for(let ckey in cameras){
    let camera = cameras[ckey]
    let clatitude = camera.location.latitude.toFixed(1);
    let clongitude = camera.location.longitude.toFixed(1);
    //console.log(`xxxx ${llatitude} ${llongitude} : ${clatitude} ${clongitude}`)
    for(let key in areas){
      let area = areas[key]
      area.cameras = []
      let loc =  area.label_location
      let llatitude = loc.latitude.toFixed(1);
      let llongitude = loc.longitude.toFixed(1);
      //console.log(`${llatitude} ${llongitude}`)
      if(llatitude == clatitude && llongitude == clongitude){
        camera.area = area.name
        camera.weather = forecasts[area.name]
      }
    }
  }
  cameras.sort( compare );//Sort the camera with Area
  state.cameras = cameras
}
function compare( a, b ) {
  if ( a.area < b.area ){
    return -1;
  }
  if ( a.area > b.area ){
    return 1;
  }
  return 0;
}
export default { state, actions }
