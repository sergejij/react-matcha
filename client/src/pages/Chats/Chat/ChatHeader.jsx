import React from 'react';
import { ChatHeaderStyled } from './styled';
import ChatsUser from '../ChatsUser/ChatsUser';
import ProfileImg from '../../../assets/images/Chats/liza.png';
import {userPhotosApi} from "../../../api/api";

const ChatHeader = ({ userId }) => {
   const [profileProfile, setProfilePhoto] = React.useState(null);

   React.useEffect(() => {
       userPhotosApi
           .getAvatar(userId)
           .then(
               ({ data }) => setProfilePhoto('data:image/bmp;base64,' + data.Content.avatar),
               (err) => console.error("ERROR get avatar:", err)
           )
           .catch((err) => console.error("ERROR get avatar:", err));
   });

   return (
        <ChatHeaderStyled>
            <ChatsUser userId={userId} isActive profileProfile={profileProfile}  />
        </ChatHeaderStyled>
    );
}

export default ChatHeader;
