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
        this.initCloud();
    };
    Scene.prototype = {
        constructor: Scene,
        // 更新背景高度
        scrollBackground: function(metre) {
            metre -= offsetTop;
            if(metre < 0){
                metre = 0;
            }
            this.background.css({
                '-webkit-transform': 'translateY(' + metre + 'px)',
                'transform': 'translateY(' + metre + 'px)'
            });
        },
        // 初始化白云
        initCloud: function() {

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
        this.offsetTop = role.offset().top - 100;   // 头距离屏幕上方的高度
    };
    // 脖子拉长方法
    Role.prototype.expansion = function(interval) {
        // 脖子伸缩量
        var scaleDiff = interval / this.neckHeight;
        if(scaleDiff <= 0){
            scaleDiff = 1;
        }
        // 头位移
        var translateDiff = interval - this.neckHeight;
        if(scaleDiff === 1) {
            translateDiff = 0;
        }
//        console.log(interval, this.neckHeight, scaleDiff);

        // 头部上移
        this.head.css({
            '-webkit-transform': 'translateY(-' + translateDiff + 'px)',
            'transform': 'translateY(-' + translateDiff + 'px)'
        });
        // 伸缩脖子
        this.neck.css({
            '-webkit-transform': 'scaleY(' + scaleDiff + ')',
            'transform': 'scaleY(' + scaleDiff + ')'
        });

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
        this.currentRole = roleArr[0];      // 当前角色
        offsetTop = this.currentRole.offsetTop;   // 头距离屏幕上方的高度
    };
    RoleSwitch.prototype = {
        constructor: RoleSwitch,
        // 切换角色
        switchRole: function() {},
        // 绑定点击事件
        init: function() {

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
        },

        // 初始化偏移量
        clearHeight: function() {
            this.initPointY = 0;
            this.initHeight = 0;
            this.update();
        },

        // 绑定触摸事件
        init: function() {
            var that = this;
            // 触摸延时清除
            var timer = null;
            // 绑定触摸事件
            $(document).on('touchstart touchmove touchend touchcancel', function(e) {
                e.preventDefault();
                e.stopPropagation();
//                console.log(e);

                // 触摸坐标点
                var points = e.touches[0];

                switch(e.type) {
                    case 'touchstart':
//                        clearTimeout(timer);
                        that.initPointY = points.clientY;
                        break;
                    case 'touchmove':
                        that.initHeight += that.initPointY - points.clientY;
                        that.initPointY = points.clientY;
                        break;
                    case 'touchend':
                    case 'touchcancel':
//                        console.log(that.initHeight);
                        clearTimeout(timer);
                        timer = setTimeout(function() {
                            that.clearHeight();
                        }, 250);
                        break;
                }

                that.update();
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

