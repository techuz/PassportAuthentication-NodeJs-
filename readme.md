Passport authentication in NodeJS 
This project describes the steps for authentication in NodeJS using Passport.
Getting Started

Prerequisites

	git clone git@github.com:techuz/PassportAuthentication-NodeJs-.git

Installing

Please follow the below steps:
1. Go to the project directory

		cd PassportAuthentication-NodeJs-

2.  Install packages

    	npm install

3.  Start NodeJS server

    	node server.js
   

   Now, Project will be running on 8080 port.

Test Cases:
 
A) Signup 
    
         Method :  Post
         Url        :  http://localhost:8080/api/users/signup
         Body    : {      
			"email":"test@test.com",
  			"password":"test@123"
		}
                     
        Response : {
			"isSucess": true,
			"data": "User created successfully"
		  }



B) User Login


       Method  :  Post
       Url         :  http://localhost:8080/api/users/login
       Body      : {      
			    "email":"test@test.com",
     			 "password":"test@123"
		 }
    Response :{
			"isSucess": true,
			"data": {
			"token": "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1YTAwM2VlODAzZmQ5NDU3NTQwNmQyNDQiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCQ3WWYxNC5xdWZXd2MxV25ham16YVUuQ3cySkpsRXUzSWZmLkpxcUVSZkhsb0pGc1BHcWpMLiIsIl9fdiI6MH0.R2O6TTKmHaFevURmKLMlcUF7fB2ZziKVzONgt-N_iQw"
		}
	}
	
C) Get login user details (Once the token is generated pass it to header)


	Method : Get
	Url : http://localhost:8080/api/users/me
	header : {
		Authorization : Token which you got in login response
	}
	response : {
		"isSucess": true,
		"data": {
			"_id": "5a003ee803fd94575406d244",
			"email": "test@test.com",
			"__v": 0
		}
	}

D) Get the list of all user (Only logged in/authenticated users can access it)


	Method : Get
	Url    : http://localhost:8080/api/users/
	header : {
		Authorization : Token which you got in login response
	}
	Response : {
		"isSucess": true,
		"data": [{
			"_id": "5a0005ca53389c3a7deda5ba",
			"email": "abc@gmail.com",			
			"__v": 0
		}]
	}



E) Forgot Password

	Method : Post,
	Url : http://localhost:8080/api/users/forgotPassword,
	Body : {
		“email“:”abc@gmail.com”
	}
	Response : {
		"isSucess": true,
		"data": {
		"token": "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1YTAwM2VlODAzZmQ5NDU3NTQwNmQyNDQiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCQ3WWYxNC5xdWZXd2MxV25ham16YVUuQ3cySkpsRXUzSWZmLkpxcUVSZkhsb0pGc1BHcWpMLiIsIl9fdiI6MH0.R2O6TTKmHaFevURmKLMlcUF7fB2ZziKVzONgt-N_iQw"
		}
	}



F) Change Password
	
	Method : Post,
	Url : http://localhost:8080/api/users/changePassword,
	header : {
	    	Authorization : Token which get from forgot password resposnse
	}
	Body : {      
		 "email":"test@test.com",
     	     	 "oldPassword":"test@123",
        	 "password":"test123"
	}
	Response : {
		"isSucess": true,
		"data": "Password updated successfully"
	}


