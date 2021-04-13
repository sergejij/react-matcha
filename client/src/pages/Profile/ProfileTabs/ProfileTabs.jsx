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
          <ProfileTabsLink
              key="photo{0}"
              onClick={() => setActiveTabs(0)}
              className={activeTabs === 0 && 'active'}
          >
              Фото
          </ProfileTabsLink>
          <ProfileTabsLink
              key="photo{1}"
              onClick={() => setActiveTabs(1)}
              className={activeTabs === 1 && 'active'}
          >
              Информация
          </ProfileTabsLink>
          { id === localStorage.getItem('id') &&
              <>
                  <ProfileTabsLink
                      key="photo{2}"
                      onClick={() => setActiveTabs(2)}
                      className={activeTabs === 2 && 'active'}
                  >
                      Посетители
                  </ProfileTabsLink>
                  <ProfileTabsLink
                      key="photo{3}"
                      onClick={() => setActiveTabs(3)}
                      className={activeTabs === 3 && 'active'}
                  >
                      Лайки
                  </ProfileTabsLink>
              </>
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
