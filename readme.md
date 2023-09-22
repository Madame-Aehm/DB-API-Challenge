Distance calculator train stations 
In Germany there are about 360 train stations that are served by ICs and ICEs. Each station has a unique two to six digit short identifier, the so-called DS100 code. DB Station&Service AG provides the list of all stations [1] as a CSV file. The stations served by long-distance traffic are marked with FV in the traffic column. FV stands for long-distance transport. 
Task 
A distance calculator is to be programmed for better orientation. It calculates the linear distance between any two long-distance train stations. In the CSV file you will find the respective longitude and latitude for each station. 
Write a web service that exposes a REST interface. For example, to determine the route between Frankfurt Main Hbf (FF) and Berlin Hbf (BLS), the service should offer the following REST interface: 

GET /api/v1/distance/FF/BLS 
We expect the following JSON response as an answer: 
{ 
 "from": " ", 
 "to": "Berlin Hbf", 
 "distance": 423, 
 "unit": "km" 
} 
The value in the distance should be rounded to whole kilometers. 
You are free to choose which programming language or framework you use. We like to use Java or Kotlin with Spring Boot. 
You can store your service on Github, for example, so that we can discuss your implementation together in a conversation. 
[1] https://data.deutschebahn.com/dataset/data-haltestellen.html#


The published data contains the following information for each stop:

EVA_NR : number of the stop, e.g. 8000001.
DS100 : Reference to operating location, e.g. B.KA.
IFOPT : Germany-wide, uniform stop code, e.g. e.g. de:05334:1008
NAME : name of the stop, e.g. B. Aachen main station.
TRAFFIC : Can be 'FV' (with long-distance services), 'RV' (regional services only) or 'DPN only' (regional services operated by private railway companies only).
LENGTH : Longitude of the stop in WGS84, e.g. e.g. 6.091499.
LATITUDE : Latitude of the stop in WGS84, e.g. B. 50.7678.
STATUS : Note, mostly not used e.g. B. new