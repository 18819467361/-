import React, { Component } from 'react';
import './returnBar.css';

class ReturnBar extends Component{
    constructor(){
        super();
    }

    returnSearch(){
        let self=this;
        // console.log("setID");
        // this.props.setID('');
        this.props.reSearch();
    }

    render(){
        return(
           <div className='returnBar'>
               <div className='returnButton' onClick={this.returnSearch.bind(this)}><i className='detail-iconfont'>&#xe624;</i></div>
               <div className='title'><p>详细信息</p></div>
           </div>
        )
    }
}

module.exports=ReturnBar;
