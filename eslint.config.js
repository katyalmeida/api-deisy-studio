import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import someConfig from 'some-other-config-you-use';

export default [
  {
    languageOptions: { globals: globals.node },
    rules: {
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'no-unused-vars': ['warn'],
      'no-console': ['warn'],
      'no-var': ['error'],
      'prefer-const': ['error'],
      'no-multi-spaces': ['error'],
      'key-spacing': ['error', { beforeColon: false, afterColon: true }],
      quotes: ['error', 'single', { avoidEscape: true }],
    },
  },
  pluginJs.configs.recommended,
  someConfig,
  eslintConfigPrettier,
];
