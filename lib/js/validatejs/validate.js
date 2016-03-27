define(function(){
	function Verify(){ 
		var self = this,dom = document.querySelector('.verify'),opt
		 doms = dom.querySelectorAll("input[valid]"), vaildtorDom = [];
		/*
		 *@parme _rule:验证规则
		 *@parme _v1:验证值
		 *@parme _v2:验证提示内容
	  	 *@parme _v3:验证对象
		 */
		var vaildSingle = function(_rule,_v1,_v2,_v3){
			var vaildtor = {
				success:true,
				message:""
			}
			switch(_rule){
				case "request":
					vaildtor.success = typeof _v3 ==='undefined'?false:_v3.length<=0?false:true;
					vaildtor.message =vaildtor.success?"":"请输入字符";
					break;
				case "maxLength":
					vaildtor.success = typeof _v3 ==='undefined'?true:_v3.length<parseInt(_v1)?true:false;
					vaildtor.message =vaildtor.success?"":"请输入小于"+_v1+"个字符";
					break;
				case "regExp":
					vaildtor.success = _v1.test(_v3)?true:false;
					vaildtor.message = vaildtor.success?"":_v2?_v2:"正则校验失败";
					break;	
			}
			return vaildtor;
		};
		// 3)定义整体验证规则
		self.globalVaild = function(){
			var i = 0,len = vaildtorDom.length,flag = true;;
			for(;i<len;i++){
				for(var j in vaildtorDom[i]){
					var _domName = j;
					var domInput = vaildtorDom[i][j];
					var rules =opt[_domName].rule;
					var obj = localVaild(rules,domInput);
					opt[_domName].later(domInput,obj,opt[_domName]["handle"]);
					if(!obj.success){
						flag = false;
					}
				}
			}
			return flag;
		};
		self.init = function(_opt){
			opt = _opt;
			var i = 0,len = doms.length;
			for(;i<len;i++){
				var domName = doms[i].getAttribute("valid");
				var obj = {};
				obj[domName] = doms[i];
				vaildtorDom.push(obj);
				bindElement(doms[i],domName);
			}
		};
		//将需要验证的dom元素绑定事件
		var bindElement = function(_dom,domName){
			_dom.addEventListener(opt[domName].occas,function(e){
				 var domInput = e.target;
				 var rules = opt[domName].rule;
				opt[domName].later(e.target,localVaild(rules,domInput,opt[domName]["handle"]));
			});
		}
		//将多个校验方式拆分分别校验	
		var localVaild = function(rules,domInput,handle){
			if(!(typeof handle === "undefined")){
					handle(domInput);
			}
			var i = 0,len = rules.length,obj = {success:true,message:""};
			 for(;i<len;i++){
			 	for(var j in rules[i]){
			 		if(j !=="prompt"){
			 			var _obj = vaildSingle(j,rules[i][j],rules[i].prompt,domInput.value);
			 			if(!_obj.success){
							obj.success = _obj.success;
							obj.message = _obj.message;
			 			}
			 		}
			 	}
			 }
			 return obj;
		}
	}
	function createVerify(_opt){
		var v = new Verify();
		v.init(_opt);
		return v;
	}
	return {
		createVerify:createVerify
	};
});