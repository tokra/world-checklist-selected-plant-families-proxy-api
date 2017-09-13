# About
This is custom `proxy API` to to page: http://wcsp.science.kew.org/qsearch.do, which gets data and returns in JSON form:
```
[  
   {  
      "plantName":"Haworthia pygmaea Poelln., Repert. Spec. Nov. Regni Veg. 27: 132 (1929).",
      "moreDetails":"http://apps.kew.org/namedetail.do;jsessionid=F3BCAC2D8F169B00D4688ED75A29ED5C?name_id=277362"
   },
   {  
      "plantName":"Haworthia pygmaea var. acuminata (M.B.Bayer) M.B.Bayer, Haworthia Update 7(4): 36 (2012).",
      "moreDetails":"http://apps.kew.org/namedetail.do;jsessionid=F3BCAC2D8F169B00D4688ED75A29ED5C?name_id=473528"
   },
   {  
      "plantName":"Haworthia pygmaea var. argenteomaculosa (G.G.Sm.) M.B.Bayer, Aloe 34: 6 (1997).",
      "moreDetails":"http://apps.kew.org/namedetail.do;jsessionid=F3BCAC2D8F169B00D4688ED75A29ED5C?name_id=277363"
   },
   {  
      "plantName":"Haworthia pygmaea f. crystallina Pilbeam, Haworthia & Astroloba: 107 (1983), exact type not cited.",
      "moreDetails":"http://apps.kew.org/namedetail.do;jsessionid=F3BCAC2D8F169B00D4688ED75A29ED5C?name_id=277364"
   },
   {  
      "plantName":"Haworthia pygmaea var. dekenahii (G.G.Sm.) M.B.Bayer, Haworthia Update 7(4): 36 (2012).",
      "moreDetails":"http://apps.kew.org/namedetail.do;jsessionid=F3BCAC2D8F169B00D4688ED75A29ED5C?name_id=473529"
   },
   {  
      "plantName":"Haworthia pygmaea var. esterhuizenii (M.Hayashi) Breuer, Alsterworthia Int. 16(2): 6 (2016).",
      "moreDetails":"http://apps.kew.org/namedetail.do;jsessionid=F3BCAC2D8F169B00D4688ED75A29ED5C?name_id=521081"
   },
   {  
      "plantName":"Haworthia pygmaea var. fusca (Breuer) M.B.Bayer, Haworthia Update 7(4): 36 (2012).",
      "moreDetails":"http://apps.kew.org/namedetail.do;jsessionid=F3BCAC2D8F169B00D4688ED75A29ED5C?name_id=473530"
   },
   {  
      "plantName":"Haworthia pygmaea var. pygmaea .",
      "moreDetails":"http://apps.kew.org/namedetail.do;jsessionid=F3BCAC2D8F169B00D4688ED75A29ED5C?name_id=312732"
   },
   {  
      "plantName":"Haworthia pygmaea var. vincentii (Breuer) M.B.Bayer, Haworthia Update 7(4): 36 (2012).",
      "moreDetails":"http://apps.kew.org/namedetail.do;jsessionid=F3BCAC2D8F169B00D4688ED75A29ED5C?name_id=473531"
   }
]
```

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
