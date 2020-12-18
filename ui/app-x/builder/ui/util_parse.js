import React from 'react'
import {
  Icon,
  FileOutlined,
  FileTextOutlined,
  ContainerOutlined,
  CodepenOutlined,
  SwitcherOutlined,
  QuestionCircleOutlined,
  QuestionOutlined,
  FieldStringOutlined,
  NumberOutlined,
  SmallDashOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  MenuOutlined,
  ApartmentOutlined,
  PercentageOutlined,
  ImportOutlined,
  FunctionOutlined,
  FontSizeOutlined,
  DatabaseOutlined,
  UngroupOutlined,
  SisternodeOutlined,
  PoweroffOutlined,
  MinusCircleOutlined,
  FormatPainterOutlined,
} from '@ant-design/icons'
import {
  // FunctionOutlined as FunctionOutlinedIcon,
  AllOutOutlined,
} from '@material-ui/icons'
import { v4 as uuidv4 } from 'uuid'

import ReactIcon from 'app-x/icon/React'
// import ReactSvg from 'app-x/icon/react.svg'

const PATH_SEPARATOR = '/'
const VARIABLE_SEPARATOR = '.'


////////////////////////////////////////////////////////////////////////////////
// primitive test
function isPrimitive(test) {
    return (test !== Object(test))
}

// parse variable full path
function parse_var_full_path(var_full_path) {

  let import_paths = var_full_path.split(PATH_SEPARATOR)
  let sub_vars = import_paths[import_paths.length - 1].split(VARIABLE_SEPARATOR)

  // add first sub_var to import_path
  import_paths[import_paths.length - 1] = sub_vars.shift()

  return {
    full_paths: [].concat(import_paths, sub_vars),
    import_paths: import_paths,
    sub_vars: sub_vars
  }
}

////////////////////////////////////////////////////////////////////////////////

// lookup icon by type
function lookup_icon_for_type(type) {
  return lookup_icon_for_input({type: type, data: ''})
}

// lookup icon for input (input.type)
function lookup_icon_for_input(input) {

  function _primitive_icon(data) {
    switch (typeof data) {
      case 'string':
        return <FontSizeOutlined />
      case 'number':
        return <NumberOutlined />
      case 'boolean':
        return <PoweroffOutlined />
      case 'object':
        if (input === null) {
          return <MinusCircleOutlined />
        } else {
          throw new Error(`ERROR: input is not primitive [${typeof input}] [${JSON.stringify(input)}]`)
        }
      default:
        throw new Error(`ERROR: input is not primitive [${typeof input}] [${JSON.stringify(input)}]`)
    }
  }

  if (isPrimitive(input)) {
    return _primitive_icon(input)
  }

  if (Array.isArray(input)) {
    return <MenuOutlined />
  }

  if (! ('type' in input)) {
    return <ApartmentOutlined />
  }

  // 'type' is presented in the json object
  if (input.type === 'js/primitive') {

    return _primitive_icon(input.data)

  } else if (input.type === 'js/array') {

    return  <MenuOutlined />

  } else if (input.type === 'js/object') {

    return <ApartmentOutlined />

  } else if (input.type === 'js/import') {

    return <ImportOutlined />

  } else if (input.type === 'js/expression') {

    return <PercentageOutlined />

  } else if (input.type === 'js/block') {

    return <CodepenOutlined />

  } else if (input.type === 'js/function') {

    return <FunctionOutlined />

  } else if (input.type === 'js/switch') {

    return <SisternodeOutlined />

  } else if (input.type === 'js/map') {

    return <SwapOutlined />

  } else if (input.type === 'js/reduce') {

    return <FullscreenExitOutlined />

  } else if (input.type === 'js/filter') {

    return <FilterOutlined />

  } else if (input.type === 'react/element') {

    return <ReactIcon />

  } else if (input.type === 'react/html') {

    return <ContainerOutlined />

  } else if (input.type === 'react/state') {

    return <DatabaseOutlined />

  } else if (input.type === 'react/effect') {

    return <UngroupOutlined />

  } else if (input.type === 'mui/style') {

    return <FormatPainterOutlined />

  } else if (input.type === 'mui/control') {

    // TODO
    throw new Error(`ERROR: unsupported input.type [${input.type}]`)

  } else if (input.type === 'appx/route') {

    return <AllOutOutlined />

  } else {

    return <QuestionOutlined />
  }
}

// lookup title for input (input.type / input.name / input.data ...)
function lookup_title_for_input(ref, input) {

  const prefix = ref ? ref + ': ' : ''

  function _primitive_title(data) {
    switch (typeof data) {
      case 'string':
        return prefix + (data.length > 32 ? data.substring(0, 30) + '...' : data)
      case 'number':
        return prefix + data.toString()
      case 'boolean':
        return prefix + data.toString()
      case 'object':
        if (input === null) {
          return prefix + 'null'
        } else {
          throw new Error(`ERROR: input is not primitive [${typeof input}] [${JSON.stringify(input)}]`)
        }
      default:
        throw new Error(`ERROR: input is not primitive [${typeof input}] [${JSON.stringify(input)}]`)
    }
  }

  if (isPrimitive(input)) {
    return _primitive_title(input)
  }

  if (Array.isArray(input)) {
    return ref ? ref : ''
  }

  if (! ('type' in input)) {
    return ref ? ref : ''
  }

  // 'type' is presented in the json object
  if (input.type === 'js/primitive') {

    return _primitive_title(input.data)

  } else if (input.type === 'js/array') {

    return ref ? ref : ''

  } else if (input.type === 'js/object') {

    return ref ? ref : ''

  } else if (input.type === 'js/import') {

    const parsed = parse_var_full_path(input.name)
    return prefix + parsed.full_paths.pop()

  } else if (input.type === 'js/expression') {

    return prefix + (input.data.length > 32 ? input.data.substring(0, 30) + '...' : input.data)

  } else if (input.type === 'js/block') {

    return prefix + (input.data.length > 32 ? input.data.substring(0, 30) + '...' : input.data)

  } else if (input.type === 'js/function') {

    return prefix + 'function(' + (input.params ? input.params.join(', ') : '') +  ')'

  } else if (input.type === 'js/switch') {

    return prefix + 'Switch'

  } else if (input.type === 'js/map') {

    return prefix + 'Map'

  } else if (input.type === 'js/reduce') {

    return prefix + 'Reduce'

  } else if (input.type === 'js/filter') {

    return prefix + 'Filter'

  } else if (input.type === 'react/element') {

    const parsed = parse_var_full_path(input.name)
    return prefix + parsed.full_paths.pop()

  } else if (input.type === 'react/html') {

    const parsed = parse_var_full_path(input.name)
    return prefix + parsed.full_paths.pop()

  } else if (input.type === 'react/state') {

    return prefix + input.name

  } else if (input.type === 'react/effect') {

    return prefix + (input.data.length > 32 ? input.data.substring(0, 30) + '...' : input.data)

  } else if (input.type === 'mui/style') {

    return ref ? ref : ''

  } else if (input.type === 'mui/control') {

    // TODO
    throw new Error(`ERROR: unsupported input.type [${input.type}]`)

  } else if (input.type === 'appx/route') {

    return ref ? ref : ''

  } else {

    return ref ? ref : ''
  }
}

// create new node
function new_js_node(title, icon, data, parentKey, isLeaf) {
  return {
    key: uuidv4(),
    parentKey: parentKey,
    title: title ? title : (data ? (data.__ref ? data.__ref : '') : ''),
    data: data ? data : null,
    icon: icon ? icon : <QuestionOutlined />,
    isLeaf: isLeaf ? true : false,
    children: isLeaf ? null : [],
  }
}

////////////////////////////////////////////////////////////////////////////////
// processors

// create primitive tree node
function parse_js_primitive(js_context, parentKey, ref, input) {

  const prefix = ref ? ref + ': ' : ''

  // tree node data
  const data = {
    __ref: ref,
    type: 'js/primitive',
    data: input,
  }

  switch (typeof input) {
    case 'string':
      return new_js_node(
        lookup_title_for_input(ref, input),
        lookup_icon_for_input(input),
        data,
        parentKey,
        true)
    case 'number':
      return new_js_node(
        lookup_title_for_input(ref, input),
        lookup_icon_for_input(input),
        data,
        parentKey,
        true)
    case 'boolean':
      return new_js_node(
        lookup_title_for_input(ref, input),
        lookup_icon_for_input(input),
        data,
        parentKey,
        true)
    case 'object':
      if (input === null) {
        return new_js_node(
          lookup_title_for_input(ref, input),
          lookup_icon_for_input(input),
          data,
          parentKey,
          true)
      } else {
        throw new Error(`ERROR: input is not primitive [${typeof input}] [${JSON.stringify(input)}]`)
      }
    default:
      throw new Error(`ERROR: input is not primitive [${typeof input}] [${JSON.stringify(input)}]`)
  }
}

// return array tree
function parse_js_array(js_context, parentKey, ref, input) {

  if (isPrimitive(input)) {
    throw new Error(`ERROR: input is primitive [${JSON.stringify(input)}]`)
  }

  if (typeof input !== 'object') {
    throw new Error(`ERROR: input is not object [${typeof input}] [${JSON.stringify(input)}]`)
  }

  if (!Array.isArray(input)) {
    throw new Error(`ERROR: input is not array [${typeof input}] [${JSON.stringify(input)}]`)
  }

  // tree node data
  const data = {
    __ref: ref,
    __childrenWithRef: {
      enable: false
    },
    __childrenWithoutRef: {
      enable: true
    },
    type: 'js/array',
  }

  const node = new_js_node(
    lookup_title_for_input(ref, input),
    lookup_icon_for_input(input),
    data,
    parentKey,
    false)

  // do not expand array by default
  // js_context.expandedKeys.push(node.key)

  if (js_context.topLevel) {

    input.map(item => {
      node.children.push(
        parse_js(
          {
            ...js_context,
            topLevel: false,
          },
          null,
          null,
          item
        )
      )
    })

    // return node with children
    return node

  } else {
    node.children = input.map(item => {
      return parse_js(
        js_context,
        node.key,
        null,
        item
      )
    })

    return node
  }
}

// create object tree
function parse_js_object(js_context, parentKey, ref, input) {

  if (isPrimitive(input)) {
    throw new Error(`ERROR: input is primitive [${JSON.stringify(input)}]`)
  }

  if (typeof input !== 'object') {
    throw new Error(`ERROR: input is not object [${typeof input}] [${JSON.stringify(input)}]`)
  }

  if (Array.isArray(input)) {
    throw new Error(`ERROR: input is array [${typeof input}] [${JSON.stringify(input)}]`)
  }

  // tree node data
  const data = {
    __ref: ref,
    __childrenWithRef: {
      enable: true
    },
    __childrenWithoutRef: {
      enable: false
    },
    type: 'js/object',
  }

  const node = new_js_node(
    lookup_title_for_input(ref, input),
    lookup_icon_for_input(input),
    data,
    parentKey,
    false)

  // do not expand object by default
  // js_context.expandedKeys.push(node.key)

  if (js_context.topLevel) {
    // return children only
    const results = []
    Object.keys(input).map(key => {
      results.push(
        parse_js(
          {
            ...js_context,
            topLevel: false,
          },
          null,
          key,
          input[key]
        )
      )
    })

    return results
  } else {
    // return node with children
    Object.keys(input).map(key => {
      node.children.push(
        parse_js(
          js_context,
          node.key,
          key,
          input[key]
        )
      )
    })

    return node
  }
}

// create import tree node
function parse_js_import(js_context, parentKey, ref, input) {

  if (!('type' in input) || input.type !== 'js/import') {
    throw new Error(`ERROR: input.type is not [js/import] [${input.type}] [${JSON.stringify(input)}]`)
  }

  if (! ('name' in input)) {
    throw new Error(`ERROR: input.name missing in [js/import] [${JSON.stringify(input)}]`)
  }

  // tree node data
  const data = {
    __ref: ref,
    type: input.type,
    name: input.name,
  }

  const node = new_js_node(
    lookup_title_for_input(ref, input),
    lookup_icon_for_input(input),
    data,
    parentKey,
    true)

  return node
}

// create expression tree node
function parse_js_expression(js_context, parentKey, ref, input) {

  if (!('type' in input) || input.type !== 'js/expression') {
    throw new Error(`ERROR: input.type is not [js/expression] [${input.type}] [${JSON.stringify(input)}]`)
  }

  if (! ('data' in input)) {
    throw new Error(`ERROR: input.data missing in [js/expression] [${JSON.stringify(input)}]`)
  }

  // tree node data
  const data = {
    __ref: ref,
    type: input.type,
    data: input.data,
  }

  const node = new_js_node(
    lookup_title_for_input(ref, input),
    lookup_icon_for_input(input),
    data,
    parentKey,
    true)

  return node
}

// create block tree node (allow return outside of function)
function parse_js_block(js_context, parentKey, ref, input) {

  if (!('type' in input) || input.type !== 'js/block') {
    throw new Error(`ERROR: input.type is not [js/block] [${input.type}] [${JSON.stringify(input)}]`)
  }

  if (! ('data' in input)) {
    throw new Error(`ERROR: input.data missing in [js/block] [${JSON.stringify(input)}]`)
  }

  // tree node data
  const data = {
    __ref: ref,
    type: input.type,
    data: input.data,
  }

  // compute title
  const title = lookup_title_for_input(ref, input)

  const node = new_js_node(title, lookup_icon_for_input(input), data, parentKey, true)

  return node
}

// create array function tree node
function parse_js_function(js_context, parentKey, ref, input) {

  if (!('type' in input) || input.type !== 'js/function') {
    throw new Error(`ERROR: input.type is not [js/function] [${input.type}] [${JSON.stringify(input)}]`)
  }

  if (! ('body' in input)) {
    throw new Error(`ERROR: input.body missing in [js/function] [${JSON.stringify(input)}]`)
  }

  // tree node data
  const data = {
    __ref: ref,
    type: input.type,
    params: input.params,
    body: input.body,
  }

  const node = new_js_node(
    lookup_title_for_input(ref, input),
    lookup_icon_for_input(input),
    data,
    parentKey,
    true)

  return node
}

// create switch tree node
function parse_js_switch(js_context, parentKey, ref, input) {

  if (!('type' in input) || input.type !== 'js/switch') {
    throw new Error(`ERROR: input.type is not [js/switch] [${input.type}] [${JSON.stringify(input)}]`)
  }

  if (! ('children' in input)) {
    throw new Error(`ERROR: input.children missing in [js/switch] [${JSON.stringify(input)}]`)
  }

  if (! Array.isArray(input.children)) {
    throw new Error(`ERROR: input.children is not Array [${JSON.stringify(input)}]`)
  }

  // tree node data
  const data = {
    __ref: ref,
    __childrenWithRef: {
      enable: true,
      validRefs: [ 'default' ],
    },
    __childrenWithoutRef: {
      enable: true,
      extraProps: [ 'condition' ],
    },
    type: input.type,
  }

  const node = new_js_node(
    lookup_title_for_input(ref, input),
    lookup_icon_for_input(input),
    data,
    parentKey,
    false)

  // expand switch by default
  js_context.expandedKeys.push(node.key)

  // add each conditions and results
  input.children.map(child => {

    if (! ('condition' in child)) {
      throw new Error(`ERROR: [js/switch] child missing [condition] [${JSON.stringify(child)}]`)
    }
    if (! ('result' in child)) {
      throw new Error(`ERROR: [js/switch] child missing [result] [${JSON.stringify(child)}]`)
    }

    // process result as child node
    const childNode = parse_js(
      {
        ...js_context,
        topLevel: false,
      },
      node.key,
      null,
      child.result
    )
    // add condition data to childNode
    childNode.data.condition = child.condition

    node.children.push(childNode)
  })

  // add default if exist
  if (input.default) {
    node.children.push(
      parse_js(
        {
          ...js_context,
          topLevel: false,
        },
        node.key,
        'default',
        input.default ? input.default : null
      )
    )
  }

  return node
}

// create js map tree node
function parse_js_map(js_context, parentKey, ref, input) {

  if (!('type' in input) || input.type !== 'js/map') {
    throw new Error(`ERROR: input.type is not [js/map] [${input.type}] [${JSON.stringify(input)}]`)
  }

  if (! ('data' in input)) {
    throw new Error(`ERROR: input.data missing in [js/map] [${JSON.stringify(input)}]`)
  }

  if (! ('result' in input)) {
    throw new Error(`ERROR: input.result missing in [js/map] [${JSON.stringify(input)}]`)
  }

  // tree node data
  const data = {
    __ref: ref,
    __childrenWithRef: {
      enable: true,
      validRefs: [ 'data', 'result' ],
    },
    __childrenWithoutRef: {
      enable: false,
    },
    type: input.type,
  }

  const node = new_js_node(
    lookup_title_for_input(ref, input),
    lookup_icon_for_input(input),
    data,
    parentKey,
    false)

  // expand map by default
  js_context.expandedKeys.push(node.key)

  // add input.data
  node.children.push(
    parse_js(
      {
        ...js_context,
        topLevel: false,
      },
      node.key,
      'data',
      input.data
    )
  )

  // add input.result
  node.children.push(
    parse_js(
      {
        ...js_context,
        topLevel: false,
      },
      node.key,
      'result',
      input.result
    )
  )

  return node
}

// create js reduce tree node
function parse_js_reduce(js_context, parentKey, ref, input) {

  if (!('type' in input) || input.type !== 'js/reduce') {
    throw new Error(`ERROR: input.type is not [js/reduce] [${input.type}] [${JSON.stringify(input)}]`)
  }

  if (! ('data' in input)) {
    throw new Error(`ERROR: input.data missing in [js/reduce] [${JSON.stringify(input)}]`)
  }

  if (! ('reducer' in input)) {
    throw new Error(`ERROR: input.reducer missing in [js/reduce] [${JSON.stringify(input)}]`)
  }

  if (! ('init' in input)) {
    throw new Error(`ERROR: input.init missing in [js/reduce] [${JSON.stringify(input)}]`)
  }

  // tree node data
  const data = {
    __ref: ref,
    __childrenWithRef: {
      enable: true,
      validRefs: [ 'data', 'init' ],
    },
    __childrenWithoutRef: {
      enable: false,
    },
    type: input.type,
    reducer: input.reducer,
  }

  const node = new_js_node(
    lookup_title_for_input(ref, input),
    lookup_icon_for_input(input),
    data,
    parentKey,
    false)

  // input filter
  node.data.reducer = input.reducer

  // expand reduce by default
  js_context.expandedKeys.push(node.key)

  // add input.data
  node.children.push(
    parse_js(
      {
        ...js_context,
        topLevel: false,
      },
      node.key,
      'data',
      input.data
    )
  )

  // add input.init
  node.children.push(
    parse_js(
      {
        ...js_context,
        topLevel: false,
      },
      node.key,
      'init',
      input.init
    )
  )

  return node
}

// create js filter tree node
function parse_js_filter(js_context, parentKey, ref, input) {

  if (!('type' in input) || input.type !== 'js/filter') {
    throw new Error(`ERROR: input.type is not [js/filter] [${input.type}] [${JSON.stringify(input)}]`)
  }

  if (! ('data' in input)) {
    throw new Error(`ERROR: input.data missing in [js/filter] [${JSON.stringify(input)}]`)
  }

  if (! ('filter' in input)) {
    throw new Error(`ERROR: input.filter missing in [js/filter] [${JSON.stringify(input)}]`)
  }

  // tree node data
  const data = {
    __ref: ref,
    __childrenWithRef: {
      enable: true,
      validRefs: [ 'data' ],
    },
    __childrenWithoutRef: {
      enable: false,
    },
    type: input.type,
    filter: input.filter,
  }

  const node = new_js_node(
    lookup_title_for_input(ref, input),
    lookup_icon_for_input(input),
    data,
    parentKey,
    false)

  // input filter
  node.data.filter = input.filter

  // expand filter by default
  js_context.expandedKeys.push(node.key)

  // add input.data
  node.children.push(
    parse_js(
      {
        ...js_context,
        topLevel: false,
      },
      node.key,
      'data',
      input.data
    )
  )

  return node
}

// create react element tree node
function parse_react_element(js_context, parentKey, ref, input) {

  if (!('type' in input) || input.type !== 'react/element') {
    throw new Error(`ERROR: input.type is not [react/element] [${input.type}] [${JSON.stringify(input)}]`)
  }

  if (! ('name' in input)) {
    throw new Error(`ERROR: input.name missing in [react/element] [${JSON.stringify(input)}]`)
  }

  // tree node data
  const data = {
    __ref: ref,
    __childrenWithRef: {
      enable: true,
      validRefs: [ 'props' ],
    },
    __childrenWithoutRef: {
      enable: true,
    },
    type: input.type,
    name: input.name,
  }

  const node = new_js_node(
    lookup_title_for_input(ref, input),
    lookup_icon_for_input(input),
    data,
    parentKey,
    false)

  // expand react element by default
  js_context.expandedKeys.push(node.key)

  // add input.props if exist
  if (input.props) {
    node.children.push(
      parse_js(
        {
          ...js_context,
          topLevel: false,
        },
        node.key,
        'props',
        input.props
      )
    )
  }

  // add input.children
  if ('children' in input && input.children) {
    if (!Array.isArray(input.children)) {
      throw new Error(`ERROR: input.children is not Array [${typeof input.children}]`)
    }

    input.children.map(child => {
      node.children.push(
        parse_js(
          {
            ...js_context,
            topLevel: false,
          },
          node.key,
          null,
          child
        )
      )
    })
  }

  return node
}

// create jsx html element ast
function parse_react_html(js_context, parentKey, ref, input) {

  if (!('type' in input) || input.type !== 'react/html') {
    throw new Error(`ERROR: input.type is not [react/html] [${input.type}] [${JSON.stringify(input)}]`)
  }

  if (! ('name' in input)) {
    throw new Error(`ERROR: input.name missing in [react/html] [${JSON.stringify(input)}]`)
  }

  // tree node data
  const data = {
    __ref: ref,
    __childrenWithRef: {
      enable: true,
      validRefs: [ 'props' ],
    },
    __childrenWithoutRef: {
      enable: true,
    },
    type: input.type,
    name: input.name,
  }

  const node = new_js_node(
    lookup_title_for_input(ref, input),
    lookup_icon_for_input(input),
    data,
    parentKey,
    false)

  // expand react html by default
  js_context.expandedKeys.push(node.key)

  // add input.props if exist
  if (input.props) {
    node.children.push(
      parse_js(
        {
          ...js_context,
          topLevel: false,
        },
        node.key,
        'props',
        input.props
      )
    )
  }

  // add input.children
  if ('children' in input && input.children) {
    if (!Array.isArray(input.children)) {
      throw new Error(`ERROR: input.children is not Array [${typeof input.children}]`)
    }

    input.children.map(child => {
      node.children.push(
        parse_js(
          {
            ...js_context,
            topLevel: false,
          },
          node.key,
          null,
          child
        )
      )
    })
  }

  return node
}

// create react state ast
function parse_react_state(js_context, parentKey, ref, input) {

  if (!('type' in input) || input.type !== 'react/state') {
    throw new Error(`ERROR: input.type is not [react/state] [${input.type}] [${JSON.stringify(input)}]`)
  }

  if (! ('name' in input)) {
    throw new Error(`ERROR: input.name missing in [react/state] [${JSON.stringify(input)}]`)
  }

  if (! ('setter' in input)) {
    throw new Error(`ERROR: input.setter missing in [react/state] [${JSON.stringify(input)}]`)
  }

  if (! ('init' in input)) {
    throw new Error(`ERROR: input.init missing in [react/state] [${JSON.stringify(input)}]`)
  }

  // tree node data
  const data = {
    __ref: ref,
    type: input.type,
    name: input.name,
    setter: input.setter,
    init: input.init,
  }

  const node = new_js_node(
    lookup_title_for_input(ref, input),
    lookup_icon_for_input(input),
    data,
    parentKey,
    true)

  return node
}

// create react effect block ast (do not allow return outside of function)
function parse_react_effect(js_context, parentKey, ref, input) {

  if (!('type' in input) || input.type !== 'react/effect') {
    throw new Error(`ERROR: input.type is not [react/effect] [${input.type}] [${JSON.stringify(input)}]`)
  }

  if (! ('data' in input)) {
    throw new Error(`ERROR: input.data missing in [react/effect] [${JSON.stringify(input)}]`)
  }

  // tree node data
  const data = {
    __ref: ref,
    type: input.type,
    data: input.data,
  }

  const node = new_js_node(
    lookup_title_for_input(ref, input),
    lookup_icon_for_input(input),
    data,
    parentKey,
    true)

  return node
}


// create mui style expression
function parse_mui_style(js_context, parentKey, ref, input) {

  if (!('type' in input) || input.type !== 'mui/style') {
    throw new Error(`ERROR: input.type is not [mui/style] [${input.type}] [${JSON.stringify(input)}]`)
  }

  // tree node data
  const data = {
    __ref: ref,
    __childrenWithRef: {
      enable: true,
    },
    __childrenWithoutRef: {
      enable: false,
    },
    type: input.type,
  }

  const node = new_js_node(
    lookup_title_for_input(ref, input),
    lookup_icon_for_input(input),
    data,
    parentKey,
    false)

  // do not expand mui styles by default
  // js_context.expandedKeys.push(node.key)

  // add all styles children
  Object.keys(input).map(key => {
    if (key == 'type') {
      return
    }
    node.children.push(
      parse_js(
        {
          ...js_context,
          topLevel: false,
        },
        node.key,
        key,
        input[key]
      )
    )
  })

  return node
}

// create jsx route ast
function parse_appx_route(js_context, parentKey, ref, input) {

  if (!('type' in input) || input.type !== 'appx/route') {
    throw new Error(`ERROR: input.type is not [appx/route] [${input.type}] [${JSON.stringify(input)}]`)
  }

  // tree node data
  const data = {
    __ref: ref,
    type: input.type,
  }

  const node = new_js_node(
    lookup_title_for_input(ref, input),
    lookup_icon_for_input(input),
    data, parentKey,
    true)

  return node
}

////////////////////////////////////////////////////////////////////////////////

// process input data and return tree data
function parse_js(js_context, parentKey, ref, input) {

  if (! ('expandedKeys' in js_context)) {
    js_context.expandedKeys = []
  }

  if (isPrimitive(input)) {
    return parse_js_primitive(js_context, parentKey, ref, input)
  }

  if (Array.isArray(input)) {
    return parse_js_array(js_context, parentKey, ref, input)
  }

  if (! ('type' in input)) {
    // no 'type' is treated as json object
    return parse_js_object(js_context, parentKey, ref, input)
  }

  // 'type' is presented in the json object
  if (input.type === 'js/primitive') {

    return parse_js_primitive(js_context, parentKey, ref, input.data)

  } else if (input.type === 'js/import') {

    return parse_js_import(js_context, parentKey, ref, input)

  } else if (input.type === 'js/expression') {

    return parse_js_expression(js_context, parentKey, ref, input)

  } else if (input.type === 'js/block') {

    return parse_js_block(js_context, parentKey, ref, input)

  } else if (input.type === 'js/function') {

    return parse_js_function(js_context, parentKey, ref, input)

  } else if (input.type === 'js/switch') {

    return parse_js_switch(js_context, parentKey, ref, input)

  } else if (input.type === 'js/map') {

    return parse_js_map(js_context, parentKey, ref, input)

  } else if (input.type === 'js/reduce') {

    return parse_js_reduce(js_context, parentKey, ref, input)

  } else if (input.type === 'js/filter') {

    return parse_js_filter(js_context, parentKey, ref, input)

  } else if (input.type === 'react/element') {

    return parse_react_element(js_context, parentKey, ref, input)

  } else if (input.type === 'react/html') {

    return parse_react_html(js_context, parentKey, ref, input)

  } else if (input.type === 'react/state') {

    return parse_react_state(js_context, parentKey, ref, input)

  } else if (input.type === 'react/effect') {

    return parse_react_effect(js_context, parentKey, ref, input)

  } else if (input.type === 'mui/style') {

    return parse_mui_style(js_context, parentKey, ref, input)

  } else if (input.type === 'mui/control') {

    // TODO
    throw new Error(`ERROR: unsupported input.type [${input.type}]`)

  } else if (input.type === 'appx/route') {

    return parse_appx_route(js_context, parentKey, ref, input)

  } else {

    throw new Error(`ERROR: unrecognized input.type [${input.type}] [${JSON.stringify(input)}]`)
  }
}

export {
  parse_js,
  lookup_icon_for_type,
  lookup_icon_for_input,
  lookup_title_for_input,
}