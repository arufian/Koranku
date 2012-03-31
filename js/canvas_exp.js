$(window).load(function(){
		var canvas = document.getElementById('tutorial');
		  if (canvas.getContext){

		    var ctx = canvas.getContext('2d');
		    ctx.lineWidth = 5;
		    ctx.strokeStyle = "black";
		    ctx.lineCap  = "round";
		    ctx.beginPath();
		    // melungker 1
		    ctx.moveTo(50,20);
		    ctx.quadraticCurveTo(60, 25, 50, 40);
		    ctx.moveTo(50,40);
		    ctx.quadraticCurveTo(40, 55, 50, 60);
		    // melungker 2
		    ctx.moveTo(70,20);
		    ctx.quadraticCurveTo(80, 25, 70, 40);
		    ctx.moveTo(70,40);
		    ctx.quadraticCurveTo(60, 55, 70, 60);
		    // melungker 3
		    ctx.moveTo(90,20);
		    ctx.quadraticCurveTo(100, 25, 90, 40);
		    ctx.moveTo(90,40);
		    ctx.quadraticCurveTo(80, 55, 90, 60);
		    ctx.stroke();
		    ctx.closePath();

		    // ellipse cup
		    var centerX = 65;
		    var centerY = 60;
		    var radius = 15;
		    ctx.save();
		    ctx.beginPath();
		    ctx.moveTo(105,centerY);
		    ctx.bezierCurveTo(
		    	    110, centerY+radius, // C1
		    	    30, centerY+radius, // C2
		    	    30, centerY); // A2
		    // bibir cup kiri
		    ctx.bezierCurveTo(
		    		28, centerY-1, // C1
		    		34, centerY-6, // C2
		    	    35, centerY-5); // A2
		    // body cup
		    var radius = 53;
		    ctx.moveTo(32,centerY+15);
		    ctx.bezierCurveTo(
		    	    17, centerY+radius, // C2
		    	    110, centerY+radius, // C1
		    	    104, centerY+17); // A2
		    //pegangan
		    ctx.moveTo(110,centerY+15);
		    ctx.quadraticCurveTo(
		    		120, centerY+13, // C2
		    	    110, centerY+25); // A2
		    ctx.stroke();
		    ctx.closePath();

		  }

		  var str = 'YUI;AZUNYAN;MUGI;RITSU;MIO';
		  var str_split = str.split(';');
		  var rotate_deg = 0;
		  var text_div = document.getElementById('text');
		  var idx = 0;
		  var rotate_arr = [];
		  for(var i=0;i<str_split.length;i++){
			  for(var j=0;j<str_split[i].length;j++){
				  var span_el = document.createElement('span');
				  span_el.setAttribute('id','span'+idx);
				  span_el.style.webkitTransform = "rotate("+rotate_deg+"deg)";
				  span_el.innerText = str_split[i].charAt(j);
				  rotate_deg += 15;
				  text_div.appendChild(span_el);
				  rotate_arr[idx] = rotate_deg;
				  idx++;
			  }
			  rotate_deg += 5;
		  }

		  var rotation = 2;
		  // animation
		  var animate = function(){
			  for(var i=0;i<idx;i++){
				  var tmp_text = document.getElementById('span'+i);
				  tmp_text.style.webkitTransform = "rotate("+(rotate_arr[i]+rotation)+"deg)";
			  }
			  rotation +=2;
		  }
		  setInterval(animate, 100);
		  var snd = new Audio("http://dl.dropbox.com/u/16001200/utauyo.mp3");
		  snd.play();
		  snd.addEventListener('ended', function() {
			    this.currentTime = 0;
			    this.play();
			}, false);
});