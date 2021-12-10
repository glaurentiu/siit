Geolocation & Ajax Challenge
Combine Geolocation API and Fetch API to get the weather for your current location:

use navigator.geolocation.getCurrentPosition to get the current position
use that when making the call to the Weather API 
https://api.openweathermap.org/data/2.5/onecall?lat=43&lon=30&appid=40548cc5b12a46ee9418e263dd707583 (lat is the latitude and lon is the longitude)

build a page for weather forecast using the API response
show current temperature in C / F
show the hourly forecast
show the daily forecast (optional)
In order to display weather details you can use the API documentation to find icons urls: https://openweathermap.org/weather-conditions#How-to-get-icon-URL

API Documentation where the response is explained: 

https://openweathermap.org/current#geo

https://openweathermap.org/api/hourly-forecast#geo5

https://openweathermap.org/forecast16#geo16



Sample API Response

{
    "lat": 43,
    "lon": 30,
    "timezone": "Etc/GMT-2",
    "current": {
        "dt": 1589133918,
        "sunrise": 1589078524,
        "sunset": 1589130647,
        "temp": 289.1,
        "feels_like": 285.51,
        "pressure": 1016,
        "humidity": 61,
        "dew_point": 281.59,
        "uvi": 7.44,
        "clouds": 33,
        "wind_speed": 4.61,
        "wind_deg": 167,
        "weather": [
            {
                "id": 802,
                "main": "Clouds",
                "description": "scattered clouds",
                "icon": "03n"
            }
        ]
    },
    "hourly": [
        {
            "dt": 1589133600,
            "temp": 289.1,
            "feels_like": 285.51,
            "pressure": 1016,
            "humidity": 61,
            "dew_point": 281.59,
            "clouds": 33,
            "wind_speed": 4.61,
            "wind_deg": 167,
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03n"
                }
            ]
        },
        ...
    ],
    "daily": [
        {
            "dt": 1589101200,
            "sunrise": 1589078524,
            "sunset": 1589130647,
            "temp": {
                "day": 289.1,
                "min": 289,
                "max": 289.1,
                "night": 289,
                "eve": 289.1,
                "morn": 289.1
            },
            "feels_like": {
                "day": 285.51,
                "night": 284.43,
                "eve": 285.51,
                "morn": 285.51
            },
            "pressure": 1016,
            "humidity": 61,
            "dew_point": 281.59,
            "wind_speed": 4.61,
            "wind_deg": 167,
            "weather": [
                {
                    "id": 802,
                    "main": "Clouds",
                    "description": "scattered clouds",
                    "icon": "03n"
                }
            ],
            "clouds": 33,
            "uvi": 7.44
        },
        ...
    ]
}