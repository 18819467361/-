import React, { Component } from 'react';
import './loading.css';

class Load extends Component{
    constructor(){
        super();
    }
    render(){
        return(
            <div className='loadingBox'>
                <div className='loading'>
                </div>
            </div>
        )
    }
}

module.exports=Load;
