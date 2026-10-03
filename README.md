# Orthodox Calendar

## Installation

First get this up and running (see its readme):
https://github.com/dimaip/calendar-backend

Then:

```
git clone https://github.com/dimaip/calendar
cd calendar
yarn
yarn start
```

Or `yarn build` for production build.

## Broadcast schedules

Admins manage one-off and weekly broadcasts at `/#/admin/broadcasts`.
Enter the start date and time in Moscow time; viewers see their local time.
Weekly broadcasts repeat on the starting weekday until deleted. Individual
occurrences can be edited or cancelled. A stream URL is optional and falls back
to the channel homepage. App admins are listed by their Zitadel user IDs in the
Convex `UPDATES_ADMIN_USER_IDS` environment variable.

CI runs frontend and backend tests, tooling tests, the existing quality ratchets,
and a production build on Node 22 and 24. The modernization-only scope and
byte-equality gates remain available for future runtime-preserving tooling work;
intentional feature changes are checked by the regular verification workflow.
