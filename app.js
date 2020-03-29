window.addEventListener('load', ()=>{
	let long;
	let lat;
	let temperatureDescription = document.querySelector(".temperature-description");
	let temperatureDegree = document.querySelector(".temperature-degree");
	let locationTimezone = document.querySelector(".location-timezone");
	let temperatureSection = document.querySelector(".temperature");
	let degree = document.querySelector(".temperature-degree");
	const temperatureSpan = document.querySelector(".temperature span");


	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position =>{
			long = position.coords.longitude;
			lat = position.coords.latitude;

			const proxy = 'https://cors-anywhere.herokuapp.com/' 
			const api = `${proxy}https://api.darksky.net/forecast/11acfb7ea57618705cf4bd0ed0850afe/${lat},${long}`;
			fetch(api)
				.then(response =>{
					return response.json();
				})
				.then(data =>{
					console.log(data);
					const{ temperature, summary, icon} = data.currently;
					//DOM
					temperatureDegree.textContent = Math.floor(temperature);
					temperatureDescription.textContent = summary;
					locationTimezone.textContent = data.timezone;
					//Icon
					setIcons(icon, document.querySelector(".icon"));

					// F -> C
					temperatureSection.addEventListener("click", () =>{
						let f;
						if(temperatureSpan.textContent === "F"){
							temperatureSpan.textContent = "C";							
							degree.textContent = Math.floor((5/9) * (degree.textContent - 32));
						}
						else{
							temperatureSpan.textContent = "F";
							degree.textContent = Math.floor((degree.textContent * (9/5)) + 32);	
						}
					});
				});

		});



	}
	function setIcons(icon, iconID){
		const skycons = new Skycons({color: "white"});
		const currentIcon = icon.replace(/-/g, "_").toUpperCase();
		skycons.play();
		return skycons.set(iconID, Skycons[currentIcon]);
	}


	  

});