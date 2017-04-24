/**
 * Created by 14-7447 on 2017/4/20.
 */

const express = require('express');
const router = express.Router();

const wechat = require('wechat');
const config = require('../config.js');

//router.use('/' , wechat(config , function (req , res , next) {
//
//    const message = req.weixin;
//
//    if (message.MsgType === 'text') {
//        // 回复文本
//        res.reply({
//            type : 'text',
//            content : 'hello,gril!'
//        });
//    } else if (message.MsgType === 'image') {
//        //回复图片
//        res.reply({
//            content: message.Content,
//            type: 'text'
//        });
//    } else if (message.MsgType === 'image') {
//        // 回复一段图片
//        res.reply([
//            {
//                title: "返回的图片",
//                description: "这是你发过来de图片",
//                picurl: message.PicUrl,
//                url: 'https://fututer.github.io/'
//            }
//        ]);
//    } else {
//        // 回复高富帅(图文回复)
//        res.reply([
//            {
//                title: '你来我家接我吧',
//                description: '这是女神与高富帅之间的对话',
//                picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
//                url: 'http://nodeapi.cloudfoundry.com/'
//            }
//        ]);
//    }
//
//}));

router.use('/' ,  wechat(config ,
    wechat.text(function (message , req , res , next ) {
        console.log(message);
        if (message.Content == 'blog') {
            res.reply([{
                title: '我的Blog',
                description: '我的一些关于前端方面的博客',
                picurl: 'http://s6.sinaimg.cn/mw690/001whaJHzy6NkfRttDD15&690',
                url: 'https://fututer.github.io/'
            }]);
        } else if (message.Content == 'github') {
            res.reply([{
                title: '我的Github',
                description: '进入我的Github',
                picurl: 'http://img2.niushe.com/upload/201304/19/14-22-31-71-26144.jpg',
                url: 'https://github.com/fututer'
            }]);
        } else if ( typeof(parseInt(message.Content)) == 'number') {
            const data = parseInt(message.Content);
            const dataArr = [];

            for (var i = 0 ; i < parseInt(data/2) ; i++) {
                if(data%(i+1) == 0) {
                    dataArr.push(i+1);
                }
            }
            dataArr.push(data);
            dataArr.sort(function (a,b) {return a -b;});

            res.reply({
                type: 'text',
                content: parseInt(message.Content) + '的约数有： ' + dataArr.join(',')
            });
        } else {
            res.reply({
                type : 'text',
                content : message.Content
            });
        }
    }).image(function (message ,req ,res ,next) {
        console.log(message);
        res.reply(
            [{
                title: "返回的图片",
                description: "这是你发过来de图片",
                picurl: message.PicUrl
            }]
        );
    }).voice(function (message , req ,res ,next) {
        console.log(message);
        res.reply({
            type  : 'text',
            content : message.Recognition
        });
    }).video(function (message , req ,res , next) {
        console.log(message);
        res.reply({

        });
    }).shortvideo(function (message , req ,res ,next) {
        console.log(message);
        res.reply({

        });
    }).location(function (message ,req ,res ,next) {
        console.log(message);
        res.reply({
            type : 'text',
            content: '您的地理位置是：' +  message.Label+
                     '纬度：' + Math.round(message.Location_X*100)/100 + ',' + '经度：' + Math.round(message.Location_Y*100)/100
        });
    }).link(function (message , req , res ,next) {
        console.log(message);
        res.reply({

        });
    }).event(function (message , req, res ,next) {
        console.log(message);
        switch (message.Event) {
            case 'subscribe':
                var openid=message.FromUserName;

                res.reply({
                    type : 'text',
                    content:'欢迎关注Ring纪念坊~~~~~~' +
                            '回复 blog 查看我的博客~~~~~' +
                            '回复 github 访问我的github~~~' +
                            '回复任意非负整数字，返回其所有公约数~~~' +
                            '回复其他, 返回你发的数据~~~'
                });
                break;
            case 'unsubscribe':
                var openid=message.FromUserName;

                res.reply('亲,请不要离开我!!');
                break;
            case 'click' :
                res.reply('您点击了菜单：'+ message.EventKey);
                break;
            case 'SCAN' :
                res.reply('关注后扫描二维码：'+ message.Ticket);
                break;
            default :
                res.send('');
        }

    }).device_text(function (message ,req , res ,next) {
        console.log(message);
        res.reply({

        });
    }).device_event(function (message , req ,res ,next) {
        console.log(message);
        res.reply({

        });
    })
));

module.exports = router;


