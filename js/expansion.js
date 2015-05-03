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
        roleIconList: {
            icon_1: $('#role-icon-1'),   
            icon_2: $('#role-icon-2'),   
            icon_3: $('#role-icon-3'),   
            icon_4: $('#role-icon-4')   
        }
    };



});

