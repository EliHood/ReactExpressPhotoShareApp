// the purpose of this file is to prevent duplicate code
// We will be doing the same functionalies in SignUp and Login file. 
// So using a high order component is a no brainer solution to prevent from writing duplicate
// code
import React, {Component} from 'react';
import { connect } from 'react-redux';

export default function (WrappedComponent) {
  class IsAuth extends Component {
    constructor(props){
      super(props)
        this.state = {
            errors: {},
        }
    }
    componentDidMount() {
      if (this.props.auth.isAuthenticated) {
        this.props.history.push('/dashboard');
        }
    }
    //   this line is magic, redirects to the dashboard after user signs up
    // this replace getDerivedStateFromPropss
    static getDerivedStateFromProps(nextProps){
      if (nextProps.auth.isAuthenticated) {
        nextProps.history.push('/dashboard');
      }
      if (nextProps.errors) {
        return {errors: nextProps.errors};
      }
      
    }

    render(){
        return(
            <WrappedComponent {...this.props}/>
        )
    }
}
    const mapStateToProps = state => ({
        image: state.image,
        auth: state.auth,
    });
    return connect(mapStateToProps)(IsAuth);
}
