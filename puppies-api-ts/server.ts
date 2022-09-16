import app from './app';
const port: number = 4000;

app.listen(port, (): void => {
  console.log(`Example app listening on port ${port}`);
});