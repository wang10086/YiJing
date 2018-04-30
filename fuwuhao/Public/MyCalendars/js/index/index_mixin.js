
        /*建立模态框对象*/
        var cue_modalBox = {};

        /*获取模态框*/
        cue_modalBox.cue_modal = document.getElementById("cue_myModal");

        /*获得trigger按钮*/
        cue_modalBox.triggerBtn = document.getElementById("triggerBtn");

        /*获得关闭按钮*/
        // cue_modalBox.closeBtn = document.getElementById("closeBtn");

        /*提交按钮*/
        cue_modalBox.dayEdit = document.getElementById('dayEdit');

        /*模态框显示*/
        cue_modalBox.show = function () {
            // console.log(this.cue_modal);
            this.cue_modal.style.display = "block";
        }

        /*模态框关闭*/
        cue_modalBox.close = function () {
            this.cue_modal.style.display = "none";
        }

        /*当用户点击模态框内容之外的区域，模态框也会关闭*/
        cue_modalBox.outsideClick = function () {
            var cue_modal = this.cue_modal;
            window.onclick = function (event) {
                if (event.target == cue_modal) {
                    cue_modal.style.display = "none";
                }
            }
        }

        /*模态框初始化*/
        cue_modalBox.init = function () {
            var that = this;
            this.show();

            this.dayEdit.onclick = function () {
                that.close();
            }
            this.outsideClick();
        }

        /*弹出判断，只有第一次进入弹出*/
        window.onload = function () {
            // ajax请求判断用户是否为付费
            var rili = document.querySelector('#calendar');
            var header = document.querySelector('.header');
            var xhr = new XMLHttpRequest();
                xhr.open('get', 'http://wx.fuxiyi.com/fuwuhao/index.php/Home/Api/getMonth');
                xhr.send();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        var res = JSON.parse(xhr.responseText);
                        var nid = res.data.name_info.nid;
						// console.log(nid)
                        if(nid==5098){
                            var zuzhi =document.createElement('div');
                            var zuzhi2 =document.createElement('div');
                            zuzhi.setAttribute("style","position:absolute;width:100%;height:14rem;top:0;left:0;z-index:999;");
                            zuzhi2.setAttribute("style","position:absolute;width:45%;height:2.56rem;top:0;left:26%;z-index:999;");
                            rili.appendChild(zuzhi);
                            header.appendChild(zuzhi2);
                            rili.addEventListener("click", function(){
                                alert('购买黄历后才能查看');
                                return false;
                            });
                            zuzhi2.addEventListener("click", function(){
                                alert('购买黄历后才能查看');
                                return false;
                            });
                        }
                    }
                }

            var today = new Date().toLocaleDateString();
            var lastDate = localStorage.lastDate;
            var showOnce = localStorage.getItem('showonced');
            // console.log(showOnce)
            var isShow = today == lastDate;
            var imgAcess = 7; //1：免费用户；2：30天体验用户 ，4:付费用户，3=1+2,5=4+1,7=1+2+3,6=4+2,
            var vip = {$vip};
            // if (!isShow && ((vip & imgAcess) == vip)) {
            //     cue_modalBox.init();
            //     localStorage.lastDate = today;
            // };


            //免费用户提示示例

            /*建立模态框对象*/
            var showonce_modalBox = {};

            /*获取模态框*/
            showonce_modalBox.showonce_modal = document.getElementById("showonce_myModal");

            /*获得关闭按钮*/
            showonce_modalBox.closeBtn = document.getElementById("closeBtn");

            /*提交按钮*/
            showonce_modalBox.dayEdit_close = document.getElementById('dayEdit_close');

            /*模态框显示*/
            showonce_modalBox.show = function () {
                // console.log(this.showonce_modal);
                this.showonce_modal.style.display = "block";
            }

            /*模态框关闭*/
            showonce_modalBox.close = function () {
                this.showonce_modal.style.display = "none";
            }

            /*当用户点击模态框内容之外的区域，模态框也会关闭*/
            showonce_modalBox.outsideClick = function () {
                var showonce_modal = this.showonce_modal;
                window.onclick = function (event) {
                    if (event.target == showonce_modal) {
                        showonce_modal.style.display = "none";
                    }
                }
            }

            /*模态框初始化*/
            showonce_modalBox.init = function () {
                var that = this;
                this.show();
                this.dayEdit_close.onclick = function () {
                    that.close();
                }
                this.outsideClick();
                this.closeBtn.onclick = function () {
                    that.close();
                    cue_modalBox.init();
                }
            }
            if (!showOnce && ((vip & 1) == vip)) {
                localStorage.setItem('showonced', true);
                showonce_modalBox.init();
            }else if (!isShow && ((vip & imgAcess) == vip)) {
                cue_modalBox.init();
                localStorage.lastDate = today;
            };



            //加号大小调整
            var addMap = document.querySelector('.add-map');
            var span = document.querySelectorAll('.add-map ul li span');
            addMap.style.width = '8.4rem';
            addMap.style.left = '-6.9rem';
            for (let i = 0; i < span.length; i++) {
                span[i].style.height = '2rem';
                span[i].style.lineHeight = '2rem';
                span[i].style.backgroundPosition = '50% 50%';
            }

            //用户名点击效果
            var userNameList = document.querySelector('.name_list');
            var nameShadow = document.querySelector('.name_shadow');
            var nameClick = document.querySelector('.click');
            var nameListUl = document.querySelector('.name_list_lis');
            var isClick = false;
            var myInfoList = document.querySelector('.my_info_list');

            var span = document.createElement('span');
            var a = document.createElement('a');
            nameShadow.addEventListener('touchmove', function (e) {
                e.preventDefault();
            });
            // nameListUl.addEventListener('touchmove', function (e) {
            //     e.preventDefault();
            // });
            nameClick.onclick = function () {
                isClick = !isClick;
                span.innerHTML = '';
                a.innerText = '';
                var xhr = new XMLHttpRequest();
                xhr.open('get', 'http://wx.fuxiyi.com/fuwuhao/index.php/Home/Api/getList');
                xhr.send();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        var res = JSON.parse(xhr.responseText);
                        console.log(res)
                        var myinfo = res.cal;
                        var usermobile = res.mobile.replace(res.mobile.substring(3, 7), '****');
                        document.querySelector('.user_phone').innerText = usermobile;
                        var nowTime = Date.parse(new Date())/1000;
                        //console.log(nowTime);
                        if (!document.querySelector('.my_info_list')) {
                            for (let i = 0; i < myinfo.length; i++) {
                                var li = document.createElement('li');
                                var myEndtime = myinfo[i].endtime;
                                var stapTime = Math.floor((myEndtime - nowTime) / 60 / 60 / 24) + 1+'';
                                var baiTime = stapTime.substring(0, 1);
                                var shiTime = stapTime.substring(1, 2);
                                var geTime = stapTime.substring(2, 3);
                                if(myEndtime==-1){
                                    var vipTime = "<a href='http://wx.fuxiyi.com/fuwuhao/index.php/Home/Order/buy.html'>续费</a>";
                                    // alert('未购买');
                                }else if (stapTime <= 0) {
                                    var vipTime = "<a href='http://wx.fuxiyi.com/fuwuhao/index.php/Home/Order/buy.html'>开通</a>";
                                    //alert('未购买');
                                } else if (myEndtime!=-1&&geTime) {
                                    var vipTime = "<span>剩余 <em class='bai'>" + baiTime + "</em><em class='shi'>" + shiTime + "</em><em class='ge'>" + geTime + "</em><em>天</em></span>";
                                } else if(myEndtime!=-1&&!geTime&&shiTime){
                                    var vipTime = "<span>剩余 <em class='bai'>0</em><em class='shi'>" + baiTime + "</em><em class='ge'>" + shiTime + "</em><em>天</em></span>";
                                }else{
                                    var vipTime = "<span>剩余 <em class='bai'>0</em><em class='shi'>0</em><em class='ge'>" + baiTime + "</em><em>天</em></span>";
                                }
                                li.setAttribute('class', 'my_info_list');
                                li.innerHTML =
                                    "<i class='user_lastname'>" + myinfo[i].name.substring(0, 1) + "</i><a href='http://wx.fuxiyi.com/fuwuhao/index.php/Home/Calendars/daygua?nid=" + myinfo[i].nid + "'>" + myinfo[i].name + "</a>" + vipTime;
                                nameListUl.appendChild(li);
                            }
                        }
                    }
                }
                if (isClick) {
                    userNameList.style.display = "block";
                    nameShadow.style.display = 'block';
                    nameShadow.onclick = function () {
                        userNameList.style.display = "none";
                        this.style.display = 'none';
                        isClick = !isClick;
                    }
                } else {
                    userNameList.style.display = "none";
                    nameShadow.style.display = 'none';
                }
            }

        }