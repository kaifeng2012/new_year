/**
 * Created by Administrator on 2017/2/24.
 */
//ҳ��ײ������л�
$(function(){
   $(".nav li").click(function(){
       //alert("asas");
        $(this).addClass("active").siblings("li").removeClass("active");
       $(".info-collect").hide().eq($('.nav li').index(this)).show();
   })
});


/**
 * 获取URL参数
 * @param argName 参数名称
 */
function getArgs(argName) {
	var argValue = "";
	var searchStr = location.search;
	if(searchStr.indexOf("?") >= 0) {
		searchStr = searchStr.substr(1); //由于searchStr属性值包括“?”，所以除去该字符
	}
	var searchs = searchStr.split("&"); //将searchStr字符串分割成数组，数组中的每一个元素为一个参数和参数值
	for(var i = 0; i < searchs.length; i++) {
		if(searchs[i].split("=")[0] == argName) {
			argValue = searchs[i].split("=")[1];
			break;
		}
	}
	return decodeURIComponent(argValue);
}

//获取项目上下文路径
function getContextPath(){   
	/*var pathName = document.location.pathname;   
	var index = pathName.substr(1).indexOf("/");   
	var result = pathName.substr(0,index+1);   
	return result; */
	
	//return "${basePath}";  //本地运行使用
	
	return "";  //测试库环境 使用
}
/*//�ײ�������ʾ�л�
var bottomNav=$(".nav li");
var menuNum=parseInt(bottomNav.length);
//�ײ�������ʾ3��
if(menuNum==3){
   $(".nav li").css({
       "float":"left","border":"1px solid #999999","width":"33.3%","text-align":"center"
   });
}else
//�ײ�������ʾ2��
if(3>menuNum>1){
    $(".nav li").css({
        "float":"left","border":"0px solid #999999","width":"49.9%","text-align":"center"
    });
}else
//�ײ�����һ��Ҳ����ʾ
   if(menuNum<=1){
     $(".nav").hide();
 }
*/
