import React, { Component } from 'react';
import './style.css';
import Contents from './contents/contents';
import FootBar from  './footBar/footBar';
import SearchBar from './searchBar/searchBar';

class App extends Component {
    constructor(){
        super();
        this.state={
            contents:{},
            showPage:'book',
            count:10,//搜索条目
            detailId:'',
            keyword:''
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
        this.state.keyword=value;
    }

    initCount(value){
        this.setState({
            count:10,
            detailId:'',
            showPage:value
        })
    }

    setOnShow(value){
        console.log('insetOnShow');
        this.setState({
            showPage:value
        });
        console.log('showPage',this.state.showPage);
    }

    setDetailId(value){
        this.setState({
            detailId:value
        });
        console.log('setDetailId');
    }


    render() {
        return (
	        <div className="app">
                <SearchBar setContents={this.setContents.bind(this)} setKeyword={this.setKeyword.bind(this)} keyword={this.state.keyword} setDetailId={this.setDetailId.bind(this)} count={this.state.count} detailId={this.state.detailId}  showPage={this.state.showPage}/>

                <Contents contents={this.state.contents} setDetailId={this.setDetailId.bind(this)} detailId={this.state.detailId} count={this.state.count} setCount={this.setCount.bind(this)} showPage={this.state.showPage} />

                <FootBar setOnShow={this.setOnShow.bind(this)} initCount={this.initCount.bind(this)} showPage={this.state.showPage}/>
	        </div>
        );
    }
}

module.exports = App;


