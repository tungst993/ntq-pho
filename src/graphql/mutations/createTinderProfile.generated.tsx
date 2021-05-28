import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type CreateTinderProfileMutationVariables = Types.Exact<{
  input: Types.CreateTinderProfileDto;
}>;

export type CreateTinderProfileMutationResponse = { __typename?: 'Mutation' } & {
  createTinderProfile: { __typename?: 'TinderProfile' } & Pick<
    Types.TinderProfile,
    'id' | 'images' | 'gender' | 'target' | 'intro' | 'userId' | 'createdAt' | 'updatedAt'
  >;
};

export const CreateTinderProfileDocument = gql`
  mutation createTinderProfile($input: CreateTinderProfileDto!) {
    createTinderProfile(input: $input) {
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
export function useCreateTinderProfileMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateTinderProfileMutationResponse, CreateTinderProfileMutationVariables>,
) {
  return Apollo.useMutation<CreateTinderProfileMutationResponse, CreateTinderProfileMutationVariables>(
    CreateTinderProfileDocument,
    baseOptions,
  );
}
export type CreateTinderProfileMutationHookResult = ReturnType<typeof useCreateTinderProfileMutation>;
export type CreateTinderProfileMutationResult = Apollo.MutationResult<CreateTinderProfileMutationResponse>;
export type CreateTinderProfileMutationOptions = Apollo.BaseMutationOptions<
  CreateTinderProfileMutationResponse,
  CreateTinderProfileMutationVariables
>;
