# leanne1-node-express-auth

Full-stack Express React application demonstrating various user authentication strategies.

## Branches

- `master`: Session authentication using Passport Local and session cookie. Sessions stored in Redis. Authentication is persisted across browser session/refresh. Includes CSRF protection via disabling of CORS (by default) and accepting only JSON request body.
- `jwt`: JWT authentication with JWT issued and stored in Local Storage. Authentication is persisted across browser session/refresh.


## Install

- Clone this repo
- `npm i`
- Generate an SSL certificate and private key (requires [OpenSSL](https://www.openssl.org/)):
```
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout dev.key -out dev.crt
```
- Add both the `.crt` and `.key` file to the root directory
- [Install MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)
- For session strategy (`master` branch) [install Redis](https://1upnote.me/post/2018/06/install-config-redis-on-mac-homebrew/)

## Run
- Start the Mongo daemon: `mongod`
- If `master` branch (sessions) start Redis: `redis-server`
- `npm run dev` => `https://localhost:8443`
- Click proceed on browser SSL certificate warning
- Use Mongo Compass to inspect the `user` database


## Notes

- A config `.env` file is included in the repo for completeness but application config should not
normally be stored with the application, including encryption/decryption secrets!
