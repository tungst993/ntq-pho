import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type UpdateUserInfoMutationVariables = Types.Exact<{
  input: Types.UpdateUserInput;
}>;

export type UpdateUserInfoMutationResponse = { __typename?: 'Mutation' } & {
  updateUserInfo: { __typename?: 'User' } & Pick<
    Types.User,
    | 'id'
    | 'firstName'
    | 'lastName'
    | 'fullName'
    | 'nickname'
    | 'intro'
    | 'googleId'
    | 'avatar'
    | 'isNew'
    | 'lastSeen'
    | 'department'
    | 'position'
    | 'createdAt'
    | 'updatedAt'
  >;
};

export const UpdateUserInfoDocument = gql`
  mutation updateUserInfo($input: UpdateUserInput!) {
    updateUserInfo(input: $input) {
      id
      firstName
      lastName
      fullName
      nickname
      intro
      googleId
      avatar
      isNew
      lastSeen
      department
      position
      createdAt
      updatedAt
    }
  }
`;
export function useUpdateUserInfoMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateUserInfoMutationResponse, UpdateUserInfoMutationVariables>,
) {
  return Apollo.useMutation<UpdateUserInfoMutationResponse, UpdateUserInfoMutationVariables>(
    UpdateUserInfoDocument,
    baseOptions,
  );
}
export type UpdateUserInfoMutationHookResult = ReturnType<typeof useUpdateUserInfoMutation>;
export type UpdateUserInfoMutationResult = Apollo.MutationResult<UpdateUserInfoMutationResponse>;
export type UpdateUserInfoMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserInfoMutationResponse,
  UpdateUserInfoMutationVariables
>;
