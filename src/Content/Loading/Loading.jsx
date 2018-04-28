import React, { Component } from 'react'
import './Loading.css'

class Load extends Component {
  render () {
    return (
      <div className='loadingBox'>
        <div className='loading' />
      </div>
    )
  }
}

module.exports = Load
