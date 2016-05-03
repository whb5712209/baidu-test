define(["bounced"],function (bounced){
    var obj = {
      init:function (argument) {
             document.getElementById("openModel").addEventListener("click",function (argument) {
             bounced.open("<button id='btn2'>打开弹框</button><input type='text' >",function () {
                document.getElementById("btn2").addEventListener("click",function () {
                   bounced.open().addFooter( {
                    "确认吗":function(event){
                          console.log(123);
                      },
                      "关闭吗":function(event){
                          bounced.close(456);
                      }
               });
                })
             }).showTip("二胖").addFooter(
               {
                    "确认吗":function(event){
                          console.log(123);
                      },
                      "关闭吗":function(event){
                          bounced.close(456);
                      }
               }
             );
           });
      }
    };
    return obj;
});