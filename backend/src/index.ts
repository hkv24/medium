import { Hono } from 'hono'
import userRouter from './routes/user';
import postRouter from './routes/post';
import { cors } from 'hono/cors'

// Try to avoid global var in a serverless appliction, bcz. lot of time they just start a specific fnc. some where so we might lose access to global context

const app = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_STRING: string;
    }
}>()

app.use('/*', cors())

app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', postRouter);

export default app