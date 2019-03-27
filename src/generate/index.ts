import ts from 'typescript'
import { SchemaIR } from '../transform/SchemaIR'
import { DocumentIR } from '../transform/DocumentIR'
import { OperationIR } from '../transform/OperationIR'
import { generateOperation } from './Operation'
import prettier from 'prettier'
import { generateImport } from './Import'
import { generateHelperTypes } from './HelperTypes'
import { generateScalarTypeAlias } from './ScalarType'
import { ScalarTypeIR } from '../transform/ScalarTypeIR'
import { InputObjectTypeIR } from '../transform/InputObjectTypeIR'
import { generateInputObjectTypeAsInterface } from './InputObjectType'

export async function generateCode(
  schema: SchemaIR,
  document: DocumentIR,
  sourceCode: string
): Promise<string> {
  return await cleanup(
    [
      printHeader(),
      printScalarTypes(schema),
      printInputTypes(schema),
      printOperations(schema, document, sourceCode),
      printHelperTypes(),
    ].join('\n\n')
  )
}

const sourceFile = ts.createSourceFile('', '', ts.ScriptTarget.Latest)
const printer = ts.createPrinter()
function print(t: any) {
  return printer.printNode(ts.EmitHint.Unspecified, t, sourceFile)
}

function printScalarTypes(schema: SchemaIR): string {
  return (
    '// Scalar Types\n' +
    Object.values(schema.types)
      .filter((it) => it && it.kind == 'scalar')
      .map((it) => it as ScalarTypeIR)
      .map((it) => generateScalarTypeAlias(it))
      .map(print)
      .join('\n')
  )
}

function printInputTypes(schema: SchemaIR): string {
  return (
    '// Input Types\n' +
    Object.entries(schema.types)
      .map(([typename, type]) => ({ typename, type }))
      .filter((it) => it.type && it.type.kind == 'inputObject')
      .map((it) =>
        generateInputObjectTypeAsInterface(
          schema,
          it.type as InputObjectTypeIR,
          it.typename
        )
      )
      .map(print)
      .join('\n')
  )
}

function printOperations(
  schema: SchemaIR,
  document: DocumentIR,
  sourceCode: string
) {
  return (
    '// Operations\n' +
    document.operations
      .map((it) => generateOperation(it, schema, sourceCode))
      .map(print)
      .join('\n')
  )
}

function printHeader() {
  return (
    '// This file is generated by a tool. All changes will be overwritten.\n' +
    [generateImport('graphql-tag', 'gql')].map(print).join('\n')
  )
}

function printHelperTypes() {
  return (
    '// Helper types\n' +
    generateHelperTypes()
      .map(print)
      .join('\n')
  )
}

async function cleanup(code: string) {
  const prettierConfig = await prettier.resolveConfig(process.cwd())
  return prettier.format(code, {
    ...prettierConfig,
    parser: 'typescript',
  })
}
