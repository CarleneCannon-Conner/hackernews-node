const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { getUserId } = require('../utils')

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10)
  const user = await context.prisma.user.create({ data: { ...args, password } })

  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)

  return {
    token,
    user,
  }
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user.findUnique({ where: { email: args.email } })
  if (!user) {
    throw new Error('No such user found')
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)

  return {
    token,
    user,
  }
}

async function post(parent, args, context, info) {
  const userId = getUserId(context)

  const newLink = await context.prisma.link.create({  
    data: {
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } },
    }
  })
  context.pubsub.publish('NEW_LINK', newLink)

  return newLink
}

async function updateLink(parent, args, context, info) {
  const userId = getUserId(context)
  const link = await context.prisma.link.findUnique({ where: { id: Number(args.id) } })

  if (userId !== link.postedById) throw new Error('Error link does not belong to user') 

  return context.prisma.link.update({
    where: {
      id: Number(args.id)
    },
    data: {
      description: args.description || link.description,
      url: args.url || link.url
    }
  })
}

async function deleteLink(parent, args, context, info) {
  const userId = getUserId(context)
  const link = await context.prisma.link.findUnique({ where: { id: Number(args.id) } })

  if (userId !== link.postedById) throw new Error('Error link does not belong to user') 
  
  return context.prisma.link.delete({
    where: {
      id: Number(args.id)
    }
  })
}

async function vote(parent, args, context, info) {
  const userId = getUserId(context)

  const link = await context.prisma.link.findUnique({
    where: {
      id: Number(args.linkId)
    }
  })

  if (userId === link.postedById) throw new Error('Error user can not vote for their own link') 

  const vote = await context.prisma.vote.findUnique({
    where: {
      linkId_userId: {
        linkId: Number(args.linkId),
        userId: Number(userId)
      }
    }
  })

  if (Boolean(vote)) {
    throw new Error(`Already voted for link: ${args.linkId}`)
  }

  const newVote = context.prisma.vote.create({
    data: {
      user: { connect: { id: userId } },
      link: { connect: { id: Number(args.linkId) } }
    }
  })
  context.pubsub.publish('NEW_VOTE', newVote)

  return newVote
}

module.exports = {
  signup,
  login,
  post,
  updateLink,
  deleteLink,
  vote,
}