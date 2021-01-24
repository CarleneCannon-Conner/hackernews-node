# how-to-graphql-tutorial (Still a work in progress)
Following [How To GraphQL Tutorial](https://www.howtographql.com/graphql-js/0-introduction)

Currently building hackernews-node backend of project

## What am I working with
graphql, apollo-server, @prisma/cli & sqlite

## Comands
### Run GraphQL Playground
[http://localhost:4000](http://localhost:4000)
```
node src/index.js
```

### Init Prisma 
Creates prisma directory
```
npx prisma init
```

### Migrate db 
Creates db
```
npx prisma migrate dev --preview-feature
```

### Generate Prisma Client 
Creates `node_modules/@prisma/client` that can be imported into code
```
npx prisma generate
```

### Run Prisma Client
A Script To Test out Prisma
```
node src/script.js
```

### Explore data in Prisma Studio
```
npx prisma studio
```
