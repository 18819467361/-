import React, { Component } from 'react';
import './content.css';
import ListPage from './ListPage/ListPage'
import BookDetail from './BookDetail/BookDetail'
import MovieDetail from './MovieDetail/MovieDetail'
import MusicDetail from './MusicDetail/MusicDetail'

class Contents extends Component {
    constructor(){
        super();
        this.state={

        }
    }
    render() {
        const showType=this.props.showType;
        switch (showType){
            case "book":
            case 'movie':
            case 'music':
                return(
                    <ListPage contents={this.props.contents} />
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

    }
}

module.exports = Contents;


