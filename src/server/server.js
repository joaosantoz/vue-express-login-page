import dotenv from 'dotenv';
import * as path from 'path';
import app from './app.js';

dotenv.config({
  path: path.resolve('../../', '.env'),
});

const PORT = process.env.VITE_API_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
