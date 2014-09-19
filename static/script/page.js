/*
*  参数
*  saetxt:false                               首页与末页是否以文字的形式展示 默认值:false
*  hidePreNxt:false                           是否隐藏上一页/下一页 默认值:false
*  pre:''                                     上一页按钮 默认值:''(为空时以图片按钮显示)
*  nxt:''                                     下一页按钮 默认值:''(为空时以图片按钮显示)
*  ellipsis:10                                总页数超过ellipsis后显示省略 默认值:10
*  page:1                                     当前页 默认值:1
*  pages:20                                   总页数 默认值:1
*  pageB:document.getElementById('ui')        容器 默认值:document
*  num:3                                      当前页左右各显示多少页 默认值0
*  url:'http://aijsd.com/?asd=asd&page='      分页跳转地址(跳转的页数会跟在url的最后一位字符串后面)
*
*/
var pageJs=function(o){
	return new pageJs.fn.init(o);
}
pageJs.fn=pageJs.prototype={
	init:function(o){
		this.saetxt=o.saetxt||false;
		this.hidePreNxt=o.hidePreNxt||false;
		this.pre=o.pre||'page_icon';
		this.nxt=o.nxt||'page_icon';
		this.ellipsis=o.ellipsis||10;
		this.page=o.page||1;
		this.pages=o.pages||1;
		this.pageB=o.pageB||document;
		this.num=o.num||0;
		this.currentClass=o.currentClass||'page_current';
		this.url=o.url||'javascript:void(0)';
        this.jupFn=o.jupFn;
		this.initFn();
	},
	initFn:function(){
		this.addHandler.guid=0;
		this.paging();
	},
	paging:function(){
		var pageB=this.pageB,pageBox=document.createElement('div');pageBox.className='pageBox',_this = this;
		if(pageB.nodeType==1){
			var txt=this.saetxt,ellipsis=this.ellipsis,pages=this.pages,num=this.num,url=this.url,page=this.page<1?1:(this.page>pages?pages:this.page);
			function createA(n){
				var a=document.createElement('a');
				var span=document.createElement('span');
				a.className='page_a';
				span.className='page_span';
				a.setAttribute('page',n);
				a.href=url=='javascript:void(0)'?'javascript:void(0)':url+n;
				if(n==1||n==pages){
					span.innerHTML=txt?(n==1?'首页':'末页'):(n+'');
				}else{
					span.innerHTML=n+'';
				}
				a.setAttribute('hideFocus','true');
				a.appendChild(span);
				return a
			}
			function createC(n){
				var a=createA(n);
				a.href='javascript:void(0)';
				a.getElementsByTagName('span')[0].innerHTML=n+'';
				return a
			}
			function showAl(pas){
				while(pas){
					if(pas==page){
						var center=createC(page);
						this.addClass(center,this.currentClass);
						pageBox.insertBefore(center,pageBox.firstChild);
					}else{
						pageBox.insertBefore(createA(pas),pageBox.firstChild);
					}
					pas--;
				}
			}
			pageBox.innerHTML='';
			if(pages<=ellipsis){
				var pas=pages;
				showAl.call(this,pas);
			}else{
				if(pages<=(2*num+1)){
					var pas=pages;
					showAl.call(this,pas);
				}else{
					var center=createC(page);
					this.addClass(center,this.currentClass);
					pageBox.appendChild(center);
					/*当前页前*/
					if(page-num>2){
						var span=document.createElement('span');
						span.className='page_ellipsis';
						span.innerHTML='...';
						pageBox.insertBefore(createA(1),center);
						pageBox.insertBefore(span,center);
						var tmp=page+num<=pages?num:(2*num)-(pages-page);
						while(tmp){
							pageBox.insertBefore(createA(page-tmp),center);
							tmp--;
						}
					}else{
						var tmp=1;
						while(tmp<page){
							pageBox.insertBefore(createA(tmp),center);
							tmp++;
						}
					}
					/*当前页后*/
					if((page+num)<(pages-1)){
						var tmp=page+1,enp=page-num>=1?page+num:2*num+1;
						while(tmp<=enp){
							pageBox.appendChild(createA(tmp));
							tmp++;
						}
						var span=document.createElement('span');
						span.className='page_ellipsis';
						span.innerHTML='...';
						pageBox.appendChild(span);
						pageBox.appendChild(createA(pages));
					}else{
						var tmp=page+1;
						while(tmp<=pages){
							pageBox.appendChild(createA(tmp));
							tmp++;
						}
					}
				}
			}
			/*上一页*/
			var a=document.createElement('a');
			a.setAttribute('hideFocus','true');
			if(this.pre=='page_icon'){
				a.className='page_icon page_pre';
			}else{
				a.className='page_a';
				var span=document.createElement('span');
				span.className='page_span';
				span.innerHTML=this.pre;
				a.appendChild(span);
			}
			a.href=url=='javascript:void(0)'?'javascript:void(0)':url+(page-1);
            a.setAttribute('page',(page-1<1?1:(page-1)));
			if(this.hidePreNxt){
				if(page>1){
					pageBox.insertBefore(a,pageBox.firstChild);
				}
			}else{
				if(page==1){
					a.href='javascript:void(0)';
					this.hasClass(a,'page_icon')?this.addClass(a,'page_pre_disable'):this.addClass(a,'page_disable');
				}
				pageBox.insertBefore(a,pageBox.firstChild);
			}
			/*下一页*/
			var a=document.createElement('a');
			a.setAttribute('hideFocus','true');
			if(this.nxt=='page_icon'){
				a.className='page_icon page_nxt';
			}else{
				a.className='page_a';
				var span=document.createElement('span');
				span.className='page_span';
				span.innerHTML=this.nxt;
				a.appendChild(span);
			}
			a.href=url=='javascript:void(0)'?'javascript:void(0)':url+(page+1);
            a.setAttribute('page',(page+1>pages?pages:(page+1)));
			if(this.hidePreNxt){
				if(page<pages){
					pageBox.appendChild(a);
				}
			}else{
				if(page==pages){
					a.href='javascript:void(0)';
					this.hasClass(a,'page_icon')?this.addClass(a,'page_nxt_disable'):this.addClass(a,'page_disable');
				}
				pageBox.appendChild(a);
			}

			if(txt){
				var totalP=document.createElement('span');
				totalP.className='total_pages p_span';
				totalP.innerHTML='共'+pages+'页';
				pageBox.appendChild(totalP);
			}
			/*跳页*/
			var jup=document.createElement('span');
			var jupto=document.createElement('input');
			var jupbtn=createA(99);
			this.addClass(jupbtn,'jupbtn');
			jupbtn.href='javascript:void(0);';
			jupbtn.getElementsByTagName('span')[0].innerHTML='跳转';
			jup.appendChild(jupbtn);
			jup.className='jup p_span';
			jupto.className='jupto';
			jupto.type='text';
			jupto.setAttribute('maxlength',10);
			jup.appendChild(document.createTextNode('跳转至 '));
			jup.appendChild(jupto);
			jup.appendChild(document.createTextNode(' 页'));
			pageBox.appendChild(jup);
			/*输入校验&&跳页事件*/
			function jupi(){
				var that=this;
				setTimeout(function(){
					var val=that.value,reg=/[^\d]+/g;
					if(reg.test(val)){
						that.value=val.replace(reg,'');
					}
				},50);
			}
			function jupd(e){
				var val=parseInt(jupto.value);
                if(typeof _this.jupFn=='function'){
                    _this.jupFn.call(this,(val>pages?pages:val<1?1:val));
                    return
                }
				if(val && typeof val=='number'){
					window.location=val>=parseInt(pages)?(url+pages):val<=1?(url+'1'):(url+val);
					if(document.all){e.returnValue=false}else{e.preventDefault()}
				}
			}
            this.addHandler(jupto,'keyup',jupi);
			this.addHandler(jupto,'paste',jupi);
			this.addHandler(jupbtn,'click',jupd);
			/**/
			pageB.appendChild(pageBox);
		}
	},
	clone:function(from,to){
		for(var p in from){
			if(typeof from[p]=='object'){
				to[p]={};
				arguments.callee(from[p],to[p]);
				continue
			}
			to[p]=from[p]
		}
	},
	addClass:function(o,className){
		if(o&&o.nodeType==1){
			if(o.className==''){
				o.className=className;	
			}else if(!this.hasClass(o,className)){
				o.className+=' '+className;
			}
		}
		
	},
	removeClass:function(o,className){
		if(o&&o.nodeType==1){
			if(o.className||o.className==''){
				o.className=(' '+o.className+' ').replace((' '+className+' '),' ');
				o.className=o.className.replace(/^\s*|\s*$/g,'');
			}
		}
	},
	hasClass:function(o,className){
		if(o&&o.nodeType==1){
			var className = " " + className + " ";
	        if((" " + o.className + " ").replace(/[\n\t\r]/g, " ").indexOf(className) > -1){
	        	return true;
			}
    	}
    	return false;
	},
	getByClass:function(str,o){
		var context=o||document;
		var eles=context.getElementsByTagName('*'),i=0,l=eles.length;
		var arr=[];
		for(;i<l;i++){
			if(this.hasClass(eles[i],str)){
				arr.push(eles[i]);
			}
		}
		return arr
	},
	parents:function(o,className){
		if(o&&o.nodeType==1){
			var parent=o.parentNode.nodeType==1?o.parentNode:null;
			if(parent==null){
				return []
			}else if(!(this.hasClass(parent,className))){
				return [].concat(this.parents(parent,className))
			}
			return [parent].concat(this.parents(parent,className))
		}
	},
	addHandler:function(element,type,handler){
		// 为每一个事件处理函数赋予一个独立ID
		if (!handler.$$guid) handler.$$guid = this.addHandler.guid++;
		// 为元素建立一个事件类型的散列表（元素的所有事件类型都保存在该对象中）
		if (!element.events) element.events = {};
		// 为每一个元素/事件建立一个事件函数处理的散列表(同一事件类型的不同处理函数保存在该对象中)
		var handlers = element.events[type];
		if (!handlers) {
			handlers = element.events[type] = {};
			// 存储已有事件处理函数（如果存在一个）
			if (element["on" + type]) {
				handlers[0] = element["on" + type]
			}
		}
		// 在散列表中存储该事件类型的处理函数
		handlers[handler.$$guid] = handler;
		// 注册一个全局处理函数来处理所有函数
		element["on" + type] = this.handleEvent
	},
	removeHandler:function(element,type,handler){
		// 从散列表中删除事件处理函数
		if (element.events && element.events[type]) {
			delete element.events[type][handler.$$guid];
		}
	},
	removeTypeAllHandler:function(element,type){
		//从散列表中删除某一事件的所有处理函数
		if (element.events && element.events[type]) {
			delete element.events[type]
		}
	},
	handleEvent:function(event){
		// 获取event对象 (IE 中使用全局event对象)
		event = event || window.event;
		// 获取对应事件的处理函数散列表
		var handlers = this.events[event.type];
		// 依次执行处理函数散列表中的函数
		for (var i in handlers) {
			handlers[i].apply(this,[event])
		}
	},
	quickQuery:function(key,arr){
		if(arr.length==1){
			return arr[0]==key?true:false
		}else if(arr.length>1){
			var tmp=Math.floor(arr.length/2);
			if(key==arr[tmp]){
				return true
			}else if(key<arr[tmp]){
				return arguments.callee(key,arr.slice(0,tmp));
			}else if(key>arr[tmp]){
				return arguments.callee(key,arr.slice(tmp));
			}
		}
	}
}
pageJs.fn.init.prototype=pageJs.fn;
