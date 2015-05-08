/**
 * @author liyuelong1020@gmail.com
 * @date 15-4-29 上午9:41
 * @version 1.0.0
 * @description 场景
 */

define(function(require, exports, module) {
    var zepto = require('zepto');

    /** @description 场景宽度 */
    var winWidth = window.innerWidth;
    /** @description 场景高度 */
    var winHeight = window.innerHeight;
    /** @description 头距离屏幕上方的高度 */
    var offsetTop = 0;
    // 返回给定范围内的随机整数
    var getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    /**
     * @param {Node} background
     * @param {Node} cloud
     * @returns {Object} 场景对象
     * @description 场景
     * @constructs
     */
    var Scene = function(background, cloud) {
        this.background = background;        // 背景层
        this.cloud = cloud;                  // 白云层
        this.cloudArr = [];
        this.init();
    };
    Scene.prototype = {
        constructor: Scene,
        // 更新背景高度
        scrollBackground: function(interval) {
            // 超出屏幕则不再伸缩
            var metre = interval > winHeight ? winHeight : interval;

            metre -= offsetTop;
            if(metre < 0){
                metre = 0;
            }
            this.background.css({
                '-webkit-transform': 'translate3d(0, ' + metre + 'px, 0)',
                'transform':         'translate3d(0, ' + metre + 'px, 0)'
            });
            this.scrollCloud(interval);
        },
        // 更新白云
        scrollCloud: function(interval) {
            var that = this;
            interval -= offsetTop;
            if(interval < 0){
                interval = 0;
            }
            $.each(that.cloudArr, function(i, cloud) {
                var diff = (interval / 3 + cloud.cssTop + cloud.height) % winHeight - cloud.height;
                cloud.css({
                    '-webkit-transform': 'translate3d(0, ' + diff + 'px, 0)',
                    'transform':         'translate3d(0, ' + diff + 'px, 0)'
                });
            });
        },
        // 初始化白云
        init: function() {
            var cloudItem = this.cloud.children();
            for(var i = 0; i < 16; i++){
                var cloud = cloudItem.clone();
                var top = getRandomInt(1, winHeight);           // 高度
                var delay = getRandomInt(0, 10);      // 动画延迟
                var speed = getRandomInt(20, 80);                 // 运动速度
                var opacity = getRandomInt(30, 90) / 100;           // 透明度
                var height = getRandomInt(10, 30) / 10;             // 大小
                cloud.cssTop = top;
                cloud.height = height * 16;
                cloud.css({
                    '-webkit-transform': 'translate3d(0, ' + top + 'px, 0)',
                    'transform':         'translate3d(0, ' + top + 'px, 0)',
                    'height': height + 'rem'
                });
                cloud.children().css({
                    'opacity': opacity,
                    '-webkit-animation': 'cloud ' + speed + 's linear ' + delay + 's infinite',
                    'animation':         'cloud ' + speed + 's linear ' + delay + 's infinite'
                });
                this.cloudArr.push(cloud);
                this.cloud.append(cloud);
            }
        }
    };

    /**
     * @param {Node} role
     * @param {Node} head
     * @param {Node} neck
     * @param {Node} body
     * @returns {Object} 角色对象
     * @description 角色
     * @constructs
     */
    var Role = function(role, head, neck, body) {
        this.role = role;                     // 全身
        this.head = head;                     // 头
        this.neck = neck;                     // 脖子
        this.body = body;                     // 身体
        this.neckHeight = neck.height();      // 脖子高度
        this.offsetTop = role.offset().top - role.height() - 100;   // 头距离屏幕上方的高度
        this.isStop = true;                 // 是否停止拉伸
    };
    Role.prototype = {

        constructor: Role,

        // 初始化脖子晃动效果
        shake: function() {
            this.isStop = true;
            // 复原头部和脖子
            this.head.css({
                '-webkit-transform': 'translate3d(0,0,0)',
                'transform':         'translate3d(0,0,0)'
            });
            this.neck.css({
                '-webkit-transform': 'scaleY(1)',
                'transform':         'scaleY(1)'
            });
            // 添加晃动动画
            this.role.addClass('shake-animation');
        },

        // 脖子拉长方法
        expansion: function(interval) {
            // 脖子伸缩量，头部偏移量
            var scaleDiff = 1, translateDiff = 0;

            // 超出屏幕则不再伸缩
            var diff = interval > winHeight ? winHeight : interval;

            if(diff === 0){
                // 如果是复原脖子则添加晃动效果
                this.shake();
            } else {
                if(diff > 0){
                    // 往上拉伸
                    scaleDiff = (diff + this.neckHeight) / this.neckHeight;
                    translateDiff = -diff;
                } else {
                    // 往下拉伸
                    scaleDiff = ((diff / 10 + this.neckHeight) / this.neckHeight).toFixed(3);
                    scaleDiff < 0 && (scaleDiff = 0);
                    translateDiff = this.neckHeight - Math.ceil(this.neckHeight * scaleDiff);
                }
                // 停止晃动动画
                if(this.isStop) {
                    this.role.removeClass('shake-animation');
                    this.isStop = false;
                }
                // 头部上移
                this.head.css({
                    '-webkit-transform': 'translate3d(0,' + translateDiff + 'px,0)',
                    'transform':         'translate3d(0,' + translateDiff + 'px,0)'
                });
                // 伸缩脖子
                this.neck.css({
                    '-webkit-transform': 'scaleY(' + scaleDiff + ')',
                    'transform':         'scaleY(' + scaleDiff + ')'
                });
            }

        }
    };

    /**
     * @param {[Role]} roleArr
     * @param {NodeList} roleIconNodeArr
     * @param {Node} roleList
     * @returns {Object} 角色切换方法
     * @description 角色切换
     * @constructs
     */
    var RoleSwitch = function(roleArr, roleIconNodeArr, roleList) {
        this.roleArr = roleArr;             // 角色列表
        this.iconArr = roleIconNodeArr;     // 角色切换按钮列表
        this.roleList = roleList;     // 角色切换 ul 节点
        this.init();
    };
    RoleSwitch.prototype = {
        constructor: RoleSwitch,
        // 切换角色
        switchRole: function(index) {
            var diff = index * -winWidth;
            if(this.currentRole){
                // 隐藏旧角色
                this.currentRole.role.css({
                    '-webkit-transform': 'translate3d(0,100%,0)',
                    'transform':         'translate3d(0,100%,0)'
                });
            }
            // 当前角色
            this.currentRole = this.roleArr[index];
            this.currentRole.role.css({
                '-webkit-transform': 'translate3d(0,0,0)',
                'transform':         'translate3d(0,0,0)'
            });
            // 切换场景
            this.roleList.css({
                '-webkit-transform': 'translate3d(' + diff + 'px,0,0)',
                'transform':         'translate3d(' + diff + 'px,0,0)'
            });
            // 头距离屏幕上方的高度
            offsetTop = this.currentRole.offsetTop;
        },
        // 绑定点击事件
        init: function() {
            var that = this;
            var currentIcon = that.iconArr[0];
            // 初始化第一个角色
            that.switchRole(0);
            // 绑定点击事件
            $.each(that.iconArr, function(index, icon) {
                icon.on('touchend', function() {
                    currentIcon.removeClass('current');
                    icon.addClass('current');
                    currentIcon = icon;
                    that.switchRole(index);
                })
            });
        }
    };

    /**
     * @param {Scene} scene
     * @param {RoleSwitch} role
     * @returns {Object} 拉长脖子对象
     * @description 拉长脖子
     * @constructs
     */
    var Extension = function(scene, role) {
        this.scene = scene;        // 场景
        this.role = role;        // 角色列表
        this.initHeight = 0;     // 初始化缩放高度
        this.initPointY = 0;
        this.onUpdate = function() {};    // 更新分数事件
        this.onEnd = function() {};       // 游戏结束
        this.init();
    };
    Extension.prototype = {
        constructor: Extension,

        // 更新动画
        update: function() {
            // 计算高度
            var interval = parseInt(Math.sqrt(Math.abs(this.initHeight)) || 0);
            interval *= this.initHeight > 0 ? 10 : -10;

            // 拉长脖子
            this.role.currentRole.expansion(interval);
            // 场景更新
            this.scene.scrollBackground(interval);
            // 更新事件
            this.onUpdate(interval);
        },

        // 初始化偏移量
        clearHeight: function() {
            this.initPointY = 0;
            this.initHeight = 0;
            this.update();
            this.onEnd();
        },

        // 绑定触摸事件
        init: function() {
            var that = this;
            // 触摸延时清除
            var resetTimer = null, animationTimer = null;
            // 是否滑动
            var isMove = 0;
            // 绑定触摸事件
            that.scene.background.on('touchstart touchmove touchend touchcancel', function(e) {
                e.preventDefault();
                e.stopPropagation();

                // 触摸坐标点
                var points = e.touches[0];

                switch(e.type) {
                    case 'touchstart':
                        that.initPointY = points.clientY;
                        break;
                    case 'touchmove':
                        // 设置更新频率
                        if(!animationTimer){
                            animationTimer = setTimeout(function() {
                                that.initHeight += that.initPointY - points.clientY;
                                that.initPointY = points.clientY;
                                that.update();
                                clearTimeout(animationTimer);
                                animationTimer = null;
                            }, 1000/60);
                            isMove = 1;
                        }
                        break;
                    case 'touchend':
                    case 'touchcancel':
                        if(isMove) {
                            clearTimeout(resetTimer);
                            resetTimer = setTimeout(function() {
                                clearTimeout(animationTimer);
                                animationTimer = null;
                                that.clearHeight();
                            }, 300);
                            isMove = 0;
                        }
                        break;
                }

            });
        }
    };

    module.exports = {
        Scene: Scene,
        Role: Role,
        RoleSwitch: RoleSwitch,
        Extension: Extension
    };
});

