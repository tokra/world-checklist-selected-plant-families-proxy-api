# About
This is custom `proxy API` to to page: http://wcsp.science.kew.org/qsearch.do, which gets data and returns in JSON form

## Usage
* `yarn start` or `npm run start` 
* server will run default on: http://localhost:3000/
* server exposes API which you can use to search plants:</br>
e.g: `http://localhost:3000/v1/searchPlants?q=Haworthia`</br>
or: `http://localhost:3000/v1/searchPlants?q=Haworthia%20pygmaea`</br>
where `q` is search query where you specify plant name  

## Why
* I plant to integrate this API in my app, to get info of plants,
and parsing in APP could be more expensive operation, I would rather have this `proxy API` which will be called instead
