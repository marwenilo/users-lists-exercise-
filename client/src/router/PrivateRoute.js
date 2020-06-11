import React from 'react';
import { Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Test from "../components/test";
const PrivateRoute = ({ component: Component, auth, ...rest}) => (
    
  <Route {...rest} render={
     
    props => auth ? (<Component {...props} />) :(<Redirect to='/login' />) 
  } />
)

PrivateRoute.propTypes = {
  auth: PropTypes.bool,
}

const mapStateToProps = state => ({
auth: state.authReducer.isAuthenticated
});
export default connect(mapStateToProps)(PrivateRoute);
