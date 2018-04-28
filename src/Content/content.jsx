import React, { Component } from 'react';
import './content.css';
import ListPage from './ListPage/ListPage'
import BookDetail from './BookDetail/BookDetail'
import MovieDetail from './MovieDetail/MovieDetail'
import MusicDetail from './MusicDetail/MusicDetail'
import Loading from './Loading/Loading'

class Contents extends Component {
    constructor(){
        super();
        this.state={
            preContents:'',
            preCount:'',
            update:'',
            preReLoad:'',
            preShowType:''
        }
    }
    render() {
        const count=this.props.count;
        const showType=this.props.showType;
        const reLoad=this.props.reLoad;
        if(this.state.preContents!==this.props.contents||this.state.preCount<count||reLoad!==this.state.preReLoad){
            this.state.preCount=count;
            this.state.preContents=this.props.contents;
            this.state.preReLoad=reLoad;

            switch (showType){
                case "book":
                case 'movie':
                case 'music':
                    return(
                        <ListPage  setReLoad={this.props.setReLoad.bind(this)} setCount={this.props.setCount.bind(this)} setIdANDShowType={this.props.setIdANDShowType.bind(this)} showType={this.props.showType} contents={this.props.contents} count={this.props.count}/>
                    )
                    break;
                case 'bookDetail':
                    return(
                        <BookDetail datas={this.props.contents}/>
                    )
                    break;
                case 'musicDetail':
                    return(
                        <MusicDetail datas={this.props.contents}/>
                    )
                    break;
                case 'movieDetail':
                    return(
                        <MovieDetail datas={this.props.contents}/>
                    )
                    break;
            }
        }else{
            return(
                <Loading/>
            )
        }
    }
}

module.exports = Contents;


