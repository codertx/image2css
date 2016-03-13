(function(){
	//load the image which was selected and draw on the canvas
	function loadImage(){
		var reader = new FileReader();
		var img = new Image();

		reader.readAsDataURL(this.files[0]); //load the image

		img.onload = function(){
			canvas = document.getElementById("canvas");
			canvas.width = this.width;
			canvas.height = this.height;

			var content = canvas.getContext("2d");
			content.drawImage(this,0,0);
		}

		reader.onload = function(){
			img.src = this.result;
		}
	}

	document.getElementById("load").addEventListener("change",loadImage,false);
})();

(function(){
	//convert image to css code
	function convert2CSS(){
		var div = document.getElementById("image2css");
		var canvas = document.getElementById("canvas");
		var cssStr = "box-shadow:";         //store css style string

		if(canvas !== null){
			var context = canvas.getContext("2d");
			var height = canvas.height;
			var width = canvas.width;

			for(var i=0;i<height;++i){
				for(var j=0;j<width;++j){
					var pixel = context.getImageData(j,i,1,1);
					var color = "rgba(" + pixel.data[0] + "," + pixel.data[1] + "," + pixel.data[2] + "," + pixel.data[3] + ")";
					color = color + ((i === height - 1 && j === width - 1)?";":",");
					cssStr = cssStr + j + "px " + i + "px 0px 1px " + color;
				}
			}
			div.setAttribute("style",cssStr);
		}

	}
	document.getElementById("convert").addEventListener("click",convert2CSS,false);
})();
