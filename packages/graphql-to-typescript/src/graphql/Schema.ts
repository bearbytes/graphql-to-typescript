import { loadIntrospection } from './Introspection'
import { buildClientSchema, buildSchema } from 'graphql'
import { readFile } from 'fs-extra'

export async function loadSchema(
  uri: string,
  headers?: Record<string, string>
) {
  if (uri.endsWith('.gql') || uri.endsWith('.graphql')) {
    return loadSchemaFromFile(uri)
  }

  // todo: This function expects a complete introspection result. Don't forget to check the "errors" field of a server response before calling this function.
  const introspection = await loadIntrospection(uri, headers)
  return buildClientSchema(introspection, { assumeValid: true })
}

async function loadSchemaFromFile(filePath: string) {
  const fileContent = await readFile(filePath, { encoding: 'utf8' })
  return buildSchema(fileContent)
}
