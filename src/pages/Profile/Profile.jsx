import React from 'react';

import ProfilePage from './styled';
import ProfileHeader from './ProfileHeader/ProfileHeader';
import ProfileTabs from './ProfileTabs/ProfileTabs';

export default () => (
  <ProfilePage>
    <ProfileHeader />
    <ProfileTabs />
  </ProfilePage>
);
