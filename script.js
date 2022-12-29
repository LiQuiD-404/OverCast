document.getElementById('submit').addEventListener('click', weather)

function weather(event) {
	event.preventDefault();
	var city = document.getElementById('input-city').value;
	document.getElementById('form-city').reset();
	if (city == '') {
		city = 'Delhi';
	}
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '{YOUR_API_KEY}',
			'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
		}
	};

	fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city, options)
		.then(response => response.json())
		.then(response => {
			if(response.error == 'An unexpected error occured.'){
				alert("Invalid city details entered.");
				location.reload();
			}
			else{
			console.log(response);
			document.getElementById('city').innerHTML = city.substr(0,1).toUpperCase() + city.substr(1);
			document.getElementById('temp').innerHTML = response.temp + " &#8451;";
			document.getElementById('temp-max').innerHTML = response.max_temp + " &#8451;";
			document.getElementById('temp-min').innerHTML = response.min_temp + " &#8451;";
			document.getElementById('feels').innerHTML = response.feels_like + " &#8451;";
			document.getElementById('humidity').innerHTML = response.humidity + " %";
			document.getElementById('cloud').innerHTML = response.cloud_pct + " %";
			document.getElementById('speed').innerHTML = response.wind_speed + " km/hr";
			document.getElementById('direction').innerHTML = response.wind_degrees + " &#176;";
			let unix_timestamp = response.sunrise;
			var date = new Date(unix_timestamp * 1000);
			var hours = date.getHours();
			var minutes = "0" + date.getMinutes();
			var seconds = "0" + date.getSeconds();
			var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
			document.getElementById('rise').innerHTML = formattedTime;
			unix_timestamp = response.sunset;
			date = new Date(unix_timestamp * 1000);
			hours = date.getHours();
			minutes = "0" + date.getMinutes();
			seconds = "0" + date.getSeconds();
			formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
			document.getElementById('set').innerHTML = formattedTime;
			}
		})




}

window.addEventListener("load", weather);