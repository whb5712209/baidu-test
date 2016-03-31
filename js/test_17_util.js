define(function () {
	function Statis(){
		var self = this;
		self.arr = [];
		self.add = function(_type,_obj){
			var i =0,len = self.arr.length,flag = false,show;
			if(i === len){
				var obj = {};
				obj[_type] = _obj[_type];
				obj.value = _obj.value;
				if(_type =="week"){
					obj.show = "第"+obj[_type]+"周";
				}else{
					obj.show = obj[_type]+"月";
				}
				self.arr.push(obj);
				flag = true;
			}else{
				for(;i<len;i++){
					if(self.arr[i][_type] == _obj[_type]){
						var num = self.arr[i].value;
						self.arr[i].value = num +_obj.value;
						flag = true;
					}
				}
			}
			if(!flag){
				var obj = {};
				obj[_type] = _obj[_type];
				obj.value = _obj.value;
				if(_type =="week"){
					obj.show = "第"+obj[_type]+"周";
				}else{
					obj.show = obj[_type]+"月";
				}
				self.arr.push(obj);
			}
		}
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