import React from 'react';
import { ChatsAsideItem, ChatsAsidePhoto } from './styled';
import {userInfoApi} from "../../../api/api";

const ChatsUser = ({
  img, isActive,  clickUserChat, userId,
}) => {
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    userInfoApi.getUserInfo(userId)
        .then(
            ({ data }) => {
              setUser(data.Content);
            },
            (err) => {
              console.error('Error getUserInfo:', err);
              if (err.response.status === 401) {
                localStorage.clear();
              }
            },
            (err) => console.error('Error getUserInfo:', err));
  }, [userId]);

  return (
    <ChatsAsideItem
      onClick={clickUserChat}
      className={isActive && 'active'}
      to={`/profile/${userId}`}
    >
      <ChatsAsidePhoto src={img} alt="Фото профиля" />
      <p>{user.name}</p>
    </ChatsAsideItem>
  );
}

export default ChatsUser;
