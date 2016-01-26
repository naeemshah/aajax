(function($){


	$.fn.aAjax = function(options){

		var settings = $.extend({
            // These are the defaults.
            appendTo : "",
            imageClass : "obj",
            appendWidth : 100,
            appendHeigth : 100,
            url:"",
            fileName:"myfile",
            percentageBar : "",
            allowed : "",
            maxSize : 10
        }, options );
    
       
        var obj = this;
        var xhr = new XMLHttpRequest();
        var fd = new FormData();
        var perClass = "per";
       $(this).after("<span class='"+perClass+"'></span>");
        var ctrl = $("."+perClass);
        

    //===============  file upload change ==============   
	jQuery(document).on("change",this,function(){
	  if(ifExsist(settings.appendTo)){
		var img = document.createElement("img");
        img.classList.add(settings.imageClass);
        img.height = settings.appendWidth;
        img.width = settings.appendHeigth;
        $(settings.appendTo).html("");
        var reader = new FileReader();
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
       reader.readAsDataURL(obj[0].files[0]);
       console.log(checkSize(obj[0].files[0]));
    //  sendFile(obj[0].files[0]);

    }

             
       }); 
   //===============  file upload change Ends ==============  

    //===============  if appendTo Exsist ==============   
	       function ifExsist(selector){
	       	if($(selector).length){
              	return true;
              }
              else{
              	return false;
              }
	       }
   //===============  if appendTo Exsist Ends ==============   


   //===============  Send File  ==============   
	       function sendFile(file){
	          xhr.open("POST",settings.url, true);
	          fd.append(settings.fileName, file);
	          xhr.send(fd);
	       }
   //===============  Send File  Ends ==============   


    xhr.onreadystatechange = function() { 
                if (xhr.readyState == 4 && xhr.status == 200) {
                    // Handle response.
                 //  console.log(xhr.responseText); // handle response.
                }
            };

    xhr.upload.addEventListener("progress", function(e) {
        if (e.lengthComputable) {
          var percentage = Math.round((e.loaded * 100) / e.total);
          ctrl.html("");
          ctrl.html(percentage+"%");
         
        }
      }, false); 

    

    //===============  Check File Exection  ==============

    function checkExt(file){
          var extension = file.name.split('.').pop();
           var allowed = settings.allowed.split(",");
            if($.inArray(extension,allowed) === -1){
                return false;
            }
            return true;
    }

 //===============  Check File Exection Ends  ==============

 //===============  Check File Size ==============

    function checkSize(file){
      if(((file.size/1024)/1024) >= settings.maxSize){
                 return false;          
         }
         return true;

    }
//===============  Check File Size Ends ==============

	}

})(jQuery);