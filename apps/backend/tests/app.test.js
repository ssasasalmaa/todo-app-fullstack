import request from 'supertest';
import express from 'express';

// Contoh server minimal untuk ngetes setup Jest
const app = express();
app.get('/test', (req, res) => {
  res.status(200).json({ message: 'Jest is working!' });
});

describe('Sample Test Suite', () => {
  it('should return 200 and success message', async () => {
    const res = await request(app).get('/test');
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Jest is working!');
  });
});