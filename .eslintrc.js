module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'node': true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended'
  ],
  rules: {
    'no-unused-vars': ['error', {argsIgnorePattern: '^_'}],
    'vue/no-v-html': 0,
    'vue/max-attributes-per-line': [0, {
      'singleline': 2,
      'multiline': {
        'max': 2,
        'allowFirstLine': true
      }
    }],
    'vue/html-closing-bracket-newline': ['error', {
      'singleline': 'never',
      'multiline': 'never'
    }],
    'vue/html-closing-bracket-spacing': ['error', {
      'startTag': 'never',
      'endTag': 'never',
      'selfClosingTag': 'never'
    }],
    'vue/singleline-html-element-content-newline': ['error', {
      'ignoreWhenNoAttributes': true,
      'ignoreWhenEmpty': true
    }]
  }
}
