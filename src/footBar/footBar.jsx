import React, {Component} from 'react';
import './footBar.css';

class FootBar extends Component {
    constructor() {
        super();
    }

    getOnShow(event) {
        if(event.target.id!==this.props.showPage){
            let id=event.target.id;
            this.props.initCount(id);
            this.initShow()
        }
        // this.props.setOnShow(id);
    }
    initShow(e){
            console.log('foot init');
            window.scrollTo(0,30);

    }
    highLight(){
        let showPage=this.props.showPage;
        let highLight={
            book:'',
            movie:'',
            music:''
        };
        switch (showPage){
            case 'book':
                highLight.book='selected';
                break;
            case 'movie':
                highLight.movie='selected';
                break;
            case 'music':
                highLight.music='selected';
                break;
            default:
                break;
        }
        return highLight;
    }

    render() {
        let highLight=this.highLight();
        return (
            <div id='footBar'>
                <span onClick={this.getOnShow.bind(this)} id='book' className={highLight.book}><i
                    className='iconfont'>&#xe602;</i><br/><span className='stopPointer'>图书</span></span>
                <span onClick={this.getOnShow.bind(this)} id='movie' className={highLight.movie}><i
                    className='iconfont'>&#xe600;</i><br/><span className='stopPointer'>电影</span></span>
                <span onClick={this.getOnShow.bind(this)} id='music' className={highLight.music}><i
                    className='iconfont'>&#xe6bb;</i><br/><span className='stopPointer'>音乐</span></span>
            </div>
        )
    }

}

module.exports = FootBar;
