import gql from 'graphql-tag'
type __typed_query<D, V> = any
type __typed_mutation<D, V> = any
type __typed_subscription<D, V> = any
const testScalars: __typed_query<any, unknown> = gql`
  query testScalars {
    scalarString
    scalarInt
    scalarFloat
    scalarBoolean
    scalarID
    scalarCustom
    renamedString: scalarString
  }
`