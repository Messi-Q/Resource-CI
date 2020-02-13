# Resource Confirmation and Infringement Tracking ![GitHub stars](https://img.shields.io/github/stars/Messi-Q/React-Resource-confirmation-Infringement.svg?style=plastic) ![GitHub forks](https://img.shields.io/github/forks/Messi-Q/React-Resource-confirmation-Infringement.svg?color=blue&style=plastic) ![License](https://img.shields.io/github/license/Messi-Q/React-Resource-confirmation-Infringement.svg?color=blue&style=plastic)

## Introduction
   &emsp;&emsp;This application aims to implement a website about resource uploading,trading,confirming and so on. Users can upload and download files(pictures,pdf,video are available) and purchase ownership and read-rights of the resources in the website; the ownership of the file can confirm the file and confirm the right to use the method of adding [watermark](https://github.com/Messi-Q/python-watermark).
   
   &emsp;&emsp;The website uses [react](https://reactjs.org/)+[redux](http://www.redux.org.cn/) to implement the front page and logic, the server uses the [nodejs](https://nodejs.org/en/)+[express](http://expressjs.com/) framework, the database uses [mysql](https://www.mysql.com/)(mongodb is also possible); the [JWT](https://jwt.io/introduction/) (json web token) tool is used to store the browser after user logs in.
   
   &emsp;&emsp;The highlight of this system is based on blockchain technology, using hyperleger composer (a coalition chain) to write smart contracts, execute the composer-rest-sever command, provide access to the composer api interface, and the foreground uses the fetch tool to call the rest-api interface. Implement interaction with blockchain data.The code of smart-contracts given [here](https://github.com/Messi-Q/SmartContract-hyperledgerComposer).
 
  

## Deploy this application
  
  &emsp;&emsp;To deploy this application, you need to install the environment of [Hyperleger Composer](https://hyperledger.github.io/composer/latest/installing/installing-index).
  
  ### &emsp;&emsp;1.Client
  
  &emsp;&emsp;Front-end development mainly uses the react framework.This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
  You will find some information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).<br>
  To install this repo and find out more about the sample applications, run (from the directory -- client):
  
  
  
  ```
    npm install (Install related dependencies)
    npm start (start the react)
  
  ```
  This will open the main page, as well as Playground(http://localhost:8080) and the REST server(http://localhost:3000).
  
  ### &emsp;&emsp;2.Server
  
  &emsp;&emsp;Backend development mainly uses the express framework.
  
  To open the server and find out more about the sample applications, run (from the directory -- server):
  
  
  
  ```
    npm install (Install related dependencies)
    npm start (start the server)
  
  ```
   This will open the server, as well as the connection of mysql.  
   
   
   
   ### Reference
   ```
   Peng Qian, Zhenguang Liu, Xun Wang, Jianhai Chen, Bei Wang, Roger Zimmermann. 
   Digital Resource Rights Confirmation and Infringement Tracking Based on Smart Contracts. 
   CCIS 2019. Best Paper Runner-up Award.
   ```
   
   
