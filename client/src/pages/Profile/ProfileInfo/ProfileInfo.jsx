import React from 'react';

import {
  ProfileInfoStyled, ProfileInfoBio, ProfileInfoPairs, ProfileInterest, ProfileInterestsStyled,
} from './styled';

const ProfileInterests = ({ user }) => (
  <>
    <h2>Интересы:</h2>
    <ProfileInterestsStyled>
      {
        user.interests.map((interest, index) => <ProfileInterest key={`${interest}_${index}`}>{`#${interest}`}</ProfileInterest>)
    }
    </ProfileInterestsStyled>
  </>
);

const ProfileInfo = ({ user }) => (
  <>
    <ProfileInfoStyled>
      <ProfileInfoPairs>
        {
          user.info.map((item, index) => (
            <div key={`${user.title}_${index}`}>
              <p>
                {`${item.title}:`}
              </p>
              <p className="info-value">{item.value}</p>
            </div>
          ))
      }
      </ProfileInfoPairs>

      <ProfileInfoBio>
        <p>
          {
            user.bio
          }
        </p>
      </ProfileInfoBio>
    </ProfileInfoStyled>
    <ProfileInterests user={user} />
  </>
);

export default ProfileInfo;
