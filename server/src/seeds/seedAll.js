import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seeds = [
  'seedUsers.js',
  'seedStudents.js',
  'seedTeachers.js',
  'seedCourses.js',
  'seedGrades.js',
  'seedAttendance.js',
  'seedLibrary.js',
  'seedEvents.js',
  'seedFinance.js',
  'seedDocuments.js',
];

for (const seed of seeds) {
  console.log(`Running ${seed}...`);
  execSync(`node ${seed}`, { stdio: 'inherit', cwd: __dirname });
}

console.log('All seeds completed!'); 