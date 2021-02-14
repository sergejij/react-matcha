import React from 'react';

import ProfilePage from './styled';
import ProfileHeader from './ProfileHeader/ProfileHeader';
import ProfileTabs from './ProfileTabs/ProfileTabs';

export default ({ user }) => (
  <ProfilePage>
    <ProfileHeader user={user} />
    <ProfileTabs user={user} />
  </ProfilePage>
);
