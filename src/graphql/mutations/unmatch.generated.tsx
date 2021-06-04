import type * as Types from '../type.interface';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type UnmatchMutationVariables = Types.Exact<{
  id: Types.Scalars['Float'];
}>;

export type UnmatchMutationResponse = { __typename?: 'Mutation' } & Pick<Types.Mutation, 'unmatch'>;

export const UnmatchDocument = gql`
  mutation unmatch($id: Float!) {
    unmatch(id: $id)
  }
`;
export function useUnmatchMutation(
  baseOptions?: Apollo.MutationHookOptions<UnmatchMutationResponse, UnmatchMutationVariables>,
) {
  return Apollo.useMutation<UnmatchMutationResponse, UnmatchMutationVariables>(UnmatchDocument, baseOptions);
}
export type UnmatchMutationHookResult = ReturnType<typeof useUnmatchMutation>;
export type UnmatchMutationResult = Apollo.MutationResult<UnmatchMutationResponse>;
export type UnmatchMutationOptions = Apollo.BaseMutationOptions<UnmatchMutationResponse, UnmatchMutationVariables>;
