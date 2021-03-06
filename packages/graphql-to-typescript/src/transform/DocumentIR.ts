import {
  DocumentNode,
  DefinitionNode,
  OperationDefinitionNode,
  FragmentDefinitionNode,
} from 'graphql'
import { OperationIR, transformOperation } from './OperationIR'
import { FragmentIR, transformFragment } from './FragmentIR'

export interface DocumentIR {
  operations: OperationIR[]
  fragments: FragmentIR[]
  sourceCode: string
}

export function transformDocument(
  T: DocumentNode,
  sourceCode: string
): DocumentIR {
  return {
    operations: T.definitions
      .filter((it) => it.kind == 'OperationDefinition')
      .map((it) => it as OperationDefinitionNode)
      .map(transformOperation),
    fragments: T.definitions
      .filter((it) => it.kind == 'FragmentDefinition')
      .map((it) => it as FragmentDefinitionNode)
      .map(transformFragment),
    sourceCode,
  }
}
