import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type MyTinderProfileQueryVariables = Types.Exact<{ [key: string]: never }>;

export type MyTinderProfileQueryResponse = { __typename?: 'Query' } & {
  myTinderProfile: { __typename?: 'TinderProfile' } & Pick<
    Types.TinderProfile,
    'id' | 'images' | 'gender' | 'target' | 'intro' | 'userId' | 'createdAt' | 'updatedAt'
  >;
};

export const MyTinderProfileDocument = gql`
  query myTinderProfile {
    myTinderProfile {
      id
      images
      gender
      target
      intro
      userId
      createdAt
      updatedAt
    }
  }
`;
export function useMyTinderProfileQuery(
  baseOptions?: Apollo.QueryHookOptions<MyTinderProfileQueryResponse, MyTinderProfileQueryVariables>,
) {
  return Apollo.useQuery<MyTinderProfileQueryResponse, MyTinderProfileQueryVariables>(
    MyTinderProfileDocument,
    baseOptions,
  );
}
export function useMyTinderProfileLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MyTinderProfileQueryResponse, MyTinderProfileQueryVariables>,
) {
  return Apollo.useLazyQuery<MyTinderProfileQueryResponse, MyTinderProfileQueryVariables>(
    MyTinderProfileDocument,
    baseOptions,
  );
}
export type MyTinderProfileQueryHookResult = ReturnType<typeof useMyTinderProfileQuery>;
export type MyTinderProfileLazyQueryHookResult = ReturnType<typeof useMyTinderProfileLazyQuery>;
export type MyTinderProfileQueryResult = Apollo.QueryResult<
  MyTinderProfileQueryResponse,
  MyTinderProfileQueryVariables
>;
