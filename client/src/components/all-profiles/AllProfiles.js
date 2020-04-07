import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Profileitem from './Profileitem';
import Spinner from '../layouts/Spinner';
import { getAllProfiles } from '../../actions/profile';

const AllProfiles = ({ getAllProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getAllProfiles();
  }, [getAllProfiles]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Stylists</h1>
          <p className='lead'>Connect with other stylists!</p>
          <div className='profiles'>
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <Profileitem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4> No Profiles available...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

AllProfiles.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapDispatchToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapDispatchToProps, { getAllProfiles })(AllProfiles);
