# how-to-graphql-tutorial (Still a work in progress)
Following [How To GraphQL Tutorial](https://www.howtographql.com/graphql-js/0-introduction)

Currently building hackernews-node backend of project

## What am I working with
graphql, apollo-server, @prisma/client @prisma/cli, bcryptjs, jsonwebtoken & sqlite

## Comands
### Run GraphQL Playground
```
node src/index.js
```

### Init Prisma 
Creates prisma directory
```
npx prisma init
```

### Migrate db to prisma
Create/update db `--name` is an optional param
```
npx prisma migrate dev --name "add-user-model" --preview-feature
```

### Generate/Update Prisma Client 
Creates `node_modules/@prisma/client` that can be imported into code
```
npx prisma generate
```

### Explore data in Prisma Studio
```
npx prisma studio
```
