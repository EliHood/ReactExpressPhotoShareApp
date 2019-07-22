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
        // console.log(this.props.auth);
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }
    //   this line is magic, redirects to the dashboard after user signs up
    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
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
