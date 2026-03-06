# Weather App

## GitHub Repository

https://github.com/Chirag5017/Weather-App

## What is This?

This is a weather application where you can search for any city and see the current weather along with a 5-day forecast. All your searched cities are saved in your browser so you can quickly access them later. No data is sent to any server - everything stays on your computer.

## What Can You Do?

- **Search for Weather** - Type any city name and click "Go" to see current weather and forecast
- **Use Your Location** - Click "+ My Location" button to get weather for where you are right now
- **Switch Temperature** - Toggle between Celsius (°C) and Fahrenheit (°F) anytime
- **View Forecast** - See what the weather will be like for the next 5 days
- **Save Cities** - Your searched cities are automatically saved and appear in a dropdown for quick access

## How to Use

1. Open the `index.html` file in your web browser
2. Type a city name in the search box:
   - City Name (required)
3. Click the "Go" button to search
4. You will see:
   - Current temperature
   - Weather description (Sunny, Rainy, Cloudy, etc.)
   - Humidity percentage
   - Wind speed
   - Visibility distance
5. Use "+ My Location" button if you want to see weather for your current location
6. Click °C or °F to change temperature display
7. Previous cities appear in dropdown when you click the search box

## Important Rules

- You must type a city name to search (empty search won't work)
- Weather data needs internet connection to load
- Forecast shows weather at 12:00 PM only
- If temperature is above 40°C or below 0°C, you will get an alert warning

## How It Works

- Everything is stored in your browser's localStorage
- If you clear browser data, your saved cities will be deleted
- If you close the browser and come back later, your searched cities will still be there
- Weather data comes from OpenWeatherMap API (a free weather service)
- The app fetches real-time weather data from the internet

## Files Explained

- **index.html** - The main page that you see (structure and layout)
- **style.css** - All the styling like colors, sizes, and how things look
- **script.js** - The code that makes everything work (searches, displays data, etc.)
- **src/output.css** - Extra styles from Tailwind CSS framework
- **src/input.css** - Configuration for Tailwind CSS

## Features That Exist

✓ Search by city name  
✓ Get weather using GPS location  
✓ See temperature, humidity, wind, visibility  
✓ 5-day weather forecast  
✓ Switch between °C and °F  
✓ Previous searches saved in dropdown  
✓ Heat and cold alerts  
✓ Dark theme design  
✓ Weather icons for different conditions
