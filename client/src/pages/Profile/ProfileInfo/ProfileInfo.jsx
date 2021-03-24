import React from 'react';
import CreateIcon from '@material-ui/icons/Create';

import {
  ProfileInfoStyled, ProfileInfoBio, ProfileInfoPairs, ProfileInterest, ProfileInterestsStyled,
} from './styled';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import SettingsItem from '../../../components/Aside/SettingsItem/SettingsItem';
import { IconPencil, Text } from '../../../styled';

const ProfileInterests = ({ user }) => (
  <>
    <h2>
      Интересы:
      <IconPencil size="28px">
        <CreateIcon />
      </IconPencil>
    </h2>
    <ProfileInterestsStyled>
      {
        user.interests.map((interest, index) => (
          <ProfileInterest key={`${interest}_${index}`}>{`#${interest}`}</ProfileInterest>
          ))
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
              <p>{`${item.title}:`}</p>
              <p className="info-value">{item.value}</p>
            </div>
          ))
      }
      </ProfileInfoPairs>

      <ProfileInfoBio>
        <p>
          {user.bio}
          <IconPencil size="18px">
            <CreateIcon />
          </IconPencil>
        </p>

      </ProfileInfoBio>
    </ProfileInfoStyled>
    <ProfileInterests user={user} />
  </>
);

export default ProfileInfo;
