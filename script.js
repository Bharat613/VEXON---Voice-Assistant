const btn = document.querySelector('.input');
const content = document.querySelector('.content');
const textDisplay = document.getElementById('text-display');



function speak(text) {
    textDisplay.textContent = text;
    const text_speak = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();

    // Choose a different voice (Example: Google UK English Male)
    text_speak.voice = voices.find(voice => voice.name.includes('Microsoft David')) || voices[0];


    text_speak.rate = 0.9;
    text_speak.volume = 1;
    text_speak.pitch = 0.7;

    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    var day = new Date();
    var hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good Morning Boss...");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Master...");
    } else {
        speak("Good Evening Sir...");
    }
}

window.addEventListener('load', () => {
    window.speechSynthesis.cancel();
          speak("I am VEXON...  your assistant... ");
          
  });




const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    window.speechSynthesis.cancel();
    content.textContent = "Listening...";
    recognition.start();
});

function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, How May I Help You?");
    } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening Youtube...");
    } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    } 
         else if (message.includes('internet speed')) {
        if (navigator.connection) {
            const speed = navigator.connection.downlink;
            const speedMessage = `Your current internet speed is approximately ${speed} Mbps.`;
            speak(speedMessage);
        } else {
            speak("Sorry, I can't determine the internet speed on this device.");
        }
    }
    else if (message.includes('my age')) {
        console.log("Function triggered with message:", message);
    
        const dobMatch = message.match(/(\d{1,2})\s*(\w+)\s*(\d{4})/); 
        
        if (dobMatch) {
            console.log("Date extracted:", dobMatch);
    
            const day = parseInt(dobMatch[1], 10);
            const month = dobMatch[2].toLowerCase();
            const year = parseInt(dobMatch[3], 10);
    
            const months = {
                january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
                july: 6, august: 7, september: 8, october: 9, november: 10, december: 11
            };
    
            if (months[month] !== undefined) {
                const dob = new Date(year, months[month], day); 
                const today = new Date();
                let age = today.getFullYear() - dob.getFullYear(); 
    
                if (today.getMonth() < dob.getMonth() || (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
                    age--;
                }
    
                console.log(`Calculated age: ${age}`);
                speak(`Your age is ${age} years.`);
            } else {
                console.log("Month not recognized:", month);
                speak("I couldn't understand your date of birth.");
            }
        } else {
            console.log("No date found in message.");
            speak("I couldn't understand your date of birth.");
        }
    }
  
else if(message.includes('your name')){
    speak('My name is VEXON. I am your virtual assistant, here to help you with anything you need!');
}
else if (message.includes('time')) {
    const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
    const finalText = "The current time is " + time;
    speak(finalText);
} else if (message.includes('today date')) {
    const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
    const finalText = "Today's date is " + date;
    speak(finalText);
}
else if (message.includes('what is ') || message.includes('who is ')) {  // Check if the message contains "what is " or "who is "
    let query = message;

    if (message.includes('what is ')) {
        query = message.replace('what is ', '').trim();  // Remove "what is " and trim extra spaces
    } else if (message.includes('who is ')) {
        query = message.replace('who is ', '').trim();  // Remove "who is " and trim extra spaces
    }

    // Simplify queries like "what is the national bird of India"
    query = query.replace('the ', '').trim();  // Remove "the " from the query to avoid issues

    const url = `https://api.allorigins.win/get?url=${encodeURIComponent("https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=&explaintext=&titles=" + encodeURIComponent(query))}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.contents) {
                const jsonData = JSON.parse(data.contents); // Parse the JSON from the response
                const pages = jsonData.query.pages;
                const pageId = Object.keys(pages)[0];

                // Handle case where no valid page is found
                if (pageId === "-1") {
                    window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what I found on the internet regarding " + message;
        speak(finalText);
                    return;
                }

                const extract = pages[pageId].extract;

                // If extract is available, limit it to one sentence
                if (extract) {
                    const oneSentence = extract.split(".")[0] + ".";  // Get only the first sentence
                    speak(oneSentence);  // Speak the one sentence
                } else {
                    speak("Sorry, I couldn't find any information on that.");
                }
            } else {
                speak("Sorry, there was an issue with the data response.");
            }
        })
        .catch(error => {
            speak("Sorry, there was an error fetching the information.");
            console.error(error);
        });
}


else if (message.includes('weight')) {
        let weightMatch = message.match(/\d+/); // Extract weight from the message
    
        if (weightMatch) {
            let weight = parseInt(weightMatch[0]); // Convert extracted number to integer
            let height = Math.sqrt((weight / 22.5)) * 100; // Approximate height calculation (BMI ~ 22.5)
    
            speak(`Based on your weight of ${weight} kg, your approximate height could be around ${height.toFixed(2)} cm.`);
        } else {
            speak("Please specify your weight in kilograms.");
        }
    }


    else if (/[\d+\-*/()]+/.test(message)) {  
        try {  
            let expression = message
            .replace(/times|into|x/gi, '*')  // Replace multiplication words
            .replace(/power|to the power of|\^/gi, '**') // Replace exponentiation words
            .replace(/square/gi, '**2'); 
            let result = eval(expression);  
            speak(`${result}`);  
        } catch (error) {  
            speak("Sorry, I couldn't calculate that.");  
        }  
    }

    
    else if (message.includes('weather') || message.includes('report') || message.includes('temperature') || message.includes('forecast')) {
        const words = message.split(' ');
    const city = words[words.length - 1];

        const apiKey = 'e4d2848a1c8c2c8b13e32c5ae463abc6';  // Updated API key
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; // Weather API endpoint
    
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    const weatherDescription = data.weather[0].description;
                    const temperature = data.main.temp;
                    const humidity = data.main.humidity;
                    const windSpeed = data.wind.speed;
    
                    const report = `The current weather in ${city} is ${weatherDescription}. The temperature is ${temperature}°C with a humidity of ${humidity}% and wind speed of ${windSpeed} m/s.`;
                    
                    speak(report);  
                    
                } else {

                    speak("Sorry, I couldn't fetch the weather data.");
                    
                }
            })
            .catch(error => {
                speak("Sorry, there was an error fetching the weather data.");
                console.error(error);
            });
    }
    
   

    else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what I found on the internet regarding " + message;
        speak(finalText);
    } else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
        const finalText = "This is what I found on Wikipedia regarding " + message;
        speak(finalText);
    } 
     else if (message.includes('calculator')) {
        window.open('Calculator:///');
        const finalText = "Opening Calculator";
        speak(finalText);
    }else if(message.includes('good morning vexon') || message.includes('good afternoon vexon') || message.includes('good evening vexon') ){
        wishMe();
    } 
   else if (message.includes('thank you')) {
    speak("You're welcome Boss! Glad to assist you.");
}
else if(message.includes('i love you')){
    speak('Sorry Boss, I am not a Human... you may get better than me');
}
else if(message.includes('have feelings')){
    speak('I don\'t have feelings... but i understand your feelings')
}


    else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on Google";
        speak(finalText);
    }
}
