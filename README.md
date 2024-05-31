## Requirements:

install the following:
- Node [Node v20 (LTS)](https://nodejs.org/en/download/)
- Postgres [Postgres](https://www.postgresql.org/download/)
- Ngrok [Ngroak install](https://ngrok.com/docs/getting-started/)

## Create Database
- In your terminal: `psql -U postgres`
- afterwards create database `CREATE DATABASE certify_doc_db`.
- then connect to your database by running `\c certify_doc_db`.
- then run your database script which is located in db folder as `database-script.sql. 
- To run your script run `\i (drag file here which will add the path)

### To run the server:
 - On your terminal:
1.  `npm i` or `yarn`.
2. Start sever: `npm run server` or `yarn server`.
3. Expose server to other users using ngrok: `ngrok http 3000`.

### TO-DO

- [ ] Add comments to code.