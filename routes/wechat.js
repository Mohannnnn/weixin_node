/**
 * Created by 14-7447 on 2017/4/20.
 */

const express = require('express');
const router = express.Router();

const wechat = require('wechat');
const config = require('../config.js');


const location  = {
    label : '',
    location_X : '',
    location_Y : ''
};

router.use('/' ,  wechat(config ,
    wechat.text(function (message , req , res , next ) {
        console.log(message);

        if (message.Content == 'github') {
            res.reply([
                {
                    title: '我的Github',
                    decription : '这是我的Github,欢迎start、fork',
                    picurl: 'http://img2.niushe.com/upload/201304/19/14-22-31-71-26144.jpg',
                    url: 'https://github.com/fututer'
                }
            ]);
        } else if (message.Content == 'blog') {
            res.reply(
            [{
                title: '我的一些关于前端方面的博客',
                picurl: 'http://s6.sinaimg.cn/mw690/001whaJHzy6NkfRttDD15&690',
                url: 'https://fututer.github.io/',
                articleCount : 3
            },{

                title: 'JavaScript的小技巧',
                picurl: 'http://img2.niushe.com/upload/201304/19/14-22-31-71-26144.jpg',
                url: 'https://fututer.github.io/2017/02/23/JavaScript%E7%9A%84%E4%B8%80%E4%BA%9B%E5%B0%8F%E6%8A%80%E5%B7%A7/'
            }, {
                title: 'js Promise异步执行',
                picurl: 'http://img2.niushe.com/upload/201304/19/14-22-31-71-26144.jpg',
                url: 'https://fututer.github.io/2016/11/24/js-Promise%E5%BC%82%E6%AD%A5%E6%89%A7%E8%A1%8C/'
            }, {
                title : 'js原型及原型链',
                picurl : 'http://img2.niushe.com/upload/201304/19/14-22-31-71-26144.jpg',
                url : 'https://fututer.github.io/2016/11/23/js-%E5%8E%9F%E5%9E%8B%E5%8F%8A%E5%8E%9F%E5%9E%8B%E9%93%BE/'
            }
            ]);
        } else if ( typeof(parseInt(message.Content)) == 'number' && /^[0-9]*$/.test(message.Content)) {
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
                content : message.Content + "\n\n" +
                        '回复blog查看我的博客' + "\n" +
                        '回复github访问我的github' + "\n" +
                        '回复任意非负整数字，返回其所有约数' + "\n" +
                        '回复某些关键字（包括语音）, 将会有彩蛋哦(⊙﹏⊙)'
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
        const recognition = message.Recognition;

        if(recognition.indexOf('github') != -1 || recognition.indexOf('不') != -1) {
            res.reply([
                {
                    title: '这是我的Github,欢迎start、fork',
                    decription : '您说的是：' + recognition + '\n\n' + '是否想找：github',
                    picurl: 'http://img2.niushe.com/upload/201304/19/14-22-31-71-26144.jpg',
                    url: 'https://github.com/fututer'
                }
            ]);
        } else if (recognition.indexOf('blog') != -1 || recognition.indexOf('博') != -1 || recognition.indexOf('前端') != -1 || recognition.indexOf('客') != -1) {
            res.reply(
                [{
                    title: '我的一些关于前端方面的博客',
                    picurl: 'http://s6.sinaimg.cn/mw690/001whaJHzy6NkfRttDD15&690',
                    url: 'https://fututer.github.io/',
                    articleCount : 3
                },{

                    title: 'JavaScript的小技巧',
                    picurl: 'http://img2.niushe.com/upload/201304/19/14-22-31-71-26144.jpg',
                    url: 'https://fututer.github.io/2017/02/23/JavaScript%E7%9A%84%E4%B8%80%E4%BA%9B%E5%B0%8F%E6%8A%80%E5%B7%A7/'
                }, {
                    title: 'js Promise异步执行',
                    picurl: 'http://img2.niushe.com/upload/201304/19/14-22-31-71-26144.jpg',
                    url: 'https://fututer.github.io/2016/11/24/js-Promise%E5%BC%82%E6%AD%A5%E6%89%A7%E8%A1%8C/'
                }, {
                    title : 'js原型及原型链',
                    picurl : 'http://img2.niushe.com/upload/201304/19/14-22-31-71-26144.jpg',
                    url : 'https://fututer.github.io/2016/11/23/js-%E5%8E%9F%E5%9E%8B%E5%8F%8A%E5%8E%9F%E5%9E%8B%E9%93%BE/'
                }
                ]);
        } else if ( recognition.indexOf('QQ') != -1) {
            res.reply([{
                title : '扫描二维码加我QQ',
                picurl: 'http://user.qzone.qq.com/1063022109/311/',
                url : 'http://user.qzone.qq.com/1063022109/311/'
            }]);
        } else if (recognition.indexOf('微信') != -1 || recognition.indexOf('信') != -1 ) {
            res.reply([{
                title : '扫描二维码加我微信',
                picurl: 'http://a3.qpic.cn/psb?/V121vZvA3qNkcO/jyXxR3xaQI6YvWfgN3GpEJ0DqeyFgJpZwDbF14jxhFg!/m/dGoBAAAAAAAA&ek=1&kp=1&pt=0&bo=rgGuAQAAAAARECc!&tm=1493121600&sce=60-3-3&rf=0-0',
                url : 'http://a3.qpic.cn/psb?/V121vZvA3qNkcO/jyXxR3xaQI6YvWfgN3GpEJ0DqeyFgJpZwDbF14jxhFg!/m/dGoBAAAAAAAA&ek=1&kp=1&pt=0&bo=rgGuAQAAAAARECc!&tm=1493121600&sce=60-3-3&rf=0-0'
            }]);
        } else {
            res.reply({
                type  : 'text',
                content : '您说：' + message.Recognition
            });
        }

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
            content: '您的地理位置是：' +  message.Label + "\n" +
                     '纬度：' + Math.round(message.Location_X*100)/100 + '\n' +
                     '经度：' + Math.round(message.Location_Y*100)/100
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
                    content:'欢迎关注Ring纪念坊~~~' +"\n\n" +
                            '回复 blog 查看我的博客' + "\n" +
                            '回复 github 访问我的github' + "\n" +
                            '回复任意非负整数字，返回其所有公约数' + "\n" +
                            '回复某些关键字（包括语音）, 将会有彩蛋哦(⊙﹏⊙)'
                });
                break;
            case 'unsubscribe':
                res.reply('亲,请不要离开我!!');
                break;
            case 'LOCATION' :
                location.label = message.Label;
                location.location_X = Math.round(message.Location_X*100)/100;
                location.location_Y = Math.round(message.Location_Y*100)/100
                break;
            case 'CLICK' :
                switch (message.EventKey) {
                    case 'V1001_CONNECT_QQ' :
                        res.reply([{
                            title : '扫描二维码加我QQ',
                            picurl: 'http://user.qzone.qq.com/1063022109/311/',
                            url : 'http://user.qzone.qq.com/1063022109/311/'
                        }]);
                        break;
                    case 'V1001_CONNECT_weixin' :
                        res.reply([{
                            title : '扫描二维码加我微信',
                            picurl: 'http://a3.qpic.cn/psb?/V121vZvA3qNkcO/jyXxR3xaQI6YvWfgN3GpEJ0DqeyFgJpZwDbF14jxhFg!/m/dGoBAAAAAAAA&ek=1&kp=1&pt=0&bo=rgGuAQAAAAARECc!&tm=1493121600&sce=60-3-3&rf=0-0',
                            url : 'http://a3.qpic.cn/psb?/V121vZvA3qNkcO/jyXxR3xaQI6YvWfgN3GpEJ0DqeyFgJpZwDbF14jxhFg!/m/dGoBAAAAAAAA&ek=1&kp=1&pt=0&bo=rgGuAQAAAAARECc!&tm=1493121600&sce=60-3-3&rf=0-0'
                        }]);
                        break;
                    case 'V1002_LOCATION_NOW' :
                        res.reply({
                            type : 'text',
                            content: '您的地理位置是：' +  location.label + "\n" +
                            '纬度：' + location.location_X + '\n' +
                            '经度：' + location.location_Y
                        });
                        break;
                }
                break;
            case 'SCAN' :
                res.reply('关注后扫描二维码：'+ message.Ticket);
                break;
            default :
                res.reply({
                    type : 'text',
                    content:'欢迎关注Ring纪念坊~~~' +"\n\n" +
                    '回复blog查看我的博客' + "\n" +
                    '回复github访问我的github' + "\n" +
                    '回复任意非负整数字，返回其所有公约数' + "\n" +
                    '回复某些关键字（包括语音）, 将会有彩蛋哦(⊙﹏⊙)'
                });
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


