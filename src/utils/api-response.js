const httpStatus = require('http-status');

class ExtendableError extends Error {
    constructor({message, errors, status, isPublic, stack,}) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.errors = errors;
        this.status = status;
        this.isPublic = isPublic;
        // This is required since bluebird 4 doesn't append it anymore.
        this.isOperational = true;
        this.stack = stack;
    }
}

class ApiError extends ExtendableError {
    constructor({message, errors, stack, status = httpStatus.INTERNAL_SERVER_ERROR, isPublic = false,}) {
        super({errors, isPublic, message, stack, status});
    }
}

function success(typeOrMessage, data = null) {
    let message = '';

    switch (typeOrMessage) {
        case 'FETCH':
            message = 'Data fetched successfully';
            break;

        case 'UPDATE':
            message = 'Data updated successfully';
            break;

        case 'DELETE':
            message = 'Data deleted successfully';
            break;

        default:
            message = typeOrMessage;
            break;
    }

    return {
        data,
        message,
    };
}

module.exports = {
    Error: ApiError,
    success,
};
