import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type GetAllPostQueryVariables = Types.Exact<{
  page: Types.Scalars['Float'];
  limit: Types.Scalars['Float'];
}>;

export type GetAllPostQueryResponse = { __typename?: 'Query' } & {
  getAllPost: { __typename?: 'PostConnection' } & {
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

export const GetAllPostDocument = gql`
  query getAllPost($page: Float!, $limit: Float!) {
    getAllPost(page: $page, limit: $limit) {
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
export function useGetAllPostQuery(
  baseOptions: Apollo.QueryHookOptions<GetAllPostQueryResponse, GetAllPostQueryVariables>,
) {
  return Apollo.useQuery<GetAllPostQueryResponse, GetAllPostQueryVariables>(GetAllPostDocument, baseOptions);
}
export function useGetAllPostLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetAllPostQueryResponse, GetAllPostQueryVariables>,
) {
  return Apollo.useLazyQuery<GetAllPostQueryResponse, GetAllPostQueryVariables>(GetAllPostDocument, baseOptions);
}
export type GetAllPostQueryHookResult = ReturnType<typeof useGetAllPostQuery>;
export type GetAllPostLazyQueryHookResult = ReturnType<typeof useGetAllPostLazyQuery>;
export type GetAllPostQueryResult = Apollo.QueryResult<GetAllPostQueryResponse, GetAllPostQueryVariables>;
