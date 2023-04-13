/* eslint-env node */
module.exports = {
  root: true,
  'extends': [
    'airbnb-base',
    'plugin:vue/vue3-strongly-recommended'
  ],
  overrides: [
    {
      files: [
        'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}'
      ],
      'extends': [
        'plugin:cypress/recommended'
      ]
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    "import/prefer-default-export": "off",
    "arrow-body-style": "off",
    "import/extensions": "off",
    "import/no-extraneous-dependencies": "off",
    "import/no-unresolved": "off",
    "import/no-relative-packages": "off"
  }
}
