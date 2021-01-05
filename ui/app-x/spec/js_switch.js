import {
  REGEX_VAR,
  classes
} from 'app-x/spec/classes.js'

// type: js/switch                                   (~expression|~statement)
// children:
//   - condition:            # condition expression  (:expression)
//     result:               # result data           (:expression|:statement)
// default:                  # default data          (:expression|:statement)
export const js_switch = {

  name: 'js/switch',
  desc: 'Switch',
  classes: [
    {
      class: 'expression',
    },
    {
      class: 'statement',
    },
  ],
  _group: 'js_controls',
  children: [
    {
      name: 'children',
      desc: 'Conditional',
      classes: [
        {
          class: 'array',
          classes: [
            {
              class: 'object',
              shape: [
                {
                  name: 'condition',
                  desc: 'Condition',
                  classes: [
                    {
                      class: 'expression'
                    }
                  ],
                  rules: [
                    {
                      kind: 'required',
                      required: true,
                      message: 'Condition is required'
                    },
                  ],
                  _inputs: [
                    {
                      input: 'js/expression'
                    }
                  ],
                },
                {
                  name: 'result',
                  desc: 'Result',
                  classes: [
                    {
                      class: 'expression'
                    },
                    {
                      class: 'statement'
                    },
                  ],
                },
              ]
            }
          ],
        },
      ],
      _child: {
        array: true,
        generate: '` \
          parentData.children.map( \
            child => (() => { \
              const node = generate(child.result); \
              node.data._isDefault = false; \
              node.data._condition = child.condition; \
              return node \
            })() \
          ) \
        `',
        parse: ' \
          parentNode._children \
            .filter(child => !child._isDefault) \
            .map(child => { \
              condition: child.data._condition, \
              result: parse(child) \
            }) \
        `',
        customs: [
          {
            name: '_isDefault',
            desc: 'Is Default',
            classes: [
              {
                class: 'boolean'
              }
            ],
            _inputs: [
              {
                input: 'js/boolean'
              }
            ],
            _init: false
          },
          {
            name: '_condition',
            desc: 'Condition',
            condition: '`!node.data._isDefault`',
            classes: [
              {
                class: 'expression',
              }
            ],
            _inputs: [
              {
                input: 'js/expression'
              }
            ],
          },
        ],
        effects: [
          {
            body: '` \
              node.data._ref = \
                !!node.data._isDefault \
                ? 'default' \
                : null \
            `',
            states: [
              '`node.data._isDefault`'
            ]
          }
        ]
      }
    },
    {
      name: 'default',
      desc: 'Default',
      classes: [
        {
          class: 'expression'
        },
        {
          class: 'statement'
        },
      ],
      _child: {
        generate: '` \
          (() => { \
            const node = generate(data); \
            node.data._isDefault = true; \
            node.data._condition = ''; \
            return node \
          })() \
        `',
        parse: '`parse(node)`',
        customs: [
          {
            name: '_isDefault',
            desc: 'Is Default',
            classes: [
              {
                class: 'boolean'
              }
            ],
            _inputs: [
              {
                input: 'js/boolean'
              }
            ],
            _init: true
          },
          {
            name: '_condition',
            desc: 'Condition',
            condition: '`!node.data._isDefault`',
            classes: [
              {
                class: 'expression',
              }
            ],
            _inputs: [
              {
                input: 'js/expression'
              }
            ],
          },
        ],
        effects: [
          {
            body: '` \
              node.data._ref = \
                !!node.data._isDefault \
                ? 'default' \
                : null \
            `',
            states: [
              '`node.data._isDefault`'
            ]
          }
        ]
      }
    },
  ],
}

export default js_switch