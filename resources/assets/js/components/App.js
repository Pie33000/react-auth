    // resources/assets/js/components/App.js

    import React, { Component } from 'react'
    import ReactDOM from 'react-dom'
    import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
    import Header from './Header'
    import ArticleList from './Article/ArticleList'
    import CreateArticleForm from './Article/CreateArticleForm'
    import SingleArticle from './Article/SingleArticle'
    import Login from './AuthComponent/Login'
    import Register from './AuthComponent/Register'
    import Logout from './AuthComponent/Logout'
    import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
    

    class App extends Component {
      constructor() {
        super();
        this.state = {
          isAuthenticated: false,
          token: null,
          email: null
        };
        this.authenticate = this.authenticate.bind(this);
        this.logout = this.logout.bind(this);
        this.refresh = this.refresh.bind(this);
      }
    
      componentWillMount() {
        const lsToken = localStorage.getItem('jwt'); 
        const lsEmail = localStorage.getItem('email');
        if (lsToken) {
          this.authenticate(lsToken, lsEmail);
        } 
      }
    
      authenticate(token, email) {
        this.setState({
          isAuthenticated: true,
          token: token,
          email: email
        });
        localStorage.setItem('jwt', token);
        localStorage.setItem('email', email);
      }

    
      logout() {
        this.setState({
          isAuthenticated: false,
          token: null,
          email: null
        });
        localStorage.removeItem('jwt')
        localStorage.removeItem('email');
      }
    
      refresh() {
        return axios.get('/learn/jwt/public/api/refreshToken', {
          headers: { 'Authorization': 'Bearer ' + this.state.token }
        })
        .then((response) => {
          const token = response.data.token;
          this.authenticate(token);
        })
        .catch((error) => {
          console.log('Error!', error);
        });
      }

    
      render () {
        console.log('authentification', this.state.isAuthenticated);
        console.log('token', this.state.token);
        console.log('email', this.state.email);
        return (
          <BrowserRouter>
            <div>
              <Header value={this.state.isAuthenticated} email={this.state.email}/>
              <Switch>
                <Route exact path='/' component={ ArticleList }/>
                <PrivateRoute exact path='/create-article' component={ CreateArticleForm } isAuthenticated={this.state.isAuthenticated} token={this.state.token} refresh={this.refresh}/>
                <Route exact path='/article/:id' component={ SingleArticle }/>
                <Route exact path='/login' render={(props) => <Login authenticate={this.authenticate} emailStock={this.emailStock} isAuthenticated={this.state.isAuthenticated} {...props} />}/>
                <Route exact path='/register' component={ Register }/>
                <Route exact path='/logout' render={(props) => <Logout logout={this.logout} {...props}/>}/>
              </Switch>
            </div>
          </BrowserRouter>
        )
      }
    }
    const PrivateRoute = ({ component: Component, isAuthenticated, token, ...rest }) => (
      <Route {...rest} render={props => (
        isAuthenticated ? (
          <Component {...props} {...rest} token={token} isAuthenticated={isAuthenticated} />
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
        )
      )} />
    );

    ReactDOM.render(<App />, document.getElementById('app'))