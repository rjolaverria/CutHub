import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import icon from '../../img/scissors.png';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <div className='logo'>
            <img src={icon} alt='' />
            <h1 className='x-large'>CutHub</h1>
          </div>
          <p className='lead'>The Hairstylist's Social Media Network</p>
          <div className='buttons'>
            <Link to='/register' className='btn btn-primary'>
              Sign Up
            </Link>
            <Link to='/login' className='btn btn-light'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapDispatchToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapDispatchToProps)(Landing);
