const { GraphQLServer } = require('graphql-yoga');

let links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }
];
let idCount = links.length;

const resolvers = {
  Query: {
    info: () => `This is an API for the Hackernews Clone`,
    feed: () => links,
    link: (parent, args) => links[pareseInt(args.id)]
  },

  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
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
  resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
