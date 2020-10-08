var xiaomi = {
    start(){
        this.register();
    },
    // 立即注册
    register(){
        let btn = document.getElementById('btn');
        let error = document.getElementsByClassName('err_tip')[0];
        let text = document.getElementById('text');
        btn.onclick = function() {
            if (text.value) {
                if (/^1[3-9]\d{9}$/.test(text.value)) {
                    sessionStorage.setItem("phone", text.value);
                    document.getElementsByClassName('regbox')[0].style.display = 'none';
                    document.getElementsByClassName('regboxTwo')[0].style.display = 'block';
                    xiaomi.verification();
                }
                else {
                    error.style.display = 'block';
                    error.innerHTML = '手机号码格式不正确';
				}
            }else {
                error.style.display = 'block';
                error.innerHTML = '请输入手机号码';
			}
        }
        text.onclick = function() {
			error.style.display = 'none';
		}
    },

    //验证码验证
    verification(){
        let phone = sessionStorage.getItem("phone");
        //设置电话号码
        document.getElementsByClassName('address-place')[0].innerHTML = '+'+ 86 + " " + phone;

        let resendBtn = document.getElementsByClassName('resend')[0];
        let inputcodeTxt = document.getElementsByClassName('inputcode_txt')[0];
        let submitStep = document.getElementsByClassName('submit-step')[1];
        let backStep = document.getElementsByClassName('back-step')[0];
        let error = document.getElementsByClassName('err_tip')[1];

        // 设置获取验证码倒计时
        resendBtn.innerHTML = "重新发送(60)";

        function timer() {
			let timeSet = 60;
			resendBtn.disabled = 'disabled';
			let time = setInterval(function() {
				timeSet--;
				resendBtn.innerHTML = "重新发送(" + timeSet + ")";
				if (timeSet == 0) {
					clearInterval(time);
					resendBtn.innerHTML = "重新发送";
					resendBtn.disabled = false;
				}
			}, 1000);
        }
        timer();

        resendBtn.onclick = function() {
			timer();
        }
        
        // 随机生成四位数
		function numBer() {
			let num = '';
			for (let i = 0; i < 4; i++) {
				num += parseInt((Math.random() * 10));
			}
			console.log(num);
			return num;
		}
        let num = numBer();

        // 下一步
        submitStep.onclick = function(){
            if(inputcodeTxt.value){
                if(inputcodeTxt.value == num){
                    document.getElementsByClassName('regboxTwo')[0].style.display = 'none';
                    document.getElementsByClassName('regboxthree')[0].style.display = 'block';
                    xiaomi.regboxthree();
                }else{
                    error.style.display = 'block';
                    error.innerHTML = '验证码错误或已过期';
                }
            }else{
                error.style.display = 'block';
            }
        }
        // 返回
		backStep.onclick = function() {
			document.getElementsByClassName('regbox')[0].style.display = 'block';
			document.getElementsByClassName('regboxTwo')[0].style.display = 'none';
		}
    },

    //设置密码
    regboxthree(){
        let phone = sessionStorage.getItem("phone");
        document.getElementsByClassName('address-place')[1].innerHTML = phone;

        let btn = document.getElementsByClassName('submit-step')[2];
        let inputpassword1 = document.getElementsByClassName('inputpassword')[0];
        let inputpassword2 = document.getElementsByClassName('inputpassword')[1];
        let error = document.getElementsByClassName('err_tip')[2];
        let error1 = document.getElementsByClassName('err_tip')[3];

        let password = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![^(0-9a-zA-Z)]+$).{8,16}$/;

        btn.onclick = function(){
            if(inputpassword1.value){
                if(password.test(inputpassword1.value)){
                    if (inputpassword2.value){
                        if(inputpassword1.value==inputpassword2.value){
                            sessionStorage.setItem("pwd", inputpassword1.value);
                            document.getElementsByClassName('regboxthree')[0].style.display = 'none';
                            document.getElementsByClassName('regbox-account')[0].style.display = 'block';
                            xiaomi.login();
                        }else{
                            error1.style.display = 'block';
					        error1.innerHTML = '两次密码不一样';
                        }
                    }else{
                        error1.style.display = 'block';
					    error1.innerHTML = '请再输入一次密码';
                    }
                }else{
                    error.style.display = 'block';
					error.innerHTML = '密码格式不对';
                }
            }else{
                error.style.display = 'block';
                error.innerHTML = '请输入密码';
            }
        }
        inputpassword1.onclick = function(){
            error.style.display = 'none';
			error1.style.display = 'none';
        }
        inputpassword2.onclick = function(){
            error.style.display = 'none';
			error1.style.display = 'none';
        }

    },
    //登录
    login(){
        let btn = document.getElementsByClassName('submit-step')[3];
        let num = '';
        for (let i = 0; i < 7; i++) {
			num += parseInt((Math.random() * 10));
        }
        document.getElementsByClassName('address-place')[2].innerHTML = num;
        sessionStorage.setItem("idaccount", num);

        btn.onclick = function(){
            window.location.href = 'login.html';
        }
    }
    
}

window.onload = function(){
    xiaomi.start();
}
