module.exports = {
    root: true,
    env: {
      node: true,
      browser: true,
      es6: true
    },
    parser: "vue-eslint-parser",
    parserOptions:{
        "parser":"@typescript-eslint/parser",
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    globals:{
        "globalData1":"writable",
        "globalData2":"readonly"  
    },
    extends: [
      'eslint:recommended',
      'airbnb-base',
      "plugin:react/recommended",
      'plugin:vue/recommended',
      "plugin:@typescript-eslint/recommended",
    ],
    plugins: [
        "react",
        "vue",
        "@typescript-eslint"
    ],
    rules: {
      "no-use-before-define": "off",
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "class-methods-use-this":"off",
      "import/no-unresolved":"off",
      'linebreak-style': ['off', 'windows'],
      "indent": ["error", 2], //代码缩进2个空格
      'quotes': ['error', "double", {avoidEscape:true,allowTemplateLiterals: true}], // 字符串强制使用单引号
      'eqeqeq': ['error', 'always', { null: 'ignore' }], //比较时强制使用 === 或者 !==,但对null作比较时可以不用全等
    }
}
  