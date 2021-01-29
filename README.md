# how-to-graphql-tutorial (Still a work in progress)
Following and building upon [How To GraphQL Tutorial](https://www.howtographql.com/graphql-js/0-introduction)

Currently building hackernews-node backend of project

## Getting up and running locally
### Init Prisma (skip this step)

```
npx prisma init
```

Note that in this repo this command has already been run.

<sup>When it was run, it created a directory called `prisma` that contained a file called `schema.prisma`. In this repo this file has since been modified.</sup>

### Set up Environment Variables

<sup>The pervious command also created the file `.env`. Please note that`.env` is NOT included in this repo as it can contain secret tokens. Also note that `.env` has been added to `.gitignore` to prevent the accidental pushing of `.env` to a public repo.</sup>

Rename`example.env` to `.env` 

There are currently 2 variables in this file that are used by this application. Alter them as required.


### Migrate db to prisma
Create/update db `--name` is an optional param
```
npx prisma migrate dev --name "init" --preview-feature
```

### Generate/Update Prisma Client 
Creates `node_modules/@prisma/client`. This is imported into the code
```
npx prisma generate
```

### To Explore data in Prisma Studio
```
npx prisma studio
```

### To Run GraphQL Playground
```
node src/index.js
```

#### GraphQL Playground: Example Queries, Mutations & Subscriptions

##### 1. Get info
```
query {
  info
}
```

##### 2. Sign up as a new user
```
mutation {
  signup(email: "hi@example.com", password: "Pa$$w0rd", name: "Jane Doe") {
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
  login(email: "hi@example.com",
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

In some of the following requests you will need to mimic being logged in, to do so:

In HTTP HEADERS add the following, replacing `__TOKEN__` with the previously noted token
```
{
  "Authorization": "Bearer __TOKEN__"
}
```

##### 4. Post a link (requires token)

```
mutation {
  post(url: "www.example.com",
  description: "My first post") {
    id
    url
    description
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

##### 7. Update Link (requires token, you can only update your own link)

```
mutation {
  updateLink(id: 1,
    description: "Jane's first post updated") {
    id
    description
    url
  }
}
```

##### 8. Delete Link (requires token, you can only delete your own link)

```
mutation {
  deleteLink(id: 2) {
    id
  }
}
```

##### 9. Vote for Link (requires token, you can not vote for your own link)
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

##### 10. Subcribe/watch for link events
In the first window/tab run the following.

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
In the second window/tab post a new link (4.)

##### 12. Subcribe/watch for vote events
In the first window/tab run the following.

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
In the second window/tab vote for a link (10.)


