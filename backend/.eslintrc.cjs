module.exports = {
  env: {
    browser: true,
    es2021: true,
  },

  extends: ["airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    semi: ["error", "never"],
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
  plugins: ["prettier"],
  extends: ["plugin:prettier/recommended"],
}
