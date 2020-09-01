const chai = require('chai');
const assert = chai.assert;
const {findCourseById} = require('../services/courses-helper');
const uuid = require('uuid');


describe('Course Helper Tests', function () {
    it('should return valid course when finding existing course', function () {
        const id = "1";
        const course = findCourseById(id);
        assert.isDefined(course);
        assert.equal(course.id, id)
    });

    it('should return null course for invalid Id', function () {
        const id = uuid.v1();
        const course = findCourseById(id);
        assert.isUndefined(course);
    });
});
