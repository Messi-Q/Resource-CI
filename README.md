# Resource Confirmation Project Based on Blockchain
## Introduction
   
   &emsp;&emsp;This application aims to implement a website about resource uploading,trading,confirming and so on. Users can upload and download files(pictures,pdf,video are available) and purchase ownership and read-rights of the resources in the website; the ownership of the file can confirm the file and confirm the right to use the method of adding [watermark](https://github.com/Messi-Q/python-watermark).
   
   &emsp;&emsp;The website uses [react](https://reactjs.org/)+[redux](http://www.redux.org.cn/) to implement the front page and logic, the background uses the [nodejs](https://nodejs.org/en/)+express framework, the database uses [mysql](https://www.mysql.com/)(mongodb is also possible); the [JWT](https://jwt.io/introduction/) (json web token) tool is used to store the browser after user logs in.
   
   &emsp;&emsp;The highlight of the site is based on blockchain technology, using hyperleger composer (a coalition chain) to write smart contracts, execute the composer-rest-sever command, provide access to the composer api interface, and the foreground uses the fetch tool to call the rest-api interface. Implement interaction with blockchain data.The code of smart-contracts given [here](https://github.com/Messi-Q/SmartContract-hyperledgerComposer).
   
   TODO:
   1. Download the file from server
  

## Deploy this application
  
  &emsp;&emsp;To deploy this application, you need to install the environment of [Hyperleger Composer](https://hyperledger.github.io/composer/latest/installing/installing-index).
  
  &emsp;&emsp;
  
   
   
