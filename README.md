## NestJS Full Capabilities

This project shows all the working features of NestJS using a clean architecture design.

All features were tested on Ubuntu 20.04.4 LTS using NodeJS v16.13.2 and NPM v8.1.2. 

### Installation:
`npm i`

### Running:
`docker-compose up`
`npm run start:dev`

### For manual testing
#### Rest api and message system:
Import the collection found in ./postman to your postman
    
#### Graphql:
1. http://localhost:3000/graphql (a query sample is found in ./sample)
2. https://studio.apollographql.com/sandbox/explorer

#### Kafka
For the message system testing, the response will only be printed in the console.
The event api will emit and forget, whereas the message api will wait for a response with the total sum of numbers.