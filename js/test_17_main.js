;
(function(){
	require.config({
　　　　paths: {
　　　　　　"util": "test_17_util",
　　　　　　"test": "test_17"
　　　　}
　　});
}());
require(["test"], function (test){
　　　test.init();
});
