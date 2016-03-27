define(["validate"],function (validate){
	/**
	 * aqiData，存储用户输入的空气指数数据
	 * 示例格式：
	 * aqiData = {
	 *    "北京": 90,
	 *    "上海": 40
	 * };
	 */
	var aqiData = {},tempData = {},
	dom_name = document.getElementById("aqi-city-input"),
	dom_value = document.getElementById("aqi-value-input"),
	dom_btn = document.getElementById("add-btn"),
	dom_table = document.getElementById("aqi-table"),
	dom_tr = document.createElement("tr"),myVerify;
	/**
	 * 从用户输入中获取数据，向aqiData中增加一条数据
	 * 然后渲染aqi-list列表，增加新增的数据
	 */
	function addAqiData() {
		if(!aqiData[dom_name.value]){
			aqiData[dom_name.value] = dom_value.value;	
			tempData[dom_name.value] = dom_value.value;	
			// apiArray.push(dom_name.value);
		}
	}

	/**
	 * 渲染aqi-table表格
	 */
	function renderAqiList(_data,_type) {
		for(var aqi in _data){
			var _dom_tr = dom_tr.cloneNode(),
			 td_name = document.createElement("td"),
			 td_value = document.createElement("td"),
			 td_btn = document.createElement("td"),
			 td_btn_b = document.createElement("button");
			td_name.innerHTML = aqi;
			td_value.innerHTML = _data[aqi];
			td_btn_b.innerHTML = "删除";
			td_btn_b.className = "btn btn-primary";
			td_btn.appendChild(td_btn_b);
			_dom_tr.appendChild(td_name);
			_dom_tr.appendChild(td_value);
			_dom_tr.appendChild(td_btn);
			dom_table.appendChild(_dom_tr);
		}
	}

	/**
	 * 点击add-btn时的处理逻辑
	 * 获取用户输入，更新数据，并进行页面呈现的更新
	 */
	function addBtnHandle() {
		if(myVerify.globalVaild()){
			addAqiData();
			renderAqiList(tempData);
			tempData = {};
		}
	}

	/**
	 * 点击各个删除按钮的时候的处理逻辑
	 * 获取哪个城市数据被删，删除数据，更新表格显示
	 */
	function delBtnHandle(e) {
	  // 方法一.
	  // var _node = e.firstChild.textContent;
	  // dom_table.removeChild(e);
	  // delete aqiData[_node];
	  //方法二
	  var _node = e.firstChild.textContent;
	  dom_table.innerHTML = "";
	  delete aqiData[_node];
	  renderAqiList(aqiData);
	}

	function init() {
	  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
	  dom_btn.onclick = addBtnHandle;
	  dom_table.addEventListener("click",function(e){
	  		if(e.target&&e.target.nodeName =="BUTTON"){
	  				delBtnHandle(e.target.parentNode.parentNode);
	  		}
	  });
	 
	  myVerify = validate.createVerify({
	  	"name":{
	  		occas:"blur",
	  		rule:[
	  			{
					regExp:/^([\u4e00-\u9fa5]|[A-z])+$/,//验证规则
					prompt:"中英文,其他都不要输入",	//提示内容
				}
				],	
			later:function(e,_obj){				//验证后处理
				if(_obj.success){
				 	e.className = "form-control";
				}else{
					e.className = "form-control wp-bd";
				}
				console.log(_obj.message);
			},
			handle:function(e){
				var val_name = e.value;
		  		val_name = val_name.replace(/\s|\n|\f|\t|\v|\r/g, "");
		  		e.value = val_name;
			}	
	  	},
	  	"value":{
	  		occas:"blur",
	  		rule:[
				{
					regExp:/^[1-9][0-9]*$/,//验证规则
					prompt:"输入必须是正整数",	//提示内容
				}
				],	
			later:function(e,_obj){				//验证后处理
				if(_obj.success){
				 e.className = "form-control";
				}else{
					e.className = "form-control wp-bd";
				}
				console.log(_obj.message);
			},
			handle:function(e){
				var val_name = e.value;
		  		val_name = val_name.replace(/\s|\n|\f|\t|\v|\r/g, "");
		  		e.value = val_name;
			}	
	  	}
	  });
	}
	return {
		init:init
	}

});


