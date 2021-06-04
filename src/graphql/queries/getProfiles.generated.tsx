import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type GetProfilesQueryVariables = Types.Exact<{
  page: Types.Scalars['Float'];
  limit: Types.Scalars['Float'];
}>;

export type GetProfilesQueryResponse = { __typename?: 'Query' } & {
  getProfiles: { __typename?: 'TinderProfileConnection' } & {
    items?: Types.Maybe<
      Array<
        { __typename?: 'TinderProfile' } & Pick<
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
          }
      >
    >;
    meta: { __typename?: 'BasePaginationMeta' } & Pick<
      Types.BasePaginationMeta,
      'itemCount' | 'totalItems' | 'itemsPerPage' | 'totalPages' | 'currentPage'
    >;
  };
};

export const GetProfilesDocument = gql`
  query getProfiles($page: Float!, $limit: Float!) {
    getProfiles(page: $page, limit: $limit) {
      items {
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
export function useGetProfilesQuery(
  baseOptions: Apollo.QueryHookOptions<GetProfilesQueryResponse, GetProfilesQueryVariables>,
) {
  return Apollo.useQuery<GetProfilesQueryResponse, GetProfilesQueryVariables>(GetProfilesDocument, baseOptions);
}
export function useGetProfilesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetProfilesQueryResponse, GetProfilesQueryVariables>,
) {
  return Apollo.useLazyQuery<GetProfilesQueryResponse, GetProfilesQueryVariables>(GetProfilesDocument, baseOptions);
}
export type GetProfilesQueryHookResult = ReturnType<typeof useGetProfilesQuery>;
export type GetProfilesLazyQueryHookResult = ReturnType<typeof useGetProfilesLazyQuery>;
export type GetProfilesQueryResult = Apollo.QueryResult<GetProfilesQueryResponse, GetProfilesQueryVariables>;
