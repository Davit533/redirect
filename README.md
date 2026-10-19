# ChatSchool domain redirect

This small Render web service sends every visitor to `https://chatschool.int.yt`.
The `/health` endpoint returns a simple status response for Render health checks.

## Deploy on Render

Create a new Web Service from this repository and use the included `render.yaml`
Blueprint. The service is named `chatschool` so Render can assign
`https://chatschool.onrender.com` if that service name is available to your
account. Render controls availability of `onrender.com` names, so the Blueprint
cannot reserve a name that another active or recently deleted service still
holds. If Render rejects the name, wait for it to be released or choose a new
service name; the redirect itself will still work on the new Render URL.

The free service may sleep when idle, so its first redirect after inactivity
can take a little longer while Render wakes it.
