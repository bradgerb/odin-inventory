#! /usr/bin/env node

require('dotenv').config();

const { Client } = require("pg");

const connection_string = process.env.connection_string;

const SQL = `
CREATE TABLE IF NOT EXISTS <<<tablename>>> (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
//   message VARCHAR ( 255 ),
//   username VARCHAR ( 255 ),
//   date DATE
);

INSERT INTO <<<tablename>>> (<<<params>>>) 
VALUES
//   ('Hi there!', 'Amando', CURRENT_DATE),
//   ('Hello World!', 'Charles', CURRENT_DATE);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: connection_string,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();