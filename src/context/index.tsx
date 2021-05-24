import React, { useState, createContext } from 'react';
import { Theme } from '../theme';
import { ThemeColors } from '../types/theme';
import { saveThemeType } from '../helpers/storage';

type UserType = {
  id: string;
  avatar: string;
  handle: string;
};

type AppContextType = {
  user: UserType;
  updateUser: (user: UserType) => void;
  theme: ThemeColors;
  themeType: string;
  toggleTheme: (type: string) => void;
  unreadMessages: number;
  updateUnreadMessages: (count: number) => void;
};

export const AppContext = createContext({} as AppContextType);

export const AppContextProvider = (props: any) => {
  const [user, setUser] = useState({
    id: '',
    avatar: '',
    handle: '',
  });
  const [theme, setTheme] = useState(Theme.light.colors);
  const [themeType, setThemeType] = useState(Theme.light.type);
  const [unreadMessages, setUnreadMessages] = useState(0);

  const updateUser = (user: UserType) => {
    setUser(user);
  };

  const toggleTheme = async (type: string) => {
    setTheme(Theme[type].colors);
    setThemeType(type);
    await saveThemeType(type);
  };

  const updateUnreadMessages = (count: number) => {
    setUnreadMessages(count);
  };

  const value = {
    user,
    updateUser,
    theme,
    themeType,
    toggleTheme,
    unreadMessages,
    updateUnreadMessages,
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};
