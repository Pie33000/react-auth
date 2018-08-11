
import axios from 'axios';
import React, { Component } from 'react';

class SingleProject extends Component {
  constructor (props) {
    super(props)

    this.state = {
      articles: {},
    }
  }

  componentDidMount () {
    const articleId = this.props.match.params.id

    axios.get(`/api/articles/${articleId}`).then(response => {
      this.setState({
        articles: response.data,
      })
    }).catch(error =>{
        console.log("error", error);
    });
  }


  render () {
    const { articles } = this.state
    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <div className='card'>
                <div className='card-header text-center'><h2>{articles.title}</h2></div>
                <div className='card-body'>
                    <p>{articles.content}</p>
                    <p><span className="badge badge-info">{articles.author}</span></p>
                </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SingleProject
