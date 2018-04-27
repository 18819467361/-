import React, {Component} from 'react';
import './NavBar.css';


class NavBar extends Component {
    constructor() {
        super();
        this.state = {}
    }
//点击navBar，设置state，重新渲染
    choiceShowPage (event) {
        if (event.target.id !== this.props.showType) {
            const target = event.target.id
            this.props.initCount(target)
        }
    }


    render() {
        const highLight=this.props.showType.match(/book|music|movie/);
        return (
            <div id='footBar'>
        <span onClick={this.choiceShowPage.bind(this)} id='book' className={highLight[0]}><i
              className='iconfont'>&#xe602;</i><br/><span className='stopPointer'>图书</span></span>
        <span onClick={this.choiceShowPage.bind(this)} id='movie' className={highLight[0]}><i
              className='iconfont'>&#xe600;</i><br/><span className='stopPointer'>电影</span></span>
         <span onClick={this.choiceShowPage.bind(this)} id='music' className={highLight[0]}><i
              className='iconfont'>&#xe6bb;</i><br/><span className='stopPointer'>音乐</span></span>
            </div>
        );
    }
}

module.exports = NavBar;


