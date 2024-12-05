import "@typespec/http";
import "@typespec/rest";
import "@typespec/openapi3";

using TypeSpec.Http;

@service({
    title: "CoLabs Backend",
})
@server("https://example.com", "Backend server endpoint")
namespace CoLabs;

@error
model NotFoundError {
  code: "NOT_FOUND";
  message: string;
}

@error
model ValidationError {
  code: "VALIDATION_ERROR";
  message: string;
  details: string[];
}

// highlight-start
@error
model UnauthorizedError {
  code: "UNAUTHORIZED";
  message: string;
}
// highlight-end

@error
model InternalServerError {
  code: "INTERNAL_SERVER_ERROR";
  message: string;
}

model User {
    id: int32;

    @minLength(1)
    name: string;

    @minLength(1)
    email: string;

    @minLength(1)
    password: string;

    avatar_url: string;
    location: string;
    bio: string;
    twitter_username: string;
    blog: string;
    company: string;
}

@get
op getUser(@path userId: int32): {
    @statusCode statusCode: 200;
    @body user: User;
} | {
    @statusCode statusCode: 404;
    @body error: NotFoundError;
};


@post
op createUser(@body user: User): {
    @statusCode statusCode: 201;
    @body user: User;
}| {
    @statusCode statusCode: 400;
    @body error: ValidationError;
};

