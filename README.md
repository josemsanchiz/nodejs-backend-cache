# nodejs-backend-cache

 
The goal of this exercise is to have a service writen in NodeJS+Typescript that can handle API calls to a information

provider
  

## Description of the problem

We have a service that doesn´t have information by itself. We need to get the prices of Bitcoin with a timeframe of one minute. This service needs to call to a third party provider to get this information with this limitations:

  

-  **The most important rule. The system can´t do more than a call by minute.**
- Information with more than a minute of life is considered obsolete.
- The system will expose only one endpoint to get this information.

## Description of the behaviour of our service

When the service starts we don´t have any information in our database. We need to make a call to the provider to fill our database. Then we have this expected behaviour:
- We don´t have information in our database. In this case we need to make a request to the provider. We need to avoid to duplicate calls to the provider, for this reason we need a system that can block a second call until we have information.
- We have information in our database and this information have less than 1 minute. We return this information
- We have information in our database and this information have more than 1 minute. We need to refresh the information with the provider and return the information that we have (even if this information is obsolete).

The main target of the system is to respond most quick as possible, we don´t want to wait until we have information available. If we´re waiting information from the provider and don´t have information we will return an error to our client.

## Provider information format

Our provider returns a response like this:
```
    {
        "timestamp": 1651160061,
        "data": [
            {
                "symbol": "BTCUSDT",
                "price": 57689
            },
            ...
        ]
    }
```
