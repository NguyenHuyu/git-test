import { server } from "@/mocks/server"
import { rest } from "msw"
import fetchTodos from "../fetchTodos"

describe('fetchTodos lib function', () => {

    it('should return the correct number of todo items', async () => {
        const todosArray = await fetchTodos()
        expect(todosArray.length).toBe(200)
    })

    it('should return an empty array with an error', async () => {
        server.use(
            rest.get('/https://jsonplaceholder.typicode.com/todos', (req, res, ctx) => {
                return res(ctx.status(400))
            })
        )
        const todosArray = await fetchTodos()
        expect(todosArray.length).toBe(0)
    })

    // it('should handle network error', async () => {
    //     server.use(
    //         rest.get('https://jsonplaceholder.typicode.com/todos', (req, res, ctx) => {
    //             return res.networkError('Network error occurred');
    //         })
    //     );
    //     await expect(fetchTodos()).rejects.toThrow('Network error occurred');
    // });
})

