import { PrismaClient } from '@prisma/client';
import * as bodyParser from 'body-parser';
import express from 'express';

const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.json());

app.post(`/user`, async (req, res) => {
  const result = await prisma.user.create({
    data: {
      ...req.body,
    },
  });
  res.json(result);
});

app.get(`/users`, async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.delete(`/user`, async (req, res) => {
  const user = await prisma.user.delete({
    where: { id: req.body.id },
  });
  res.json(user);
});

app.listen(3000, () =>
  console.log(
    '🚀 Server ready at: http://localhost:3000\n⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api',
  ),
);
