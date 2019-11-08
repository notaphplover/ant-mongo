FROM mongo:latest
COPY ./src/test/users.json /users.json
CMD mongoimport --host mongo --db ant-mongo --collection users --type json --file /users.json --jsonArray
