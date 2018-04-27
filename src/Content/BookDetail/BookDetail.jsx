import React, {Component} from 'react';
import './BookDetail.css';


class BookDetail extends Component {
    constructor() {
        super();
        this.state = {}
    }

    analysisData(data) {
        let analyData = {}
        analyData.tags = []
        analyData.img = data.image ? data.image : ''
        analyData.title = data.title ? data.title : ''
        if (data.author) {
            analyData.author = data.author.join(' ')
        } else {
            analyData.author = '佚名'
        }
        analyData.publisher = data.publisher ? data.publisher : ''
        analyData.pubdate = data.pubdate ? data.pubdate : ''
        analyData.rating = data.rating.average ? data.rating.average : ''
        analyData.price = data.price ? data.price : ''
        if (data.tags) {
            let len = data.tags.length
            for (let i = 0; i < len; i++) {
                if (i > 2) {
                    break
                }
                analyData.tags.push(data.tags[i].name)
            }
        }
        analyData.catalog = data.catalog ? data.catalog : '暂无'
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
                        <p>作者:{analyData.author}</p>
                        <p>出版社：{analyData.publisher}</p>
                        <p>日期：{analyData.pubdate}</p>
                        <p>评分：{analyData.rating}</p>
                        <p>售价：{analyData.price}</p>
                    </div>
                </div>
                <div className='content'>
                    <h3>序言</h3>
                    <p>{analyData.catalog}</p>
                    <h3>简介</h3>
                    <p>{analyData.summary}</p>
                </div>
            </div>
        );
    }
}

module.exports = BookDetail;


