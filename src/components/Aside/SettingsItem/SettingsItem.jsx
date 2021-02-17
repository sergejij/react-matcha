import React from 'react';
import AsideItem from './styled';

const SettingsItem = ({
  textSetting, isActive, clickSettingsItem, children,
}) => (
  <AsideItem onClick={clickSettingsItem} className={isActive && 'active'}>
    {children}
    <p>{textSetting}</p>
  </AsideItem>
);

export default SettingsItem;
