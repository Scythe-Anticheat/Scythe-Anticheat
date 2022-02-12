module.exports = {
    "env": {
        "browser": true,
        "node": true,
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
        "no-self-assign": "error",
        "no-self-compare": "error",
        "no-empty": "off",
        "no-unused-vars": "warn",
        "use-isnan": "error",
        "no-delete-var": "error",
        "no-eval": "warn",
        "no-lonely-if": "error",
        "no-multi-str": "error",
        "no-regex-spaces": "error",
        "no-useless-escape": "error",
        "spaced-comment": "warn",
        "yoda": "error",
        "semi": "warn",
        "no-control-regex": "off"
    }
};
