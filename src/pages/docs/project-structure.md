---
layout: ../../layouts/DocsLayout.astro
title: Project Structure
description: Gungnir applications follow predictable conventions so application code is easy to find and maintain.
---

A newly created Gungnir application follows a convention-first directory structure:

~~~text
my-app/
├── app/
│   ├── controllers/
│   ├── middleware/
│   └── models/
├── config/
├── database/
│   └── migrations/
├── routes/
│   └── web.gnr
├── views/
├── .env
├── .env.example
└── .gungnir-project
~~~

## Application code

### Controllers

Place HTTP controllers in `app/controllers/`.

~~~gungnir
controller UserController
{
    Response index()
    {
        return json(User::all());
    }
}
~~~

### Models

Place application models in `app/models/`.

~~~gungnir
model User
{
    string name;
    string email;
    bool active = true;
}
~~~

### Middleware

Place request middleware in `app/middleware/`.

~~~gungnir
middleware AuthMiddleware
{
    async Response handle(Request request, Next next)
    {
        if (!request.authenticated()) {
            return text("Unauthorized", 401);
        }

        return await next(request);
    }
}
~~~

## Routes

Web routes live in `routes/web.gnr`. Keep route declarations focused on URLs, controller actions, route groups, and middleware.

## Database

Database migrations live in `database/migrations/`. Models belong in `app/models/`; migrations describe how persistent storage evolves over time.

## Views

Server-rendered templates live under `views/` by default. The root can be changed through application configuration.

## Generated files

The `.gungnir/` directory is framework-managed build output. Application developers should not treat generated C++ as normal source files to edit.
