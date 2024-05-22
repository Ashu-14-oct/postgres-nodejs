const express = require("express");
// apollo   `
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");

const client = require("./config");
const cors = require("cors");

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `
        type Todo {
            id: Int!
            todo: String!
            completed: Boolean
        }

        type Query {
            getTodos: [Todo]
        }

        type Mutation {
            updateTodoStatus(id: Int!): String
            addTodo(todo: String!): Todo
        }
    `,
    resolvers : {
        Query: {
          getTodos: async () => {
            const data = await client.query("SELECT * FROM todo");
            return data.rows;
          },
        },
        Mutation: {
            updateTodoStatus: async (_, {id}) => {
                const updateResult = await client.query('UPDATE todo SET completed = true WHERE id = $1 RETURNING *', [id]);
                if (updateResult.rowCount === 0) {
                    throw new Error(`Todo with id ${id} not found`);
                  }
                  return "Updated successfully";
            },
            addTodo: async (_, {todo}) => {
                const insertResult = await client.query('INSERT INTO todo (todo, completed) VALUES ($1, $2) RETURNING *', [todo, false]);
                return insertResult.rows[0];
            }
        }
      }
  });

  app.use(cors());
  app.use(express.json());

  await server.start();
  app.use('/graphql', expressMiddleware(server));


  app.listen(3000, () => {
    console.log("server started");
  });
}

startServer();

