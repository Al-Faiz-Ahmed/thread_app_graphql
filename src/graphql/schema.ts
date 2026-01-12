import { gql } from 'graphql-tag'
import type { TypeSource } from '@graphql-tools/utils'
import { moduleTypeDefs } from './modules'

const typeDefs = gql`
  type Query
  type Mutation
`

export const schemaTypeDefs: TypeSource = [
  typeDefs,
  ...moduleTypeDefs,
]
