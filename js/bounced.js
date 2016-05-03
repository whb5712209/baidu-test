/*
 * 弹框
 */
define(function (argument) {
    function modelServer(){
        var warpDom = document.createElement("div"),switchFlag = false, layer = document.createElement("div"),
            needVagueDom = document.getElementsByClassName("need-vague"),nvdlength = needVagueDom.length,
            footerDiv =  document.createElement("div"),body = document.createElement("div"),closeDom = document.createElement("div"),
            showDialogView = document.getElementsByClassName("showDialog")[0],
            h3 = document.createElement("h3"),self= this,spanObj = [];
        opt= {
            size:"moderate",
            isMask:true,
            isZoom:true,
            title:"请输入弹出框标题",
            dom:"请输入弹框显示项",
            btn:{

            }
        };
        // 绑定事件
        var bind = function(dom,event,fn){
            dom.addEventListener(event,fn);
        };
        var unbind = function(dom,event,fn){
            dom.removeEventListener(event, fn);
        };
        // 创建弹框
        var createModelView = function(){
            // 创建 弹框dom
            var modelView = document.createDocumentFragment();
            var header = document.createElement("header"),
                title =document.createElement("div"),
                spanx = document.createElement("span"),
                footer = document.createElement("footer");
            warpDom.className = "eject big";title.className = "title";closeDom.className = "close";
            body.className = "eje-body",layer.className = "layer";
            h3.innerHTML = opt.title;
            spanx.innerHTML = "x";

            footer.appendChild(footerDiv);
            header.appendChild(title);
            title.appendChild(h3);
            closeDom.appendChild(spanx);
            header.appendChild(closeDom);
            body.innerHTML = opt.dom;
            warpDom.appendChild(header);
            warpDom.appendChild(body);
            warpDom.appendChild(footer);
            modelView.appendChild(warpDom);
            modelView.appendChild(layer);
            showDialogView.appendChild(modelView);
            bind(closeDom,"click",self.close);
        };
        // 调整位置
        var resize = function(){
            var ow = document.body.offsetWidth ;
            var oh = document.body.offsetHeight ;
            var cw = document.body.clientWidth ;
            var w = warpDom.clientWidth ||0;
            layer.style.height =oh;
            layer.style.width =ow;
            warpDom.style.left = (cw-w)/2;
            warpDom.style.top = 20;
        };
        // 显示隐藏逻辑处理
        var switchVague = function(){
            if(switchFlag){
                warpDom.style.display = "block";
                layer.style.display = "block";
                switchFlag = false;
                for(var i = 0;i <nvdlength;i++){
                    needVagueDom[i].className = "need-vague vague";
                }
            }else{
                warpDom.style.display 	= "none";
                layer.style.display 	= "none";
                switchFlag = true;
                for(var i = 0;i <nvdlength;i++){
                    needVagueDom[i].className = "need-vague";
                }
            }
            return self;
        };
        // 位置调整
        var shiftMyDialog = function(){
            var ori = {},move = {},flag = false;
            warpDom.addEventListener("mousedown",function(event){
                ori.x = event.clientX;
                ori.y = event.clientY;
                flag = true;
            });
            warpDom.addEventListener("mousemove",function(event){
                if(flag){
                    var dom = event.currentTarget;
                    var top = (
                        (parseFloat(dom.style.top) == ""||isNaN(parseFloat(dom.style.top)) ==true?0:parseFloat(dom.style.top))+ (event.clientY -ori.y))+"px";
                    var left = (
                        (parseFloat(dom.style.left) == ""||isNaN(parseFloat(dom.style.left)) ==true?0:parseFloat(dom.style.left)) + (event.clientX -ori.x))+"px";
                    dom.style.top = top;
                    dom.style.left = left;
                }
                ori.x = event.clientX;
                ori.y = event.clientY;
            });
            warpDom.addEventListener("mouseup",function(event){
                flag = false;
            });
            return self;
        };
        var size = function (argument) {
        	
        }
        // 初始化
        var init = function(){
            createModelView();
            switchFlag = false;
            switchVague();
            shiftMyDialog();
        };
        // 位置调整
        self.shift = function(){
            shiftMyDialog();
        };
        // 关闭
        self.close = function(){
            switchFlag = false;
            switchVague();
            return self;
        };
        // 显示
        self.show = function(){
            switchFlag = true;
            switchVague();
            return self;
        };
        // 打开
        self.open = function(divStr,fn){
            switchFlag = true;
            switchVague();
            resize();
            if(divStr){
                body.innerHTML = divStr;
            }
            if(typeof fn == "function"){
                fn();
            }
            return self;
        };
        // 设置标题
        self.showTip = function (divStr) {
            if(divStr){
                h3.innerText = divStr;
            }
            return self;
        };
        //设置底部按钮
        self.addFooter = function (btns) {
            for(var i=0;i<spanObj.length;i++){
                unbind(spanObj[i].dom,"click",spanObj[i].fn);
            }
            footerDiv.innerHTML = "";
            for(var i in btns){
                var  span = document.createElement("span");
                spanObj.push({"dom":span,"fn":btns[i]});
                span.className =  "btn btn-default";
                span.innerHTML = i;
                bind(span,"click",btns[i]);
                footerDiv.appendChild(span);
            }
            return self;
        };
        // 返回
        self.modelView = function(){
            return modelView;
        };
        self.isShow = function(){
            return switchFlag;
        };
        // 销毁
        self.dstroy = function(){
            for(var i=0;i<spanObj.length;i++){
                unbind(spanObj[i].dom,"click",spanObj[i].fn);
            }
            unbind(closeDom,"click",self.close);
            // 销毁dom对象
            showDialogView.removeChild(warpDom);
            showDialogView.removeChild(layer);
            // 销毁绑定事件
        }
        init();
    };
    var operationDialog = function(){
        var self = this,list = [];
        self.open = function (domStr,fn) {
            var index = list.length;
            if(index === 0){
                var model = new modelServer();
                model.open(domStr,fn);
                list.push(model);
                return model;
            }else{
                var i = 0,len = list.length;
                if(list[index-1].isShow()){
                    // 隐藏
                    list[index-1].open();
                    return list[index-1];
                }else{
                    // 显示
                    list[index-1].close();
                    var _model = new modelServer();
                    _model.open(domStr,fn);
                    list.push(_model);
                    return _model;
                }

            }
        };
        self.close = function(){
            var index = list.length;
            if(index ===1){
                list[index-1].close();
                return list[index-1];
            }else{
                list[index-1].dstroy();
                list.splice(index-1,1);
                list[index-2].open();
            }
        }

    };
    return new operationDialog();
});