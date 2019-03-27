import ts from 'typescript'
import { SchemaIR } from '../transform/SchemaIR'
import { FieldSelectionIR, SelectionSetIR } from '../transform/SelectionIR'
import { ObjectTypeIR } from '../transform/ObjectTypeIR'
import { generateType } from './Type'

export function generateObjectType(
  schema: SchemaIR,
  schemaType: ObjectTypeIR,
  selectionSet?: SelectionSetIR,
  typename?: string
) {
  if (selectionSet == null) {
    throw 'expected ObjectType to have a SelectionSet'
  }

  let properties = selectionSet.fields.map(generateProperty)
  if (typename) {
    properties = [generateTypenameProperty(typename), ...properties]
  }

  return ts.createTypeLiteralNode(properties)

  function generateTypenameProperty(typename: string) {
    return ts.createPropertySignature(
      undefined,
      ts.createIdentifier('__typename'),
      undefined,
      ts.createLiteralTypeNode(ts.createLiteral(typename)),
      undefined
    )
  }

  function generateProperty(selection: FieldSelectionIR) {
    let fieldType = schemaType.fields[selection.schemaName]
    while (fieldType.kind == 'namedType') {
      fieldType = schema.types[fieldType.typename]
    }

    return ts.createPropertySignature(
      undefined,
      ts.createIdentifier(selection.name),
      undefined,
      generateType(schema, fieldType, selection.selectionSet),
      undefined
    )
  }
}