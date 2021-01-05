import {
  REGEX_VAR,
  classes
} from 'app-x/spec/classes.js'

// type: js/object                                   (~object|~expression)
export const js_object = {

  name: 'js/object',
  desc: 'Object',
  classes: [
    {
      class: 'object',
    },
    {
      class: 'expression',
    }
  ],
  _group: 'js_basics',
  children: [
    {
      name: '*',
      desc: 'Children',
      classes: [
        {
          class: 'any'
        },
      ],
      _inputs: [
        {
          input: 'js/object'
        }
      ],
      _child: {}
    },
  ]
}

export default js_object