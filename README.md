# node-kickstart

node-kickstart is a minimal NodeJS seed project that should help a basic NodeJS app get off the ground.

## How To

- As always, do `npm install` first
- Create `.env` file with the following contents:

```
DEBUG=node-kickstart*
NODE_ENV=development
PORT=8080
```

- Main file -> `app.js`
- Run & watch for changes: `npm run dev`
- Run Mocha tests: `npm test`
- Web client served from `public/` directory

## Try It Out

- Navigate to `localhost:8080` in a browser
- Send a `GET` request to `localhost:8080/api`

### Notable Dependencies

- Express: App framework and API
- debug: a better `console.log()`
- dotenv: loads environment variable from `.env` file
- nodemon: run app while watching for file changes
- Mocha & Chai: unit testing & assertion framework