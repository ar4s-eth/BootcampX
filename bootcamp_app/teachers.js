const { Pool } = require('pg');

const pool = new Pool({
  user: 'ar4s',
  password: '',
  host: 'localhost',
  database: 'bootcampx'
});

// const cohortName = process.argv[2];
// const limit = process.argv[3] || 5
// const values = [`%${cohortName}%`, limit];

// const query = `
// SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
// FROM teachers
// JOIN assistance_requests ON teacher_id = teachers.id
// JOIN students ON student_id = students.id
// JOIN cohorts ON cohort_id = cohorts.id
// WHERE cohorts.name = $1
// ORDER BY teacher;`;

// pool.query(query, values)
// .then((res) => {
//   res.rows.forEach((row) => {
//     console.log(`${row.cohort}: ${row.teacher}`);
//   });
// })
// .catch((err) => {
//     console.log("query error", err.stack);
// });

const queryString = `
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name = $1
ORDER BY teacher;`;

const cohortName = process.argv[2] || "MAY07";
const values = [cohortName];

pool.query(queryString, values)

.then((res) => {
  res.rows.forEach((row) => {
    console.log(`${row.cohort}: ${row.teacher}`);
  });
})
.catch((err) => {
    console.log("query error", err.stack);
});