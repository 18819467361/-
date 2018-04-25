import React, {Component} from 'react';
import './list.css';

class List extends Component {
    // static defaultProps={
    //
    // };
    constructor() {
        super();
    };

    analysisData(datas, dataType) {
        let title;
        let tag = [];
        let author;
        let average;
        let pubdate;
        let imageSrc;
        let analyData = [];
        let authorLab;
        let id;
        let spanName;
        switch (dataType) {
            case "book":
                spanName='book-span';
                authorLab = '作者';
                title = datas.title ? datas.title : '';

                for (let i = 0; i < 3; i++) {
                    tag[i] = datas.tags[i] ? datas.tags[i].name : '';
                }

                author = datas.author ? datas.author : '';

                average = datas.rating.average ? datas.rating.average : '暂无';

                pubdate = datas.pubdate ? datas.pubdate : '暂无';

                imageSrc = datas.images ? datas.images.small : '';

                id = datas.id ? datas.id : '';
                break;
            case "movie":
                spanName='movie-span';
                authorLab = '导演';
                title = datas.title ? datas.title : '';
                if (datas.genres) {
                    for (let i = 0; i < 3; i++) {
                        tag[i] = datas.genres[i] ? datas.genres[i] : '';
                    }
                } else {
                    tag[0] = '暂无'
                }
                // console.log('directors',datas.directors);
                if (datas.directors[0]) {
                    author = !!datas.directors[0].name ? datas.directors[0].name : '';
                } else {
                    author = ''
                }

                average = datas.rating.average ? datas.rating.average : '暂无';

                pubdate = datas.year ? datas.year : '暂无';

                imageSrc = datas.images ? datas.images.small : '';

                id = datas.id ? datas.id : '';

                break;
            case "music":
                spanName='music-span';
                authorLab = '歌手';
                title = datas.title ? datas.title : '';
                if (datas.tags) {
                    for (let i = 0; i < datas.tags.length; i++) {
                        if (i > 2) {
                            break;
                        }
                        tag[i] = datas.tags[i].name ? datas.tags[i].name : '';
                    }
                } else {
                    tag[0] = '暂无'
                }
                author = datas.author ? datas.author[0].name : '';

                average = datas.rating.average ? datas.rating.average : '暂无';

                pubdate = datas.pubdate ? datas.pubdate : '暂无';

                imageSrc = datas.image ? datas.image : '';

                id = datas.id ? datas.id : '';

                break;
            default:
                break;
        }
        analyData.push(title, tag, author, average, pubdate, imageSrc, authorLab, id,spanName);
        return analyData;
    }

    getDetailId(analyData) {
        let id = analyData[7];
        console.log('id', id);
        this.props.returnDetailId(id);
    }

    render() {
        let dataType = this.props.dataType;
        let datas = this.props.data || {};
        let analyData;
        // console.log('list', datas);
        if (datas !== {}) {
            // console.log('inrender',datas);
            analyData = this.analysisData(datas, dataType);
        }

        // console.log('analyData', analyData);
        return (
            <div id='list' className='contentBox' onClick={this.getDetailId.bind(this, analyData)}>
                <div className='imgBox'>
                    <img src={analyData[5]} alt={analyData[0]}/>
                </div>
                <div className='description'>
                    <h1>{analyData[0]}</h1>
                    <p className='lab-contain'>
                        <span className={analyData[8]}>{analyData[1][0]}</span>
                        <span  className={analyData[8]}>{analyData[1][1]}</span>
                        <span  className={analyData[8]}>{analyData[1][2]}</span>
                    </p>
                    <p>{analyData[6]}：{analyData[2]}</p>
                    <p>评分：{analyData[3]}</p>
                    <p>时间：{analyData[4]}</p>
                </div>
            </div>
        )
    }
}

module.exports = List;
