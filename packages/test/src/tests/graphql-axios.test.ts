import typedGraphQL from '../outputs/output'
import { createClient } from '@bearbytes/graphql-axios'
import {
  Query,
  OperationData,
  Mutation,
  Subscription,
  OperationVariables,
} from '@bearbytes/graphql-to-typescript'
import { startServer } from '../graphql-server'

const client = createClient(typedGraphQL, {
  url: 'http://localhost:5000',
})

test('simple query', async () => {
  const response = await client.query({ operationName: 'simpleQuery' })
  expect(response).toMatchSnapshot()
})
