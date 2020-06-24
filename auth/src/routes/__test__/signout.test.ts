import request from 'supertest'
import { app } from '../../app'


it('Clear the cookie after signout', async () => {
    await request(app)
    .post('/api/users/signup')
    .send({
        email: 't@t.com',
        password: 'password'
    })
    .expect(201)

    const res = await request(app)
    .post('/api/users/signout')
    .send({})
    .expect(200)

    //console.log(res)
})
