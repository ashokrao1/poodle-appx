import {
  REGEX_VAR,
  classes
} from 'app-x/spec/classes.js'

// type: react/html                                  (~jsx|~expression)
// name:                     # html tag name         (:expression) - autosuggest non-restrictive
// props:                    # properties            (:object<:any>)
// children:                 # children              (:array<:jsx|:primitive|:expression>)
export const react_html = {

  name: 'react/html',
  desc: 'HTML Tag',
  classes: [
    {
      class: 'jsx',
    },
    {
      class: 'expression',
    }
  ],
  _group: 'react_concepts',
  children: [
    {
      name: 'name',
      desc: 'HTML Tag',
      classes: [
        {
          class: 'string'
        },
        {
          class: 'expression'
        }
      ],
      rules: [
        {
          kind: 'required',
          required: true,
          message: 'HTML tag is required',
        },
      ],
      _inputs: [
        {
          input: 'js/string'
        }
      ],
      _child: {},
      _suggestions: [
        {
          __class: 'js/call',
          name: {
            __class: 'js/import',
            name: 'app-x/builder/ui/syntax/util_parse.valid_html_tags',
          }
        }
      ],
      _examples: [
        'div',
        'span',
        'form',
        'input',
        'body',
        'html',
      ],
    },
    {
      name: 'props',
      classes: [
        {
          class: 'object',
          classes: [
            {
              name: '.+',
              class: 'any'
            }
          ]
        }
      ],
      _inputs: [
        {
          input: 'js/object'
        }
      ],
      _child: {
        generate: '`generate(data)`',
        parse: '`parse(node)`',
      }
    },
    {
      name: 'children',
      desc: 'Child Elements',
      classes:
      [
        {
          class: 'array',
          classes: [
            {
              name: '.+',
              class: 'jsx',
            },
            {
              name: '.+',
              class: 'primitive',
            },
            {
              name: '.+',
              class: 'expression',
            }
          ]
        }
      ],
      _child: {
        array: true,
        generate: '` \
          parentData.children.map( \
            child => generate(child) \
          ) \
        `',
        parse: ' \
          parentNode._children \
            .filter(child => !child._ref) \
            .map(child => \
              parse(child) \
            ) \
        `',
      },
    },
  ]
}

export default react_html