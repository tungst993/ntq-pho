/* eslint-disable @typescript-eslint/no-unsafe-call */
import { showMessage } from 'react-native-flash-message';
import { ThemeStatic } from '../theme';

export const welcomeNotification = () =>
  showMessage({
    message: 'Welcome to Proximity',
    icon: 'success',
    type: 'success',
    duration: 2000,
  });

export const postUploadedNotification = () =>
  showMessage({
    message: 'Upload complete, your post is live',
    icon: 'success',
    type: 'success',
    duration: 3000,
  });

export const uploadErrorNotification = (asset: string) =>
  showMessage({
    message: `${asset} upload failed, please try again later`,
    icon: 'danger',
    type: 'danger',
    duration: 3000,
  });

export const inputLimitErrorNotification = (type: string, condition: string, limit: number) =>
  showMessage({
    message: `${type} should be ${condition} than ${limit} characters`,
    icon: 'danger',
    type: 'danger',
    duration: 4000,
  });

export const somethingWentWrongErrorNotification = () =>
  showMessage({
    message: 'Oops, please try again later',
    icon: 'danger',
    type: 'danger',
    duration: 4000,
  });

export const showErrorNotification = (message: string) =>
  showMessage({
    message,
    icon: 'danger',
    type: 'danger',
    duration: 4000,
  });

export const showSuccessNotification = (message: string) =>
  showMessage({
    message,
    icon: 'success',
    type: 'success',
    duration: 3000,
  });

export const noAssetInfoNotification = () =>
  showMessage({
    message: 'Please pick an image before uploading',
    icon: 'info',
    type: 'info',
    backgroundColor: ThemeStatic.accent,
    duration: 2000,
  });

export const noPermissionNotification = () =>
  showMessage({
    message: 'Please allow photo gallery permissions',
    icon: 'danger',
    type: 'danger',
    duration: 4000,
  });

export const longPressDeleteNotification = (onLongPress: any) =>
  showMessage({
    message: 'Ấn giữ để xoá',
    icon: 'danger',
    type: 'danger',
    duration: 3000,
    backgroundColor: ThemeStatic.delete,
    onLongPress,
  });

export const longPressLogoutNotification = (onLongPress: any) =>
  showMessage({
    message: 'Long press this notification to logout',
    icon: 'danger',
    type: 'danger',
    duration: 4000,
    backgroundColor: ThemeStatic.delete,
    onLongPress,
  });

export const tryAgainLaterNotification = () =>
  showMessage({
    message: 'Please try again later',
    icon: 'danger',
    type: 'danger',
    duration: 4000,
  });

export const postReportedNotification = () =>
  showMessage({
    message: 'Post has been reported and submitted for review',
    icon: 'info',
    type: 'info',
    backgroundColor: ThemeStatic.accent,
    duration: 4000,
  });

export const postUpdatedNotification = () =>
  showMessage({
    message: 'Post has been updated',
    icon: 'success',
    type: 'success',
    duration: 2000,
  });

export const postDeletedNotification = () =>
  showMessage({
    message: 'Post has been deleted',
    icon: 'info',
    type: 'info',
    backgroundColor: ThemeStatic.accent,
    duration: 2000,
  });

export const userBlockedNotification = (handle: string = 'User') =>
  showMessage({
    message: `${handle} has been blocked, please refresh your feed`,
    icon: 'info',
    type: 'info',
    backgroundColor: ThemeStatic.accent,
    duration: 4000,
  });

export const longPressUnblockNotification = (onLongPress: any, handle: any) =>
  showMessage({
    message: `Long press this notification to unblock ${handle as string}`,
    icon: 'danger',
    type: 'danger',
    duration: 4000,
    backgroundColor: ThemeStatic.delete,
    onLongPress,
  });
