import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useUpdateUserInfoMutation } from '../../graphql/mutations/updateUserInfo.generated';
import { UserPositionEnum } from '../../graphql/type.interface';
import { AppRoutes } from '../../navigator/app-routes';

import UpdateInfo from './components/UpdateInfo';

const UpdatePosition = React.memo(() => {
  const { navigate } = useNavigation();

  const listPosition = [
    UserPositionEnum.DEV,
    UserPositionEnum.COMTOR,
    UserPositionEnum.CEO,
    UserPositionEnum.BA,
    UserPositionEnum.PM,
    'TEAM LEAD',
    UserPositionEnum.DM,
  ];

  const [updateInfo] = useUpdateUserInfoMutation({
    onCompleted: () => {
      console.log('success');
      navigate(AppRoutes.WELCOME_SCREEN);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  function onCompleteUpdateUserInfo(positionSelected: any) {
    console.log('positionSelected', positionSelected);

    if (positionSelected) {
      updateInfo({
        variables: {
          input: {
            position: positionSelected !== 'TEAM LEAD' ? positionSelected : UserPositionEnum.TEAM_LEAD,
          },
        },
      });
    }
  }

  return (
    <UpdateInfo
      list={listPosition}
      onComplete={onCompleteUpdateUserInfo}
      title="Chọn vị trí của bạn."
      type="position"
    />
  );
});

export default UpdatePosition;
