import { Hono } from 'hono';

export const authRoute = new Hono()
  .post('/login', (c) => {
    console.log('this is login');
    return c.json('Login endpoint');
  })
  .post('/register', (c) => {
    console.log('this is register');
    return c.json('Register endpoint');
  })
  .get('/users', (c) => {
    console.log('this is users');
    const users = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' },
    ];
    return c.json(users);
  });
