import ts from 'typescript'
import { SchemaIR } from '../transform/SchemaIR'
import { DocumentIR } from '../transform/DocumentIR'
import { generateOperations } from './Operation'
import prettier from 'prettier'
import { generateImport } from './Import'
import { generateScalarTypeAlias } from './ScalarType'
import { ScalarTypeIR } from '../transform/ScalarTypeIR'
import { InputObjectTypeIR } from '../transform/InputObjectTypeIR'
import { generateInputObjectTypeAsInterface } from './InputObjectType'
import { generateFragment } from './Fragment'

export async function generateCode(
  schema: SchemaIR,
  document: DocumentIR,
  sourceCode: string
): Promise<string> {
  return await cleanup(
    [
      printHeader(),
      printScalarTypes(schema),
      printFragmentTypes(schema, document),
      printInputTypes(schema),
      printOperations(schema, document, sourceCode),
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
      .map(generateScalarTypeAlias)
      .map(print)
      .join('\n')
  )
}

function printFragmentTypes(schema: SchemaIR, document: DocumentIR): string {
  if (document.fragments.length == 0) return ''

  return (
    '// Fragment Types\n' +
    document.fragments
      .map((it) => generateFragment(schema, it))
      .map(print)
      .join('\n')
  )
}

function printInputTypes(schema: SchemaIR): string {
  const inputTypes = Object.entries(schema.types)
    .map(([typename, type]) => ({ typename, type }))
    .filter((it) => it.type && it.type.kind == 'inputObject')

  if (inputTypes.length == 0) return ''

  return (
    '// Input Types\n' +
    inputTypes
      .map((it) => {
        return generateInputObjectTypeAsInterface(
          schema,
          it.type as InputObjectTypeIR,
          it.typename
        )
      })
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
    [generateOperations(schema, document, sourceCode)].map(print).join('\n')
  )
}

function printHeader() {
  return (
    '// This file is generated by a tool. All changes will be overwritten.\n' +
    [generateImport('@bearbytes/graphql-to-typescript', undefined, 'Operation')]
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
