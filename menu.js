/**
 * Created by 14-7447 on 2017/4/24.
 */

const menu = {
            "button": [
            {
                "name": "关于我",
                "sub_button": [
                    {
                        "type": "view",
                        "name": "博客",
                        "url": "https://fututer.github.io/"
                    },
                    {
                        "type": "view",
                        "name": "Github",
                        "url": "https://github.com/fututer/"
                    }
                ]
            },
            {
                "name": "联系我",
                "sub_button": [
                    {
                        "type": "click",
                        "name": "QQ",
                        "key": "V1001_CONNECT_QQ"
                    },
                    {
                        "type": "click",
                        "name": "微信",
                        "key": "V1002_CONNECT_WEIXIN"
                    }

                ]
            }
        ]
};

module.exports = menu;