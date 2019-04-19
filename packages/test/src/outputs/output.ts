// This file is generated by a tool. All changes will be overwritten.
import { Operation } from '@bearbytes/graphql-to-typescript'

// Scalar Types
export type String = string
export type Int = number
export type Float = number
export type Boolean = boolean
export type ID = string
export type CustomScalar = string

// Fragment Types
export type ObjectTypeFields = {
  __typename: 'ObjectType'
  scalar: null | Boolean
}

// Input Types
export interface InputType {
  recursive: null | InputType
  nested: null | NestedInputType
  scalar: null | Boolean
  list: null | ReadonlyArray<String>
}
export interface NestedInputType {
  scalar: null | Int
}

// Operations
export default {
  simpleQuery: `query simpleQuery {\n  scalarString\n}` as Operation<
    'query',
    {},
    {
      scalarString: null | String
    }
  >,
  testScalars: `query testScalars {\n  scalarString\n  scalarInt\n  scalarFloat\n  scalarBoolean\n  scalarID\n  scalarCustom\n\n  renamedString: scalarString\n}` as Operation<
    'query',
    {},
    {
      scalarString: null | String
      scalarInt: null | Int
      scalarFloat: null | Float
      scalarBoolean: null | Boolean
      scalarID: null | ID
      scalarCustom: null | CustomScalar
      renamedString: null | String
    }
  >,
  testNullability: `query testNullability {\n  nullableBoolean\n  nonNullableBoolean\n}` as Operation<
    'query',
    {},
    {
      nullableBoolean: null | Boolean
      nonNullableBoolean: Boolean
    }
  >,
  testNesting: `query testNesting {\n  nestedObject {\n    recursive {\n      recursive {\n        scalar\n      }\n    }\n    nested {\n      scalar\n    }\n    scalar\n    list\n  }\n}` as Operation<
    'query',
    {},
    {
      nestedObject:
        | null
        | ({
            recursive:
              | null
              | ({
                  recursive:
                    | null
                    | ({
                        scalar: null | Boolean
                      })
                })
            nested:
              | null
              | ({
                  scalar: null | Int
                })
            scalar: null | Boolean
            list: null | ReadonlyArray<String>
          })
    }
  >,
  testUnion: `query testUnion {\n  union {\n    ... on Tomato {\n      id\n      color\n    }\n    ... on Potato {\n      id\n      origin\n    }\n  }\n}` as Operation<
    'query',
    {},
    {
      union:
        | null
        | (
            | ({
                __typename: 'Tomato'
                id: null | ID
                color: null | String
              })
            | ({
                __typename: 'Potato'
                id: null | ID
                origin: null | String
              }))
    }
  >,
  testMethods: `query testMethods(\n  $reqParam: String!\n  $optParam: Float!\n  $input: InputType\n  $list2: [CustomScalar!]!\n) {\n  method(requiredParam: $reqParam, optionalParam: $optParam, input: $input)\n  renamedMethod: method2(list2: $list2)\n}` as Operation<
    'query',
    {
      reqParam: String
      optParam: Float
      input: null | InputType
      list2: ReadonlyArray<CustomScalar>
    },
    {
      method: null | CustomScalar
      renamedMethod: null | ReadonlyArray<null | CustomScalar>
    }
  >,
  testScalarsMutation: `mutation testScalarsMutation {\n  scalarString\n  scalarInt\n  scalarFloat\n  scalarBoolean\n  scalarID\n  scalarCustom\n\n  renamedString: scalarString\n}` as Operation<
    'mutation',
    {},
    {
      scalarString: null | String
      scalarInt: null | Int
      scalarFloat: null | Float
      scalarBoolean: null | Boolean
      scalarID: null | ID
      scalarCustom: null | CustomScalar
      renamedString: null | String
    }
  >,
  testNullabilityMutation: `mutation testNullabilityMutation {\n  nullableBoolean\n  nonNullableBoolean\n}` as Operation<
    'mutation',
    {},
    {
      nullableBoolean: null | Boolean
      nonNullableBoolean: Boolean
    }
  >,
  testNestingMutation: `mutation testNestingMutation {\n  nestedObject {\n    recursive {\n      recursive {\n        scalar\n      }\n    }\n    nested {\n      scalar\n    }\n    scalar\n    list\n  }\n}` as Operation<
    'mutation',
    {},
    {
      nestedObject:
        | null
        | ({
            recursive:
              | null
              | ({
                  recursive:
                    | null
                    | ({
                        scalar: null | Boolean
                      })
                })
            nested:
              | null
              | ({
                  scalar: null | Int
                })
            scalar: null | Boolean
            list: null | ReadonlyArray<String>
          })
    }
  >,
  testMethodsMutation: `mutation testMethodsMutation(\n  $reqParam: String!\n  $optParam: Float!\n  $input: InputType\n  $list2: [CustomScalar!]!\n) {\n  method(requiredParam: $reqParam, optionalParam: $optParam, input: $input)\n  renamedMethod: method2(list2: $list2)\n}` as Operation<
    'mutation',
    {
      reqParam: String
      optParam: Float
      input: null | InputType
      list2: ReadonlyArray<CustomScalar>
    },
    {
      method: null | CustomScalar
      renamedMethod: null | ReadonlyArray<null | CustomScalar>
    }
  >,
  testFragments: `query testFragments {\n  nestedObject {\n    ...ObjectTypeFields\n  }\n}\nfragment ObjectTypeFields on ObjectType {\n  scalar\n}` as Operation<
    'query',
    {},
    {
      nestedObject: null | (ObjectTypeFields & {})
    }
  >,
}
