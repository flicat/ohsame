/**
 * @author liyuelong1020@gmail.com
 * @date 15-4-29 上午9:41
 * @version 1.0.0
 * @description 点击伸缩
 */

define(function(require, exports, module) {
    var zepto = require('zepto');
    var scene = require('scene');

    /** @description 动画节点 */
    var chimneyNodes = {
        chimney: $('#chimney'),
        cloud: $('#cloud'),
        score: {
            currentScore: $('#current-score'),
            bestScore: $('#best-score')
        },
        roleList: {
            roleList: $('#role-list'),
            role_1: {
                role: $('#role-1'),
                head: $('#role-1-head'),
                neck: $('#role-1-neck'),
                body: $('#role-1-body')
            },
            role_2: {
                role: $('#role-2'),
                head: $('#role-2-head'),
                neck: $('#role-2-neck'),
                body: $('#role-2-body')
            },
            role_3: {
                role: $('#role-3'),
                head: $('#role-3-head'),
                neck: $('#role-3-neck'),
                body: $('#role-3-body')
            },
            role_4: {
                role: $('#role-4'),
                head: $('#role-4-head'),
                neck: $('#role-4-neck'),
                body: $('#role-4-body')
            }
        },
        roleIconList: [
            $('#role-icon-1'),
            $('#role-icon-2'),
            $('#role-icon-3'),
            $('#role-icon-4')
        ]
    };

    /**
     * @param {Node} background
     * @param {Node} cloud
     * @returns {Object} 场景对象
     * @description 场景
     */
    var Scene = new scene.Scene(chimneyNodes.chimney, chimneyNodes.cloud);

    /**
     * @param {Node} role
     * @param {Node} head
     * @param {Node} neck
     * @param {Node} body
     * @returns {Object} 角色对象
     * @description 角色列表
     */
    var roleList = [
        new scene.Role(
            chimneyNodes.roleList.role_1.role,
            chimneyNodes.roleList.role_1.head,
            chimneyNodes.roleList.role_1.neck,
            chimneyNodes.roleList.role_1.body
        ),
        new scene.Role(
            chimneyNodes.roleList.role_2.role,
            chimneyNodes.roleList.role_2.head,
            chimneyNodes.roleList.role_2.neck,
            chimneyNodes.roleList.role_2.body),
        new scene.Role(
            chimneyNodes.roleList.role_3.role,
            chimneyNodes.roleList.role_3.head,
            chimneyNodes.roleList.role_3.neck,
            chimneyNodes.roleList.role_3.body),
        new scene.Role(
            chimneyNodes.roleList.role_4.role,
            chimneyNodes.roleList.role_4.head,
            chimneyNodes.roleList.role_4.neck,
            chimneyNodes.roleList.role_4.body)
    ];

    /**
     * @param {[Role]} roleArr
     * @param {NodeList} roleIconNodeArr
     * @param {Node} roleList
     * @returns {Object} 角色切换方法
     * @description 角色切换
     */
    var RoleSwitch = new scene.RoleSwitch(roleList, chimneyNodes.roleIconList, roleList);

    /**
     * @param {Scene} scene
     * @param {RoleSwitch} role
     * @returns {Object} 拉长脖子对象
     * @description 拉长脖子
     * @constructs
     */
    var Extension = new scene.Extension(Scene, RoleSwitch);

});

