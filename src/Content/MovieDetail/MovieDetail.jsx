import React, {Component} from 'react';
import './MovieDetail.css';


class MovieDetail extends Component {
    constructor() {
        super();
        this.state = {}
    }

    analysisData(data) {
        let analyData = {}
        analyData.tags = []
        analyData.cast = []
        analyData.movie_type = []

        console.log('in movie')
        analyData.img = data.image ? data.image : ''
        analyData.title = data.title ? data.title : data.alt_title
        analyData.director = data.attrs.director ? data.attrs.director[0] : ''
        analyData.rating = data.rating.average ? data.rating.average : ''
        if (data.attrs.cast) {
            let len = data.attrs.cast.length
            for (let i = 0; i < len; i++) {
                analyData.cast.push(data.attrs.cast[i])
                if (i > 3) {
                    break
                }
            }
        }
        analyData.duration = data.attrs.movie_duration ? data.attrs.movie_duration[0] : '不详'
        if (data.attrs.movie_type) {
            let len = data.attrs.movie_type.length
            for (let i = 0; i < len; i++) {
                analyData.movie_type.push(data.attrs.movie_type[i])
                if (i > 2) {
                    break
                }
            }
        }
        analyData.pubdate = data.attrs.pubdate ? data.attrs.pubdate[0] : '不详'
        analyData.summary = data.summary ? data.summary : '暂无'

        return analyData
    }

    render() {
        let data = this.props.datas
        let analyData = this.analysisData(data)
        return (
            <div>
                <div className='head'>
                    <img src={analyData.img}/>
                    <div className='headImfo'>
                        <p>名称：{analyData.title}</p>
                        <p>导演:{analyData.director}</p>
                        <p>
                            主演：<span>{analyData.cast[0]} </span><span>{analyData.cast[1]} </span><span>{analyData.cast[2]}</span>
                        </p>
                        <p>
                            类型：<span>{analyData.movie_type[0]} </span><span>{analyData.movie_type[1]} </span><span>{analyData.movie_type[2]}</span>
                        </p>
                        <p>上映日期：{analyData.pubdate}</p>
                        <p>评分：{analyData.rating}</p>
                        <p>片长：{analyData.duration}</p>
                    </div>
                </div>
                <div className='content'>
                    <h3>简介</h3>
                    <p>{analyData.summary}</p>
                </div>
            </div>
        );
    }
}

module.exports = MovieDetail;


