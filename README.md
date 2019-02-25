# leanne1-node-express-auth

Full-stack Express React application demonstrating various user authentication strategies.

## Install

- Clone this repo
- `npm i`
- Generate an SSL certificate and private key (requires [OpenSSL](https://www.openssl.org/)):
```
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout dev.key -out dev.crt
```
- Add both the `.crt` and `.key` file to the root directory
- [Install MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)


## Run
- Start the Mongo daemon: `mongod`
- `REDIS_STORE_SECRET=secret SESSION_SECRET=secretaswell npm run dev` => `https://localhost:8443`
- Click proceed on browser SSL certificate warning
- Use Mongo Compass to inspect the `user` database


## Notes

- A config `.env` file is included in the repo for completeness but application config should not
normally be stored with the application, including encryption/decryption secrets!
