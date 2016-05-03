;
(function(){
	require.config({
　　　　paths: {
　　　　　　"bounced": "bounced",
　　　　　　"test": "test_37_1"
　　　　}
　　});
}());
require(["test"], function (test){
　　　test.init();
});
