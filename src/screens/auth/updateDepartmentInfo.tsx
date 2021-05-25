import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useUpdateUserInfoMutation } from '../../graphql/mutations/updateUserInfo.generated';
import { UserDepartmentEnum } from '../../graphql/type.interface';
import { AppRoutes } from '../../navigator/app-routes';

import UpdateInfo from './components/UpdateInfo';

const UpdateDepartment = React.memo(() => {
  const { navigate } = useNavigation();

  const listDepartment = [
    UserDepartmentEnum.OS8,
    UserDepartmentEnum.OS1,
    UserDepartmentEnum.OS3,
    UserDepartmentEnum.OS10,
    UserDepartmentEnum.IC,
    UserDepartmentEnum.BOM,
    UserDepartmentEnum.RECO,
    UserDepartmentEnum.EZD,
  ];

  const [updateInfo] = useUpdateUserInfoMutation({
    onCompleted: () => {
      navigate(AppRoutes.UPDATE_POSITION_INFO);
      console.log('success');
    },
    onError: (err) => {
      console.log('err', err);
    },
  });

  function onCompleteUpdateUserInfo(deptSelected: any) {
    if (deptSelected) {
      updateInfo({
        variables: {
          input: {
            department: deptSelected,
          },
        },
      });
    }
  }

  return (
    <UpdateInfo list={listDepartment} onComplete={onCompleteUpdateUserInfo} title="Chọn đơn vị bạn đang làm việc." />
  );
});

export default UpdateDepartment;
