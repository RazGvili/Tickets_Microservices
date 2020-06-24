import request from 'supertest'
import { app } from '../../app'


it('Fails with incorrect password', async () => {
    await request(app)
    .post('/api/users/signup')
    .send({
        email: 't@t.com',
        password: 'password'
    })
    .expect(201)

    await request(app)
    .post('/api/users/signin')
    .send({
        email: 't@t.com',
        password: 'passworddd'
    })
    .expect(400)
})

it('Set-cookie worked', async () => {
    await request(app)
    .post('/api/users/signup')
    .send({
        email: 't@t.com',
        password: 'password'
    })
    .expect(201)

    const res = await request(app)
    .post('/api/users/signin')
    .send({
        email: 't@t.com',
        password: 'password'
    })
    .expect(200)

    expect(res.get('Set-Cookie')).toBeDefined()


})