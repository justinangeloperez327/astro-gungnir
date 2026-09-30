---
title: "Events, Notifications & Mail"
description: "Define application events, listeners, notifications, and mail as first-class Gungnir declarations."
slug: "application-services"
group: "Application"
groupOrder: 6
order: 1
status: preview
---

## Events

~~~gnr
event UserRegistered {
    User user;
}
~~~

Events describe application occurrences.

## Listeners

~~~gnr
listener SendWelcomeNotification {
    public handle(UserRegistered event) {
        Notification::send(
            event.user,
            WelcomeNotification()
        );
    }
}
~~~

Listeners react to events.

## Notifications

~~~gnr
notification WelcomeNotification {
    public via(User user) {
        return ['mail'];
    }

    public mail(User user) {
        return WelcomeMail(
            user: user
        );
    }
}
~~~

Notifications choose one or more delivery channels.

## Mail

~~~gnr
mail WelcomeMail {
    User user;

    public subject() {
        return 'Welcome to Gungnir';
    }

    public content() {
        return view('mail/welcome', {
            'user': user
        });
    }
}
~~~

The canonical language treats events, listeners, notifications, and mail as first-class application declarations.

Because Gungnir is pre-1.0, consult the current compiler/runtime build when depending on these newer declaration forms.
