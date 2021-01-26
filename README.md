# txl-react-ts

---

### Prettier(皮臭)

格式化工具

- 安装依赖包
  ```angular2html
  npm install prettier -g && npm add prettier
  ```
- 配置文件
  ```angular2html
  echo {} > .prettierrc.json
  ```
- 创建忽略格式化文件
  ```angular2html
  touch .prettierignore
  ```
  ```angular2html
  # Ignore artifacts:
  build
  coverage
  ```
- 借助 Pre-commit Hook 工具,当代码提交前自动格式化
  ```angular2html
  npx mrm lint-staged
  ```
  ```json
   "husky": {
      "hooks": {
        "pre-commit": "lint-staged"
      }
    },
    "lint-staged": {
      "*.{js,css,md,ts,tsx}": "prettier --write"
    }
  ```
- 解决与 Eslint 的冲突
  ```angular2html
  npm install eslint-config-prettier -g
  ```
  ```json
  "eslintConfig": {
      "extends": [
        "react-app",
        "react-app/jest",
        "prettier"
      ]
    },
  ```

### MOCK - json-server

- 安装 json-server

```angular2html
npm install -g json-server
```

- 添加 db.json

```json
{
  "posts": [{ "id": 1, "title": "json-server", "author": "typicode" }],
  "comments": [{ "id": 1, "body": "some comment", "postId": 1 }],
  "profile": { "name": "typicode" }
}
```

- 启动

```angular2html
json-server --watch db.json
```
