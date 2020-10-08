var xiaomi = {
    start(){
		this.loginJudge();
		this.header();
		this.sectionHeader();
		this.categoryList();
		this.flashtime();
		this.flashlist();
		this.pageMain();
    },
	//判断是否登录
	loginJudge(){
		let loginState = sessionStorage.getItem("loginState");
		let J_siteInfo = document.getElementById('J_siteInfo');
		let J_siteUserInfo = document.getElementById('J_siteUserInfo');
		// 判断是否登录
		if(loginState=='true'){
			J_siteInfo.style.display = 'none';
			J_siteUserInfo.style.display = 'block';
			let idaccount = sessionStorage.getItem("idaccount");
			document.getElementsByClassName('name')[0].innerHTML = idaccount;
		} else {
			J_siteInfo.style.display = 'block';
			J_siteUserInfo.style.display = 'none';
		}
		// 退出
		let J_userLogout = document.getElementById('J_userLogout');
		J_userLogout.onclick = function() {
			sessionStorage.setItem("flage", 'false');
			J_siteInfo.style.display = 'block';
			J_siteUserInfo.style.display = 'none';
		}
	},

    // 头部方法
    header(){
        /* 头部导航栏start */
        let J_childrenList = document.getElementById('J_childrenList');
        let navItem = J_childrenList.getElementsByClassName('nav-item');
		for (let i = 0; i < navItem.length - 2; i++) {
			navItem[i].onmousemove = function() {
                navItem[i].children[0].style.position = 'relative';
                navItem[i].children[0].style.top = '-5px';
				navItem[i].children[1].style.display = 'block';
			}
			navItem[i].onmouseout = function() {
                navItem[i].children[0].style.top = '0px';
				navItem[i].children[1].style.display = 'none';
			}
		}
		/* 头部导航栏end */
        // 搜索start
		let search = document.getElementById('search');
		let J_keywordList = document.getElementById('J_keywordList');
		// input获取焦点
		search.onfocus = function() {
			J_keywordList.style.display = 'block';
			search.style.borderColor = '#ff6700';
		}
		// 失去焦点
		search.onblur = function() {
			J_keywordList.style.display = 'none';
			search.style.borderColor = '#eee';
		}
		// 搜索end
		let J_goodsList = document.getElementById('J_goodsList');
		let categoryLi = J_goodsList.getElementsByClassName('category-li');
		for (let i = 0; i < categoryLi.length; i++) {
			categoryLi[i].onmousemove = function() {
				this.getElementsByTagName('div')[0].style.display = 'block';
			}
			categoryLi[i].onmouseout = function() {
				this.getElementsByTagName('div')[0].style.display = 'none';
			}
		}
	},
	//主体部分的头部方法
	sectionHeader() {
		var bannerList = document.getElementsByClassName("banner-list")[0];
		let J_homeTop = document.getElementById('J_homeTop');
		let pagination = J_homeTop.getElementsByClassName('banner-pagination')[0].querySelectorAll('li');
		var iNow = 0;//记录当前下标

		// 页面加载时开启自动播放
		var timer = setInterval(tab,5000);
		// 鼠标移入时取消自动播放
		bannerList.onmouseover = function() {
			clearInterval(timer);
		}
		// 鼠标移出时开启自动播放
		bannerList.onmouseout = function() {
			timer = setInterval(tab, 5000);
		}

		function tab(){
			if(bannerList.offsetLeft == -4904){
				bannerList.style.left = 0 + 'px';
			}else{
				bannerList.style.left = bannerList.offsetLeft - 1226 + 'px';
				if(iNow < 4){
					iNow++;
				}else{
					iNow=0;
				}
				for(let j = 0;j < pagination.length;j++){
					pagination[j].className = '';
					pagination[iNow].className = 'active';
				}
			}
		}
		// 分页按钮
		for(let i=0;i < pagination.length;i++){
			pagination[i].onclick=function(){
				for(let j = 0;j < pagination.length;j++){
					pagination[j].className = '';
				}
				bannerList.style.left = i * -1226 + 'px';
				this.className = 'active';
				iNow=i;
			}
		}
	},
		//主体部分的头部方法的二级菜单
	categoryList(){
		let J_goodsList = document.getElementById('J_goodsList');
		let categoryLi = J_goodsList.getElementsByClassName('category-li');
		for (let i = 0; i < categoryLi.length; i++) {
			categoryLi[i].onmousemove = function() {
				this.getElementsByTagName('div')[0].style.display = 'block';
			}
			categoryLi[i].onmouseout = function() {
				this.getElementsByTagName('div')[0].style.display = 'none';
			}
		}
	},
	// 小米闪购定时器
	flashtime() {
		let time = document.getElementById('js_ground');
		let hou = document.getElementById('hou');
		let minute = document.getElementById('minute');
		let second = document.getElementById('second');

		setInterval(function() {
			var newDate = new Date(); //获取系统当前时间
			var year = newDate.getFullYear(); //获取年份
			var month = newDate.getMonth() + 1; //系统月份是从0开始的
			var day = newDate.getDate(); //获取的是日期
			var hour = newDate.getHours(); //小时

			if (hour % 2 != 0) {
				//小时奇变偶
				hour = hour - 1;
			}
			time.innerHTML = hour + ":00" + "场";

			//时间差=结束时间（时间场小时+2）-起始时间（系统当前时间）;
			var endtime = year + "/" + month + "/" + day + " " + (hour + 2) + ":00:00";
			var statetime = newDate;
			var bidtime = (new Date(endtime).getTime() - statetime.getTime()) / 1000;
			var bidmin = bidtime / 60;
			var bidhour = bidmin / 60;

			hou.innerHTML = "0" + Math.floor(bidhour);

			if (parseInt(bidmin % 60) < 10) {
				minute.innerHTML = "0" + parseInt(bidmin % 60);
			} else {
				minute.innerHTML = parseInt(bidmin % 60);
			}

			if (parseInt(bidtime % 60) < 10) {
				second.innerHTML = "0" + parseInt(bidtime % 60);
			} else {
				second.innerHTML = parseInt(bidtime % 60);
			}
		}, 1000);
	},

	// 小米闪购轮播
	flashlist() {
		const width = 993;
		let prev = document.getElementsByClassName('btn-flashsale-prev')[0];
		let next = document.getElementsByClassName('btn-flashsale-next')[0];
		let J_flashSaleList = document.getElementById('J_flashSaleList').children[0];
		let index = 0;
		// 页面加载时开启自动播放
		var timer = setInterval(btnNextfn, 5000);
		// 鼠标移入时取消自动播放
		J_flashSaleList.onmouseover = function() {
			clearInterval(timer);
		}
		// 鼠标移除时开启自动播放
		J_flashSaleList.onmouseout = function() {
			timer = setInterval(btnNextfn, 5000);
		}
		next.onclick = btnNextfn;

		function btnNextfn() {
			if (index != 3) {
				index++;
				J_flashSaleList.style.transform = 'translateX(-' + index * width + 'px)';
			}
		}
		prev.onclick = function() {
			if (index) {
				index--;
				J_flashSaleList.style.transform = 'translateX(-' + index * width + 'px)';
			}
		}
	},
	// 家电/智能
	pageMain() {
		// 家电
		let J_household = document.getElementById('J_household').children;
		let household = document.getElementsByClassName('main-household')[0].getElementsByClassName('right');
		this.boxContent(J_household, household);
		// 智能
		let J_capacity = document.getElementById('J_capacity').children;
		let capacity = document.getElementsByClassName('main-capacity')[0].getElementsByClassName('right');
		this.boxContent(J_capacity, capacity);
	},
	// 家电/智能的共同方法
	boxContent(array, element) {
		for (let i = 0; i < array.length; i++) {
			array[i].index = i;
			array[i].onmousemove = function() {
				for (let j = 0; j < element.length; j++) {
					array[j].className = '';
					element[j].style.display = 'none';
				}
				this.className = 'tab-active';
				element[this.index].style.display = 'block';
			}
		}
	},
}





// 加载事件
window.onload = function() {
	xiaomi.start();
}