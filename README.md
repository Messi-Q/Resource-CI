# Educational Resource Confirmation Project Based on Blockchain
Introduction
   
   &emsp;&emsp;To implement a resource uploading and trading website, users can upload and download files and purchase rights and read rights of the resources in the website; the ownership of the file can confirm the file and confirm the right to use the method of adding watermark.
   
   &emsp;&emsp;The website uses [react](https://reactjs.org/)+[redux](http://www.redux.org.cn/) to implement the front page and logic, the background uses the [nodejs](https://nodejs.org/en/)+express framework, the database uses mysql (mongodb is also possible); the JWT (json web token) tool is used to store the browser after the localUser logs in.
   
   &emsp;&emsp;The highlight of the site is based on blockchain technology, using hyperleger composer (a coalition chain) to write smart contracts, execute the composer-rest-sever command, provide access to the composer api interface, and the foreground uses the fetch tool to call the rest-api interface. Implement interaction with blockchain data
   
   TODO:
   1. Download the file from server
   2. finish the transaction with the contratcts written by hyperledger composer
   
   
