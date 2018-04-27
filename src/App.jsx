import React, { Component } from 'react';
import './style.css';
import Content from './Content/content';
import NavBar from  './NavBar/NavBar';
import TopBar from './TopBar/TopBar';

class App extends Component {
    constructor(){
        super();
        this.state={
            contents:{},
            showType:'book',
            count:10,//搜索条目
            id:'',
            keyword:'',
        }
    }



    setContents(value){
        this.setState({
            contents:value
        });
    }

    setCount(value){
        this.setState({
            count:this.state.count+value
        })
    }

    setKeyword(value){
        this.setState({
            keyword:value
        })
    }

    initCount(value){
        this.setState({
            count:10,
            id:'',
            showType:value
        })
    }

    setShowType(value){
        this.setState({
            showType:value
        });
    }

    setId(value){
        this.setState({
            id:value
        });

    }

    render() {
        return (
	        <div className="app">
                <TopBar setContents={this.setContents.bind(this)} setKeyword={this.setKeyword.bind(this)} keyword={this.state.keyword} setId={this.setId.bind(this)} count={this.state.count} id={this.state.id} showType={this.state.showType}/>

                <Content setId={this.setId.bind(this)} setCount={this.setCount.bind(this)} count={this.state.count}  contents={this.state.contents} showType={this.state.showType} />

                <NavBar setShowType={this.setShowType.bind(this)} initCount={this.initCount.bind(this)} showType={this.state.showType}/>
	        </div>
        );
    }
}

module.exports = App;


