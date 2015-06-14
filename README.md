# AdalJS + Microsoft Graph api

Demo showing pure client side AAD login (without server) using AdalJS.

## Instructions

* Create an active directory app in azure management portal
* Set the signin url and app id url. For example: http://localhost:8089
* Add permissions - Office 365 unified API and set delegate permissions to `Read and write access to user mail`
* Edit `window.config.tenant` and `window.config.clientId`. If you remail is `prabir@domain.com` then your tenant is `domain.com`.
* Configure OAuth 2.0 implicit grant flow in the management portal by downloading the manifest file and set `oauth2AllowImplicitFlow` to `true` and upload the manifest file.
* Run the app in any http server. For example: `npm install -g http-server && http-server -p 8089`
* Open http://localhost:8089 in the browser