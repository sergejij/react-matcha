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

const ProfileTabs = ({ defaultTab, userData, id, isMyProfile }) => {
  const [activeTabs, setActiveTabs] = React.useState(0);
  const [visitors, setVisitors] = React.useState([]);
  const [likes, setLikes] = React.useState([]);

  React.useEffect(() => {
      setActiveTabs(defaultTab);
  }, [id]);

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
              key="photo0"
              onClick={() => setActiveTabs(0)}
              className={activeTabs === 0 && 'active'}
          >
              Фото
          </ProfileTabsLink>
          <ProfileTabsLink
              key="photo1"
              onClick={() => setActiveTabs(1)}
              className={activeTabs === 1 && 'active'}
          >
              Информация
          </ProfileTabsLink>
          { id === localStorage.getItem('id') &&
              <>
                  <ProfileTabsLink
                      key="photo2"
                      onClick={() => setActiveTabs(2)}
                      className={activeTabs === 2 && 'active'}
                  >
                      Посетители
                  </ProfileTabsLink>
                  <ProfileTabsLink
                      key="photo3"
                      onClick={() => setActiveTabs(3)}
                      className={activeTabs === 3 && 'active'}
                  >
                      Лайки
                  </ProfileTabsLink>
              </>
          }
      </ProfileTabsStyled>

      <TabPanel>
        <ProfilePhotos id={id} />
      </TabPanel>

      <TabPanel>
        <ProfileInfo isMyProfile={isMyProfile} userData={userData} id={id} />
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
