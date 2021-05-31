import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type UpdateTinderProfileMutationVariables = Types.Exact<{
  input: Types.UpdateTinderProfileDto;
}>;

export type UpdateTinderProfileMutationResponse = { __typename?: 'Mutation' } & {
  updateTinderProfile: { __typename?: 'TinderProfile' } & Pick<
    Types.TinderProfile,
    'id' | 'images' | 'gender' | 'target' | 'intro' | 'userId' | 'createdAt' | 'updatedAt'
  > & {
      userInfo: { __typename?: 'User' } & Pick<
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
};

export const UpdateTinderProfileDocument = gql`
  mutation updateTinderProfile($input: UpdateTinderProfileDto!) {
    updateTinderProfile(input: $input) {
      id
      images
      gender
      target
      intro
      userId
      createdAt
      updatedAt
      userInfo {
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
  }
`;
export function useUpdateTinderProfileMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateTinderProfileMutationResponse, UpdateTinderProfileMutationVariables>,
) {
  return Apollo.useMutation<UpdateTinderProfileMutationResponse, UpdateTinderProfileMutationVariables>(
    UpdateTinderProfileDocument,
    baseOptions,
  );
}
export type UpdateTinderProfileMutationHookResult = ReturnType<typeof useUpdateTinderProfileMutation>;
export type UpdateTinderProfileMutationResult = Apollo.MutationResult<UpdateTinderProfileMutationResponse>;
export type UpdateTinderProfileMutationOptions = Apollo.BaseMutationOptions<
  UpdateTinderProfileMutationResponse,
  UpdateTinderProfileMutationVariables
>;
