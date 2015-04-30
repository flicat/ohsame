/**
 * @author liyuelong1020@gmail.com
 * @date 15-4-29 上午9:41
 * @version 1.0.0
 * @description 场景
 */

define(function(require, exports, module) {

    /** @description 场景宽度 */
    var winWidth = window.innerWidth;
    /** @description 场景高度 */
    var winHeight = window.innerHeight;

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
        // 切换背景
        scrollBackground: function(metre) {

        },
        // 初始化白云
        initCloud: function() {

        }
    };

    /**
     * @param {Node} head
     * @param {Node} neck
     * @returns {Object} 角色对象
     * @description 角色
     * @constructs
     */
    var Role = function(head, neck) {
        this.head = head;        // 头
        this.neck = neck;        // 脖子
    };

    /**
     * @param {[Role]} roleArr
     * @returns {Object} 角色切换方法
     * @description 角色切换
     * @constructs
     */
    var RoleSwitch = function(roleArr) {
        this.roleArr = roleArr;         // 角色列表
        this.currentRole = roleArr[0];  // 当前角色
    };
    RoleSwitch.prototype = {
        constructor: RoleSwitch,
        // 切换角色

        // 绑定点击事件
        init: function() {}
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
    };
    Extension.prototype = {
        constructor: Extension,
        // 绑定触摸事件
        init: function() {}
    };

    module.exports = {
        Scene: Scene,
        Role: Role,
        Extension: Extension
    };
});

