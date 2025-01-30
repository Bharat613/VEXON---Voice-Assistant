const btn = document.querySelector('.input');
const content = document.querySelector('.content');
const textDisplay = document.getElementById('text-display');

const hamburgerIcon = document.getElementById("hamburgerIcon");
const questionsContainer = document.getElementById("questionsContainer");
const questionsList = document.getElementById("questionsList");

// -------------------------------------------//hamburger Menu ----------------------------------------------------------------//

// Array to store questions
let questionsAsked = [];



//  Function to add a question to the list
function addQuestionToList(question) {
    questionsAsked.push(question);
    const li = document.createElement("li");
    li.textContent = question;
    questionsList.appendChild(li);
}

// Event listener for the hamburger icon
hamburgerIcon.addEventListener("click", () => {
    questionsContainer.classList.toggle("open"); // Show/hide the questions container
});

// -----------------------------------------------------------------------------------------------------------//




// ------------------------------------------ speak out function-----------------------------------------------------------------//


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


// -----------------------------------------------------------------------------------------------------------//




// -----------------------------------------wishing fucntion------------------------------------------------------------------//

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

// -----------------------------------------------------------------------------------------------------------//



// ------------------------------------------LOAD fucntion-----------------------------------------------------------------//



window.addEventListener('load', () => {
    window.speechSynthesis.cancel();
    
          speak("I am VEXON...  your assistant... ");
          
          
  });


// -----------------------------------------------------------------------------------------------------------//



// ---------------------------------------------SpeechRecognition--------------------------------------------------------------//


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();


recognition.onresult = (event) => {
    btn.style.backgroundColor = "rgb(90, 155, 245)";
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};


// -----------------------------------------------------------------------------------------------------------//



// ---------------------------------------------Listening Click--------------------------------------------------------------//

let isListening = false;  // Track whether recognition is currently active

btn.addEventListener('click', () => {
  if (isListening) {
    recognition.stop();  // Stop recognition if it's already listening
    content.textContent = "Stopped listening.";
    btn.style.backgroundColor = "rgb(90, 155, 245)";  // Revert to original color
  } else {
    content.textContent = "Listening...";
    recognition.start();  // Start listening
    btn.style.backgroundColor = '#10c0b1';  // Change background color to red
  }
  isListening = !isListening;  // Toggle the listening state
});


// ---------------------------------------Text Input--------------------------------------------------------------------//


document.getElementById("text-input").addEventListener("keypress", function(event) {
    
    if (event.key === "Enter") {  // Check if Enter key is pressed
        let inputText = this.value;  // Get input value
        console.log(inputText);
        textCommand(inputText.toLowerCase());
        this.value = "";  // Clear the input field
        this.placeholder = "Ask anything...";

    }

    
});



// -----------------------------------------------------------------------------------------------------------//



function takeCommand(message) {
    addQuestionToList(message);  // adding questions to the history
    
    if (message.includes('hey') || message.includes('hello')) {  // Wishing Vexon    1
        speak("Hello Sir, How May I Help You?");
    } 
    
    else if (message.includes("open google")) {                  // Opening GOOGLE      2
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } 
    else if (message.includes("open youtube")) {                // opening YOUTUBE      3
        window.open("https://youtube.com", "_blank");
        speak("Opening Youtube...");
    } 
    else if (message.includes("open facebook")) {               // opening facebook        4
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    }
    else if (message.includes('define')) {                      // Definition of a word     5
        const word = message.replace('define', '').trim();
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
            .then(response => response.json())
            .then(data => {
                const definition = data[0].meanings[0].definitions[0].definition;
                speak(`${word} is ${definition}`);
            })
            .catch(error => speak("Sorry, I couldn't find the definition."));
    }
    
    else if (message.includes('spelling of')) {                 // spelling of the word         6
        const word = message.replace('spelling of', '').trim();
        const spelledWord = word.split('').join(' ');
        speak(`${spelledWord}`);
    }

    else if (message.includes('day')) {                                                 // day name      7
        const day = new Date().toLocaleString('en-us', { weekday: 'long' });
        speak(`Today is ${day}`);
    }

    else if(message.includes('your boss') || message.includes('who created you') || message.includes('developed')){      // developer name   8
        speak('SHIVA...');
    }

    else if (message.includes('internet speed')) {                              // internet speed    9
        // Checking the network speed
        if (navigator.connection) {
            const speed = navigator.connection.downlink;
            const speedMessage = `Your current internet speed is approximately ${speed} Mbps.`;6
            speak(speedMessage);
        } else {
            speak("Sorry, I can't determine the internet speed on this device.");
        }
    }
    
    else if (message.includes('my age')) {                              // calculate age     
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
  
else if(message.includes('your name') || message.includes('what is your name')){                        // its name
    speak('My name is VEXON. I am your virtual assistant, here to help you with anything you need!');
}
else if (message.includes('time')) {                                                                           // time
    const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
    const finalText = "The current time is " + time;
    speak(finalText);
} else if (message.includes('today date')) {                                                                        // to
    const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
    const finalText = "Today's date is " + date;
    speak(finalText);
}
else if (message.includes('what is ')) {  // Check if the message contains "what is " or "who is "
    let query = message.includes('what is ')
        query = message.replace('what is ', '').trim();  // Remove "what is " and trim extra spaces
    

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
                    // window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
                    gettingInformation(message)
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


 // Getting images from the internet
else if (message.startsWith('images of ') || message.startsWith('pictures of ')) {
    // Extract the keyword from the message
    const query = message.replace(/^(images of |pictures of )/, '').trim(); // Remove "images of" or "pictures of"
    const accessKey = "vc2rrU2FW9_l5DqcN6wIEAogduPwY9x8LeEgfKIH6SI"; // Replace with your Unsplash API key

    const textDisplay = document.getElementById('text-display');
    textDisplay.innerHTML = ""; // Clear previous content

    // Create a container div for grid layout
    const gridContainer = document.createElement("div");
    gridContainer.style = `
        display: grid;
        grid-template-columns: repeat(2, 1fr); /* Two images per row */
        gap: 10px; /* Space between images */
        justify-content: center;
        padding: 10px;
    `;

    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${accessKey}&per_page=6`; // Fetch 6 images

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.results.length > 0) {
          data.results.forEach(image => {
            // Create an anchor tag to wrap the image
            const link = document.createElement("a");
            link.href = image.links.html; // Link to Unsplash image page
            link.target = "_blank"; // Open in new tab
            link.style = "text-decoration: none;";

            // Create an image element
            const imgElement = document.createElement("img");
            imgElement.src = image.urls.small;
            imgElement.alt = query;
            imgElement.style = "width: 100%; max-width: 300px; border-radius: 10px; display: block;";

            link.appendChild(imgElement); // Add image inside link

            const imgWrapper = document.createElement("div");
            imgWrapper.appendChild(link);

            gridContainer.appendChild(imgWrapper); // Add image container inside grid
          });

          textDisplay.appendChild(gridContainer); // Add grid to display area
        } else {
          textDisplay.innerHTML = `<p>Sorry, I couldn't find any pictures of ${query}</p>`;
        }
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
        textDisplay.innerHTML = `<p>Sorry, there was an error fetching the images.</p>`;
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
    
   

    // else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
    //     window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
    //     const finalText = "This is what I found on the internet regarding " + message;
    //     speak(finalText);
    // }
    // else if (message.includes('wikipedia')) {
    //     window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
    //     const finalText = "This is what I found on Wikipedia regarding " + message;
    //     speak(finalText);
    // } 
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
    const query = encodeURIComponent(message);
    const apiKey = "AIzaSyBNK_5VPCGCM9xbwn-iC8hYyJGbiMAjBoY"; // Replace with your API key
    const cx = "f1a89991ee5524d36"; // Replace with your Custom Search Engine ID
    const url = `https://www.googleapis.com/customsearch/v1?q=${query}&cx=${cx}&key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.items && data.items.length > 0) {
                let resultText = "";
                let speakText = "I found these results: ";

                // Loop through the first 3 results
                data.items.slice(0, 3).forEach((item, index) => {
                    const snippet = item.snippet;  // Extract snippet (description)
                    const title = item.title;
                    const link = item.link;

                    // Construct the result text and speak text
                    resultText += `${index + 1}. ${title}\nDescription: ${snippet}\nLink: ${link}\n\n`;
                });

                textDisplay.textContent = resultText; // Display the results in the text display
                 // Read out the results aloud
            } else {
                const noResultText = "Sorry, no results found.";
                textDisplay.textContent = noResultText;
                
            }
        })
        .catch(error => {
            console.error("Error fetching search results:", error);
            const errorText = "Sorry, there was an error fetching the search results.";
            textDisplay.textContent = errorText;
            
        });
}
}

// for text textCommand
function textCommand(message) {

    addQuestionToList(message); 

    if (message.includes('hey') || message.includes('hello')) {
        textDisplay.textContent = "Hello Sir, How May I Help You?";
    } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        textDisplay.textContent = "Opening Google...";
    } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        textDisplay.textContent = "Opening Youtube...";
    } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        textDisplay.textContent = "Opening Facebook...";
    } else if (message.includes('who is your boss') || message.includes('who created you') || message.includes('who developed you')) {
        textDisplay.textContent = 'SHIVA...';
    } 
    
    else if (/[\d+\-*/()]+/.test(message)) { 
        
        try {  
            let expression = message
                .replace(/times|into|x/gi, '*')  
                .replace(/power|to the power of|\^/gi, '**') 
                .replace(/square/gi, '**2'); 
            let result = eval(expression);  
            textDisplay.textContent = `${result}`;  
            speak(`${result}`);
        } catch (error) {  
            textDisplay.textContent = "Sorry, I couldn't calculate that.";  
        }  
    }
// Getting images from the internet

else if (message.startsWith('images of ') || message.startsWith('pictures of ')) {
    // Extract the keyword from the message
    const query = message.replace(/^(images of |pictures of )/, '').trim(); // Remove "images of" or "pictures of"
    const accessKey = "vc2rrU2FW9_l5DqcN6wIEAogduPwY9x8LeEgfKIH6SI"; // Replace with your Unsplash API key

    const textDisplay = document.getElementById('text-display');
    textDisplay.innerHTML = ""; // Clear previous content

    // Create a container div for grid layout
    const gridContainer = document.createElement("div");
    gridContainer.style = `
        display: grid;
        grid-template-columns: repeat(2, 1fr); /* Two images per row */
        gap: 10px; /* Space between images */
        justify-content: center;
        padding: 10px;
    `;

    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${accessKey}&per_page=6`; // Fetch 6 images

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.results.length > 0) {
          data.results.forEach(image => {
            // Create an anchor tag to wrap the image
            const link = document.createElement("a");
            link.href = image.links.html; // Link to Unsplash image page
            link.target = "_blank"; // Open in new tab
            link.style = "text-decoration: none;";

            // Create an image element
            const imgElement = document.createElement("img");
            imgElement.src = image.urls.small;
            imgElement.alt = query;
            imgElement.style = "width: 100%; max-width: 300px; border-radius: 10px; display: block;";

            link.appendChild(imgElement); // Add image inside link

            const imgWrapper = document.createElement("div");
            imgWrapper.appendChild(link);

            gridContainer.appendChild(imgWrapper); // Add image container inside grid
          });

          textDisplay.appendChild(gridContainer); // Add grid to display area
        } else {
          textDisplay.innerHTML = `<p>Sorry, I couldn't find any pictures of ${query}</p>`;
        }
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
        textDisplay.innerHTML = `<p>Sorry, there was an error fetching the images.</p>`;
      });
}



    else if (message.includes('define')) {
        addQuestionToList(message);
        const word = message.replace('define', '').trim();
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
            .then(response => response.json())
            .then(data => {
                const definition = data[0].meanings[0].definitions[0].definition;
                const upperCaseWord = word.toUpperCase();
                speak(`${upperCaseWord} is  ${definition}`);
            })
            .catch(error => speak("Sorry, I couldn't find the definition."));
    }
    
    else if (message.includes('internet speed')) {
        if (navigator.connection) {
            const speed = navigator.connection.downlink;
            const speedMessage = `Your current internet speed is approximately ${speed} Mbps.`;
            textDisplay.textContent = speedMessage;
        } else {
            textDisplay.textContent = "Sorry, I can't determine the internet speed on this device.";
        }
    } else if (message.includes('my age')) {
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
                textDisplay.textContent = `Your age is ${age} years.`;
            } else {
                console.log("Month not recognized:", month);
                textDisplay.textContent = "I couldn't understand your date of birth.";
            }
        } else {
            console.log("No date found in message.");
            textDisplay.textContent = "I couldn't understand your date of birth.";
        }
    } else if (message.includes('your name') ||  message.includes('what is your name')) {
        textDisplay.textContent = 'My name is VEXON. I am your virtual assistant, here to help you with anything you need!';
        speak('My name is VEXON. I am your virtual assistant, here to help you with anything you need!');
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        const finalText = "The current time is " + time;
        textDisplay.textContent = finalText;
    } else if (message.includes('today date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        const finalText = "Today's date is " + date;
        textDisplay.textContent = finalText;
    } else if (message.includes('what is ')) {  
        let query =  message.replace('what is ', '').trim();  
       
        query = query.replace('the ', '').trim();  
        const url = `https://api.allorigins.win/get?url=${encodeURIComponent("https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=&explaintext=&titles=" + encodeURIComponent(query))}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data && data.contents) {
                    const jsonData = JSON.parse(data.contents);
                    const pages = jsonData.query.pages;
                    const pageId = Object.keys(pages)[0];
                    if (pageId === "-1") {
                        // window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
                        gettingInformation(message)
                        const finalText =  message;
                        textDisplay.textContent = finalText;
                        return;
                    }
                    const extract = pages[pageId].extract;
                    if (extract) {
                        const oneSentence = extract.split(".")[0] + ".";
                        textDisplay.textContent = oneSentence;
                    } else {
                        textDisplay.textContent = "Sorry, I couldn't find any information on that.";
                    }
                } else {
                    textDisplay.textContent = "Sorry, there was an issue with the data response.";
                }
            })
            .catch(error => {
                textDisplay.textContent = "Sorry, there was an error fetching the information.";
                console.error(error);
            });
    } else if (message.includes('weight')) {
        let weightMatch = message.match(/\d+/); 
        if (weightMatch) {
            let weight = parseInt(weightMatch[0]); 
            let height = Math.sqrt((weight / 22.5)) * 100; 
            textDisplay.textContent = `Based on your weight of ${weight} kg, your approximate height could be around ${height.toFixed(2)} cm.`;
        } else {
            textDisplay.textContent = "Please specify your weight in kilograms.";
        }
    }  else if (message.includes('weather') || message.includes('report') || message.includes('temperature') || message.includes('forecast')) {
        const words = message.split(' ');
        const city = words[words.length - 1];
        const apiKey = 'e4d2848a1c8c2c8b13e32c5ae463abc6';  
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; 
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    const weatherDescription = data.weather[0].description;
                    const temperature = data.main.temp;
                    const humidity = data.main.humidity;
                    const windSpeed = data.wind.speed;
                    const report = `The current weather in ${city} is ${weatherDescription}. The temperature is ${temperature}°C with a humidity of ${humidity}% and wind speed of ${windSpeed} m/s.`;
                    textDisplay.textContent = report;  
                } else {
                    textDisplay.textContent = "Sorry, I couldn't fetch the weather data.";
                }
            })
            .catch(error => {
                textDisplay.textContent = "Sorry, there was an error fetching the weather data.";
                console.error(error);
            });
    } else if (message.includes('calculator')) {
        window.open('Calculator:///');
        const finalText = "Opening Calculator";
        textDisplay.textContent = finalText;
    } else if (message.includes('good morning vexon') || message.includes('good afternoon vexon') || message.includes('good evening vexon')) {
        wishMe();
    } else if (message.includes('thank you')) {
        textDisplay.textContent = "You're welcome Boss! Glad to assist you.";
    } else if (message.includes('i love you')) {
        textDisplay.textContent = 'Sorry Boss, I am not a Human... you may get better than me';
    } else if (message.includes('have feelings')) {
        textDisplay.textContent = 'I don\'t have feelings... but I understand your feelings';
    } else {
        const query = encodeURIComponent(message);
        const apiKey = "AIzaSyBNK_5VPCGCM9xbwn-iC8hYyJGbiMAjBoY"; // Replace with your API key
        const cx = "f1a89991ee5524d36"; // Replace with your Custom Search Engine ID
        const url = `https://www.googleapis.com/customsearch/v1?q=${query}&cx=${cx}&key=${apiKey}`;
    
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.items && data.items.length > 0) {
                    let resultText = "";
                    
    
                    // Loop through the first 3 results
                    data.items.slice(0, 3).forEach((item, index) => {
                        const snippet = item.snippet;  // Extract snippet (description)
                        const title = item.title;
                        const link = item.link;
    
                        // Construct the result text and speak text
                        resultText += `${index + 1}. ${title}\nDescription: ${snippet}\nLink: ${link}\n\n`;
                    });
    
                    textDisplay.textContent = resultText; // Display the results in the text display
                     // Read out the results aloud
                } else {
                    const noResultText = "Sorry, no results found.";
                    textDisplay.textContent = noResultText;
                    
                }
            })
            .catch(error => {
                console.error("Error fetching search results:", error);
                const errorText = "Sorry, there was an error fetching the search results.";
                textDisplay.textContent = errorText;
                
            });
    }
    
    
}
function gettingInformation(message){
    const query = encodeURIComponent(message);
    const apiKey = "AIzaSyBNK_5VPCGCM9xbwn-iC8hYyJGbiMAjBoY"; // Replace with your API key
    const cx = "f1a89991ee5524d36"; // Replace with your Custom Search Engine ID
    const url = `https://www.googleapis.com/customsearch/v1?q=${query}&cx=${cx}&key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.items && data.items.length > 0) {
                let resultText = "";
                

                // Loop through the first 3 results
                data.items.slice(0, 3).forEach((item, index) => {
                    const snippet = item.snippet;  // Extract snippet (description)
                    const title = item.title;
                    const link = item.link;

                    // Construct the result text and speak text
                    resultText += `${index + 1}. ${title}\nDescription: ${snippet}\nLink: ${link}\n\n`;
                });

                textDisplay.textContent = resultText; // Display the results in the text display
                 // Read out the results aloud
            } else {
                const noResultText = "Sorry, no results found.";
                textDisplay.textContent = noResultText;
                
            }
        })
        .catch(error => {
            console.error("Error fetching search results:", error);
            const errorText = "Sorry, there was an error fetching the search results.";
            textDisplay.textContent = errorText;
            
        });
}

//For manual information
document.getElementById("manual-btn").addEventListener("click", function() {
    document.getElementById("manual-container").style.display = "block";
});

document.getElementById("close-manual").addEventListener("click", function() {
    document.getElementById("manual-container").style.display = "none";
});
