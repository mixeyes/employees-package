module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/stylistic',
    "next/core-web-vitals"
  ],
  ignorePatterns: ['build', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  settings: {
    "import/resolver": {
      typescript: {}
    }
  },
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-explicit-any": ["warn"],
    "no-restricted-imports": "off",
    "@typescript-eslint/no-restricted-imports": [
      "warn",
      {
        "name": "react-redux",
        "importNames": ["useSelector", "useDispatch"],
        "message": "Use typed hooks `useAppDispatch` and `useAppSelector` instead."
      }
    ],
    "react-hooks/exhaustive-deps": "off",
    "no-console": "warn",
    "sort-keys": ["error", "asc", { "caseSensitive": true, "natural": false, "minKeys": 2 }],
    "import/no-duplicates": ["error", { "considerQueryString": true }],
    'import/no-named-as-default': [0]
    // "sort-imports": ["error", {
    //   "ignoreCase": true,
    //   "ignoreDeclarationSort": false,
    //   "ignoreMemberSort": true,
    //   "memberSyntaxSortOrder": ["none", "all", "multiple", "single"],
    //   "allowSeparatedGroups": false
    // }],
  },
}
