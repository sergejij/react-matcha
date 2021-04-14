import React from 'react';
import {
  Tabs, TabPanel,
} from 'react-tabs';

import { ProfileTabsLink, ProfileTabsStyled } from './styled';
import ProfilePhotos from '../ProfilePhotos/ProfilePhotos';
import ProfileInfo from '../ProfileInfo/ProfileInfo';
import ProfileVisitors from "../ProfileVisitors/ProfileVisitors";
import ProfileLikes from "../ProfileLikes/ProfileLikes";
import {usersApi} from "../../../api/api";

const tabs = [
  'Фото',
  'Информация',
  'Посетители',
  'Лайки',
];

const ProfileTabs = ({ userData, id }) => {
  const [activeTabs, setActiveTabs] = React.useState(0);
  const [visitors, setVisitors] = React.useState([]);
  const [likes, setLikes] = React.useState([]);

  const tabClick = (e, index) => {
    e.preventDefault();
    setActiveTabs(index);
  };

  React.useEffect(() => {
      usersApi
          .getVisits(1, 200)
          .then(
              ({ data }) => {
                  console.log('Visitors:', data);
                  setVisitors(data.Content.profiles);
              },
              (err) => console.log("ERROR getVisitors:", err)
          )
          .catch((err) => console.log("ERROR getVisitors:", err));
  }, []);

  React.useEffect(() => {
      usersApi
          .getLikes(1, 200)
          .then(
              ({ data }) => {
                  console.log('Likes:', data);
              },
              (err) => console.log("ERROR getLikes:", err)
          )
          .catch((err) => console.log("ERROR getLikes:", err));
  }, []);

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

      <TabPanel>
        <ProfileVisitors visitors={visitors} />
      </TabPanel>

      {/*<TabPanel>*/}
      {/*  <ProfileLikes likes={likes} />*/}
      {/*</TabPanel>*/}
    </Tabs>
  );
};
export default ProfileTabs;
