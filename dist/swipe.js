(function(){
		var common={
			//class do somthing
			getByClass:function(oParent,sClass){
				var aChild = oParent.getElementsByTagName('*');
		        var result = [];
			    for(var i =0;i<aChild.length;i++){
			        if(aChild[i].className.match(new RegExp("(\\s|^)" + sClass+ "(\\s|$)"))){ //判断是否有该class
			            result.push(aChild[i]);
			        };
			    };
			    return result;
			},
			hasClass:function(obj, cls){
				return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));  
			},

			addClass:function(obj, cls){
				if (!this.hasClass(obj, cls)) obj.className += " " + cls;  
			},
			removeClass:function(obj, cls){
				if (this.hasClass(obj, cls)) {  
			        var reg=new RegExp('(\\s|^)' +cls+ '(\\s|$)');  
			        obj.className = obj.className.replace(reg, '');  
			    }  
			}
		}
		var container=document.getElementById('container');
		var main_page=common.getByClass(container,'main_page');
		var H=window.innerHeight;
		var idx=0;//索引
		var count=main_page.length;
		var startY=0;
		var scrollY=0;//页面初始位置
		var transY=0;//变化的值
		var disY=0;
		var next=0;
		var prev=0;
		var music_btn=document.getElementById('music_btn');
		var audio=document.getElementById('audio');
		// 当前张  transformY 为 0  当前的 上一张的 transformY 为 -667  当前张的 下一张的transformY 为667
		//初始化
	    for(var i=0;i<main_page.length;i++){
	    	main_page[i].style.height=H+'px';
	    }
	    setZindx(main_page[1],1);
	    setZindx(main_page[count-1],1);
	    setZindx(main_page[0],2);
	    seTtransformY(main_page[1],H);
	    seTtransformY(main_page[count-1],-H);
	    seTtransformY(main_page[0],0);
	    //touchstart
	    var startHandle=function(ev){
	    	startY=ev.changedTouches[0].pageY;
	    	scrollY=transY;

	    	if(idx==0){
	    		next=idx+1;
	    		prev=count-1;
	    	}else if(idx==count-1){
	    		next=0;
	    		prev=idx-1;
	    	}else{
	    		next=idx+1;
	    		prev=idx-1;
	    	}
	    	for(var i=0;i<main_page.length;i++){
	    		main_page[i].style['-webkit-transition']='none';
	    	}
	    	setZindx(main_page[prev],2);
	    	setZindx(main_page[next],2);
	    	setZindx(main_page[idx],1);
	    	seTtransformY(main_page[idx],0);
	    	seTtransformY(main_page[prev],-H);
	    	seTtransformY(main_page[next],H);

	    }
	    //touchmove
	    var moveHandle=function(ev){
	    	disY=ev.changedTouches[0].pageY-startY;
	    	transY=scrollY+disY;
	   		if(transY<0){
	   			seTtransformY(main_page[next],transY+H);
	   			seTtransformY(main_page[prev],-H);
	   		}else{
	   			seTtransformY(main_page[prev],transY-H);
	   			seTtransformY(main_page[next],H);
	   		}
	    }
	    //touchend
	    var endHandle=function(ev){
	    	if(transY<0&&Math.abs(disY)>50){
	    		transY=0;
	    		seTtransformY(main_page[next],transY);
	    		main_page[next].style['-webkit-transition']='all 0.4s ease-out';
	    		idx++;
	    		if(idx>count-1){
	    			idx=0;
	    		}
	    	}else if(transY>0&&Math.abs(disY)>50){
	    		transY=0;
	    		seTtransformY(main_page[prev],transY);
	    		main_page[prev].style['-webkit-transition']='all 0.4s ease-out';
	    		idx--;
	    		if(idx<0){
	    			idx=count-1;
	    		}
	    	}else{
	    		seTtransformY(main_page[next],H);
	    		main_page[next].style['-webkit-transition']='all 0.4s ease-out';
	    		seTtransformY(main_page[prev],-H);
	    		main_page[prev].style['-webkit-transition']='all 0.4s ease-out';
	    	}
	    	
	    }
	    function seTtransformY(obj,dis){
	    	obj.style['-webkit-transform']='translate3d(0px,'+dis+'px,0px)';
	    }
	    function setZindx(obj,index){
	    	obj.style['z-index']=index;
	    }
	    container.addEventListener('touchstart',startHandle,false);
	    container.addEventListener('touchmove',moveHandle,false);
	    container.addEventListener('touchend',endHandle,false);
	    document.addEventListener('touchmove',function(ev){
	    	ev.preventDefault();
	    },false);
	    audio.autoplay=true;
	    music_btn.addEventListener('click',function(){
	    	if(common.hasClass(this,'rotate')){
	    		common.removeClass(this,'rotate');
	    		audio.pause();
	    	}else{
	    		common.addClass(this,'rotate');
	    		audio.play();
	    	}
	    },false);

	})();