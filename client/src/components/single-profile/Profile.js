import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layouts/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExp from './ProfileExp';
import ProfileEdu from './ProfileEdu';
import { getProfilebyID } from '../../actions/profile';

const Profile = ({
  match,
  getProfilebyID,
  auth,
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getProfilebyID(match.params.id);
  }, [getProfilebyID, match.params.id]);

  return (
    <Fragment>
      {loading || profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn btn-light'>
            Back to Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Edit Profile
              </Link>
            )}
          <div className='profile-grid my-1'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <ProfileExp profile={profile} />
            <ProfileEdu profile={profile} />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getProfilebyID: PropTypes.func.isRequired,
};

const mapDispatchToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapDispatchToProps, { getProfilebyID })(Profile);
