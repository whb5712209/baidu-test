define(function () {

	function Statis(){
		var self = this;
		self.list=[],myType="";
		self.handle = function(type,obj){
			myType = type;
			runReckon(type,obj,self.list);
		}
		self.avg = function(){
			var i = 0,len = self.list.length;
			for(;i<len;i++){
				self.list[i].totalValue = parseInt(self.list[i].value/self.list[i].totalNum);
				if(myType =="day"){
					self.list[i].title = self.list[i].show +"空气质量为 "+self.list[i].totalValue;
				}else if(myType =="week"){
					self.list[i].title = "第"+self.list[i].week+"周,空气质量为 "+self.list[i].totalValue;
				}else{
					self.list[i].title = self.list[i].month+"月份,空气质量为 "+self.list[i].totalValue;
				}
			}
		}

	}	
	var reckon = {
		"day":function(obj,list){
			obj.totalNum = obj.day;
			list.push(obj);
		},
		"week":function(obj,list){
			var i = 0,len = list.length,flag = true,myObj = {};
			for(;i<len;i++){
				if(obj.week == list[i].week){
					myObj = list[i];
					myObj.totalNum += 1;
				 	myObj.value += obj.value;
				 	flag = false;
				}
			}
			if(len ==0||flag){
				myObj.totalNum = 1;
				myObj.value = obj.value;
				myObj.week = obj.week;
				list.push(myObj);
			}
		},
		"month":function(obj,list){
			var i = 0,len = list.length,flag = true,myObj = {};
			for(;i<len;i++){
				if(obj.month == list[i].month){
					myObj = list[i];
					myObj.totalNum += 1;
				 	myObj.value += obj.value;
				 	flag = false;
				}
			}
			if(len ==0||flag){
				myObj.totalNum = 1;
				myObj.value = obj.value;
				myObj.month = obj.month;
				list.push(myObj);
			}
		}

	}
	function runReckon(type,obj,list){
		return reckon[type](obj,list);
	}
	return {
		/*
		 *获取 data 所在年份的周数
		 *@param date 时间
 		 *@param arr所在年划分的周数组
		 */
		getWeek:function(date,arr){
			var millisecond = date.getTime(),i=0,len=arr.length;
			var j = 0;
			for(;i<len;i++){
				if(millisecond >= arr[i]&&millisecond<= arr[i+1]){
					return i;
				}
			}
			return -1;
		},
		/*
		 *获取 data 所在年份的周数组
		 *@param date 时间
		 */
		getWeeks:function(date) {
		    var arr = [];
		    var mymillisecond = 0;
		    var year = date.getFullYear();
		    var newYearDate = new Date(""+year);
		    var newYearLastDate = new Date((year+"-12-31"));
		    var firstmillisecond = newYearDate.getTime();
		    var lastmillisecond = newYearLastDate.getTime();
		    var newYearWeek = newYearDate.getDay();//data 该年第一天是周几
		    arr.push(firstmillisecond);
		    mymillisecond = (7-(newYearWeek+1))*86400000+firstmillisecond;
		    arr.push(mymillisecond);
		    while(true){
		        mymillisecond += 7*86400000;
		        if(mymillisecond<lastmillisecond){
		          arr.push(mymillisecond);
		        }else{
		          arr.push(lastmillisecond);
		          break;
		        }
		    }
		    return arr;
		},
		createStatis:function(){
			return new Statis();
		}
	}
})