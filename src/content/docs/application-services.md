---
title: "Application Services"
description: "Events, listeners, jobs, scheduling, notifications, and mail in current Gungnir applications."
slug: "application-services"
group: "Application"
groupOrder: 6
order: 1
status: development
---

## Events and listeners

Declare typed events and inject `Events` into producers. Generated applications register listeners during boot. Synchronous dispatch invokes listeners in priority order; async listeners require awaited `dispatchAsync`. Events run in the current process and have no persistence or retry policy.

Read [Events](/docs/events/) and [Listeners](/docs/listeners/).

## Jobs and queues

A `job` contains serializable data and a `handle()` method. Inject `Queue` to dispatch it. Injected services are resolved in the worker, rather than serialized into the payload.

```sh
gungnir queue:work
gungnir queue:work --once
```

Use a shared queue such as Redis when producer and worker run in separate processes. Jobs may execute more than once; handlers must tolerate retries. Read [Queues and Jobs](/docs/queues/).

## Scheduling

Define `function void schedule(Scheduler schedule)` in `routes/console.gnr`. The application registers it during boot; workers and schedulers start explicitly:

```sh
gungnir schedule:run
gungnir schedule:work
```

Scheduled jobs publish to the configured queue. Multi-process locks require a shared lock store. Read [Scheduler](/docs/scheduler/).

## Notifications and mail

Notifications select channels with `via` and compose messages with `toMail` and `toDatabase`. Mail declarations compose subject, text, and HTML. Configure the application's transport and delivery adapters in bootstrap.

Read [Notifications](/docs/notifications/) and [Mail](/docs/mail/).
