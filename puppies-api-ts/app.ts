import express from 'express';
import { Request, Response, Application } from 'express';
import puppies, { Puppy } from './db';
import cors from 'cors';

const app: Application = express();

app.use(cors());
app.use(express.json());

// - GET: `api/puppies`. This should return a list of all puppies in JSON-format.
app.get('/api/puppies', (_req: Request, res: Response) => {
  return res.json(puppies);
});

// - GET: `api/puppies/:id`. This should return one puppy in JSON-format.
app.get('/api/puppies/:id', (req: Request, res: Response) => {
  return res.json(puppies.find(puppy => `${puppy.id}` === req.params.id));
});

// - POST: `api/puppies`. This should create and return the newly added puppy.
app.post('/api/puppies', (req: Request, res: Response) => {
  const puppy: Puppy = {
    id: puppies.reduce((a, b) => b.id > a.id ? b : a).id + 1,
    breed: req.body.breed,
    name: req.body.name,
    dob: new Date(req.body.dob),
  }
  puppies.push(puppy);
  return res.status(201).json(puppy);
});

// - PUT: `api/puppies/:id`. This should put one puppy down (jk, just update the specific puppy).
app.put("/api/puppies/:id", (req: Request, res: Response) => {
  const puppyIndex = puppies.findIndex(puppy => `${puppy.id}` === req.params.id);
  const { name, dob, breed } = req.body;
  puppies[puppyIndex] = { id: Number(req.params.id), name, dob: new Date(dob), breed };
  return res.json(puppies[puppyIndex]);
});

// - DELETE: `api/puppies/:id`. This should actually put one puppy down aka delete it.
app.delete('/api/puppies/:id', (req: Request, res: Response) => {
  const puppyIndex = puppies.findIndex(puppy => `${puppy.id}` === req.params.id);
  if (puppyIndex > -1) {
    return res.json(puppies.splice(puppyIndex, 1));
  } else {
    return res.status(404).json({ message: "Not found" });
  }
});

export default app;
