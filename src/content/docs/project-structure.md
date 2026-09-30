---
title: "Directory Structure"
description: "Understand the directories created by the current Gungnir project scaffold."
slug: "project-structure"
group: "Getting Started"
groupOrder: 1
order: 5
status: preview
---

A new project currently follows this structure:

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

## App

`app/controllers/`, `app/models/`, and `app/middleware/` contain application source.

## Routes

`routes/web.gnr` contains the application's web route declarations:

~~~gungnir
Route::get("/", HomeController::index);
~~~

## Views

`views/` contains server-rendered HTML templates.

## Database

`database/migrations/` contains migration source used by the migration CLI.

## Generated Output

The CLI creates native build files under:

~~~text
.gungnir/
~~~

Do not treat that directory as application source. Rebuild or regenerate it through the Gungnir CLI.
