window.onload = function (argument) {
   
   document.getElementById("openModel").addEventListener("click",function (argument) {
     model.open("大胖").showTip("二胖").addFooter(
     {
          "确认吗":function(event){
                console.log(123);
            },
            "关闭吗":function(event){
                model.close(456);
            }
     }
     );
   });
   
   (function createModel(window){
     function modelServer(){
        var modelView = "",warpDom = document.createElement("div"),switchFlag = false, layer = document.createElement("div"),
        needVagueDom = document.getElementsByClassName("need-vague"),nvdlength = needVagueDom.length,
        footerDiv =  document.createElement("div"),body = document.createElement("div"),h3 = document.createElement("h3"),self= this;
        opt= {
          size:"moderate",
          isMask:true,
          isZoom:true,
          title:"请输入弹出框标题",
          dom:"请输入弹框显示项",
          btn:{
            
          }
        };
        var listener = function(dom,event,fn){
           dom.addEventListener(event,fn);
        };
        var createModelView = function(){
             // 创建 弹框dom
          modelView = document.createDocumentFragment();
          var header = document.createElement("header"),
          title =document.createElement("div"),close = document.createElement("div"),
          spanx = document.createElement("span"),
          footer = document.createElement("footer");
          warpDom.className = "eject big";title.className = "title";close.className = "close";
          body.className = "eje-body",layer.className = "layer";
          h3.innerHTML = opt.title;
          spanx.innerHTML = "x";
        
          footer.appendChild(footerDiv);
          header.appendChild(title);
          title.appendChild(h3);
          close.appendChild(spanx);
          header.appendChild(close);
          body.innerHTML = opt.dom;
          warpDom.appendChild(header);
          warpDom.appendChild(body);
          warpDom.appendChild(footer);
          modelView.appendChild(warpDom);
          modelView.appendChild(layer);
          document.body.appendChild(modelView);
          listener(close,"click",function(){
            self.close();
          })
        };
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
        self.shift = function(){
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
        var switchVague = function(){
          if(switchFlag){
            warpDom.style.display = "block";
            layer.style.display = "block";
            
            switchFlag = false;
           for(var i = 0;i <nvdlength;i++){
              needVagueDom[i].className = "need-vague vague";
           }
          }else{
            warpDom.style.display = "none";
              layer.style.display = "none";
            switchFlag = true;
            for(var i = 0;i <nvdlength;i++){
              needVagueDom[i].className = "need-vague";
            }
          }
           return self;
        };
        self.close = function(){
          switchFlag = false;
          switchVague();
          footerDiv.innerHTML = "";
          return self;
        };
        self.open = function(divStr){
          switchFlag = true;
          switchVague();
          resize();
          if(divStr){
             body.innerHTML = divStr;
          }
          return self;
        };
        self.showTip = function (divStr) {
           if(divStr){
             h3.innerHTML = divStr;
          }
          return self;
        }
        self.addFooter = function (btns) {
            for(var i in btns){
               var  span = document.createElement("span");
               span.className =  "btn btn-default";
               span.innerHTML = i;
               listener(span,"click",btns[i]);
               footerDiv.appendChild(span);
          }
          return self;
        }
        var init = function(){
          createModelView();
          switchFlag = false;
          switchVague();
        };
        init();
     };
      var m =  new modelServer();
      m.shift();
      window["model"] = m;
    })(window);

}


