import { GraphQLError } from 'graphql'
import { ValidationError } from './validation-error'

export function formatGraphQLError(error: any) {
  const original = error.originalError

  if (original instanceof ValidationError) {
    return new GraphQLError(original.message, {
      extensions: {
        code: original.code,
      },
    })
  }

  // Unknown / system error
  console.error('INTERNAL_GRAPHQL_ERROR', error)

  return new GraphQLError('Internal server error', {

    extensions: {
      code: 'INTERNAL_SERVER_ERROR',
    },
  })
}
