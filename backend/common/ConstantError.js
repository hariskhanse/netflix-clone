export const ConstantError = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    SERVER_ERROR: 500,
    UNPROCESSABLE_ENTITY: 422,
    UNAUTHORIZED_USER: 1001,
    FORBIDDEN_USER: 1002,
    FIELD_REQUIRED: "All fields are required",
    INVALID_EMAIL: "Invalid email format",
    PASSWORD_SHORT: "Password must be at least 6 characters long",
    ALREADY_EXITS: "User already exists",
    USER_CREATED: "User created successfully",
    CREATED: 201,
    WRONG_PASSWORD: "Wrong password",
    USER_NOT_FOUND: "User not found",
}

export const ControllerError = {
    SIGNUP: "Error in signup controller",
    LOGIN: "Error in login controller",
    LOGOUT: "Error in logout controller"
}
