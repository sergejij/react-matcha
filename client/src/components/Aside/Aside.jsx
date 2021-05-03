import React from 'react';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import FilterListIcon from '@material-ui/icons/FilterList';
import SecurityIcon from '@material-ui/icons/Security';
import SettingsInputCompositeIcon from '@material-ui/icons/SettingsInputComposite';
import ProfileImg from '../../assets/images/Chats/liza.png';
import {
  ChatsAsideHeader, ChatsAsideItems, ChatsAsideStyled, FilterBox,
} from './styled';
import User from './User/User';
import SettingsItem from './SettingsItem/SettingsItem';

const Aside = ({
  url, isSettings, headline, isSearch, onClickFilter, activeSetting, users, setId, isChat, isMobile
}) => {
    return (
        <ChatsAsideStyled>
            {!isMobile && <ChatsAsideHeader>
                <span>{headline}</span>
            </ChatsAsideHeader>}
            {
                isSearch && (
                    <FilterBox onClick={onClickFilter}>
                        <FilterListIcon />
                    </FilterBox>
                )
            }
            <ChatsAsideItems isSearch={isSearch}>
                {
                    isSettings ? (
                        <>
                            <SettingsItem to={`${url}/user-data`} isActive={activeSetting === 0} textSetting={!isMobile && "Данные пользователя"}>
                                <PersonOutlineIcon />
                            </SettingsItem>
                            <SettingsItem to={`${url}/user-security`} isActive={activeSetting === 1} textSetting={!isMobile && "Безопасность пользователя"}>
                                <SecurityIcon />
                            </SettingsItem>
                            <SettingsItem to={`${url}/user-photos`} isActive={activeSetting === 3} textSetting={!isMobile && "Фото пользователя"}>
                                <CropOriginalIcon />
                            </SettingsItem>
                            <SettingsItem to={`${url}/active-sessions`} isActive={activeSetting === 3} textSetting={!isMobile && "Активные сессии"}>
                                <SettingsInputCompositeIcon />
                            </SettingsItem>

                        </>
                    ) : (
                        users.map((user, index) => (
                            <User
                                key={`${user}_${index}`}
                                isActive={index === user.Id}
                                name={user.Profile.Name}
                                img={'data:image/bmp;base64,' + user.Profile.Avatar}
                                id={user.Profile.Id}
                                chooseConversation={() => setId(user.Profile.Id)}
                                isChat={isChat}
                                isMobile={isMobile}
                            />
                        ))
                    )
                }
            </ChatsAsideItems>

        </ChatsAsideStyled>

    );
}

export default Aside;
