import React from 'react'

////////////////////////////////////////////////////////////////////////////////
// utilities

import {
  ContainerOutlined,
  ProfileOutlined,
  FileOutlined,
  FolderOutlined,
  FolderOpenOutlined,
} from '@ant-design/icons'
import ReactIcon from 'app-x/icon/React'

////////////////////////////////////////////////////////////////////////////////

const PATH_SEPARATOR = '/'

////////////////////////////////////////////////////////////////////////////////
// tree traverse method
const tree_traverse = (data, key, callback) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].key === key) {
      return callback(data[i], i, data)
    }
    if (data[i].children) {
      tree_traverse(data[i].children, key, callback)
    }
  }
}

////////////////////////////////////////////////////////////////////////////////
// lookup method
function tree_lookup(data, key) {

  if (!data) {
    return null
  }

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
// lookup icon for type
function lookup_icon_for_type (type) {

  if (type === 'react/element') {

    return <ReactIcon />

  } else if (type === 'react/provider') {

    return <ProfileOutlined />

  } else if (type === 'html') {

    return <ContainerOutlined />

  } else if (type === 'folder') {

    return <FolderOutlined />

  } else {

    return <FileOutlined />
  }
}

// lookup icon for type
function lookup_desc_for_type (type) {

  if (type === 'react/element') {

    return 'React Element'

  } else if (type === 'react/provider') {

    return 'Context Provider'

  } else if (type === 'html') {

    return 'HTML'

  } else if (type === 'folder') {

    return 'Folder'

  } else {

    return 'File'
  }
}

// lookup default spec
function default_element_spec_for_type (type) {

  if (type === 'react/element') {

    return {
      styles: {
        type: 'mui/style',
        root: {
          width: '100%',
          height: '100%',
          position: 'absolute',
        }
      },
      element: {
        type: 'react/element',
        name: '@material-ui/core.Box',
        props: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          className: {
            type: 'js/expression',
            data: 'styles.root',
          },
        },
        children: [
          {
            type: 'react/element',
            name: '@material-ui/core.Typography',
            props: {
              variant: 'h6',
            },
            children: [
              'This is template text'
            ]
          },
        ]
      }
    }

  } else if (type === 'react/provider') {

    return {
      // state
      states: {
        '...open': {
          name: 'open',
          setter: 'setOpen',
          init: false
        }
      },
      // function
      handlers: {
        toggleOpen: {
          type: 'js/function',
          body: 'states.setOpen(!states.open)'
        }
      },
      // provider
      provider: {
        toggleOpen: {
          type: 'js/expression',
          data: 'handlers.toggleOpen'
        }
      }
    }

  } else if (type === 'html') {

    return {
      data: {
        title: 'This is application title'
      }
    }

  } else {

    throw new Error(`Unknown element type [ ${type} ]`)
  }
}

// create new folder node
function new_folder_node(parentKey, subName) {
  return {
    title: subName,
    type: 'folder',
    key: (parentKey + PATH_SEPARATOR + subName).replace(/\/+/g, '/'),
    parentKey: parentKey,
    subName: subName,
    children: [],
  }
}

// create new element node
function new_element_node(parentKey, subName, type, data) {
  return {
    title: subName,
    type: type,
    key: (parentKey + PATH_SEPARATOR + subName).replace(/\/+/g, '/'),
    parentKey: parentKey,
    isLeaf: true,
    icon: lookup_icon_for_type(type),
    subName: subName,
    data: data,
  }
}

// reorder children
const reorder_children = (parentNode) => {

  const children = []
  // add add non-leaf child first
  parentNode.children
    .filter(child => !child.isLeaf)
    .sort((a, b) => {
      return a.subName.localeCompare(b.subName)
    })
    .map(child => {
      children.push(child)
    })
  // add add all leaf child next
  parentNode.children
    .filter(child => !!child.isLeaf)
    .sort((a, b) => {
      return a.subName.localeCompare(b.subName)
    })
    .map(child => {
      children.push(child)
    })
  // update children
  parentNode.children = children
}

export {
  tree_traverse,
  tree_lookup,
  lookup_icon_for_type,
  lookup_desc_for_type,
  default_element_spec_for_type,
  new_folder_node,
  new_element_node,
  reorder_children,
  PATH_SEPARATOR,
}
