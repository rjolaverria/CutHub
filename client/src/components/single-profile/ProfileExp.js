import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExp = ({ profile: { experience } }) => (
  <Fragment>
    <div className='profile-exp bg-white p-2'>
      <h2 className='text-primary'>Experience</h2>
      {experience.length > 0 ? (
        experience.map((exp, index) => (
          <div key={index}>
            <h3>{exp.company}</h3>
            <p>
              <Moment format='MM/DD/YYYY'>{exp.from}</Moment> -{' '}
              {exp.to ? <Moment format='MM/DD/YYYY'>{exp.to}</Moment> : 'Now'}
            </p>
            <p>
              <strong>Position: </strong>
              {exp.title}
            </p>
            {exp.description && (
              <p>
                <strong>Description: </strong>
                {exp.description}
              </p>
            )}
          </div>
        ))
      ) : (
        <h4>No Experience Provided</h4>
      )}
    </div>
  </Fragment>
);

ProfileExp.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileExp;
