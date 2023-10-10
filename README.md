# Blog Express

This is an exercise made for learning how to use [Express](https://expressjs.com/) for creating REST APIs.
This code provides a REST API for making CRUD operations with blog posts.

Another goal of this project is to investigate the most efficient way to test a controller without interacting with a real service (for example, a database). In the code, two options will be provided:

- Option 1: pass the service as a parameter to the controller
- Option 2: mock the service in the tests using `jest.mock`


Libraries: express, jest, typescript.

## How to start

Install

```bash
npm install
```

Compile the ts files

```bash
npx tsc
```

Start the server

```bash
node dist/index.js
```
