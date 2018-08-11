import React, { Component } from 'react'
import axios from 'axios'

class Register extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: '',
            email : '',
            password: '',
            password_confirmation: '',
        }
     }

    onSubmit(e){
        e.preventDefault();
        const {name, email, password, password_confirmation} = this.state ;
        if(password){
            if(password === password_confirmation){
                axios.post('/api/register', {
                    name: name,
                    email: email,
                    password: password,
                    password_confirmation: password_confirmation,
                  })
                  .then(response=> {
                   this.setState({err: false});
                   this.props.history.push("/");
                  })
                  .catch(error=> {
                    this.refs.name.value="";
                    this.refs.password.value="";
                    this.refs.email.value="";
                    this.refs.confirm.value="";
                    this.setState({err: true});
                  });
            }else{
                this.setState({err: true});
            }
        }
     }

     onChange(e){
        const {name, value} = e.target ;
        this.setState({[name]: value});
     }

    render() {
        let error = this.state.err ;
        let msg = (!error) ? 'Registered Successfully' : 'Oops! , Something went wrong.' ;
        let name = (!error) ? 'alert alert-success' : 'alert alert-danger' ;
        return (   
             <div>   
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12" style={{ paddingTop: 5}}>
                            <h2 className='text-center'>Sign Up</h2>
                                <div className="col-lg-12">
                                    {error != undefined && <div className={name} role="alert">{msg}</div>}
                                </div>   
                                <form className="form-horizontal" role="form" method="POST" onSubmit= {this.onSubmit.bind(this)}>

                                    <div className="row">
                                        <div className="col-lg-6" style={{paddingTop: 20}}>
                                            <input id="name" type="text" className="form-control" ref="name" name="name" placeholder="Name" onChange={this.onChange.bind(this)} required autoFocus />
                                        </div>
                                
                                        <div className="col-lg-6" style={{paddingTop: 20}}>
                                            <input id="email" type="email" className="form-control" ref="email" name="email" placeholder="Email" onChange={this.onChange.bind(this)} required />     
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6" style={{paddingTop: 20}}>
                                            <input id="password" type="password" className="form-control"  ref="password" name="password" placeholder="Password" onChange={this.onChange.bind(this)} required/>    
                                        </div>

                                        <div className="col-lg-6" style={{paddingTop: 20}}>
                                            <input id="password-confirm" type="password" className="form-control" ref="confirm" name="password_confirmation" placeholder="Confirm password" onChange={this.onChange.bind(this)} required/>    
                                        </div>

                                    </div>
                                    <div className="row text-center" style={{paddingTop: 20}}>
                                        <div className="col-lg-12">
                                            <button type="submit" className="btn btn-success">
                                                Sign Up
                                            </button>
                                        </div>
                                    </div>
                                </form>
                        

                        </div>
                    </div>
                </div>
            </div>    
        )
      }
}

export default Register