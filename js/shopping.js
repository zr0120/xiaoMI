var xiaomi = {
    // 初始化方法
    start() {
        let loginState = sessionStorage.getItem("loginState");

        let J_carListGoods = document.getElementById('J_carListGoods');
		let J_carEmpty = document.getElementById('J_carEmpty');
        
        // 判断是否登录

        if(loginState=='true'){
            J_carEmpty.style.display = 'none';
            J_carListGoods.style.display = 'block';
            this.ajaxFun();
        }else{
            J_carEmpty.style.display = 'block';
            J_carListGoods.style.display = 'none';
        }
    },
    // 数据请求
	ajaxFun() {
		let test;
		// 第一步:获取XMLHttpRequest对象
		if (window.XMLHttpRequest) {
			test = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			// 兼容IE低版本浏览器
			test = new window.ActiveXObject();
		} else {
			alert('请升级至最新版本的浏览器');
		}

		if (test != null) {
			// 第三步:open连接
			test.open('GET', 'json/Shopping.json', true);
			// 第四步:send请求
			test.send(null);

			// 第二步:设置状态监听事件
			test.onreadystatechange = function() {
				// 第五步:判断ajax.readyState == 4 && ajax.status == 200 表示请求成功
				if (test.readyState == 4 && test.status == 200) {
					// 第六步:接受反馈:使用JSON.parse()来取得里面的数据
					let obj = JSON.parse(test.responseText);
					// obj = false;
					if (obj) {
						let str = '',
							index = [],
							proc = [];
						for (var i = 0;i < obj.length;i++) {
							str +=
								`<div class="list-body myclear" data-checked = "false">
                                <div class="col col-check"><span class="J_select"></span></div>
                                <div class="col col-img"><img src="${obj[i].img}" alt=""></div>
                                <div class="col col-name">${obj[i].name}</div>
                                <div class="col col-price">${obj[i].proc}元</div>
                                <div class="col col-num">
                                    <div class="change-goods-num myclear J_changeGoodsNum">
                                        <a href="#" class="J_minus">-</a>
                                        <input tyep="text" value="${obj[i].number}" class="goods-num J_goodsNum">
                                        <a href="#" class="J_plus">+</a>
                                    </div>
                                </div>
                                <div class="col col-total">${obj[i].proc * obj[i].number}元</div>
                                <div class="col col-action">×</div>
                            </div> `;
							index.push(obj[i].xz);
							proc.push(obj[i].proc);
						}
						document.getElementById('wapper').innerHTML = str;
						xiaomi.updata(index, proc);
					} else {
						document.getElementById('J_carEmpty').classList.remove('hide');
						document.getElementById('J_carListGoods').style.display = 'none';
					}
				}
			}
		}
	},

	// 操作数据
	updata(index,proc){
		// 减加
		let J_minus = document.getElementsByClassName('J_minus');
		let J_plus = document.getElementsByClassName('J_plus');
		// 数量
		let J_goodsNum = document.getElementsByClassName('J_goodsNum');
		// 小计
		let colTotal = document.getElementsByClassName('col-total');
		//删除
		let colAction = document.getElementsByClassName('col-action');
		// 合计
		let J_carTotalPrice = document.getElementById('J_carTotalPrice');
		// 选项框
		let J_selectAll = document.getElementById('J_selectAll');
		let check = document.getElementsByClassName('J_select');

		let J_noSelectTip = document.getElementById('J_noSelectTip');
		let J_goCheckout = document.getElementById('J_goCheckout');

		// 加/减
		for (let i = 0; i < J_plus.length; i++) {
			J_plus[i].onclick = function() {
				if (J_goodsNum[i].value < index[i]) {
					J_goodsNum[i].value++;
					colTotal[i + 1].innerHTML = proc[i] * J_goodsNum[i].value + '元';
					sum();
				} else {
					alert("您购买的商品超过了限制的数量");
				}
			}
			J_minus[i].onclick = function() {
				if (J_goodsNum[i].value > 1) {
					J_goodsNum[i].value--;
					colTotal[i + 1].innerHTML = proc[i] * J_goodsNum[i].value + '元';
					sum();
				} else {
					alert("您购买的商品数量不能在低了哦");
				}
			}
		}
		// 求和
		function sum() {
			if (isSelectAll()) {
				J_noSelectTip.style.display = 'none';
				J_goCheckout.classList.remove('btn-disabled');
			} else {
				J_noSelectTip.style.display = 'block';
				J_goCheckout.classList.add('btn-disabled');
			}
			let colTotal = document.getElementsByClassName('col-total');
			let total = 0;
			for (let i = 0; i < check.length; i++) {
				if (check[i].parentNode.parentNode.dataset.checked == 'true') {
					total += parseFloat(colTotal[i+1].innerText);
				}
			}
			J_carTotalPrice.innerText = total;
			Select();
		}
		// 删除
		for (let i = 1; i < colAction.length; i++) {
			colAction[i].onclick = function() {
				if (confirm('是否删除')) {
					this.parentElement.remove();
					check.length--;
					document.getElementById('J_carTotalNum').innerHTML = check.length;
					sum();
				}
			}
		}
		// 单个选中
		for (let i = 0; i < check.length; i++) {
			check[i].onclick = function() {
				if (this.parentNode.parentNode.dataset.checked == 'false') {
					this.parentNode.parentNode.dataset.checked = 'true';
					this.style.backgroundColor = '#FF6700';
				} else {
					this.parentNode.parentNode.dataset.checked = 'false';
					this.style.backgroundColor = 'gray';

				}
				if (isSelect()) {
					J_selectAll.parentNode.parentNode.dataset.checked = 'false';
					J_selectAll.style.backgroundColor = 'gray';
				} else {
					J_selectAll.parentNode.parentNode.dataset.checked = 'true';
					J_selectAll.style.backgroundColor = '#FF6700';
				}
				sum();
			}
		}
		// 全选
		J_selectAll.onclick = function() {
			if (this.parentNode.parentNode.dataset.checked == 'false') {
				for (let i = 0; i < check.length; i++) {
					check[i].parentNode.parentNode.dataset.checked = 'true';
					this.parentNode.parentNode.dataset.checked = 'true';
					check[i].style.backgroundColor = '#FF6700';
					this.style.backgroundColor = '#FF6700';
				}
			} else {
				for (let i = 0; i < check.length; i++) {
					check[i].parentNode.parentNode.dataset.checked = 'false';
					this.parentNode.parentNode.dataset.checked = 'false';
					check[i].style.backgroundColor = 'gray';
					this.style.backgroundColor = 'gray';
				}
			}
			sum();
		}
		// 商品件数
		document.getElementById('J_carTotalNum').innerHTML = check.length;
		// 选中个数
		function Select() {
			var index = 0;
			for (let i = 0; i < check.length; i++) {
				if (check[i].parentNode.parentNode.dataset.checked == 'true') {
					index++;
				}
			}
			document.getElementById('J_selTotalNum').innerHTML = index;
		}
		// 判断只要有一个选中返回true
		function isSelectAll() {
			for (let i = 0, len = check.length; i < len; i++) {
				if (check[i].parentNode.parentNode.dataset.checked == 'true') {
					return true;
				}
			}
			return false;
		}

		// 判断只要有一个没有选中返回true
		function isSelect() {
			for (let i = 0, len = check.length; i < len; i++) {
				if (check[i].parentNode.parentNode.dataset.checked == 'false') {
					return true;
				}
			}
			return false;
		}
	},

}

// 加载事件
window.onload = function() {
	xiaomi.start();
}