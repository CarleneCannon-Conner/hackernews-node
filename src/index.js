const { ApolloServer } = require('apollo-server')
const fs = require('fs')
const path = require('path')

/* Dummy Data stored in memory (not persisted in an actual db) */
let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial of GraphQL',
}]

/* Resolvers implement GraphQL schema */
let idCount = links.length
const resolvers = {
  Query: {
    info: () => `This is the API of the Hakernews Clone`,
    feed: () => links,
    link: (parent, { id }) => {
      return links.find(link => link.id === id)
    },
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },
   updateLink: (parent, { id, url, description }) => {
    let newLink = links.find(link => link.id === id)
    newLink.url = url || newLink.url
    newLink.description = description || newLink.description

    return newLink
  },
    deleteLink: (parent, { id }) => {
      const linkIndex = links.findIndex(link => link.id === id)

      if (linkIndex === -1) throw new Error("Link not found.")

      const deletedLinks = links.splice(linkIndex, 1)

      return deletedLinks[0]
    }
  }
  /*
  This is commented out
  because it's simple enough
  that it's resolved for you
  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url,
  }
  */
}

/* Serve bundled schema and resolvers */
const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers,
})

server.listen()
  .then(({ url }) =>
  console.log(`Server is running on ${url}`)
  )