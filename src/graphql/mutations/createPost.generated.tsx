import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type CreatePostMutationVariables = Types.Exact<{
  input: Types.CreatePostInput;
}>;

export type CreatePostMutationResponse = { __typename?: 'Mutation' } & {
  createPost: { __typename?: 'Post' } & Pick<
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
    };
};

export const CreatePostDocument = gql`
  mutation createPost($input: CreatePostInput!) {
    createPost(input: $input) {
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
    }
  }
`;
export function useCreatePostMutation(
  baseOptions?: Apollo.MutationHookOptions<CreatePostMutationResponse, CreatePostMutationVariables>,
) {
  return Apollo.useMutation<CreatePostMutationResponse, CreatePostMutationVariables>(CreatePostDocument, baseOptions);
}
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutationResponse>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<
  CreatePostMutationResponse,
  CreatePostMutationVariables
>;
