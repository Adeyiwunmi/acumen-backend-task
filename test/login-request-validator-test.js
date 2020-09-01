const chai = require('chai');
const assert = chai.assert;
const {validateLoginRequest} = require('../validators/login-request-validator');

describe('Login Request validator Tests', function () {
    it('should return error for invalid request', function () {
        const invalid_request_body = {
            user: 'abnd',
            pass: 'secretPassword'
        };
        const validateResult = validateLoginRequest(invalid_request_body);
        assert.isDefined(validateResult.error);
    });

    it('should not return error for valid request', function () {
        const valid_request_body = {
            username: 'abnd',
            password: 'secretPassword'
        };
        const validateResult = validateLoginRequest(valid_request_body);
        assert.isUndefined(validateResult.error);
    });
});
