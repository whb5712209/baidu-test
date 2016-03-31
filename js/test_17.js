define(["util"],function (util){
/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/
var option = document.createElement("option");
var csDom= document.getElementById("city-select");
var warpDom = document.getElementById("aqi-chart-wrap");
// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = [];

// 记录当前页面的表单选项
var pageState = { 
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
    warpDom.innerHTML = "";
    var divWarp = document.createElement("div");
    divWarp.className = "divWarp";
    var divChar = document.createElement("div");
    divChar.className = "divChar";
    var i = 0,len = chartData.length;
    for(;i<len;i++){
       var _divWarp = divWarp.cloneNode();
       var _divChar = divChar.cloneNode();
       if(pageState.nowGraTime =='day'){
          _divChar.className = "divChar divChar-w-1";
       }else if(pageState.nowGraTime =='week'){
          _divChar.className = "divChar divChar-w-2";
       }else{
          _divChar.className = "divChar divChar-w-3";
       }
        _divWarp.setAttribute("title",chartData[i].title);
       _divChar.style.height = chartData[i].totalValue+"px";
       _divChar.style.background = "rgba("+ parseInt(Math.random()*255)+", "+ parseInt(Math.random()*255)+", "+ parseInt(Math.random()*255)+",0.8)";
       _divWarp.appendChild(_divChar);
       warpDom.appendChild(_divWarp);
    }
}

function conditionChange(){
    var name = pageState.nowSelectCity;
    var obj = aqiSourceData[name];
    var type = pageState.nowGraTime;
    // 根据日期状态，将同种类型的数据 进行组装
    var dateList = [];
    for(var i in obj){
      var date = new Date(i);
      var arr = util.getWeeks(date);
      var j = util.getWeek(date,arr);
      var _obj = {
          day:date.getTime(),
          show:i,
          day:1,
          week:j+1,
          month:date.getMonth()+1,
          value:obj[i]
      }
      dateList.push(_obj);
    }
    chartData = conformity(dateList,type);
}
function conformity(list,type){
    var i=0,len = list.length,arr =[];
     var statis = util.createStatis(); 
    for(;i<len;i++){
        statis.handle(type,list[i]);
    }
    statis.avg();
    return statis.list;
};
/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 * 更改条件 
 */
function initGraTimeForm() {
    document.getElementById("form-gra-time").addEventListener("change",function(e){
        var dom = e.target;
        if(dom.name == "gra-time"){
          pageState.nowGraTime =dom.value;
          conditionChange();
          renderChart();
        }
    });
}

/**
 * 初始化城市Select下拉选择框中的选项
 *  更改条件
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    csDom.innerHTML = "";
    var j = 0;
    for(var i in aqiSourceData){
      var opt = option.cloneNode();
      opt.value = i;
      opt.text  = i;
      csDom.appendChild(opt);
      if(j ==0){
          pageState.nowSelectCity = i;
      }
      j++;
    }
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    csDom.addEventListener('change',function(e){
      pageState.nowSelectCity = e.target.value;
      conditionChange();
      renderChart();
    });
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  // 加处理完成的数据加载成dom
//   var pageState = { 
//   nowSelectCity: -1,
//   nowGraTime: "day"
// }
    pageState.nowSelectCity = "北京"
    conditionChange();
    renderChart();
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
  //   var date = new Date("2013-01-02");
  //  // var date = new Date("2013-02-03");
  // var arr = date.getWeeks();
  // console.log(arr);
  // var j = getWeek(date,arr);
  // console.log(j);
}
return {
    init:init
  }
})
