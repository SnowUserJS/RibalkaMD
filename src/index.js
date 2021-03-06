 const express = require('express');
 const depthLimit = require('graphql-depth-limit');
 const { createComplexityLimitRule } = require('graphql-validation-complexity');
 const { ApolloServer } = require('apollo-server-express');
 require('dotenv').config();
 // Импортируем локальные модули
 const db = require('./db');
 const models = require('./models');
 const typeDefs = require('./schema');
 const resolvers = require('./resolvers');
 const jwt = require('jsonwebtoken');
 const helmet = require('helmet');
 const cors = require('cors');
 const getUser = token => {
    if (token) {
        try {
            // Возвращаем информацию пользователя из токена
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            // Если с токеном возникла проблема выбрасываем ошибку
            new Error('Session invalid');
        }
    }
 };
 // Запускаем сервер на порте, указанном в файле .env, или на порте 4000
 const port = process.env.PORT || 4000;
 const DB_HOST = process.env.DB_HOST;
 const app = express();
 db.connect(DB_HOST);
 app.use(helmet());
 app.use(cors());

 // Настраиваем Apollo Server
 const server = new ApolloServer({
 typeDefs,
 resolvers,
 validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
 context: ({ req }) => {
    // Получаем токен пользователя из заголовков
    const token = req.headers.authorization;
    // Пытаемся извлеч пользователя с помощью токена
    const user = getUser(token);
    console.log('ID пользователя', user);
     // Добавляем модели БД в context
     return { models, user };
 }
 });
 // Применяем промежуточное ПО Apollo GraphQL и указываем путь к /api
 server.applyMiddleware({ app, path: '/api' });
 app.listen({ port }, () =>
 console.log(
 `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
 )
 );