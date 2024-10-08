import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from "hono/jwt"
import { signupInput, signinInput } from '@hkv24/medium-common'


const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    }
}>();




userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json();
    // Zod validation
    const { success } = signupInput.safeParse(body);
    if(!success) {
      c.status(411);
      return c.json({ error: 'Wrong inputs' });
    }
  
    try {
      // Enough to catch the case of duplicate email
      const userCreated = await prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: body.password,
        }
      })
    
      const token = await sign({id: userCreated.id}, c.env.JWT_SECRET);
      return c.json({jwt: token});
    } catch(err) {
      c.status(403)
      return c.json({error: 'Error while signing up'});
    }
  })

  
  
  userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if(!success) {
      c.status(411);
      return c.json({ error: 'Wrong inputs' });
    }
  
    try {
      const searchUser = await prisma.user.findUnique({
        where: {
          email: body.email,
          password: body.password
        }
      })
  
      if(!searchUser) {
        c.status(404);
        return c.json({ error: 'Either Email or Password is Wrong!'});
      }
  
      // @ts-ignore
      const token = await sign({id: searchUser.id}, c.env.JWT_SECRET);
      return c.json({jwt: token});
    } catch(err) {
      c.status(403); // Unauthorized
      return c.json({error: 'Error while signing in'});
    }
  })


export default userRouter