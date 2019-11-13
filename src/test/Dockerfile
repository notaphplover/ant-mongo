FROM mongo:latest
COPY ./src/test/fixtures/users.json /users.json
CMD mongoimport --host ant_mongo --db ant-mongo --collection users --type json --file /users.json --jsonArray
