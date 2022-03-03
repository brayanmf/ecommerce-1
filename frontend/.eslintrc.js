module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "prettier"],
  rules: {
    semi: ["error", "never"],
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
  extends: ["plugin:prettier/recommended"],
}
