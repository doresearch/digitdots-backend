/** @format */

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'eslint-config-prettier',
  ],
  overrides: [],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 禁用 RegExp 构造函数.
    'prefer-regex-literals': 'off',
    // 禁用三元 关掉吧. 单行代码养眼.
    'multiline-ternary': 'off',
    // 驼峰命名 不强制.
    camelcase: 'off',

    // 允许使用 any.
    '@typescript-eslint/no-explicit-any': 'off',
    // 驼峰命名 不强制.
    '@typescript-eslint/camelcase': 'off',
    // 禁止在定义前调用(除了 function). 该规则是在 eslint/no-use-before-define 上扩展的，加了 ts 的 type, interface, enum.
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
    // 允许显示声明基础类型.
    '@typescript-eslint/no-inferrable-types': 'off',

    '@typescript-eslint/no-unused-vars': 'warn',

    'vue/multi-word-component-names': ['off'],
  },
}
