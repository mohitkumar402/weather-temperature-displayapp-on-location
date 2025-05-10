const apiKey = "c55b3b3c051442560eb348a532da5c41"; // ✅ Your real API key
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherInfo = document.getElementById('weatherInfo');
const backendUrl = 'http://localhost:5000'; // Backend server address

searchBtn.addEventListener('click', async () => {
  const city = cityInput.value.trim();
  if (!city) {
    showError('Please enter a city name.');
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    
    const data = await response.json();

    if (response.ok) {
      displayWeather(data);
      await saveCity(data.name,
        data.main.temp,
        data.weather[0].description,
        data.weather[0].icon);
      await fetchHistory();
    } else {
      showError(data.message || 'City not found. Please try again.');
    }
  } catch (error) {
    showError('Unable to connect. Please check your internet.');
  }
});
async function saveCity(city, temp, description, icon) {
    try {
      await fetch(`${backendUrl}/saveCity`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city, temp, description, icon }),
      });
    } catch (error) {
      console.error('Failed to save city:', error);
    }
  }
  

  async function fetchHistory() {
    try {
      const response = await fetch(`${backendUrl}/getHistory`);
      const cities = await response.json();
  
      const historyList = document.getElementById('historyList');
      historyList.innerHTML = '';
      function updateSearchHistory() {
  historyList.innerHTML = ''; // Clear existing
  searchHistory.forEach(city => {
    const box = document.createElement('div');
    box.className = 'history-box';
    box.innerText = city;
    
    // Optional: re-trigger search on click
    box.onclick = () => {
      console.log(`You clicked ${city}`);
      // fetchWeather(city); // If you have this
    };

    historyList.appendChild(box);
  });
}

updateSearchHistory();
  
      cities.forEach((cityObj) => {
        const cityDiv = document.createElement('div');
        cityDiv.classList.add('history-item');
        cityDiv.style.cursor = 'pointer';
  
        cityDiv.innerHTML = `
          <strong>${cityObj.city}</strong> — 
          ${cityObj.temp} °C, 
          ${cityObj.description}
          <img src="https://openweathermap.org/img/wn/${cityObj.icon}.png" alt="icon" style="vertical-align:middle; width:20px; height:20px;">
        `;
  
        cityDiv.addEventListener('click', () => {
          cityInput.value = cityObj.city;
          searchBtn.click();
        });
  
        historyList.appendChild(cityDiv);
      });
    } catch (error) {
      console.error('Failed to fetch history:', error);
    }
  }
  

function displayWeather(data) {
  weatherInfo.innerHTML = `
    <h2>${data.name}</h2>
    <p>${data.weather[0].description}</p>
    <p>${data.main.temp} °C</p>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather Icon">
  `;
}

function showError(message) {
  weatherInfo.innerHTML = `<p style="color: red;">${message}</p>`;
}

// Load search history when page loads
async function fetchHistory() {
  try {
    const response = await fetch(`${backendUrl}/getHistory`);
    const cities = await response.json();

    const historyList = document.getElementById('historyList');
    historyList.innerHTML = ''; // Clear old entries

    cities.forEach((cityObj) => {
      const cityDiv = document.createElement('div');
      cityDiv.classList.add('history-box');
      cityDiv.style.cursor = 'pointer';

      cityDiv.innerHTML = `
        <div><strong>${cityObj.city}</strong></div>
        <div>${cityObj.temp} °C</div>
        <div>${cityObj.description}</div>
        <img src="https://openweathermap.org/img/wn/${cityObj.icon}.png" 
             alt="icon" 
             style="vertical-align:middle; width:30px; height:30px;">
      `;

      cityDiv.addEventListener('click', () => {
        cityInput.value = cityObj.city;
        searchBtn.click();
      });

      historyList.appendChild(cityDiv);
    });
  } catch (error) {
    console.error('Failed to fetch history:', error);
  }
}
// Load search history when page loads

// Initialize particles.js
particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 80
    },
    "size": {
      "value": 3
    }
  },
  "interactivity": {
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      }
    }
  }
});
