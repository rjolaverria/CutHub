import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEdu = ({ profile: { education } }) => (
  <Fragment>
    <div className='profile-edu bg-white p-2'>
      <h2 className='text-primary'>Education</h2>
      {education.length > 0 ? (
        education.map((edu, index) => (
          <div key={index}>
            <h3>{edu.school}</h3>
            <p>
              <Moment format='MM/DD/YYYY'>{edu.from}</Moment> -{' '}
              {edu.to ? <Moment format='MM/DD/YYYY'>{edu.to}</Moment> : 'Now'}
            </p>
            <p>
              <strong>Degree: </strong>
              {edu.degree}
            </p>
            <p>
              <strong>Field Of Study: </strong>
              {edu.fieldofstudy}
            </p>
            {edu.description && (
              <p>
                <strong>Description: </strong>
                {edu.description}
              </p>
            )}
          </div>
        ))
      ) : (
        <h4>No Education Provided</h4>
      )}
    </div>
  </Fragment>
);

ProfileEdu.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileEdu;
