async function users(parent, args, context, info) {
  const where = args.filter
    ? {
      OR: [
        { name: { contains: args.filter } },
      ],
    }
    : {}

  const users = await context.prisma.user.findMany({
    where,
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy,
  })

  const count = await context.prisma.user.count({ where })

  return {
    users,
    count,
  }
}
async function feed(parent, args, context, info) {
  const where = args.filter
    ? {
      OR: [
        { description: { contains: args.filter } },
        { url: { contains: args.filter } },
      ],
    }
    : {}

  const links = await context.prisma.link.findMany({
    where,
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy,
  })

  const count = await context.prisma.link.count({ where })

  return {
    links,
    count,
  }
}

module.exports = {
  info: () => `This is the API of a Hackernews Clone`,
  users,
  feed,
}