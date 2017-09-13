# world-plant-search API
World plant species search APP
* custom API to page: http://wcsp.science.kew.org/qsearch.do

## Usage
* `yarn start` or `npm run start` 
* server will run default on: http://localhost:3000/
* server exposes API which you can use to search plants:</br>
e.g: `http://localhost:3000/v1/searchPlants?q=Haworthia`</br>
or: `http://localhost:3000/v1/searchPlants?q=Haworthia%20pygmaea`</br>
where `q` is search query where you specify plant name  
