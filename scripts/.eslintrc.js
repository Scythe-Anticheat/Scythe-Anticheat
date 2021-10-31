module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 13,
        "sourceType": "module"
    },
    "rules": {
        "no-compare-neg-zero": "error",
        "no-const-assign": "error",
        "no-dupe-args": "error",
        "no-dupe-else-if": "error",
        "no-duplicate-imports": "error",
        "no-undef": "error",
        "no-func-assign": "error",
        "no-self-compare": "error",
        "no-empty": "off",
        "no-unused-vars": "error",
        "no-var": "error",
        "use-isnan": "error",
        "eqeqeq": "error",
        "no-delete-var": "error",
        "no-empty-function": "error",
        "no-eval": "error",
        "no-lonely-if": "error",
        "no-multi-str": "error",
        "no-regex-spaces": "error",
        "no-useless-escape": "error",
        "spaced-comment": "error",
        "yoda": "error"
    }
};
