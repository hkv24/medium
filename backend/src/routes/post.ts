import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from '@hkv24/medium-common'



const postRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    },
    Variables: {
        userId: string,
    }
}>();


// Middleware
// get the header
// verify th header
// only if the header is correct, we call next()
// if not, then return the user a 403 status code
postRouter.use('/*', async (c, next) => {
    // extract the user id
    // pass it down to the route handler
    // const authHeader = String(c.req.header('authorization'));
    // This converts the authorization header to a string, even if it's null or undefined. The result would be "null" or "undefined" in these cases, which may lead to incorrect behavior.
    const authHeader = c.req.header('authorization') || '';

    if (!authHeader) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}

    const token = authHeader.split(' ')[1];

    try {
        const payload = await verify(token, c.env.JWT_SECRET);

        if(payload) {
            // @ts-ignore
            c.set('userId', payload.id);
            await next();
        } else {
            c.status(403);
            return c.json({ message: 'You are not logged in!' })
        }
    } catch(err) {
        c.status(403);
        return c.json({ message: 'You are not logged in!' })
    }    
})



postRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if(!success) {
        c.status(411);
        return c.json({ message: 'Wrong Inputs' });
    }

    const authorId = c.get('userId');

    try {
        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: authorId, // this extraction will happen in the middleware
            }
        })
    
        return c.json({ id: post.id });
    } catch(err) {
        c.status(403);
        return c.json({ error: 'Error while creating new post' });
    }
})


postRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if(!success) {
        c.status(411);
        return c.json({ message: 'Wrong Inputs' });
    }

    try {
        const post = await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content,
            }
        })
    
        return c.json({ id: post.id });
    } catch(err) {
        c.status(403);
        return c.json({ error: 'Error while updating the post' });
    }
})


// Todo -> 1.) Add pagination, 2.) Add a delete route as well
postRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const posts = await prisma.post.findMany({
            select: {
                title: true,
                content: true,
                id: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });

        return c.json({ posts });
    } catch(err) {
        c.status(411);
        return c.json({ error: 'Error while fetching blog post' });
    }
})



postRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const post = await prisma.post.findUnique({
            where: {
                id: c.req.param("id")
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true,
                    }
                }
            }
        })

        return c.json({ post })
    } catch(err) {
        c.status(411);
        return c.json({ error: 'Error while fecthing blog post' });
    }
})


export default postRouter