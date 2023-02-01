# studentProject
To successfully launch the project you need:
1. Write this command to the terminal
   npm i
  
2. Install MongoDB, PostgreSQL, Redis
    - PostgreSql create a database named studendProject
   
3. After all the necessary packages and programs are installed, you need to create a config.ts file in the main root and paste this code into it

   export const jwtsecret ="" // secret phrase for JWT token
export class conf{
     static username:string = "" // PostgreSQL username
     static password:string = "" // PostgreSQL password
     static host:string ="localhost" // don't need to change anything here
     static port:number = 5432 // this port is used by default in PostgreSQL
     static database:string = "studentProject" // database name
     static dialect:string ="postgres" // nothing to change here
     static mongo:string ="mongodb://localhost:27017" // string to connect to MongoDb
     static url:string = 'redis://127.0.0.1:6379' // string to connect to Redis
}

4. Create .env file in main root and paste this code

     DATABASE_URL="postgres://Username:password@localhost:5432/DatabaseName"
     
5. Paste this command into the terminal, it will create all the necessary tables in PostgreSQL
   
   npm run migrate up
    
6. Populate the database using Postman/Insomnia or in PGAdmin 4 in manual format
7. It remains only to write 2 commands to the terminal
    npm run build
    npm run start
