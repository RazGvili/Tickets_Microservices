import request from 'supertest'
import { app } from '../../app'

it('201 on successful sign up', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 't@t.com',
            password: 'password'
        })
        .expect(201)
})

it('400 on bad email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'tt.com',
            password: 'password'
        })
        .expect(400)
})

it('400 on duplicate email', async () => {
    await request(app)
    .post('/api/users/signup')
    .send({
        email: 't@t.com',
        password: 'password'
    })
    .expect(201)

    await request(app)
    .post('/api/users/signup')
    .send({
        email: 't@t.com',
        password: 'password'
    })
    .expect(400)
})

it('Set-Cookie in case of signup', async () => {
    const res = await request(app)
    .post('/api/users/signup')
    .send({
        email: 't@t.com',
        password: 'password'
    })
    .expect(201);

    expect(res.get('Set-Cookie')).toBeDefined()

})