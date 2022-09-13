# Node_Authentication_API
```sh
Nodejs API for Authentication
```


## Tech Stack
```sh
* Express.js
* Handlebars
* MySQL
* JWT (Json Web Token)
```

## Get Started

1. Clone this repository
```sh
git clone https://github.com/dollpriyanka/Node_Authentication_API
```
2. Go to the cloned directory
3. Initialize the directory
```sh
npm init -y
```
4. Install dependencies
```sh
npm install
```

## API  USED

 
```sh 
POST/login:
       To login a user we need to send email and password of the user in http body
```
```sh
POST/sign-up:
       To signup a user we need to send name, email, password of the user in http body
```
```sh
POST/forgot_password:
       If a user forgot their password we need to send email and get a token in the http body
```
```sh
PATCH/reset_password:
       Using forgot_password email we need to generate new password using http body
```

## Input_and_Output 
```sh

    
          1.Sign-up:
                  Http body: {
                    "name":"Jack Melson",
                    "email": "test@gmail.com",
                    "password":"test123$",
                    "confirm password":"test123$"
                  }
                  Response: {
                    "token": "yjgsjjsgysy789fehfhklijlejlejrljlwjkwjkjwrkljrlrjfks,s,gggn,k"
                  }
          2.Login:
                  Http body: {
                    "email": "test@gmail.com",
                    "password":"test123$"
                  }
                  Response: {
                    "token": "yjgsjjsgysy789fehfhklijlejlejrljlwjkwjkjwrkljrlrjfks,s,gggn,k"
                  }
          3.Forgot_Password:
                  Http body: {
                    "email": "test@gmail.com"
                  }
                  Response: {
                    "token": "yjgsjjsgysy789fehfhklijlejlejrljlwjkwjkjwrkljrlrjfks,s,gggn,k"
                  }
          4.Reset_Password:
                  Http body: {
                    "password":"test123$"
                  }
                  Response: {
                    "token": "yjgsjjsgysy789fehfhklijlejlejrljlwjkwjkjwrkljrlrjfks,s,gggn,k"
                  }

```
