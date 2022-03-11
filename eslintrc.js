module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  // parser: 'babel-eslint',
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  // extends: 'standard',
  extends: [
    'standard',
    '@nuxtjs',
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:nuxt/recommended'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  globals: {
    _: true
  },
  // add your custom rules here
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-unused-vars': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'space-before-function-paren':0,
    'import/order': ['warn', { 'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'unknown'] }]
  }
}
