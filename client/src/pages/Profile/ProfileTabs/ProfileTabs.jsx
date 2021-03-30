import React from 'react';
import {
  Tabs, TabPanel,
} from 'react-tabs';

import { ProfileTabsLink, ProfileTabsStyled } from './styled';
import ProfilePhotos from '../ProfilePhotos/ProfilePhotos';
import ProfileInfo from '../ProfileInfo/ProfileInfo';

const tabs = [
  'Фото',
  'Информация',
  'Посетители',
  'Лайки',
];

const ProfileTabs = ({ userData, id }) => {
  const [activeTabs, setActiveTabs] = React.useState(0);

  const tabClick = (e, index) => {
    e.preventDefault();
    setActiveTabs(index);
  };
  return (
    <Tabs defaultIndex={0}>
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
        <ProfileInfo userData={userData} />
      </TabPanel>

      {/*<TabPanel>*/}
      {/*  <ProfileVisitors users={users} />*/}
      {/*</TabPanel>*/}

      {/*<TabPanel>*/}
      {/*  <ProfileLikes users={users} />*/}
      {/*</TabPanel>*/}
    </Tabs>
  );
};
export default ProfileTabs;
