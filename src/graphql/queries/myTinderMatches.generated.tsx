import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type MyTinderMatchesQueryVariables = Types.Exact<{
  page: Types.Scalars['Float'];
  limit: Types.Scalars['Float'];
}>;

export type MyTinderMatchesQueryResponse = { __typename?: 'Query' } & {
  myTinderMatches: { __typename?: 'TinderMatchConnection' } & {
    items?: Types.Maybe<
      Array<
        { __typename?: 'TinderMatch' } & Pick<
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
          }
      >
    >;
    meta: { __typename?: 'BasePaginationMeta' } & Pick<
      Types.BasePaginationMeta,
      'itemCount' | 'totalItems' | 'itemsPerPage' | 'totalPages' | 'currentPage'
    >;
  };
};

export const MyTinderMatchesDocument = gql`
  query myTinderMatches($page: Float!, $limit: Float!) {
    myTinderMatches(page: $page, limit: $limit) {
      items {
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
      meta {
        itemCount
        totalItems
        itemsPerPage
        totalPages
        currentPage
      }
    }
  }
`;
export function useMyTinderMatchesQuery(
  baseOptions: Apollo.QueryHookOptions<MyTinderMatchesQueryResponse, MyTinderMatchesQueryVariables>,
) {
  return Apollo.useQuery<MyTinderMatchesQueryResponse, MyTinderMatchesQueryVariables>(
    MyTinderMatchesDocument,
    baseOptions,
  );
}
export function useMyTinderMatchesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MyTinderMatchesQueryResponse, MyTinderMatchesQueryVariables>,
) {
  return Apollo.useLazyQuery<MyTinderMatchesQueryResponse, MyTinderMatchesQueryVariables>(
    MyTinderMatchesDocument,
    baseOptions,
  );
}
export type MyTinderMatchesQueryHookResult = ReturnType<typeof useMyTinderMatchesQuery>;
export type MyTinderMatchesLazyQueryHookResult = ReturnType<typeof useMyTinderMatchesLazyQuery>;
export type MyTinderMatchesQueryResult = Apollo.QueryResult<
  MyTinderMatchesQueryResponse,
  MyTinderMatchesQueryVariables
>;
