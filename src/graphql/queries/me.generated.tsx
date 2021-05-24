import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type MeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type MeQueryResponse = { __typename?: 'Query' } & {
  me: { __typename?: 'User' } & Pick<
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

export const MeDocument = gql`
  query me {
    me {
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
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQueryResponse, MeQueryVariables>) {
  return Apollo.useQuery<MeQueryResponse, MeQueryVariables>(MeDocument, baseOptions);
}
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQueryResponse, MeQueryVariables>) {
  return Apollo.useLazyQuery<MeQueryResponse, MeQueryVariables>(MeDocument, baseOptions);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQueryResponse, MeQueryVariables>;
