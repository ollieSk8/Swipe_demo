(function(){
		var container=document.getElementById('container');
		var iStartPageY=0;//开始时候手指按下的Y点
		var iPageY=0;//页面的初始Y位置
		var page_count=container.getElementsByTagName('div').length;//页面数量

		var pageHeight=container.getElementsByTagName('div')[0].offsetHeight;
		var iTransY=0;//上一次页面位置 加上 移动的位置
		var iNow=0;
		var iDis=0;//移动的位置
		function touchstartFn(ev){
			iStartPageY=ev.changedTouches[0].pageY;
		    iPageY=iTransY;	
		}
		function touchmoveFn(ev){
			iDis=ev.changedTouches[0].pageY-iStartPageY;
			iTransY=iPageY+iDis;
			setTransformY(container,iTransY);
		};
		function touchendFn(ev){
			if(iDis<0&&Math.abs(iDis)>50){
				//console.log('向上')
				iNow++;
				if(iNow>page_count-1){
					iNow=page_count-1;
				}
				iTransY=-iNow*pageHeight;
				setTransformY(container,iTransY);
			    setTransition(container);
			}else if(iDis>0&&Math.abs(iDis)>50){
				//console.log('向下')
				iNow--;
				if(iNow<0){
					iNow=0;
				}
				iTransY=-iNow*pageHeight;
				setTransformY(container,iTransY);
			    setTransition(container);
			}else{
				iTransY=-iNow*pageHeight;
				setTransformY(container,iTransY);
			    setTransition(container);
			}

		};
		function setTransformY(obj,dis){
			obj.style.transform='translate(0px,'+dis+'px)';
			obj.style['-webkit-transform']='translate(0px,'+dis+'px)';
		}
		function setTransition(obj){
			obj.style.transition='all 0.4s ease-out';
			obj.style['-webkit-transition']='all 0.4s ease-out';
		}
		
		container.addEventListener('touchstart',touchstartFn,false);
		container.addEventListener('touchmove',touchmoveFn,false);
		container.addEventListener('touchend',touchendFn,false);
		document.addEventListener('touchmove',function(ev){
			ev.preventDefault();
		},false)
})();