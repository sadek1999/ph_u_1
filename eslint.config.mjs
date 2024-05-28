import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals'

export default tseslint.config(
    {    ignores:["**/node_modules/", ".git/"],
        languageOptions: {
            globals: {
                ...globals.node
            }
        }
    },

    {
        rules: {
            "no-unused-vars": "error",
            "no-console":'warn',
            "no-undef":"error",
            "no-unused-expressions": "error",
           "prefer-const": "error"
        }
    },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
);