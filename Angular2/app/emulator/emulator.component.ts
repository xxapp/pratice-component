import { Component, Input } from '@angular/core'
import { NgClass } from '@angular/common';

@Component({
    selector: 'emulator',
    template: __inline('./emulator.component.html'),
    styles: [`
        :host {
            width: 250px;
            height: 450px;
            margin: 5px;
            background: #000000;
            border: solid #222222;
            border-width: 40px 10px;
            border-radius: 5px;
        }
        .screen {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            width: 100%;
            height: 100%;
            background: #ffffff;
        }
        .header {
            width: 100%;
            height: 30px;
            line-height: 30px;
            text-align: center;
            background: #cccccc;
        }
        .header a {
            color: #000000;
            text-decoration: none;
        }
        .header .prev {
            float: left;
            margin-left: 20px;
        }
        .header .next {
            float: right;
            margin-right: 20px;
        }
        .content {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            overflow-y: overlay;
        }
        .content > div {
            border: solid 3px;
            margin: 10px 20px;
        }
        .slider {
            position: relative;
            flex: none;
            height: 150px;
        }
        .slider img {
            width: 100%;
            height: 100%;
            background: #cccccc;
        }
        .slider > ul {
            position: absolute;
            list-style: none;
            bottom: 5px;
            right: 5px;
            padding-left: 0;
            margin: 0;
        }
        .slider > ul > li {
            float: left;
            border-radius: 5px;
            border: solid 5px #ffffff;
            margin-right: 5px;
            cursor: pointer;
        }
        .slider > ul > li.active {
            border-color: #000000;
        }
        .classify {
            display: flex;
            flex: none;
            flex-wrap: wrap;
            padding: 10px;
        }
        .classify > .item {
            width: 50px;
            height: 50px;
            margin: 5px;
            background: #cccccc;
        }
        .list > ul {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .list > ul > li {
            display: flex;
            height: 50px;
            padding: 10px;
            border-bottom: solid;
        }
        .list > ul > li:last-child {
            border-bottom: none;
        }
        .list > ul > li > img {
            width: 50px;
            height: 50px;
            background: #cccccc;
        }
        .list > ul > li > p {
            flex-basis: 0;
            margin: 0 5px;
            flex-grow: 1;
        }
    `],
    directives: [NgClass]
})
export class EmulatorComponent {
    /**
     * 模拟器各个页面及所包含的组件的配置
     */
    @Input()
    layoutConfig = {
        "indexPage": {
            "component": {
                "slider": {},
                "classify": {},
                "list": {}
            }
        }
    }
    /**
     * 每个组件的内容配置
     */
    @Input()
    contentConfig = {
        "slider": {
            "data": [{
                "url": "http://dummyimage.com/204x150&text=slide1"
            }, {
                "url": "http://dummyimage.com/204x150&text=slide2"
            }, {
                "url": "http://dummyimage.com/204x150&text=slide3"
            }],
            "state": {
                "current": {
                    "url": "http://dummyimage.com/204x150&text=slide1"
                }
            }
        },
        "classify": {
            "data": [{
                "url": "http://dummyimage.com/50x50&text=class1"
            }, {
                "url": "http://dummyimage.com/50x50&text=class2"
            }, {
                "url": "http://dummyimage.com/50x50&text=class3"
            }, {
                "url": "http://dummyimage.com/50x50&text=class4"
            }, {
                "url": "http://dummyimage.com/50x50&text=class5"
            }]
        },
        "list": {
            "data": [{
                "url": "http://dummyimage.com/50x50&text=list1",
                "title": "这是第一个列表项"
            }, {
                "url": "http://dummyimage.com/50x50&text=list2",
                "title": "这不是第一个列表项"
            }, {
                "url": "http://dummyimage.com/50x50&text=list3",
                "title": "这是第三个列表项"
            }]
        }
    }

    /**
     * slider组件方法
     */
    sliderChange(slide) {
        this.contentConfig.slider.state.current = slide;
    }

    ngAfterViewInit() {
        console.log(document.getElementById('test'));
    }
};