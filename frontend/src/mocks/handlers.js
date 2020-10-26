import { rest } from 'msw'

export const handlers = [
    // Handles a GET /user request
    rest.get('/api/movies', null),
]