import React from 'react'

class PostNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: true,
      title: '',
      author: '',
      content: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    console.log(this.state.title);
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    //alert('A name was submitted: ' + this.state.title);
    event.preventDefault();

    const { history } = this.props
    const project = {
        title: this.state.title,
        author: this.state.author,
        content: this.state.content
    }
    axios
            .post('/api/articles', project)
            .then(response => {
                console.log('from handle submit', response);
                history.push('/')
            })
            .catch(error => {
              console.log('error', error.response)
          });
  }


  render() {
    return (
      <div className='container' >
        <div className='row'>
          <div className="col-lg-10 offset-lg-1">
            <input className="form-control my-3" placeholder="Article Title" name="title" onChange={this.handleInputChange}/>
            <textarea className="form-control my-3" placeholder="Article Description" name="content" style={{ height: 200 }} onChange={this.handleInputChange}>
            </textarea>
            <input className="form-control my-3" placeholder="Article Author" name="author" onChange={this.handleInputChange}/>
          </div>
          <div className="col-lg-12 text-center">
              <button className="btn btn-primary" onClick={this.handleSubmit}>Post an article</button>
            </div>
        </div>
      </div>
    );
  }
}

export default PostNews