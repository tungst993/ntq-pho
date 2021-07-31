import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type MyPostQueryVariables = Types.Exact<{
  page: Types.Scalars['Float'];
  limit: Types.Scalars['Float'];
}>;

export type MyPostQueryResponse = { __typename?: 'Query' } & {
  myPost: { __typename?: 'PostConnection' } & {
    items?: Types.Maybe<
      Array<
        { __typename?: 'Post' } & Pick<
          Types.Post,
          | 'id'
          | 'creatorId'
          | 'medias'
          | 'caption'
          | 'groupId'
          | 'department'
          | 'isPinned'
          | 'actualLike'
          | 'score'
          | 'createdAt'
          | 'updatedAt'
          | 'totalLike'
          | 'isLike'
        > & {
            creatorInfo?: Types.Maybe<
              { __typename?: 'User' } & Pick<
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
              >
            >;
            options: Array<
              { __typename?: 'PostOption' } & Pick<
                Types.PostOption,
                'id' | 'postId' | 'content' | 'voted' | 'createdAt' | 'updatedAt'
              > & {
                  voterInfo: Array<
                    { __typename?: 'User' } & Pick<
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
                    >
                  >;
                }
            >;
            mediasData: Array<
              { __typename?: 'Media' } & Pick<
                Types.Media,
                'id' | 'fileSize' | 'name' | 'filePath' | 'mimeType' | 'isDeleted' | 'type' | 'createdAt' | 'updatedAt'
              >
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

export const MyPostDocument = gql`
  query myPost($page: Float!, $limit: Float!) {
    myPost(page: $page, limit: $limit) {
      items {
        id
        creatorId
        medias
        caption
        groupId
        department
        isPinned
        actualLike
        score
        createdAt
        updatedAt
        totalLike
        isLike
        creatorInfo {
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
        options {
          id
          postId
          content
          voted
          createdAt
          updatedAt
          voterInfo {
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
        mediasData {
          id
          fileSize
          name
          filePath
          mimeType
          isDeleted
          type
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
export function useMyPostQuery(baseOptions: Apollo.QueryHookOptions<MyPostQueryResponse, MyPostQueryVariables>) {
  return Apollo.useQuery<MyPostQueryResponse, MyPostQueryVariables>(MyPostDocument, baseOptions);
}
export function useMyPostLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MyPostQueryResponse, MyPostQueryVariables>,
) {
  return Apollo.useLazyQuery<MyPostQueryResponse, MyPostQueryVariables>(MyPostDocument, baseOptions);
}
export type MyPostQueryHookResult = ReturnType<typeof useMyPostQuery>;
export type MyPostLazyQueryHookResult = ReturnType<typeof useMyPostLazyQuery>;
export type MyPostQueryResult = Apollo.QueryResult<MyPostQueryResponse, MyPostQueryVariables>;
