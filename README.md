# Build a To-Do API With Node and Restify

This is a simple todo API based on restify.

This todo app is ased on Chinedu Izuchukwu's post at https://code.tutsplus.com/tutorials/build-todo-api-with-node-and-restify--cms-29402

What did I add ?
- a docker-compose file so the API is containerized and will not impact your host,
- eslint with airbnb base rules, where I only remove the traling comma, because this is the only thing wrong on their config, IMHO.
- and actually I removed global variable usage... sorry, I don't like globals.

Now please, enjoy !

## get started

you need:
- docker with docker-compose

Then create an `.env` file using none conflicting ports on your host:
```
NODE_API_PORT=3000
MONGO_PORT=27017
```

## start

  `$ docker-compose up --build`

I like using it without detaching option (`-d`), so I can keep looking on container outputs. It'i's up to you!

### create a todo

  `$ curl -i -X POST "http://localhost:3000/todos" -H "Content-Type: application/json" -d '{"title" : "Restify rocks!"}'`

### get todos

  `$ curl -i -X GET "http://localhost:3000/todos"`


## stop

  `$ docker-compose down`

## license

[MIT](LICENSE)
