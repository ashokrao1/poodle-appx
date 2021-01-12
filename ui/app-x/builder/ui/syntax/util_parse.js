import {
  isPrimitive,
  lookup_type_for_data,
  type_matches_spec,
  data_matches_spec,
} from 'app-x/builder/ui/syntax/util_base'

////////////////////////////////////////////////////////////////////////////////
// utilities

// lookup child by ref
function lookup_child_for_ref(treeNode, ref) {
  // lookup child by ref
  const found = treeNode.children.filter(child => {
    return (child.data?._ref === ref)
  })
  // check if found
  if (found?.length) {
    return found[0]
  } else {
    // not found
    return null
  }
}

// lookup child array by ref
function lookup_child_array_for_ref(treeNode, ref) {
  // lookup child by ref
  const found = treeNode.children
    .filter(child => !!child.data._array)
    .filter(child => {
      return (child.data?._ref === ref)
    })
  // check if found
  if (found?.length) {
    return found
  } else {
    // not found
    return []
  }
}

// remove child by ref
function remove_child_for_ref(treeNode, ref) {
  // lookup child by ref
  treeNode.children = treeNode.children?.filter(child => {
    return (child.data._ref !== ref)
  })
}


////////////////////////////////////////////////////////////////////////////////
// traverse method
function tree_traverse(data, key, callback) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].key === key) {
      return callback(data[i], i, data)
    }
    if (data[i].children) {
      tree_traverse(data[i].children, key, callback)
    }
  }
}

// lookup method
function tree_lookup(data, key) {
  for (let i = 0; i < data.length; i++) {
    // console.log(data[i].key, key)
    if (data[i].key === key) {
      return data[i]
    }
    if (data[i].children && data[i].children.length) {
      const result = tree_lookup(data[i].children, key)
      if (result !== null) {
        return result
      }
    }
  }
  return null
}

////////////////////////////////////////////////////////////////////////////////
// parse tree data
function parse_tree_node(tree_context, treeNode) {

  if (!treeNode) {
    return {
      ref: null,
      data: null,
    }
  }

  // child_context
  const child_context = {
    ...tree_context,
    topLevel: false,
  }

  // topLevel
  if (tree_context.topLevel) {
    // top level must be array
    if (Array.isArray(treeNode)) {
      // return result as object
      const result = {}
      treeNode.map(child => {
        // ignore '/' node
        if (child.key === '/') {
          return
        }
        // process each child
        const childResult = parse_tree_node(
          child_context,
          child
        )
        // add child to result
        if (!!child.data._ref) {
          result[child.data._ref] = childResult
        }
      })
      // log
      // console.log(`parse_tree_node`, result)
      // return
      return {
        ref: null,
        data: result,
      }
    } else {
      return {
        ref: treeNode.data._ref,
        data: parse_tree_node(child_context, treeNode),
      }
    }
  }

  // we are here if we are not top level
  if (!treeNode.data?._type) {
    throw new Error(`ERROR: missing tree node type`)
  } else if (! (treeNode.data._type in globalThis.appx.SPEC.types)) {
    throw new Error(`ERROR: unrecognized tree node type [${treeNode.data._type}]`)
  }

  // get spec
  const classes = globalThis.appx.SPEC.classes
  const spec = globalThis.appx.SPEC.types[treeNode.data._type]

  // create evaluation variables
  // thisNode
  const thisNode = treeNode
  // thisData
  let thisData = {
    _type: treeNode.data._type
  }

  // process children (not including '*')
  spec.children.map((childSpec) => {

    // proces this node
    function _process_this(_ref, nodeData) {
      // node data
      // const nodeData = node.data[_ref]
      // update data if _thisNode is defined
      if (!childSpec?._thisNode) {
        return undefined
      }
      // sanity check
      if (!childSpec._thisNode.class) {
        throw new Error(`ERROR: childSpec._thisNode missing [class] [${JSON.stringify(childSpec._thisNode)}]`)
      } else if (!childSpec._thisNode.input) {
        throw new Error(`ERROR: childSpec._thisNode missing [input] [${JSON.stringify(childSpec._thisNode)}]`)
      }
      // get a sane thisNodeSpec
      const thisNodeSpec = childSpec._thisNode
      // get class spec
      const classSpec = globalThis.appx.SPEC.classes[thisNodeSpec.class]
      if (!classSpec) {
        throw new Error(`ERROR: classSpec not found [${thisNodeSpec.class}]`)
      }
      // check if data matches spec
      const data_type = lookup_type_for_data(nodeData)
      if (!type_matches_spec(data_type, thisNodeSpec)) {
        // console.log(`NO MATCH : node [${JSON.stringify(node)}] [${_ref}] data [${nodeData}] not matching [${JSON.stringify(thisNodeSpec)}]`)
        return undefined
      } else {
        // console.log(`MATCHES : node [${JSON.stringify(node)}] [${_ref}] data [${nodeData}] matching [${JSON.stringify(thisNodeSpec)}]`)
      }
      // parse data
      if (!!thisNodeSpec.parse) {
        return eval(thisNodeSpec.parse)
      } else if (!!thisNodeSpec.array) {
        throw new Error(`ERROR: thisNodeSpec [array] missing parse method [${JSON.stringify(thisNodeSpec)}]`)
      } else if (thisNodeSpec.class === 'string') {
        return String(nodeData)
      } else if (thisNodeSpec.class === 'number') {
        return Number(nodeData)
      } else if (thisNodeSpec.class === 'boolean') {
        return Boolean(nodeData)
      } else if (thisNodeSpec.class === 'null') {
        return null
      } else {
        throw new Error(`ERROR: thisNodeSpec [${thisNodeSpec.class}] missing generate method [${JSON.stringify(thisNodeSpec)}]`)
      }
    }

    // process child node
    function _process_child(node) {
      // node data
      const nodeData = node.data
      // parse function
      const parse = (node) => {
        return parse_tree_node(child_context, node)
      }

      // update data if _childNode is defined
      if (!childSpec?._childNode?.class) {
        return undefined
      }
      // look for checkNodeSpec that matches data
      const childNodeSpec = childSpec._childNode
      // get class spec
      const classSpec = globalThis.appx.SPEC.classes[childNodeSpec.class]
      if (!classSpec) {
        throw new Error(`ERROR: childNodeSpec not found [childNodeSpec.class]`)
      }
      // check if data matches spec
      if (!type_matches_spec(node.data._type, childNodeSpec)) {
        // console.log(`parse.childNodeSpec NO MATCH : [${node.data._type}] [${JSON.stringify(nodeData)}] not matching [${JSON.stringify(childNodeSpec)}]`)
        return undefined
      } else {
        // console.log(`parse.childNodeSpec MATCHES : [${node.data._type}] [${JSON.stringify(nodeData)}] matching [${JSON.stringify(childNodeSpec)}]`)
      }
      if (!!childNodeSpec.parse) {
        // parse child node
        // console.log(`childNodeSpec.parse`, childNodeSpec.parse, node)
        return eval(childNodeSpec.parse)
        // console.log(`childNodeSpec.parse`, node, child)
      } else {
        return parse_tree_node(child_context, node)
      }
    }

    let _ref = childSpec.name
    let data = undefined
    if (childSpec.name === '*') {

      thisNode.children.map(childNode => {
        // ignore _type
        if (childNode.data?._ref === '_type') {
          return
        }
        // process child node
        try {
          _ref = childNode.data._ref
          thisData[_ref] = _process_child(childNode)
        } catch (err) {
          console.error(err)
          throw err
        }
      })

    } else {

      try {
        // get _ref
        const _ref = childSpec.name
        // get childNode
        if (!!childSpec.array) {
          // if this node data
          if (_ref in thisNode.data && Array.isArray(thisNode.data[_ref])) {
            data = []
            thisNode.data[_ref].map(nodeData => {
              // process this
              const resultData = _process_this(_ref, nodeData)
              if (resultData !== undefined) {
                data.push(resultData)
              }
            })
          }
          // if child node array exists, override
          const childNodeArray = lookup_child_array_for_ref(thisNode, _ref)
          // console.log(`childNodeArray`, childNodeArray)
          if (!!childNodeArray.length) {
            data = [] // lazy initialize
            childNodeArray.map(childNode => {
              // console.log(`childNode`, childNode)
              data.push(_process_child(childNode))
            })
          }
        } else {
          // process this
          const nodeData = thisNode.data[_ref]
          data = _process_this(_ref, nodeData)
          const childNode = lookup_child_for_ref(thisNode, _ref)
          if (!!childNode) {
            // process child node if exists
            data = _process_child(childNode)
          }
        }

      } catch (err) {
        console.error(err)
        throw err
      }

      // check if data exist
      if (data === undefined) {
        if (!!childSpec.optional) {
          // ignore optional node
        } else {
          throw new Error(`ERROR: [${thisNode.data?._type}] missing [${_ref}] [${JSON.stringify(thisNode.data)}]`)
        }
      }
    }

    if (thisNode.data._type === 'js/array') {
      // console.log(`js/array`, data)
      thisData = data || [] // special handling for js/array
    } else if (data !== undefined) {
      thisData[_ref] = data
    }
  })

  if (thisData._type === 'js/object') {
    delete thisData._type
  } else if (thisData._type === 'js/string') {
    return String(thisData.data)
  } else if (thisData._type === 'js/number') {
    return Number(thisData.data)
  } else if (thisData._type === 'js/boolean') {
    return Boolean(thisData.data)
  } else if (thisData._type === 'js/null') {
    return null
  }

  // console.log(thisData)
  return thisData
}

export {
  tree_traverse,
  tree_lookup,
  parse_tree_node,
  lookup_child_for_ref,
  lookup_child_array_for_ref,
  remove_child_for_ref,
}
