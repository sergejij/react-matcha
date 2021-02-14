import React from 'react';
import {
  Tabs, TabPanel,
} from 'react-tabs';

// import { Route } from 'react-router-dom';
import { ProfileTabsLink, ProfileTabsStyled } from './styled';
import ProfilePhotos from '../ProfilePhotos/ProfilePhotos';
import ProfileInfo from '../ProfileInfo/ProfileInfo';
// import ProfilePage from '../styled';

const tabs = [
  'Фото',
  'Информация',
  'Посетители',
  'Лайки',
];

const ProfileTabs = ({ user }) => {
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
        <ProfileInfo user={user} />
      </TabPanel>

      <TabPanel>
        333
      </TabPanel>

      <TabPanel>
        444
      </TabPanel>
    </Tabs>
  );
};
export default ProfileTabs;
