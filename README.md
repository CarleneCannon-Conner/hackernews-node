# how-to-graphql-tutorial (Still a work in progress)
Following and building upon [How To GraphQL Tutorial](https://www.howtographql.com/graphql-js/0-introduction)

Currently building hackernews-node backend of project

## Comands
### Init Prisma 
This command has already been run.
This command created a `prisma` directory containing `schema.prisma` which I have since added to.

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

#### Example Queries, Mutations & Subscriptions

##### 1. Get info
```
query {
  info
}
```

##### 2. Sign up as a new user
```
mutation {
  signup(email: "bob@example.com", password: "Pa$$w0rd", name: "Bobby") {
    token
    user {
      id
      email
      name
    }
  }
}
```

##### 3. Login as created user
```
mutation {
  login(email: "bob@example.com",
  password: "Pa$$w0rd") {
    token
    user {
      id
      email
      name
    }
  }
}
```

Make not of token

In some of the following queries, mutations and subscriptions you will need to mimic being logged in, to do so:

In HTTP HEADERS add, replacing `__TOKEN__` with noted token
```
{
  "Authorization": "Bearer __TOKEN__"
}
```

##### 4. Post a link (requires token)

```
mutation {
  login(email: "bob@example.com",
  password: "Pa$$w0rd") {
    token
    user {
      id
      email
      name
    }
  }
}
```

##### 5. List users

```
query{
  users {
    count
    users {
      id
      name
      email
      links {
        description
      }
    }
  }
}
```

##### 6. List feed

```
query{
  feed {
    count
    links {
      id
      description
      url
      postedBy {
        name
      }
    }
  }
}
```

##### 7. List feed

```
query{
  feed {
    count
    links {
      id
      description
      url
      postedBy {
        name
      }
    }
  }
}
```

##### 8. Update Link (requires token, you can only update your own link)

```
mutation {
  updateLink(id: 1,
    description: "Bobby's first post updated") {
    id
    description
    url
  }
}
```

##### 9. Delete Link (requires token, you can only delete your own link)

```
mutation {
  deleteLink(id: 2) {
    id
  }
}
```

##### 10. Vote for Link (requires token, you can not vote for your own link)
TODO: See if I can prevent user voting for their own
```
mutation {
  vote (linkId: 1) {
    id
  	link {
      description
  	}
  	user {
      id
    }
  }
}
```

##### 11. Subcribe/watch for link events
In window/tab 1 run the following.

```
subscription {
  newLink {
    id
    url
    description
    postedBy {
      id
      name
      email
    }
  }
}
```
In a second post a new link (4.)

##### 12. Subcribe/watch for vote events
In window/tab 1 run the following.

```
subscription {
  newVote {
    id
    link {
      id
      description
      url
      postedBy {
        name
      }
    }
  	user {
      id
      name
    }
  }
}
```
In a second vote for a link (10.)


