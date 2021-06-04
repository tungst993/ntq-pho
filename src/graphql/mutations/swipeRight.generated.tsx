import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type SwipeRightMutationVariables = Types.Exact<{
  targetUser: Types.Scalars['Float'];
}>;

export type SwipeRightMutationResponse = { __typename?: 'Mutation' } & {
  swipeRight: { __typename?: 'TinderMatch' } & Pick<
    Types.TinderMatch,
    'id' | 'initiator' | 'targetUser' | 'status' | 'isSuper' | 'isNew' | 'createdAt' | 'updatedAt'
  > & {
      targetUserInfo: { __typename?: 'TinderProfile' } & Pick<
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
      initiatorUserInfo: { __typename?: 'TinderProfile' } & Pick<
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
};

export const SwipeRightDocument = gql`
  mutation swipeRight($targetUser: Float!) {
    swipeRight(targetUser: $targetUser) {
      id
      initiator
      targetUser
      status
      isSuper
      isNew
      createdAt
      updatedAt
      targetUserInfo {
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
      initiatorUserInfo {
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
  }
`;
export function useSwipeRightMutation(
  baseOptions?: Apollo.MutationHookOptions<SwipeRightMutationResponse, SwipeRightMutationVariables>,
) {
  return Apollo.useMutation<SwipeRightMutationResponse, SwipeRightMutationVariables>(SwipeRightDocument, baseOptions);
}
export type SwipeRightMutationHookResult = ReturnType<typeof useSwipeRightMutation>;
export type SwipeRightMutationResult = Apollo.MutationResult<SwipeRightMutationResponse>;
export type SwipeRightMutationOptions = Apollo.BaseMutationOptions<
  SwipeRightMutationResponse,
  SwipeRightMutationVariables
>;
