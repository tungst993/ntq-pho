import React from 'react';
import { useUpdateUserInfoMutation } from '../../graphql/mutations/updateUserInfo.generated';
import { UserDepartmentEnum } from '../../graphql/type.interface';

import UpdateInfo from './components/UpdateInfo';

const UpdateDepartment = React.memo(() => {
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
      console.log('success');
    },
    onError: (err) => {
      console.log(err);
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

  return <UpdateInfo list={listDepartment} onComplete={onCompleteUpdateUserInfo} />;
});

export default UpdateDepartment;
