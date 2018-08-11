// resources/assets/js/components/ProjectsList.js

import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ArticleList extends Component {

  constructor () {
    super()

    this.state = {
      articles: [],
      connected: false
    }
  }

  componentDidMount () {
    axios.get('/api/checkuser').then(response => {
      console.log(response.data);
    });
    axios.get('/api/articles').then(response => {
      this.setState({
        articles: response.data
      })
    });
  }

  render () {
    const { articles } = this.state
    return (
      <div className='container my-3'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='card'>
              <div className='card-header'>All articles</div>
              <div className='card-body'>
                <ul className='list-group list-group-flush'>
                {articles.map(article => (
                    <Link
                      className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'
                      to={`/article/${article.id}`}
                      key={article.id}
                    >
                      {article.title}
                      <span className='badge badge-primary badge-pill'>
                        {article.author}
                      </span>
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ArticleList