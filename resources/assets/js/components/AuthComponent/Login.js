import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

class Login extends Component {
    
     constructor(props){
        super(props);
        this.state = {
            email : '',
            password: '',
            error: ''
        };
        this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
     }

     onSubmit(e){
        e.preventDefault();
        const {email , password} = this.state ;
        axios.post('/api/login', {
            email: this.state.email,
			password: this.state.password, 
          })
          .then(response=> {
            this.setState({ error: '' });
            const token = response.data.token;
            this.props.authenticate(token, this.state.email);
            this.props.history.push("/");
            
          })
          .catch(error=> {
            const status = error.response.status;
			if (status === 401) {
				this.setState({ error: 'Username or password not recognised.' });
			}
          });
     }

     onChange(e){
        const {name, value} = e.target;
        this.setState({[name]: value});
     }

	render() {
        if (this.props.isAuthenticated && this.props.location.state !== undefined) {
			return (
				<Redirect to={this.props.location.state.from} />
			);
		}
        let error = this.state.err ;
        let msg = (!error) ? 'Login Successful' : 'Wrong Credentials' ;
        let name = (!error) ? 'alert alert-success' : 'alert alert-danger' ;
	    return (
            <div >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12" style={{paddingTop: 10}}>
                            <h2 className='text-center'>Sign In</h2>  
                            <div className="col-lg-12">
                                {error != undefined && <div className={name} role="alert">{msg}</div>}
                            </div>
                            <form className="text-center" role="form" method="POST" onSubmit= {this.onSubmit.bind(this)}>
                                <div className="row">
                                    <div className="col-lg-3">
                                    </div>
                                    <div className="col-lg-6" style={{paddingTop: 10}}>
                                        <input id="email" type="email" ref="email" className="form-control" name="email"  placeholder="Email" onChange={this.onChange.bind(this)} required />
                                    </div>
                                    <div className="col-lg-3">
                                    </div>
                                    <div className="col-lg-3">
                                    </div>
                                    <div className="col-lg-6" style={{paddingTop: 10}}>
                                        <input id="password" type="password" ref="password" className="form-control" name="password" placeholder="Password" onChange={this.onChange.bind(this)}  required />
                                    </div>
                                </div>

                                <div className="form-group" style={{paddingTop: 20}}>
                                    <div className="col-lg-12">
                                        <div className="checkbox">
                                            <label>
                                                <input type="checkbox" name="remember" /> Remember Me
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="row text-center">      
                                     <div className="col-lg-12 col-md-offset-4 text-center">
                                        <button type="submit" className="text-center btn btn-success">
                                            Sign In
                                        </button>
                                        <li className="btn btn-link">
                                            <Link to = "register">Register</Link>
                                    </li>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
           
	    );
    }
}

export default Login