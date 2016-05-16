# Survey

A web app that asks true/false questions and displays the results. (will be expanded to include user accounts)

Usage:

  1)  Install Node.js and mongoDB if you haven't already. 
  
  2)  Clone the project and run npm install inside the project folder
  
  3) run mongod if it's not running already
  
  4) run node server.js (In the project folder) use nodemon if you have it
  
  5)  There's no frontend for uploading questions yet so you'll have to get 
      a litlle technical. Using Postman or any other api testing/request sending app
      of your choosing, send form-data containing a key/value pair in a POST 
      request to webAdress:8180/api/questions. It should look like:
      
      url (If running locally): 
        localhost:8180/api/questions
      
      Key/value pair:
        question: Enter question here. (Note: the key must be "question")
  
  3)  Using a web browser, go to webAdress:8180/form (Note: the port number can be changed in config.js).
      If you're running locally, that would be:
      
      localhost:8180/form
  
  4)  It's done!! People can now provide their names and proceed to take the survey

See a working version at http://webct.net:8180/form
