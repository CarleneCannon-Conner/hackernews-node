# how-to-graphql-tutorial (Still a work in progress)
Following [How To GraphQL Tutorial](https://www.howtographql.com/graphql-js/0-introduction)

Currently building hackernews-node backend of project

## Comands
### Init Prisma 
This command has already been run.
This command created a `prisma` directory containing a `schema.prisma` which I have since added to.

This command also creates the file `.env`. I have included `.env` in `.gitignore` to prevent accidently pushing secret tokens to a public repo.

Rename `example.env` to `.env` and change the `APP_SECRET` to something different. 

This file will also contain a `DATABASE_URL` variable. This is used by Prisma.

```
npx prisma init
```

### Migrate db to prisma
Create/update db `--name` is an optional param
```
npx prisma migrate dev --name "init" --preview-feature
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

### Run GraphQL Playground
```
node src/index.js
```
