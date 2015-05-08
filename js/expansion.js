/**
 * @author liyuelong1020@gmail.com
 * @date 15-4-29 上午9:41
 * @version 1.0.0
 * @description 点击伸缩
 */

define(function(require, exports, module) {
    var zepto = require('zepto');
    var scene = require('scene');

    var url = 'http://192.168.0.206:4001/ohsame';

    /** @description 需要加载的图片资源 */
    var images = [
        url + "/images/best-bg.jpg",
        url + "/images/share-bg.png",
        url + "/images/bg.png",
        url + "/images/cloud.png",
        url + "/images/tip.gif",
        url + "/images/btn-question.png",
        url + "/images/btn-love.png",
        url + "/images/prize.png",
        url + "/images/gf-logo.png",
        url + "/images/thumb-1-gray.jpg",
        url + "/images/thumb-2-gray.jpg",
        url + "/images/thumb-3-gray.jpg",
        url + "/images/thumb-4-gray.jpg",
        url + "/images/thumb-1.jpg",
        url + "/images/thumb-2.jpg",
        url + "/images/thumb-3.jpg",
        url + "/images/thumb-4.jpg",
        url + "/images/chimney-1.png",
        url + "/images/chimney-2.png",
        url + "/images/chimney-3.png",
        url + "/images/chimney-4.png",
        url + "/images/chimney-layout-1.png",
        url + "/images/chimney-layout-2.png",
        url + "/images/chimney-layout-3.png",
        url + "/images/chimney-layout-4.png",
        url + "/images/role-1-head.png",
        url + "/images/role-1-neck.png",
        url + "/images/role-1-body.png",
        url + "/images/role-2-head.png",
        url + "/images/role-2-neck.png",
        url + "/images/role-2-body.png",
        url + "/images/role-3-head.png",
        url + "/images/role-3-neck.png",
        url + "/images/role-3-body.png",
        url + "/images/role-4-head.png",
        url + "/images/role-4-neck.png",
        url + "/images/role-4-body.png"
    ];

    /** @description 动画节点 */
    var chimneyNodes = {
        chimney: $('#chimney'),
        cloud: $('#cloud'),
        score: {
            currentScore: $('#current-score'),
            bestScore: $('#best-score'),
            tips: $('#tips'),
            collect: $('#collect')
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
        ],
        popup: {
            prize: $('#prize'),
            tipQuestion: $('#tip-question'),
            tipScore: $('#tip-score'),
            lastScore: $('#last-score'),
            btnShare: $('#btn-share'),
            share: $('#share'),
            loading: $('#loading')
        }
    };

    // 资源加载
    $.when.apply($, $.map(images, function(url) {
            return $.get(url);
        })).then(function() {

            // 点击关闭 popup
            chimneyNodes.popup.tipQuestion.on('click', function() {
                $(this).hide();
            });
            chimneyNodes.popup.share.on('click', function() {
                $(this).hide();
            });
            chimneyNodes.popup.tipScore.on('click', function() {
                $(this).hide();
            });

            // 点击获取礼物
            chimneyNodes.popup.prize.on('click', function() {
                alert('prize !');
                $(this).hide();
            });

            // 点击显示 tip
            chimneyNodes.score.tips.on('click', function() {
                chimneyNodes.popup.tipQuestion.show();
            });

            // 点击显示分享提示
            chimneyNodes.popup.btnShare.on('click', function() {
                chimneyNodes.popup.tipScore.hide();
                chimneyNodes.popup.share.show();
            });
            chimneyNodes.score.collect.on('click', function() {
                chimneyNodes.popup.share.show();
            });

            // 关闭 loading
            chimneyNodes.popup.loading.hide();

            // 默认显示 tips
            chimneyNodes.popup.tipQuestion.show();


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
            var RoleSwitch = new scene.RoleSwitch(roleList, chimneyNodes.roleIconList, chimneyNodes.roleList.roleList);

            /**
             * @param {Scene} scene
             * @param {RoleSwitch} role
             * @returns {Object} 拉长脖子对象
             * @description 拉长脖子
             * @constructs
             */
            var Extension = new scene.Extension(Scene, RoleSwitch);
            // 更新分数
            var bestScore = 0, oldBestScore = 0, prizeToggle = false;
            // 分数节点
            var currentScoreNode = chimneyNodes.score.currentScore,
                bestScoreNode = chimneyNodes.score.bestScore;
            // 实时更新分数
            Extension.onUpdate = function(interval) {
                interval = parseInt(interval / 10);
                interval < -5 && (interval = -5);
                currentScoreNode.html(interval);
                // 创造了新记录
                if(interval > bestScore){
                    bestScore = interval;
                    bestScoreNode.html(bestScore);
                }
                // 超过 200m 则显示礼物
                if(interval >= 200 && prizeToggle === false){
                    chimneyNodes.popup.prize.show();
                    prizeToggle = true;
                }
            };
            // 最终结果
            Extension.onEnd = function() {
                if(oldBestScore < bestScore && bestScore >= 40){
                    oldBestScore = bestScore;
                    // 显示最佳成绩
                    chimneyNodes.popup.lastScore.html(bestScore);
                    setTimeout(function() {
                        chimneyNodes.popup.tipScore.show();
                    }, 600);
                }
            };

        });

});

