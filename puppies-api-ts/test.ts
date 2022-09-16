import request from 'supertest';
import app from './app';
import puppies from './db';

const db = () => puppies.map(p => ({ ...p, dob: p.dob.toISOString() }))

describe('Testing api endpoint', () => {
  test('gets one', async () => {
    const res = await request(app).get('/api/puppies/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(db()[0]);
  });
  test('gets all puppies', async () => {
    const res = await request(app).get('/api/puppies');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(db());
  });
  test('adds one puppy', async () => {
    const newPuppy = { name: 'Morti', breed: 'Darki', dob: new Date().toISOString() }
    const res = await request(app).post('/api/puppies').send(newPuppy);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual({ ...newPuppy, id: 11 });
  });
  test('updates a puppy', async () => {
    const updatedPuppy = { name: 'Morti', breed: 'Darki', dob: new Date().toISOString() }
    const res = await request(app).put('/api/puppies/1').send(updatedPuppy);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ id: 1, ...updatedPuppy });
  });
  test('deletes one', async () => {
    const beforeDeleteLen = db().length;
    const beforeDeleteCopy = db()[0];
    const res = await request(app).delete('/api/puppies/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body[0]).toEqual(beforeDeleteCopy);
    expect(db().length).toBe(beforeDeleteLen - 1);
  });
});
