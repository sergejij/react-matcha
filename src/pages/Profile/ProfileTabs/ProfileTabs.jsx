import React from 'react';
import {
  Tabs, TabPanel,
} from 'react-tabs';

import { ProfileTabsLink, ProfileTabsStyled } from './styled';
import ProfilePhotos from '../ProfilePhotos/ProfilePhotos';
import ProfileInfo from '../ProfileInfo/ProfileInfo';
import ProfileVisitors from '../ProfileVisitors/ProfileVisitors';
import ProfileLikes from '../ProfileLikes/ProfileLikes';

const tabs = [
  'Фото',
  'Информация',
  'Посетители',
  'Лайки',
];

const ProfileTabs = ({ users, currentUser }) => {
  const [activeTabs, setActiveTabs] = React.useState(0);

  const tabClick = (e, index) => {
    e.preventDefault();
    setActiveTabs(index);
  };
  return (
    <Tabs>
      <ProfileTabsStyled>
        {
          tabs.map((tab, index) => (
            <ProfileTabsLink
              key={`${tab}_${index}`}
              onClick={(e) => tabClick(e, index)}
              className={activeTabs === index && 'active'}
            >
              {tab}
            </ProfileTabsLink>
          ))
        }
      </ProfileTabsStyled>

      <TabPanel>
        <ProfilePhotos />
      </TabPanel>

      <TabPanel>
        <ProfileInfo user={currentUser} />
      </TabPanel>

      <TabPanel>
        <ProfileVisitors users={users} />
      </TabPanel>

      <TabPanel>
        <ProfileLikes users={users} />
      </TabPanel>
    </Tabs>
  );
};
export default ProfileTabs;
