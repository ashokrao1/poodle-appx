export const REGEX_VAR = /^[_a-zA-Z][_a-zA-Z0-9]*$/

export const classes = {
  // all classes
  // string
  'string': {
    literals: [
      'JS_STRING_LITERAL',
    ],
    types: [
      'js/string',
    ],
    // icon: 'app-x/icon.Text',
  },
  // number
  'number': {
    literals: [
      'JS_NUMBER_LITERAL',
    ],
    types: [
      'js/number',
    ],
    // icon: '@ant-design/icons.NumberOutlined',
  },
  // boolean
  'boolean': {
    literals: [
      'JS_BOOLEAN_LITERAL',
    ],
    types: [
      'js/boolean',
    ],
    // icon: '@ant-design/icons.PoweroffOutlined',
  },
  // null
  'null': {
    literals: [
      'JS_NULL_LITERAL',
    ],
    types: [
      'js/null',
    ],
    // icon: '@ant-design/icons.MinusCircleOutlined',
  },
  // primitive
  'primitive': {
    classes: [
      'string',
      'number',
      'boolean',
      'null',
    ],
    // icon: '@ant-design/icons.MoreOutlined',
  },
  // array
  'array': {
    literals: [
      'JS_ARRAY_LITERAL',
    ],
    types: [
      'js/array',
    ],
    // icon: 'app-x/icon.Bracket',
  },
  // object
  'object': {
    literals: [
      'JS_OBJECT_LITERAL',
    ],
    types: [
      'js/object',
    ],
    // icon: 'app-x/icon.CurlyBracket',
  },
  // expression
  'expression': {
    classes: [
      'primitive',
      'array',
      'object',
      'jsx',
    ],
    types: [
      'js/string',
      'js/number',
      'js/boolean',
      'js/null',
      'js/array',
      'js/object',
      'js/import',
      'js/expression',
      'js/function',
      'js/call',
      'js/switch',
      'js/map',
      'js/reduce',
      'js/filter',
      'react/state',
      'react/context',
      'mui/style',
      'mui/theme',
      'route/context',
      'appx/route',
    ],
    // icon: '@ant-design/icons.PercentageOutlined'
  },
  // statement
  'statement': {
    types: [
      'js/statement',
      'react/state',
      'react/context',
      'react/effect',
      // 'js/function',
      // 'js/variable',
      // 'js/call',
      // 'js/return',
      'js/switch',
      'js/map',
      'appx/api',
    ],
    // icon: 'app-x/icon.Code'
  },
  // jsx
  'jsx': {
    classes: [
      'primitive',
    ],
    types: [
      'react/element',
      'react/html',
      'react/form',
      'input/text',
      'input/switch',
      'input/select',
      'react/table',
      'js/expression',
      'js/map',
      'js/switch',
      'js/reduce',
      'js/filter',
      'route/path',
    ],
    // icon: 'app-x/icon.React'
  },
  // any
  'any': {
    classes: [
      'primitive',
      'array',
      'object',
      'expression',
      'statement',
    ],
    // icon: '@ant-design/icons.MenuOutlined'
  }
}

export default classes
