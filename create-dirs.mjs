import fs from 'fs';
import path from 'path';

const dirs = [
  'd:\\projects\\weyap\\src\\routes\\(marketing)',
  'd:\\projects\\weyap\\src\\routes\\(auth)',
  'd:\\projects\\weyap\\src\\routes\\(auth)\\login',
  'd:\\projects\\weyap\\src\\routes\\(auth)\\register',
  'd:\\projects\\weyap\\src\\routes\\(app)',
  'd:\\projects\\weyap\\src\\routes\\api\\auth',
];

dirs.forEach(dir => {
  fs.mkdirSync(dir, { recursive: true });
  console.log(`Created: ${dir}`);
});
