$(function(){
	var canvasS = 600;
	var row = 15;
	var blocks = canvasS/row;
    var canvas = document.querySelector('#canvas');
	var ctx = canvas.getContext('2d');
	var starRadius = 3; 
	$('canvas').get(0).height = canvasS;
	$('canvas').get(0).width = canvasS;


    var IMAGE = new Image();
    IMAGE.src = './qita/a.jpg';
    $(IMAGE).on('load',function(){
        var TA = ctx.createPattern(IMAGE,'no-repeat');
        ctx.fillStyle = TA;
        ctx.fill();
        ctx.drawImage(IMAGE,0,0,600,600)  
	var draw = function(){
		var off = blocks/2+0.5;
	    var lineWidth = canvasS-blocks;
		ctx.save();
		ctx.beginPath();
		ctx.translate(off,off);
		for( var i = 0;i<row;i++){
			ctx.moveTo(0,0);
		    ctx.lineTo(lineWidth,0);
		    ctx.translate(0,blocks);
		}
		
		ctx.stroke();
		ctx.closePath();
		ctx.restore();

		ctx.save();
		ctx.beginPath();
		for( var i = 0;i<row;i++){
			if( i === 0 ){
		        ctx.translate(off,off);
			}else{
		        ctx.translate(blocks,0);
			}
			ctx.moveTo(0,0);
		    ctx.lineTo(0,lineWidth);
		}
		
		ctx.stroke();
		ctx.closePath();
		ctx.restore();


		
		var point = [3.5*blocks+0.5,11.5*blocks+0.5]
		for( var i = 0;i<2;i++){
			for( var j = 0;j<2;j++){
				ctx.save()
		        ctx.beginPath()
				var x = point[i]
				var y = point[j]
				ctx.translate(x,y)
		        ctx.arc(0,0,5,0,(Math.PI/180)*360)
		        ctx.fill()
		        ctx.closePath()
		        ctx.restore()
			}
		}
	
		//中间点
		ctx.save()
		ctx.beginPath()
		ctx.translate(7.5*blocks+0.5,7.5*blocks+0.5)
		ctx.arc(0,0,5,0,(Math.PI/180)*360)
		ctx.fill()
		ctx.closePath()
		ctx.restore()
	}
	draw()

	//
	var drop = function( qizi ){
		// qizi.x
		// qizi.y
		// qizi.color

        ctx.save()
        ctx.translate((qizi.x+0.5)*blocks,(qizi.y+0.5)*blocks)
        ctx.beginPath()
		ctx.arc(0,0,15,0,(Math.PI/180)*360)
		if( qizi.color === 1 ){
			// var rd = ctx.createRadialGradient(0,0,5,0,3,10)
			// rd.addColorStop(0, '#FCF9EC');
   //          rd.addColorStop(0.1, '#676764');
   //          rd.addColorStop(1, '#1b1b1b');
			ctx.fillStyle = "#000"
		}else{
			// var rd2 = ctx.createRadialGradient(0,0,5,0,3,10)
			// rd2.addColorStop(0.1,"#7E7979")
			// rd2.addColorStop(0.7,"#676764")
			// rd2.addColorStop(1,"#FCF9EC")
			ctx.fillStyle = "#fff"
			ctx.shadowOffsetY = 4;
            ctx.shadowBlur =  10;
            ctx.shadowColor = '#ccc';
		}
		ctx.fill()
		ctx.closePath()
		ctx.restore()
    }    


	var kaiguan = true;
	  all = {};
	  var step = 1;

	  panduan = function(qizi){
	    var shuju = {};
	    $.each(all,function(k,v){
	      if( v.color === qizi.color ){
	        shuju[k] = v;
	      }
	    })
	    var shu = 1,hang=1,zuoxie=1,youxie=1;
	    var tx,ty;

	    /*|*/
	    tx = qizi.x; ty = qizi.y;
	    while ( shuju [ tx + '-' + (ty + 1) ]){
	      shu ++;ty++;
	    }
	    tx = qizi.x; ty = qizi.y;
	    while ( shuju [ tx + '-' + (ty - 1) ]){
	      shu ++; ty--;
	    }

	    /*-*/
	    tx = qizi.x ; ty = qizi.y;
	    while( shuju[ (tx+1) + '-' + ty ] ){
	      hang++;tx++;
	    }
	    tx = qizi.x ; ty = qizi.y;
	    while( shuju[ (tx-1) + '-' + ty ] ){
	      hang++;tx--;
	    }

	    tx = qizi.x ; ty = qizi.y;
	    while( shuju[ (tx-1) + '-' + (ty-1) ] ){
	      zuoxie++;tx--;ty--;
	    }
	    tx = qizi.x ; ty = qizi.y;
	    while( shuju[ (tx+1) + '-' + (ty+1) ] ){
	      zuoxie++;tx++;ty++;
	    }

	    tx = qizi.x ; ty = qizi.y;
	    while( shuju[ (tx+1) + '-' + (ty-1) ] ){
	      youxie++;tx++;ty--;
	    }
	    tx = qizi.x ; ty = qizi.y;
	    while( shuju[ (tx-1) + '-' + (ty+1) ] ){
	      youxie++;tx--;ty++;
	    }

	    if( shu >=5  || hang>=5 || zuoxie>=5 || youxie>=5){
	      return true;
	    }
	  }

	    $('#canvas').on('click',function(e){
	        var x = Math.floor(e.offsetX/blocks);
	        var y = Math.floor(e.offsetY/blocks);

	        if( all[ x + '-' + y ]){
	            return;
	        }

	        var qizi;
	        if(kaiguan){
	    	    qizi = {x:x,y:y,color:1,step:step};
	    	    drop(qizi);
	    	    if( panduan(qizi) ){
	    		    $('.cartel').show().find('#jieguo').text('黑棋赢');
	    	    };
	        }else{
	    	    qizi = {x:x,y:y,color:0,step:step};
	    	    drop(qizi);
	    	    if( panduan(qizi) ){
	    		    $('.cartel').show().find('#jieguo').text('白棋赢');
	    		    // return;
	    	    };
	        }
	        step += 1;
	        kaiguan = !kaiguan;
	        all[ x + '-' + y ] = qizi;
	    });

	    $(".restart").on('click',function(){
	    	$('.cartel').hide();
	    	$('#save').hide();
	    	ctx.clearRect(0,0,600,600);
	    	var IMAGE = new Image();
	    	IMAGE.src = './qita/a.jpg';
	    	$(IMAGE).on('load',function(){
	    		var TA = ctx.createPattern(IMAGE,'no-repeat');
	    		ctx.fillStyle = TA;
	    		ctx.fill();
	    		ctx.drawImage(IMAGE,0,0,600,600) 

	    	ctx.save();
	    	draw();
	    	kaiguan = true;
	    	all = {};
	    	step = 0;
	    	ctx.restore();
        })
	    })
	    $('#save').on('click',function(){
	    	ctx.clearRect(0,0,600,600);
	    	var IMAGE = new Image();
	    	IMAGE.src = './qita/a.jpg';
	    	$(IMAGE).on('load',function(){
	    		var TA = ctx.createPattern(IMAGE,'no-repeat');
	    		ctx.fillStyle = TA;
	    		ctx.fill();
	    		ctx.drawImage(IMAGE,0,0,600,600) 

	    	ctx.save();
	    	draw();
	    	kaiguan = true;
	    	all = {};
	    	step = 0;
	    	ctx.restore();
	    })
	    })
	    $('.tips').on('mouseleave',function(){
	    	$('.close').stop(true,true);
	    	$('.close').fadeOut();
	    })
	    $('.tips').on('mouseenter',function(){
	    	$('.close').stop(true,true);
	    	$('.close').fadeIn();
	    })



	    $('.end').on('click',function(){
	    	$('.cartel').hide();
	    	$('#save').show();
	    	ctx.save();
	    	ctx.font = "18px consolas";
	    	for( var i in all){
	    		if( all[i].color === 1){
	    			ctx.fillStyle = '#fff';
	    		}else{
	    			ctx.fillStyle = 'black';
	    		}
	    		ctx.fillText(all[i].step,
	    			(all[i].x+0.5)*blocks -5,
	    			(all[i].y+0.5)*blocks +5);
	    	}
	    	ctx.restore();
	    	var image = $('#canvas').get(0).toDataURL("image/jpg",1);
	    	$('#save').attr('href',image)
	    	$('#save').attr('download',"qipu.jpg");
	    })

	    $('.tips').on('click',false);
	    $('.close').on('click',function(){
	    	$('.cartel').hide();
	    })
	    $('.cartel').on('click',function(){
	    	$(this).hide();
	    })
    })
})