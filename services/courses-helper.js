const fs = require('fs');

let courses;
fs.readFile('courses.json', 'utf8', function (err, data) {
    if (err) throw err;
    courses = JSON.parse(data);
});


const findCourseById = function (courseId) {
    return courses.find(course => course.id === courseId);
};


module.exports = {
    findCourseById,
};
