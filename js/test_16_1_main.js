;
(function(){
	require.config({
　　　　paths: {
　　　　　　"validate": "../lib/js/validatejs/validate",
　　　　　　"test": "test_16_1"
　　　　}
　　});
}());
require(["test"], function (test){
　　　test.init();
});
