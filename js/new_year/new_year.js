/**
 * Created by Administrator on 2017/2/14.
 */

var imgDataURL = ""; //上传图片地址
var studentName = "";
var gender = "";
var accommodation = "";
var idNumber = "";
var pattern = "";
var telNumber = "";
var reg = "";
var noteCode = "";
var checkbox = "true";
var nationId = "";
var nativePlace = "";
var nowAddress  = "";
var detailAddress  = "";
var phoneNumber1  = "";
var phoneNumber2  = "";

//点击开通i家校业务图标时隐藏和显示替换
$(".details-picture>img").click(function () {
    $(".details-txt").toggle();
});

// 拍照上传
//$('#upload-file').change(function () {
//    var file = this.files[0];
//    if(file){
//    	var reader=new FileReader();
//    	reader.readAsDataURL( file );//参数是file对象，将file转换成url可读取的
//    	reader.onload = function(e) {
//    		imgDataURL = this.result; //保存照片数据
//    		$('#upload-pic').html('<img src="' + this.result + '" id="pic" alt="" />'); //展示图片
//    	};        	
//    }     
//});

var pre;//源图片名称
/**
 * 获得base64
 * @param {Object} obj
 * @param {Number} [obj.width] 图片需要压缩的宽度，高度会跟随调整
 * @param {Number} [obj.quality=0.8] 压缩质量，不压缩为1
 * @param {Function} [obj.before(this, blob, file)] 处理前函数,this指向的是input:file
 * @param {Function} obj.success(obj) 处理后函数
 *
 */
$.fn.localResizeIMG = function(obj) {
    this.on('change', function() {
        var file = this.files[0];
        pre = file.name;
        var URL = window.URL || window.webkitURL;
        var blob = URL.createObjectURL(file);

        // 执行前函数
        if ($.isFunction(obj.before)) {
            obj.before(this, blob, file);
        }

        _create(blob, file);
        this.value = ''; // 清空临时数据
    });

    /**
     * 生成base64
     * @param blob 通过file获得的二进制
     */
    function _create(blob) {
        var img = new Image();
        img.src = blob;

        img.onload = function() {
            var that = this;

            //生成比例-old
            /* var w = that.width, h = that.height, scale = w / h;
             w = obj.width || w;
             h = w / scale;*/
            
             //生成图像参数
             var sx=0; //开始剪切的 x 坐标位置
             var sy=0; //开始剪切的 y 坐标位置
             var swidth=0; //在原图上剪切的宽度
             var sheight=0; //在原图上剪切的高度
             var x=0; //在画布上放置剪切图像的 x 坐标位置。
             var y=0; //在画布上放置剪切图像的 y 坐标位置。
             var objW = obj.width; //生成的图片的宽度--对剪切的图像进行缩放
             var objH = obj.height; //生成的图片的高度--对剪切的图像进行缩放

             var w = that.width; //原图宽
             var h = that.height; //原图高
             swidth=w;
             sheight=h;
             var scale = w / h; //原图比例
             if ( scale > objW /objH){
             	//如果原图的宽高比大于生成图片的宽高比例，说明原图过宽，需要裁剪,定位x坐标
            	swidth = objW / objH * h ;
             	sx = (w - swidth) /2;
             }else{
             	//原图宽高比 小于 生成图片的宽高比，说明原图过长，需要裁切，定位y坐标
            	sheight = objH /objW * w ;
             	sy = (h - sheight ) /2;
             }           

             //生成canvas
             var canvas = document.createElement('canvas');
             var ctx = canvas.getContext('2d');
             //设置画布大小
             $(canvas).attr({
                 width : objW,
                 height : objH,
             });
             ctx.drawImage(that, sx, sy, swidth, sheight, 0, 0, objW, objH);             
           

           /* //生成canvas--old
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            $(canvas).attr({
                width : w,
                height : h
            });
            ctx.drawImage(that, 0, 0, w, h);*/

            /**
             * 生成base64
             * 兼容修复移动设备需要引入mobileBUGFix.js
             */
            var base64 = canvas.toDataURL('image/jpeg', obj.quality || 0.8);

            // 修复IOS
            if (navigator.userAgent.match(/iphone/i)) {
                var mpImg = new MegaPixImage(img);
                mpImg.render(canvas, {
                    maxWidth : objW,
                    maxHeight : objH,
                    quality : obj.quality || 0.8
                });
                base64 = canvas.toDataURL('image/jpeg', obj.quality || 0.8);
            }

            // 修复android
            if (navigator.userAgent.match(/Android/i)) {
                var encoder = new JPEGEncoder();
                base64 = encoder.encode(ctx.getImageData(0, 0, objW, objH),
                        obj.quality * 100 || 80);
            }
            
            // 生成结果
            var result = {
                base64 : base64,
                clearBase64 : base64.substr(base64.indexOf(',') + 1)
            };

            // 执行后函数
            obj.success(result);
        };
    }
};

$(function() {
    $("input[type=file]").each(function() {
        var _this = $(this);
        _this.localResizeIMG({
            width : 283,
            height :390,
            quality : 0.8,
            success : function(result) {
                //获取后缀名
                var att = pre.substr(pre.lastIndexOf("."));
                //压缩后图片的base64字符串
                var base64_string = result.clearBase64;
                //图片预览
                var imgObj = $("#img");
                imgObj.attr("src","data:image/jpeg;base64," + base64_string).show();
                
                imgDataURL=imgObj.attr("src");
            }
        });
    });

});
//性别切换
$("#woman").click(function () {
    $(this).css({"background": "#00B47D", "color": "#fff","border":"1px solid #00B47D"});
    $("#man").css({"background": "#fff", "color": "#333","border":"1px solid #BCBCBC"});
    $("#gender").val("女");
});
$("#man").click(function () {
    $(this).css({"background": "#00B47D", "color": "#fff","border":"1px solid #00B47D"});
    $("#woman").css({"background": "#fff", "color": "#333","border":"1px solid #BCBCBC"});
    $("#gender").val("男");
});

//住宿与走读切换
$("#extern").click(function () {
    $(this).css({"background": "#00B47D", "color": "#fff","border":"1px solid #00B47D"});
    $("#in-residence ").css({"background": "#fff", "color": "#333","border":"1px solid #BCBCBC"});
    $("#isDorm").val("走读");
});
$("#in-residence ").click(function () {
	$(this).css({"background": "#00B47D", "color": "#fff","border":"1px solid #00B47D"});
	$("#extern").css({"background": "#fff", "color": "#333","border":"1px solid #BCBCBC"});
    $("#isDorm").val("住校");
});

var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
var reg = /^1[34578]\d{9}$/;

//身份证号失去焦点时判断
$("input[name=idNumber]").blur(function(){
    if ($(this).val() == "") {
        $(".student-name").html("请输入身份证号").css("color", "red");
    }else{
        if (pattern.test($(this).val())) {
            $(".student-name").html("");
        }else{
            $(".student-name").html("请输入正确身份证号").css("color", "red");
        }
     }

});
//学生姓名失去焦点时判断
$("input[name=studentName]").blur(function(){
    if ($(this).val() == "") {
        $(".student-name").html("请输入学生姓名").css("color", "red");
    }else{
        $(".student-name").html("");
    }
});
//手机号失去焦点时判断
$("input[name=telNumber]").blur(function(){
    if ($(this).val() == "") {
        $(".student-name").html("请输入家长手机号码").css("color", "red");
    }else {
        if(reg.test($(this).val())){
            $(".student-name").html("");
        }else{
            $(".student-name").html("请输入正确的手机号码").css("color", "red");
        }
    }
});

//表单提交验证
$("#submit-info").click(function () {
    studentName = $("input[name=studentName]").val();
    gender = $("#gender").val();
    accommodation = $("#isDorm").val();
    idNumber = $("input[name=idNumber]").val();
    pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    telNumber = $("input[name=telNumber]").val();
    reg = /^1[34578]\d{9}$/;
    noteCode = $("input[name=noteCode]").val();
    checkbox;
    if($("input[type=checkbox]").prop('checked')){
    	checkbox="true";
    }else{
    	checkbox="false";
    }
   //alert(studentName+gender+accommodation+idNumber+telNumber+noteCode+checkbox);
    if (studentName == "") {
        $(".student-name").html("请输入学生姓名").css("color", "red");
        return false;
    }
    if (idNumber == "") {
        $(".student-name").html("请输入身份证号").css("color", "red");
        return false;
    } else if (!pattern.test(idNumber)) {
        $(".student-name").html("请输入正确身份证号").css("color", "red");
        return false;
    }
    if (telNumber == "") {
        $(".student-name").html("请输入家长手机号码").css("color", "red");
        return false;
    } else if (!reg.test(telNumber)) {
        $(".student-name").html("请输入正确的手机号码").css("color", "red");
        return false;
    }
    if (noteCode == "") {
        $(".student-name").html("请输入短信验证码").css("color", "red");
        return false;
    }
    if(imgDataURL==""){
    	$(".student-name").html("请上传学生照片").css("color", "red");
    	return false;
    }
    $("#confirm-submit").removeAttr("disabled");
});
	
$("#confirm-submit").on("click",function() {
	$("#confirm-submit").attr("disabled",true);
	$('#myModal').modal('hide');
	$.ajax({
     	url:ctx+"/student/addStudentInfo.do",
     	type:"post",
     	async:false,
     	data:{"schoolId":schoolId,"name":studentName,"sex":gender,"isDorm":accommodation,
     		"qinPhone1":telNumber,"identity":idNumber,"sms":noteCode,"iskaiBusiness":checkbox,	"studentImg":imgDataURL},
     	success:function(data){
     		if(data.result == 200){
     			window.localStorage.setItem("studentId",data.studentId); //存储学生id
                window.localStorage.setItem("isKaiBusiness",checkbox); //是否开通业务 "true"/"false"
  
     			window.location.href = 'submit_page/info_submitted_success.html';
     			//window.location.href = 'submit_page/info_submitted_success.html?s='+encodeURIComponent (ajaxobj.studentId);
     		}else{
     			$(".student-name").html(data.message).css("color", "red");
     			/*setTimeout(function(){
     				$("#confirm-submit").attr("disabled",false);
     			},200); */    			
     		}
     	},
     	error:function(data){
     		alert("网络超时，请重新提交！");     		
     	}
     });
});

//继续完善信息页面
//表单提交验证
$("#submit-info1").click(function () {
	//民族
	nationId=$("#gr_zone_ids").attr("data-id");
    //籍贯
    nativePlace = $("input[class=city]").val();
    // 出生日期
    //var birthday = $("input[name=appDate]").val();
    // 户口所在地
    //var residence = $("input[class=city1]").val();
    //现居住地
    nowAddress = $("input[class=city2]").val();
    detailAddress = $("input[class=detailAddress]").val();
    // 监护人电话
    phoneNumber1 = $("input[name=phoneNumber1]").val();
    phoneNumber2 = $("input[name=phoneNumber2]").val();
    var reg = /^1[34578]\d{9}$/;
    if (nationId== "") {
        $(".student-name").html("请选择民族").css("color", "red");
        return false;
    }
    if (nativePlace== "") {
        $(".student-name").html("请选择籍贯").css("color", "red");
        return false;
    }
    /*if (birthday== "") {
        $(".student-name").html("请选择出生日期").css("color", "red");
        return false;
    }
    if (residence== "") {
        $(".student-name").html("请选择户口地址").css("color", "red");
        return false;
    }*/
    if ( nowAddress== "") {
        $(".student-name").html("请选择现居住地址").css("color", "red");
        return false;
    }
    if ( detailAddress== "") {
        $(".student-name").html("请输入详细地址").css("color", "red");
        return false;
    }
    if(phoneNumber1!=""){
    	if (!reg.test(phoneNumber1)) {
            $(".student-name").html("请输入正确的手机号码").css("color", "red");
            return false;
        }
    }
    if(phoneNumber2!=""){
    	if (!reg.test(phoneNumber2)) {
            $(".student-name").html("请输入正确的手机号码").css("color", "red");
            return false;
        }
    }
    $("#confirm-submit1").removeAttr("disabled");
});

$("#confirm-submit1").on("click",function() {
	$("#confirm-submit1").attr("disabled",true);
	$('#myModal').modal('hide');
	$.ajax({
     	url:ctx+"/student/UpdateStudentInfo.do",
     	type:"post",
     	async:false,
     	data:{"studentId":studentId,"nationId":nationId,"origin":nativePlace,
     		"nowAddress":nowAddress,"homeAddress":detailAddress,"qinPhone2":phoneNumber1,"qinPhone3":phoneNumber2},
     	success:function(data){
     	 	//var ajaxobj=eval(data);
     		console.log(data.message);
     		if(data.result == 200){
     			localStorage.clear();
     			window.location.href = 'info_submitted_success1.html';
     		}else{
	     		$(".student-name").html(data.message).css("color", "red");
	     		/*setTimeout(function(){
 				$("#confirm-submit").attr("disabled",false);
 				},200); */ 
     		}
     	},
     	error:function(data){
     		alert("网络超时，请重新提交！");
     	}
     });
});

