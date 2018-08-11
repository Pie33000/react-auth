import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Logout extends Component {
    
    constructor(props){
    super(props);
    this.state = { hasError: false };
    this.onChange = this.onChange.bind(this);
    }
    
    componentWillMount(){
        this.onChange();
    }

    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({ hasError: true });
        // You can also log the error to an error reporting service
        console.log(error, info);
    }
    
    onChange(){
        this.props.logout();
        this.props.history.push("/");
    }

	render() {
        return null;
    }
}

export default Logout