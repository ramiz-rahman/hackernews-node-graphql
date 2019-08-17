const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');

const resolvers = {
  Query: {
    info: () => `This is an API for the Hackernews Clone`,
    feed: () => (root, args, context, info) => {
      return context.prisma.links();
    },
    link: (parent, args) => links[pareseInt(args.id)]
  },

  Mutation: {
    post: (root, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description
      });
    },

    updateLink: (parent, args) => {
      let link = args.id <= idCount ? links[parseInt(args.id)] : null;
      if (link) {
        if (args.description) {
          link.description = args.description;
        }
        if (args.url) {
          link.url = args.url;
        }
      }
      return link;
    },

    deleteLink: (parent, args) => {
      let link = args.id <= idCount ? links.splice(args.id, 1)[0] : null;
      return link;
    }
  }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { prisma }
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
