
document.addEventListener('DOMContentLoaded', () => {
    const timezoneSelect = document.getElementById('timezone');
    const timeline = document.getElementById('timeline');
    const currentTimeElement = document.getElementById('current-time');
    const muteToggle = document.getElementById('mute-toggle');

    // Populate timezone dropdown
    moment.tz.names().forEach(tz => {
        const option = document.createElement('option');
        option.value = tz;
        option.textContent = tz;
        timezoneSelect.appendChild(option);
    });

    // Set default timezone to user's local timezone
    const userTimezone = moment.tz.guess();
    timezoneSelect.value = userTimezone;

    // Internal clock using London time
    let londonTime;

    function updateLondonTime() {
        londonTime = moment().tz('Europe/London');
    }

    // Update London time every second
    setInterval(updateLondonTime, 1000);

    // Initial update
    updateLondonTime();

  
    
    async function getNasaPhotoOfTheDay() {
        const apiKey = '95TrrbNbdYnxMnx5MTObRmZFsDy4qxKrlqZfulIC';
        const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('NASA API response:', data); // Add this line for debugging
            return data;
        } catch (error) {
            console.error('Error fetching NASA photo of the day:', error);
            return null;
        }
    }
    
    async function addNasaPhotoEvent() {
        const photoData = await getNasaPhotoOfTheDay();
        if (photoData) {
            const newEvent = {
                time: '+1', // This will make the event appear 1 second from now
                country: 'NASA',
                greeting: 'NASA Photo of the Day',
                description: photoData.explanation,
                link: `<a href="${photoData.url}" target="_blank">View Photo</a>`,
                customClasses: ['nasa-photo-event'],
                backgroundImage: photoData.url
            };
            
            const eventElement = await createEventElement(newEvent);
            timeline.appendChild(eventElement);
            setTimeout(() => {
                eventElement.classList.add('slide-down');
            }, 10);
            newEventSound.play();
            scrollTimelineToTop();
        }
    }
    
    // Call this function to add the NASA photo event
    addNasaPhotoEvent();
        
        // ... existing code ...
 

    
    
    // Global events data
    let events = [
        { time: 'welcome', country: 'Welcome', greeting: 'Hello!', description: 'Welcome to Global Time Events! This page displays a real-time timeline of events happening around the world. You\'ll see wake-up times, bedtimes, and other interesting events from various countries, all adjusted to your local time zone. Watch as new events appear and disappear throughout the day, giving you a glimpse into the daily rhythms of different cultures across the globe.', isWelcomeMessage: true },      
        
        { time: '06:30', country: 'UK', greeting: 'Good morning', description: 'Good Morning from the UK. It is currently the average wake-up time in the UK', addUKTime: true },
        { time: '00:00', country: 'Japan', greeting: 'おはようございます', description: 'Good Morning from Japan. It is currently the average wake-up time in Japan', addJapanTime: true },
        { time: '02:30', country: 'India', greeting: 'नमस्ते', description: 'Good Morning from India. It is currently the average wake-up time in India', addIndiaTime: true },
        { time: '04:00', country: 'UAE', greeting: 'صباح الخير', description: 'Good Morning from the UAE. It is currently the average wake-up time in the UAE', addUAETime: true },
        { time: '06:00', country: 'Germany', greeting: 'Guten Morgen', description: 'Good Morning from Germany. It is currently the average wake-up time in Germany', addGermanyTime: true },
        { time: '09:00', country: 'Brazil', greeting: 'Bom dia', description: 'Good Morning from Brazil. It is currently the average wake-up time in Brazil', addBrazilTime: true },
        { time: '11:00', country: 'USA', greeting: 'Good morning', description: 'Good Morning from the USA. It is currently the average wake-up time in the USA', addUSATime: true },
        { time: '20:00', country: 'Australia', greeting: 'G\'day mate', description: 'Good Morning from Australia. It is currently the average wake-up time in Australia', addAustraliaTime: true },
        { time: '04:00', country: 'Kenya', greeting: 'Habari za asubuhi', description: 'Good Morning from Kenya. It is currently the average wake-up time in Kenya', addKenyaTime: true },
        { time: '04:00', country: 'Russia', greeting: 'Доброе утро', description: 'Good Morning from Russia. It is currently the average wake-up time in Russia', addRussiaTime: true },
        { time: '06:00', country: 'Italy', greeting: 'Buongiorno', description: 'Good Morning from Italy. It is currently the average wake-up time in Italy', addItalyTime: true },
        // ... existing bedtime events ...

        // Wake-up times
        { time: '11:35:15', country: 'Spain', greeting: 'Buenos días', description: 'Good morning from Spain. It is currently the average wake-up time in Spain', addSpainTime: true, checkWeather: 'Madrid', customClasses: ['waketime-event'] },
        { time: '10:30', country: 'Argentina', greeting: 'Buen día', description: 'Good morning from Argentina. It is currently the average wake-up time in Argentina', addArgentinaTime: true, checkWeather: 'Buenos Aires', customClasses: ['waketime-event'] },
        { time: '22:15', country: 'South Korea', greeting: '안녕하세요', description: 'Good morning from South Korea. It is currently the average wake-up time in South Korea', addSouthKoreaTime: true, checkWeather: 'Seoul', customClasses: ['waketime-event'] },
        { time: '13:00', country: 'Mexico', greeting: 'Buenos días', description: 'Good morning from Mexico. It is currently the average wake-up time in Mexico', addMexicoTime: true, checkWeather: 'Mexico City', customClasses: ['waketime-event'] },
        { time: '07:45', country: 'Portugal', greeting: 'Bom dia', description: 'Good morning from Portugal. It is currently the average wake-up time in Portugal', addPortugalTime: true, checkWeather: 'Lisbon', customClasses: ['waketime-event'] },
        { time: '04:45', country: 'Turkey', greeting: 'Günaydın', description: 'Good morning from Turkey. It is currently the average wake-up time in Turkey', addTurkeyTime: true, checkWeather: 'Istanbul', customClasses: ['waketime-event'] },
        { time: '04:50', country: 'Saudi Arabia', greeting: 'صباح الخير', description: 'Good morning from Saudi Arabia. It is currently the average wake-up time in Saudi Arabia', addSaudiArabiaTime: true, checkWeather: 'Riyadh', customClasses: ['waketime-event'] },
        { time: '04:45', country: 'South Africa', greeting: 'Goeie môre', description: 'Good morning from South Africa. It is currently the average wake-up time in South Africa', addSouthAfricaTime: true, checkWeather: 'Johannesburg', customClasses: ['waketime-event'] },
        { time: '12:00', country: 'Canada', greeting: 'Good morning', description: 'Good morning from Canada (Toronto). It is currently the average wake-up time in Toronto', addCanadaTime: true, checkWeather: 'Toronto', customClasses: ['waketime-event'] },
        { time: '07:15', country: 'United Kingdom', greeting: 'Good morning', description: 'Good morning from the United Kingdom. It is currently the average wake-up time in the UK', addUKTime: true, checkWeather: 'London', customClasses: ['waketime-event'] },
        { time: '06:30', country: 'Netherlands', greeting: 'Goedemorgen', description: 'Good morning from the Netherlands. It is currently the average wake-up time in the Netherlands', addNetherlandsTime: true, checkWeather: 'Amsterdam', customClasses: ['waketime-event'] },
        { time: '11:45', country: 'Colombia', greeting: 'Buenos días', description: 'Good morning from Colombia. It is currently the average wake-up time in Colombia', addColombiaTime: true, checkWeather: 'Bogota', customClasses: ['waketime-event'] },
        { time: '06:30', country: 'Belgium', greeting: 'Goedemorgen', description: 'Good morning from Belgium. It is currently the average wake-up time in Belgium', addBelgiumTime: true, checkWeather: 'Brussels', customClasses: ['waketime-event'] },
        { time: '06:25', country: 'Denmark', greeting: 'God morgen', description: 'Good morning from Denmark. It is currently the average wake-up time in Denmark', addDenmarkTime: true, checkWeather: 'Copenhagen', customClasses: ['waketime-event'] },
        { time: '06:15', country: 'Sweden', greeting: 'God morgon', description: 'Good morning from Sweden. It is currently the average wake-up time in Sweden', addSwedenTime: true, checkWeather: 'Stockholm', customClasses: ['waketime-event'] },
        { time: '06:00', country: 'Norway', greeting: 'God morgen', description: 'Good morning from Norway. It is currently the average wake-up time in Norway', addNorwayTime: true, checkWeather: 'Oslo', customClasses: ['waketime-event'] },
        { time: '05:00', country: 'Finland', greeting: 'Hyvää huomenta', description: 'Good morning from Finland. It is currently the average wake-up time in Finland', addFinlandTime: true, checkWeather: 'Helsinki', customClasses: ['waketime-event'] },
        { time: '06:15', country: 'Switzerland', greeting: 'Guten Morgen', description: 'Good morning from Switzerland. It is currently the average wake-up time in Switzerland', addSwitzerlandTime: true, checkWeather: 'Zurich', customClasses: ['waketime-event'] },
        { time: '23:30', country: 'China', greeting: '早上好', description: 'Good morning from China. It is currently the average wake-up time in China', addChinaTime: true, checkWeather: 'Beijing', customClasses: ['waketime-event'] },
        { time: '23:15', country: 'Malaysia', greeting: 'Selamat pagi', description: 'Good morning from Malaysia. It is currently the average wake-up time in Malaysia', addMalaysiaTime: true, checkWeather: 'Kuala Lumpur', customClasses: ['waketime-event'] },
        { time: '00:00', country: 'Thailand', greeting: 'สวัสดีตอนเช้า', description: 'Good morning from Thailand. It is currently the average wake-up time in Thailand', addThailandTime: true, checkWeather: 'Bangkok', customClasses: ['waketime-event'] },
        { time: '23:00', country: 'Singapore', greeting: 'Good morning', description: 'Good morning from Singapore. It is currently the average wake-up time in Singapore', addSingaporeTime: true, checkWeather: 'Singapore', customClasses: ['waketime-event'] },
        { time: '23:45', country: 'Vietnam', greeting: 'Chào buổi sáng', description: 'Good morning from Vietnam. It is currently the average wake-up time in Vietnam', addVietnamTime: true, checkWeather: 'Ho Chi Minh City', customClasses: ['waketime-event'] },
        { time: '06:30', country: 'Poland', greeting: 'Dzień dobry', description: 'Good morning from Poland. It is currently the average wake-up time in Poland', addPolandTime: true, checkWeather: 'Warsaw', customClasses: ['waketime-event'] },
        { time: '10:00', country: 'Chile', greeting: 'Buenos días', description: 'Good morning from Chile. It is currently the average wake-up time in Chile', addChileTime: true, checkWeather: 'Santiago', customClasses: ['waketime-event'] },
// ... other events ...

// AVERAGE BEDTIMES (in alphabetical order by country)
{ time: '03:05', country: 'Argentina', greeting: 'Buenas noches', description: 'Good night from Argentina. It is currently the average bedtime in Argentina', addArgentinaTime: true, checkWeather: 'Buenos Aires', customClasses: ['bedtime-event'] },
{ time: '13:00', country: 'Australia', greeting: 'Sleep well', description: 'Good night from Australia. It is currently the average bedtime in Australia', addAustraliaTime: true, checkWeather: 'Canberra', customClasses: ['bedtime-event'] },
{ time: '22:40', country: 'Belgium', greeting: 'Goedenacht', description: 'Good night from Belgium. It is currently the average bedtime in Belgium', addBelgiumTime: true, checkWeather: 'Brussels', customClasses: ['bedtime-event'] },
{ time: '22:00', country: 'Brazil', greeting: 'Boa noite', description: 'Good night from Brazil. It is currently the average bedtime in Brazil', addBrazilTime: true, checkWeather: 'Sao Paulo', customClasses: ['bedtime-event'] },
{ time: '04:49', country: 'Canada', greeting: 'Good night', description: 'Good night from Canada (Toronto). It is currently the average bedtime in Toronto', addCanadaTime: true, checkWeather: 'Toronto', customClasses: ['bedtime-event'] },
{ time: '15:20', country: 'China', greeting: '晚安', description: 'Good night from China. It is currently the average bedtime in China', addChinaTime: true, checkWeather: 'Beijing', customClasses: ['bedtime-event'] },
{ time: '04:42', country: 'Colombia', greeting: 'Buenas noches', description: 'Good night from Colombia. It is currently the average bedtime in Colombia', addColombiaTime: true, checkWeather: 'Bogota', customClasses: ['bedtime-event'] },
{ time: '22:38', country: 'Denmark', greeting: 'Godnat', description: 'Good night from Denmark. It is currently the average bedtime in Denmark', addDenmarkTime: true, checkWeather: 'Copenhagen', customClasses: ['bedtime-event'] },
{ time: '21:28', country: 'Finland', greeting: 'Hyvää yötä', description: 'Good night from Finland. It is currently the average bedtime in Finland', addFinlandTime: true, checkWeather: 'Helsinki', customClasses: ['bedtime-event'] },
{ time: '22:30', country: 'France', greeting: 'Bonne nuit', description: 'Good night from France. It is currently the average bedtime in France', addFranceTime: true, checkWeather: 'Paris', customClasses: ['bedtime-event'] },
{ time: '19:04', country: 'Germany', greeting: 'Gute Nacht', description: 'Good night from Germany. It is currently the average bedtime in Germany', addGermanyTime: true, checkWeather: 'Berlin', customClasses: ['bedtime-event'] },
{ time: '19:30', country: 'India', greeting: 'शुभ रात्रि', description: 'Good night from India. It is currently the average bedtime in India', addIndiaTime: true, checkWeather: 'New Delhi', customClasses: ['bedtime-event'] },
{ time: '21:00', country: 'Italy', greeting: 'Buonanotte', description: 'Good night from Italy. It is currently the average bedtime in Italy', addItalyTime: true, checkWeather: 'Rome', customClasses: ['bedtime-event'] },
{ time: '21:54', country: 'Japan', greeting: 'おやすみなさい', description: 'Good night from Japan. It is currently the average bedtime in Japan', addJapanTime: true, checkWeather: 'Tokyo', customClasses: ['bedtime-event'] },
{ time: '20:00', country: 'Kenya', greeting: 'Lala salama', description: 'Good night from Kenya. It is currently the average bedtime in Kenya', addKenyaTime: true, checkWeather: 'Nairobi', customClasses: ['bedtime-event'] },
{ time: '15:18', country: 'Malaysia', greeting: 'Selamat malam', description: 'Good night from Malaysia. It is currently the average bedtime in Malaysia', addMalaysiaTime: true, checkWeather: 'Kuala Lumpur', customClasses: ['bedtime-event'] },
{ time: '06:00', country: 'Mexico', greeting: 'Buenas noches', description: 'Good night from Mexico. It is currently the average bedtime in Mexico', addMexicoTime: true, checkWeather: 'Mexico City', customClasses: ['bedtime-event'] },
{ time: '22:45', country: 'Netherlands', greeting: 'Welterusten', description: 'Good night from the Netherlands. It is currently the average bedtime in the Netherlands', addNetherlandsTime: true, checkWeather: 'Amsterdam', customClasses: ['bedtime-event'] },
{ time: '22:30', country: 'Norway', greeting: 'God natt', description: 'Good night from Norway. It is currently the average bedtime in Norway', addNorwayTime: true, checkWeather: 'Oslo', customClasses: ['bedtime-event'] },
{ time: '23:58', country: 'Portugal', greeting: 'Boa noite', description: 'Good night from Portugal. It is currently the average bedtime in Portugal', addPortugalTime: true, checkWeather: 'Lisbon', customClasses: ['bedtime-event'] },
{ time: '20:00', country: 'Russia', greeting: 'Спокойной ночи', description: 'Good night from Russia. It is currently the average bedtime in Russia', addRussiaTime: true, checkWeather: 'Moscow', customClasses: ['bedtime-event'] },
{ time: '20:54', country: 'Saudi Arabia', greeting: 'تصبح على خير', description: 'Good night from Saudi Arabia. It is currently the average bedtime in Saudi Arabia', addSaudiArabiaTime: true, checkWeather: 'Riyadh', customClasses: ['bedtime-event'] },
{ time: '21:50', country: 'South Africa', greeting: 'Goeie nag', description: 'Good night from South Africa. It is currently the average bedtime in South Africa', addSouthAfricaTime: true, checkWeather: 'Johannesburg', customClasses: ['bedtime-event'] },
{ time: '15:03', country: 'South Korea', greeting: '안녕히 주무세요', description: 'Good night from South Korea. It is currently the average bedtime in South Korea', addSouthKoreaTime: true, checkWeather: 'Seoul', customClasses: ['bedtime-event'] },
{ time: '23:15', country: 'Spain', greeting: 'Buenas noches', description: 'Good night from Spain. It is currently the average bedtime in Spain', addSpainTime: true, checkWeather: 'Madrid', customClasses: ['bedtime-event'] },
{ time: '22:35', country: 'Sweden', greeting: 'God natt', description: 'Good night from Sweden. It is currently the average bedtime in Sweden', addSwedenTime: true, checkWeather: 'Stockholm', customClasses: ['bedtime-event'] },
{ time: '22:25', country: 'Switzerland', greeting: 'Gute Nacht', description: 'Good night from Switzerland. It is currently the average bedtime in Switzerland', addSwitzerlandTime: true, checkWeather: 'Zurich', customClasses: ['bedtime-event'] },
{ time: '10:17:50', country: 'Thailand', greeting: 'ราตรีสวัสดิ์', description: 'Good night from Thailand. It is currently the average bedtime in Thailand', addThailandTime: true, checkWeather: 'Bangkok', customClasses: ['bedtime-event'] },
{ time: '20:55', country: 'Turkey', greeting: 'İyi geceler', description: 'Good night from Turkey. It is currently the average bedtime in Turkey', addTurkeyTime: true, checkWeather: 'Istanbul', customClasses: ['bedtime-event'] },
{ time: '21:00', country: 'UAE', greeting: 'تصبح على خير', description: 'Good night from UAE. It is currently the average bedtime in UAE', addUAETime: true, checkWeather: 'Dubai', customClasses: ['bedtime-event'] },
{ time: '23:47', country: 'United Kingdom', greeting: 'Good night', description: 'Good night from the United Kingdom. It is currently the average bedtime in the UK', addUKTime: true, checkWeather: 'London', customClasses: ['bedtime-event'] },
{ time: '22:00', country: 'USA', greeting: 'Good night', description: 'Good night from USA. It is currently the average bedtime in USA', addUSATime: true, checkWeather: 'Washington, D.C', customClasses: ['bedtime-event'] },

        { time: '04:30', country: 'Thailand', greeting: 'สวัสดีตอนเช้า (Sawasdee Ton Chao)', description: 'Morning prayer at Buddhist temples begins across the country. Buddhists in Thailand perform morning prayers as part of their daily routine, often offering alms to monks.', addThailandTime: true },
        { time: '09:00', country: 'Egypt', greeting: 'صباح الخير (Sabah Alkhayr)', description: 'First Nile river cruise departs from Cairo. The Nile River has been the lifeblood of Egypt since ancient times, providing water, transportation, and food.', addEgyptTime: true },
        { time: '16:00', country: 'Spain', greeting: 'Buenas tardes', description: 'Flamenco dance performances start in. Flamenco is a deeply expressive art form of southern Spain, blending singing, guitar, dance, and handclaps.', addSpainTime: true },
        { time: '05:00', country: 'China', greeting: '早上好 (Zǎoshang hǎo)', description: 'Tai Chi sessions in the parks of Beijing. Tai Chi is an ancient martial art practiced for its health benefits and meditative qualities.', addChinaTime: true },
        { time: '17:30', country: 'Greece', greeting: 'Καλησπέρα (Kalispera)', description: 'Sunset watching begins at the cliffs of Santorini. Santorini is known for its stunning sunsets, attracting tourists from all over the world.', addGreeceTime: true },
        { time: '10:30', country: 'Turkey', greeting: 'Günaydın', description: 'Morning call to prayer echoes from Istanbul’s mosques. The call to prayer (Adhan) is broadcast five times a day in predominantly Muslim countries, including Turkey.', addTurkeyTime: true },
        { time: '15:00', country: 'Kenya', greeting: 'Habari za mchana', description: 'Game drives in Maasai Mara National Reserve. The Maasai Mara is one of Africa’s most famous wildlife reserves, known for the annual Great Migration.', addKenyaTime: true },
        { time: '08:00', country: 'United Arab Emirates', greeting: 'صباح الخير (Sabah Alkhayr)', description: 'Hot air balloon rides over the deserts of Dubai. Dubai offers breathtaking sunrise views of the desert from hot air balloons.', addUAETime: true },
        { time: '12:00', country: 'Germany', greeting: 'Guten Tag', description: 'Oktoberfest celebrations begin in Munich. Oktoberfest is the world’s largest beer festival, held annually in Munich, Germany.', addGermanyTime: true },
        { time: '22:00', country: 'Argentina', greeting: 'Buenas noches', description: 'Tango shows start in the Milonga clubs of Buenos Aires. Buenos Aires is considered the birthplace of the tango, a dance with roots in the working-class neighborhoods of the city.', addArgentinaTime: true },
        { time: '18:00', country: 'South Korea', greeting: '안녕하세요 (Annyeonghaseyo)', description: 'Street food markets open in Seoul. South Korea is famous for its vibrant street food culture, offering dishes like tteokbokki, hotteok, and gimbap.', addSouthKoreaTime: true },
        { time: '09:30', country: 'Morocco', greeting: 'صباح الخير (Sabah Alkhayr)', description: 'Camel treks begin in the Sahara Desert. Camel caravans have been a part of Sahara Desert travel for centuries, especially for trade routes.', addMoroccoTime: true },
        { time: '12:30', country: 'Sweden', greeting: 'God eftermiddag', description: 'Fika coffee breaks in cafes across Stockholm. Fika is a traditional Swedish coffee break that encourages taking time to relax and socialize.', addSwedenTime: true },
        { time: '15:20:50', country: 'Netherlands', greeting: 'Goedemiddag', description: 'Cycling tours through the tulip fields begin in Lisse. The Netherlands is famous for its tulip fields, especially during springtime.', addNetherlandsTime: true },
        { time: '08:00', country: 'Nepal', greeting: 'शुभ प्रभात (Shubha Prabhat)', description: 'Treks to Mount Everest Base Camp depart from Kathmandu. Nepal is home to Mount Everest, the highest mountain in the world.', addNepalTime: true },
        { time: '18:30', country: 'Portugal', greeting: 'Boa noite', description: 'Fado music performances in Lisbon begin. Fado is a genre of Portuguese music known for its melancholic and soulful melodies.', addPortugalTime: true },
        { time: '06:00', country: 'New Zealand', greeting: 'Mōrena', description: 'First sunrise viewing at the beaches of Gisborne. Gisborne is one of the first cities in the world to see the sunrise each day.', addNewZealandTime: true },
        { time: '20:00', country: 'Colombia', greeting: 'Buenas noches', description: 'Night salsa dancing in the clubs of Cali. Cali is known as the salsa dancing capital of the world, with a rich tradition of music and dance.', addColombiaTime: true },
        { time: '14:00', country: 'Israel', greeting: 'שָׁלוֹם (Shalom)', description: 'Walking tours of the Old City of Jerusalem begin. Jerusalem is a holy city for Jews, Christians, and Muslims, making it a cultural and religious hub.', addIsraelTime: true },
        { time: '06:30', country: 'Iceland', greeting: 'Góðan daginn', description: 'Whale watching tours start from Reykjavik. Iceland is known for its abundant marine life, especially whales, making it a prime location for whale watching.', addIcelandTime: true },
        { time: '12:30', country: 'Finland', greeting: 'Hyvää päivää', description: 'Sauna sessions begin in Helsinki. Saunas are an integral part of Finnish culture, with over two million saunas in the country.', addFinlandTime: true },
        { time: '05:45', country: 'Cambodia', greeting: 'អរុណសួស្តី (Arun Suostei)', description: 'Sunrise viewing at Angkor Wat. Angkor Wat is the largest religious monument in the world and a UNESCO World Heritage Site.', addCambodiaTime: true },
        { time: '13:00', country: 'Switzerland', greeting: 'Grüezi', description: 'Alpine skiing in the Swiss Alps. Switzerland is renowned for its world-class skiing resorts nestled in the Alps.', addSwitzerlandTime: true },
        { time: '16:00', country: 'Peru', greeting: 'Buenas tardes', description: 'Hiking tours start on the Inca Trail to Machu Picchu. The Inca Trail is a famous trekking route that leads to the ancient city of Machu Picchu.', addPeruTime: true },
        { time: '19:30', country: 'Czech Republic', greeting: 'Dobrý večer', description: 'Puppet theatre shows in Prague. Czech puppet theatre has a long tradition, with performances still popular in modern Prague.', addCzechRepublicTime: true },

        { time: '13:21:55', country: 'Spain', greeting: 'Hola', description: '2La Tomatinaa festival begins in Barcelona', addAustraliaTime: true, checkWeather: 'London,UK' }, //addAustraliaTime: true, checkWeather: 'Barcelona,ES' },

        { time: '17:11:30', country: 'France', greeting: 'Bonjour', description: 'France is going off right now', addFranceTime: true, checkWeather: 'London', customClasses: ['bedtime-event'] }, 
        { time: '13:22:50', country: 'Spain', greeting: 'Hola', description: '4La Tomatinaaaa festival begins in Buñol', addAustraliaTime: true},
        { time: '11:26:30', country: 'Spain', greeting: 'Hola', description: '5La Tomatinffgaaaa festival begins in Buñol' },
        { time: '11:26:35', country: 'Spain', greeting: 'Hola', description: '6La Tomatinffgaaaa festival begins in Buñol' },
        { time: '11:25:25', country: 'Spain', greeting: 'Hola', description: '7La Tomatinffgaaaa festival begins in Buñol' },

    // Additional global events

    { time: '13:00', country: 'Japan', greeting: 'こんにちは (Konnichiwa)', description: 'Cherry blossom viewing begins in Ueno Park', addJapanTime: true },
    { time: '15:30', country: 'Brazil', greeting: 'Boa tarde', description: 'Football matches kick off in Rio de Janeiro', addBrazilTime: true },
    { time: '07:00', country: 'India', greeting: 'सुप्रभात (Suprabhat)', description: 'Spice markets open in Old Delhi', addIndiaTime: true },
    { time: '12:00', country: 'Australia', greeting: 'Good afternoon', description: 'Surfing competitions start at Bondi Beach', addAustraliaTime: true },  // Australia uses English
    { time: '06:00', country: 'South Africa', greeting: 'Goeie môre', description: 'Safari tours depart from Kruger National Park', addSouthAfricaTime: true },  // Afrikaans
    { time: '10:00', country: 'USA', greeting: 'Good morning', description: 'Broadway matinees begin in New York City', addUSATime: true },  // USA uses English
    { time: '17:00', country: 'France', greeting: 'Bonsoir', description: 'Wine tasting events start in Bordeaux', addFranceTime: true },
    { time: '11:00', country: 'Mexico', greeting: 'Buenos días', description: 'Mariachi performances begin at Plaza Garibaldi', addMexicoTime: true },
    { time: '08:00', country: 'Russia', greeting: 'Добрый день (Dobry den)', description: 'Moscow Kremlin tours start for visitors', addRussiaTime: true },
    { time: '19:00', country: 'Italy', greeting: 'Buonasera', description: 'Dinner service begins at traditional trattorias in Rome', addItalyTime: true },

    { time: '12:00', country: 'Spain', greeting: 'Hola', description: 'La Tomatina festival begins in Buñol' },
    { time: '07:30', country: 'China', greeting: '早上好', description: 'Great Wall of China opens to visitors' },
    { time: '16:00', country: 'Mexico', greeting: 'Buenas tardes', description: 'Chichen Itza pyramid casts serpent shadow' },
    { time: '18:00', country: 'Egypt', greeting: 'مساء الخير', description: 'Sound and Light Show at the Pyramids of Giza' },
    { time: '09:00', country: 'Canada', greeting: 'Good morning', description: 'Niagara Falls boat tours commence for the day' }
    
    

    ];

    const newEventSound = new Audio('sounds/tap.mp3'); // Replace with your actual sound file path
    let isMuted = false;

    muteToggle.addEventListener('click', () => {
        isMuted = !isMuted;
        muteToggle.textContent = isMuted ? 'Unmute' : 'Mute';
        newEventSound.muted = isMuted;
    });

    function playSound() {
        if (!isMuted) {
            newEventSound.play();
        }
    }

    function updateCurrentTime() {
        const selectedTimezone = timezoneSelect.value;
        const currentTime = moment().tz(selectedTimezone);
        currentTimeElement.innerHTML = `
            ${currentTime.format('dddd, MMMM D, YYYY')}<br>
            ${currentTime.format('HH:mm:ss')}
        `;
    }

  
       // const apiKey = 'cc117e6e050f45f59fb132927241409'; // Replace with your actual WeatherAPI key
       //  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;
        
       async function getWeather(location) {
        try {
            console.log(`Fetching weather for ${location}`);
            const response = await fetch(`http://localhost:3001/weather/${location}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Weather data received:', data);
            return `${data.temperature}°C, ${data.condition}`;
        } catch (error) {
            console.error('Error fetching weather:', error);
            return 'Weather data unavailable';
        }
    }


    // Note: eventTime was also in the code here

 //  async function getWeather(location) {
    //    try {
    //        const response = await fetch(`http://localhost:3000/weather/${location}`);
    //        const data = await response.json();
    //        return data.weather;
    //    } catch (error) {
    //        console.error('Error fetching weather:', error);
    //        return 'Weather data unavailable';
    //    }
   // }
    
   // To add NASA background image to the event listening

    async function createEventElement(event) {
        const eventElement = document.createElement('div');
        eventElement.className = 'timeline-event';

        // Set the background image if it exists
        if (event.backgroundImage) {
            eventElement.style.backgroundImage = `url(${event.backgroundImage})`;
            eventElement.style.backgroundSize = 'cover';
            eventElement.style.backgroundPosition = 'center';
            console.log('Background image set to:', event.backgroundImage); // Debugging
        }

        // Get the current time in the selected timezone
    const selectedTimezone = timezoneSelect.value;
    const currentTime = moment().tz(selectedTimezone);
    
    // Create the timestamp string
    const timestamp = `${currentTime.format('HH:mm:ss')} - ${selectedTimezone}`;
    
        
        let description = event.description;


        if (event.checkWeather && !description.includes('Weather:')) {
            const weather = await getWeather(event.checkWeather);
            console.log('Weather for event:', weather);  // Add this line for debugging
            description = description.replace(/\(Weather:.*?\)/, '').trim(); // Remove any existing weather info
            
        }
       // if (event.isWelcomeMessage) {
           // eventElement.classList.add('welcome-message');
                 // Display immediately when page is loaded
           // eventElement.style.display = 'block';
            
                // Set a timeout to remove the welcome message after 30 seconds
           // setTimeout(() => {
            //    eventElement.style.opacity = '0';
            //    eventElement.style.transition = 'opacity 1s';
           //     setTimeout(() => eventElement.remove(), 1000); // Remove after fade out
          //  }, 6 * 60 * 60000); // 30 seconds
        //}
        // Add custom classes if they exist
        if (event.customClasses) {
        event.customClasses.forEach(className => {
            eventElement.classList.add(className);
        });
    }
       
        if (event.addAustraliaTime) {
            australiaTime = moment().tz('Australia/Sydney').add(2, 'seconds');
            const australiaTimeString = australiaTime.format('HH:mm');
            event.country += ` - The time in Australia now is ${australiaTimeString}`;
            
            // Add dark grey shade if Australia time is earlier than 07:00 or later than 21:00
            if (australiaTime.hour() >= 7 && australiaTime.hour() < 21) {
                eventElement.classList.add('day-time-event');
            } else {
                eventElement.classList.add('night-time-event');
            }
        }

        if (event.addFranceTime) {
            franceTime = moment().tz('Europe/Paris').add(2, 'seconds');
            const franceTimeString = franceTime.format('HH:mm');
            event.country += ` - The time here now is ${franceTimeString}`;
            
        
        }

        if (event.addUKTime) {
            ukTime = moment().tz('Europe/London').add(2, 'seconds');
            const ukTimeString = ukTime.format('HH:mm');
            event.country += ` - The time in the UK now is ${ukTimeString}`;
            
            // Add dark grey shade if UK time is earlier than 07:00 or later than 21:00
            if (ukTime.hour() >= 7 && ukTime.hour() < 21) {
                eventElement.classList.add('day-time-event');
            } else {
                eventElement.classList.add('night-time-event');
            }
        }

        if (event.addJapanTime) {
            japanTime = moment().tz('Asia/Tokyo').add(2, 'seconds');
            const japanTimeString = japanTime.format('HH:mm');
            event.country += ` - The time in Japan now is ${japanTimeString}`;
            
            if (japanTime.hour() >= 7 && japanTime.hour() < 21) {
                eventElement.classList.add('day-time-event');
            } else {
                eventElement.classList.add('night-time-event');
            }
        }

        if (event.addIndiaTime) {
            indiaTime = moment().tz('Asia/Kolkata').add(2, 'seconds');
            const indiaTimeString = indiaTime.format('HH:mm');
            event.country += ` - The time in India now is ${indiaTimeString}`;
            
            if (indiaTime.hour() >= 7 && indiaTime.hour() < 21) {
                eventElement.classList.add('day-time-event');
            } else {
                eventElement.classList.add('night-time-event');
            }
        }

        if (event.addUAETime) {
            uaeTime = moment().tz('Asia/Dubai').add(2, 'seconds');
            const uaeTimeString = uaeTime.format('HH:mm');
            event.country += ` - The time in UAE now is ${uaeTimeString}`;
            
            if (uaeTime.hour() >= 7 && uaeTime.hour() < 21) {
                eventElement.classList.add('day-time-event');
            } else {
                eventElement.classList.add('night-time-event');
            }
        }

        if (event.addGermanyTime) {
            germanyTime = moment().tz('Europe/Berlin').add(2, 'seconds');
            const germanyTimeString = germanyTime.format('HH:mm');
            event.country += ` - The time in Germany now is ${germanyTimeString}`;
            
            if (germanyTime.hour() >= 7 && germanyTime.hour() < 21) {
                eventElement.classList.add('day-time-event');
            } else {
                eventElement.classList.add('night-time-event');
            }
        }

        if (event.addBrazilTime) {
            brazilTime = moment().tz('America/Sao_Paulo').add(2, 'seconds');
            const brazilTimeString = brazilTime.format('HH:mm');
            event.country += ` - The time in Brazil now is ${brazilTimeString}`;
            
            if (brazilTime.hour() >= 7 && brazilTime.hour() < 21) {
                eventElement.classList.add('day-time-event');
            } else {
                eventElement.classList.add('night-time-event');
            }
        }

        if (event.addUSATime) {
            usaTime = moment().tz('America/New_York').add(2, 'seconds');
            const usaTimeString = usaTime.format('HH:mm');
            event.country += ` - The time in USA now is ${usaTimeString}`;
            
            if (usaTime.hour() >= 7 && usaTime.hour() < 21) {
                eventElement.classList.add('day-time-event');
            } else {
                eventElement.classList.add('night-time-event');
            }
        }

        if (event.addKenyaTime) {
            kenyaTime = moment().tz('Africa/Nairobi').add(2, 'seconds');
            const kenyaTimeString = kenyaTime.format('HH:mm');
            event.country += ` - The time in Kenya now is ${kenyaTimeString}`;
            
            if (kenyaTime.hour() >= 7 && kenyaTime.hour() < 21) {
                eventElement.classList.add('day-time-event');
            } else {
                eventElement.classList.add('night-time-event');
            }
        }

       // if (event.checkWeather) {
           // const weather = await getWeather(event.checkWeather);
          //  description += ` (Weather: ${weather})`;
      //  }
//
        if (event.addRussiaTime) {
            russiaTime = moment().tz('Europe/Moscow').add(2, 'seconds');
            const russiaTimeString = russiaTime.format('HH:mm');
            event.country += ` - The time in Russia now is ${russiaTimeString}`;
            
            if (russiaTime.hour() >= 7 && russiaTime.hour() < 21) {
                eventElement.classList.add('day-time-event');
            } else {
                eventElement.classList.add('night-time-event');
            }
        }

        if (event.addItalyTime) {
            italyTime = moment().tz('Europe/Rome').add(2, 'seconds');
            const italyTimeString = italyTime.format('HH:mm');
            event.country += ` - The time in Italy now is ${italyTimeString}`;
            
            if (italyTime.hour() >= 7 && italyTime.hour() < 21) {
                eventElement.classList.add('day-time-event');
            } else {
                eventElement.classList.add('night-time-event');
            }
        }

        if (event.addThailandTime) {
            thailandTime = moment().tz('Asia/Bangkok').add(2, 'seconds');
            const thailandTimeString = thailandTime.format('HH:mm');
            event.country += ` - The time in Thailand now is ${thailandTimeString}`;
            
            if (thailandTime.hour() >= 7 && thailandTime.hour() < 21) {
                eventElement.classList.add('day-time-event');
            } else {
                eventElement.classList.add('night-time-event');
            }
        }
    
        if (event.addEgyptTime) {
            egyptTime = moment().tz('Africa/Cairo').add(2, 'seconds');
            const egyptTimeString = egyptTime.format('HH:mm');
            event.country += ` - The time in Egypt now is ${egyptTimeString}`;
            
            if (egyptTime.hour() >= 7 && egyptTime.hour() < 21) {
                eventElement.classList.add('day-time-event');
            } else {
                eventElement.classList.add('night-time-event');
            }
        }
    
        if (event.addSpainTime) {
            spainTime = moment().tz('Europe/Madrid').add(2, 'seconds');
            const spainTimeString = spainTime.format('HH:mm');
            event.country += ` - The time in Spain now is ${spainTimeString}`;
            
            if (spainTime.hour() >= 7 && spainTime.hour() < 21) {
                eventElement.classList.add('day-time-event');
                document.body.classList.remove('night-background');
                document.body.classList.add('day-background');
            } else {
                eventElement.classList.add('night-time-event');
                document.body.classList.remove('day-background');
                document.body.classList.add('night-background');
            }
        }

        if (event.addChinaTime) {
            chinaTime = moment().tz('Asia/Shanghai').add(2, 'seconds');
            const chinaTimeString = chinaTime.format('HH:mm');
            event.country += ` - The time in China now is ${chinaTimeString}`;
            
            if (chinaTime.hour() >= 7 && chinaTime.hour() < 21) {
                eventElement.classList.add('day-time-event');
            } else {
                eventElement.classList.add('night-time-event');
            }
        }
    
        if (event.addArgentinaTime) {
            argentinaTime = moment().tz('America/Argentina/Buenos_Aires').add(2, 'seconds');
            const argentinaTimeString = argentinaTime.format('HH:mm');
            event.country += ` - The time in Argentina now is ${argentinaTimeString}`;
            
            if (argentinaTime.hour() >= 7 && argentinaTime.hour() < 21) {
                eventElement.classList.add('day-time-event');
            } else {
                eventElement.classList.add('night-time-event');
            }
        }
    
        if (event.addSouthKoreaTime) {
            southKoreaTime = moment().tz('Asia/Seoul').add(2, 'seconds');
            const southKoreaTimeString = southKoreaTime.format('HH:mm');
            event.country += ` - The time in South Korea now is ${southKoreaTimeString}`;
            
            if (southKoreaTime.hour() >= 7 && southKoreaTime.hour() < 21) {
                eventElement.classList.add('day-time-event');
            } else {
                eventElement.classList.add('night-time-event');
            }
        }

        if (event.addGreeceTime) {
            greeceTime = moment().tz('Europe/Athens').add(2, 'seconds');
            const greeceTimeString = greeceTime.format('HH:mm');
            event.country += ` - The time in Greece now is ${greeceTimeString}`;
            
            if (greeceTime.hour() >= 7 && greeceTime.hour() < 21) {
                eventElement.classList.add('day-time-event');
            } else {
                eventElement.classList.add('night-time-event');
            }
        }
    
        if (event.addTurkeyTime) {
            turkeyTime = moment().tz('Europe/Istanbul').add(2, 'seconds');
            const turkeyTimeString = turkeyTime.format('HH:mm');
            event.country += ` - The time in Turkey now is ${turkeyTimeString}`;
            
            if (turkeyTime.hour() >= 7 && turkeyTime.hour() < 21) {
                eventElement.classList.add('day-time-event');
            } else {
                eventElement.classList.add('night-time-event');
            }
        }

        if (event.addNetherlandsTime) {
            netherlandsTime = moment().tz('Europe/Amsterdam').add(2, 'seconds');
            const netherlandsTimeString = netherlandsTime.format('HH:mm');
            event.country += ` - The time in the Netherlands now is ${netherlandsTimeString}`;
            
            if (netherlandsTime.hour() >= 7 && netherlandsTime.hour() < 21) {
                eventElement.classList.add('day-time-event');
            } else {
                eventElement.classList.add('night-time-event');
            }
        }

        if (event.addSaudiArabiaTime) {
            saudiArabiaTime = moment().tz('Asia/Riyadh').add(2, 'seconds');
            const saudiArabiaTimeString = saudiArabiaTime.format('HH:mm');
            event.country += ` - The time in Saudi Arabia now is ${saudiArabiaTimeString}`;
            
            if (saudiArabiaTime.hour() >= 7 && saudiArabiaTime.hour() < 21) {
                eventElement.classList.add('day-time-event');
            } else {
                eventElement.classList.add('night-time-event');
            }
        }
        
        if (event.addSouthAfricaTime) {
            southAfricaTime = moment().tz('Africa/Johannesburg').add(2, 'seconds');
            const southAfricaTimeString = southAfricaTime.format('HH:mm');
            event.country += ` - The time in South Africa now is ${southAfricaTimeString}`;
            
            if (southAfricaTime.hour() >= 7 && southAfricaTime.hour() < 21) {
                eventElement.classList.add('day-time-event');
            } else {
                eventElement.classList.add('night-time-event');
            }
        }
        
        if (event.addCanadaTime) {
            canadaTime = moment().tz('America/Toronto').add(2, 'seconds');
            const canadaTimeString = canadaTime.format('HH:mm');
            event.country += ` - The time in Canada (Toronto) now is ${canadaTimeString}`;
            
            if (canadaTime.hour() >= 7 && canadaTime.hour() < 21) {
                eventElement.classList.add('day-time-event');
            } else {
                eventElement.classList.add('night-time-event');
            }
        }
        
        if (event.addColombiaTime) {
            colombiaTime = moment().tz('America/Bogota').add(2, 'seconds');
            const colombiaTimeString = colombiaTime.format('HH:mm');
            event.country += ` - The time in Colombia now is ${colombiaTimeString}`;
            
            if (colombiaTime.hour() >= 7 && colombiaTime.hour() < 21) {
                eventElement.classList.add('day-time-event');
            } else {
                eventElement.classList.add('night-time-event');
            }
        }
        
        if (event.addBelgiumTime) {
            belgiumTime = moment().tz('Europe/Brussels').add(2, 'seconds');
            const belgiumTimeString = belgiumTime.format('HH:mm');
            event.country += ` - The time in Belgium now is ${belgiumTimeString}`;
            
            if (belgiumTime.hour() >= 7 && belgiumTime.hour() < 21) {
                eventElement.classList.add('day-time-event');
            } else {
                eventElement.classList.add('night-time-event');
            }
        }
        
        if (event.addDenmarkTime) {
            denmarkTime = moment().tz('Europe/Copenhagen').add(2, 'seconds');
            const denmarkTimeString = denmarkTime.format('HH:mm');
            event.country += ` - The time in Denmark now is ${denmarkTimeString}`;
            
            if (denmarkTime.hour() >= 7 && denmarkTime.hour() < 21) {
                eventElement.classList.add('day-time-event');
            } else {
                eventElement.classList.add('night-time-event');
            }
        }
        
        if (event.addSwedenTime) {
            swedenTime = moment().tz('Europe/Stockholm').add(2, 'seconds');
            const swedenTimeString = swedenTime.format('HH:mm');
            event.country += ` - The time in Sweden now is ${swedenTimeString}`;
            
            if (swedenTime.hour() >= 7 && swedenTime.hour() < 21) {
                eventElement.classList.add('day-time-event');
            } else {
                eventElement.classList.add('night-time-event');
            }
        }
        
        if (event.addNorwayTime) {
            norwayTime = moment().tz('Europe/Oslo').add(2, 'seconds');
            const norwayTimeString = norwayTime.format('HH:mm');
            event.country += ` - The time in Norway now is ${norwayTimeString}`;
            
            if (norwayTime.hour() >= 7 && norwayTime.hour() < 21) {
                eventElement.classList.add('day-time-event');
            } else {
                eventElement.classList.add('night-time-event');
            }
        }
        
        if (event.addFinlandTime) {
            finlandTime = moment().tz('Europe/Helsinki').add(2, 'seconds');
            const finlandTimeString = finlandTime.format('HH:mm');
            event.country += ` - The time in Finland now is ${finlandTimeString}`;
            
            if (finlandTime.hour() >= 7 && finlandTime.hour() < 21) {
                eventElement.classList.add('day-time-event');
            } else {
                eventElement.classList.add('night-time-event');
            }
        }
        
        if (event.addSwitzerlandTime) {
            switzerlandTime = moment().tz('Europe/Zurich').add(2, 'seconds');
            const switzerlandTimeString = switzerlandTime.format('HH:mm');
            event.country += ` - The time in Switzerland now is ${switzerlandTimeString}`;
            
            if (switzerlandTime.hour() >= 7 && switzerlandTime.hour() < 21) {
                eventElement.classList.add('day-time-event');
            } else {
                eventElement.classList.add('night-time-event');
            }
        }
        
        
        if (event.addMalaysiaTime) {
            malaysiaTime = moment().tz('Asia/Kuala_Lumpur').add(2, 'seconds');
            const malaysiaTimeString = malaysiaTime.format('HH:mm');
            event.country += ` - The time in Malaysia now is ${malaysiaTimeString}`;
            
            if (malaysiaTime.hour() >= 7 && malaysiaTime.hour() < 21) {
                eventElement.classList.add('day-time-event');
            } else {
                eventElement.classList.add('night-time-event');
            }
        }
        
        if (event.addThailandTime) {
            thailandTime = moment().tz('Asia/Bangkok').add(2, 'seconds');
            const thailandTimeString = thailandTime.format('HH:mm');
            event.country += ` - The time in Thailand now is ${thailandTimeString}`;
            
            if (thailandTime.hour() >= 7 && thailandTime.hour() < 21) {
                eventElement.classList.add('day-time-event');
            } else {
                eventElement.classList.add('night-time-event');
            }
        }
        
        if (event.addSingaporeTime) {
            singaporeTime = moment().tz('Asia/Singapore').add(2, 'seconds');
            const singaporeTimeString = singaporeTime.format('HH:mm');
            event.country += ` - The time in Singapore now is ${singaporeTimeString}`;
            
            if (singaporeTime.hour() >= 7 && singaporeTime.hour() < 21) {
                eventElement.classList.add('day-time-event');
            } else {
                eventElement.classList.add('night-time-event');
            }
        }
        
        if (event.addVietnamTime) {
            vietnamTime = moment().tz('Asia/Ho_Chi_Minh').add(2, 'seconds');
            const vietnamTimeString = vietnamTime.format('HH:mm');
            event.country += ` - The time in Vietnam now is ${vietnamTimeString}`;
            
            if (vietnamTime.hour() >= 7 && vietnamTime.hour() < 21) {
                eventElement.classList.add('day-time-event');
            } else {
                eventElement.classList.add('night-time-event');
            }
        }
        
        if (event.addPolandTime) {
            polandTime = moment().tz('Europe/Warsaw').add(2, 'seconds');
            const polandTimeString = polandTime.format('HH:mm');
            event.country += ` - The time in Poland now is ${polandTimeString}`;
            
            if (polandTime.hour() >= 7 && polandTime.hour() < 21) {
                eventElement.classList.add('day-time-event');
            } else {
                eventElement.classList.add('night-time-event');
            }
        }
        
        if (event.addChileTime) {
            chileTime = moment().tz('America/Santiago').add(2, 'seconds');
            const chileTimeString = chileTime.format('HH:mm');
            event.country += ` - The time in Chile now is ${chileTimeString}`;
            
            if (chileTime.hour() >= 7 && chileTime.hour() < 21) {
                eventElement.classList.add('day-time-event');
            } else {
                eventElement.classList.add('night-time-event');
            }
        }
        
        let eventContent = `
            <div class="event-timestamp">${timestamp}</div> 
            <strong>${event.country}</strong> 
            ${event.checkWeather ? `<div class="weather-info">${await getWeather(event.checkWeather)}</div>` : ''} 
            <div class="greeting">${event.greeting}</div>
            <div class="description">${description}</div>
            <div class="description">${event.description2 || ''}</div> 
            <div class="description">${event.link || ''}</div>
            
            
        `;

        eventElement.innerHTML = eventContent;
        eventElement.dataset.creationTime = moment().valueOf();
        return eventElement;
    }

    function animateElementRemoval(element) {
        return new Promise(resolve => {
            element.classList.add('fade-out');
            element.addEventListener('animationend', () => {
                element.remove();
                resolve();
            }, { once: true });
        });
    }

    function scrollTimelineToTop() {
        const timeline = document.getElementById('timeline');
        if (timeline) {
            timeline.scrollTo({
                top: 0,
                behavior: 'smooth',
              block: 'start'
           });
       }
   }

   function scrollToWelcomeMessage() {
    const timeline = document.getElementById('timeline');
    const welcomeMessage = timeline.querySelector('.welcome-message');
    if (timeline && welcomeMessage) {
        welcomeMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    }
    

    function scrollToNewestEvent() {
        const timeline = document.getElementById('timeline');
        if (timeline && timeline.lastElementChild) {
            timeline.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    function scrollPageToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    const randomFacts = [
        { country: 'USA', greeting: 'Did you know?', description: 'The average person in the USA spends 6 months of their lifetime waiting for red lights to turn green.', timezone: 'America/New_York' },
        { country: 'Tanzania', greeting: 'Interesting fact:', description: 'In Tanzania, a group of flamingos is called a "flamboyance". Lake Natron is home to millions of these birds.', timezone: 'Africa/Dar_es_Salaam' },
        { country: 'UK', greeting: 'Historical tidbit:', description: 'The shortest war in history lasted 38 minutes. It was between Britain and Zanzibar in 1896.', timezone: 'Europe/London' },
        { country: 'France', greeting: 'Scientific fact:', description: 'French researchers discovered that honeybees can recognize human faces.', timezone: 'Europe/Paris' },
        { country: 'USA', greeting: 'Nature marvel:', description: 'In California, USA, the world\'s oldest known living tree is over 5,000 years old.', timezone: 'America/Los_Angeles' }
      ];
      
      function getRandomFact() {
        const fact = randomFacts[Math.floor(Math.random() * randomFacts.length)];
        // Add a flag to identify this as a random fact
        fact.isRandomFact = true;
        return fact;

    }

    
    
    async function addRandomFactToTimeline() {
        const now = moment();
        const randomFact = getRandomFact();
        
        const newEvent = {
            time: `+1`,  // This will make the event appear 1 second from now
            country: randomFact.country,
            greeting: randomFact.greeting,
            description: randomFact.description,
            addUKTime: false
        };
        
        events.push(newEvent);
        
        // Immediately create and add the event to the timeline
        const eventElement = await createEventElement(newEvent, now);
        timeline.appendChild(eventElement);
        setTimeout(() => {
            eventElement.classList.add('slide-down');
            if (newEvent.isRandomFact) {
                eventElement.classList.add('random-fact');  // Add this line
            }
        }, 10);
        newEventSound.play();
        scrollTimelineToTop();
        scrollPageToTop();
    }
    
    // Call this function every minute (60000 milliseconds) randomseconds
    setInterval(addRandomFactToTimeline,6000000);

    const dateSpecificEvents = [
        { date: '2024-09-17', time: '22:32:20', country: 'Ireland', greeting: 'Happy St. Patrick\'s Day!', description: 'Celebrations and parades are taking place across Ireland for St. Patrick\'s Day.', addSpainTime: true },
        { date: '2024-07-04', time: '20:00', country: 'USA', greeting: 'Happy Independence Day!', description: 'Fireworks displays are lighting up the sky across the United States for Independence Day.', addUSATime: true },
        { date: '2024-10-31', time: '18:00', country: 'Various', greeting: 'Happy Halloween!', description: 'Children are trick-or-treating in costumes in many countries celebrating Halloween.', addUKTime: true },
        // Add more date-specific events as needed
    ];

    async function updateTimeline() {
        const selectedTimezone = timezoneSelect.value;
        const currentTime = moment().tz(selectedTimezone);

        const newEvents = [];

        for (const event of dateSpecificEvents) {
            const eventDateTime = moment.tz(`${event.date} ${event.time}`, 'YYYY-MM-DD HH:mm:ss', 'Europe/London');
            if (currentTime.isSame(eventDateTime, 'second')) {
                const existingEvent = Array.from(timeline.children).find(el => 
                    el.querySelector('strong').textContent === event.country &&
                    el.querySelector('.description').textContent.includes(event.description)
                );

                
    
                if (!existingEvent) {
                    const eventElement = await createEventElement(event, eventDateTime);
                    newEvents.push(eventElement);
                    newEventSound.play();
                    scrollTimelineToTop();
                    scrollPageToTop();
                }
            }
        }

        for (const event of events) {
            let eventTime;
            if (event.time.startsWith('+')) {
                const secondsToAdd = parseInt(event.time.slice(1));
                eventTime = moment(currentTime).add(secondsToAdd, 'seconds');
            } else {
                eventTime = moment.tz(`${londonTime.format('YYYY-MM-DD')} ${event.time}`, 'Europe/London');
                if (eventTime.isBefore(londonTime)) {
                    eventTime.add(1, 'day');
                }
            }

            const timeDiffSeconds = currentTime.diff(eventTime, 'seconds');
            if (timeDiffSeconds >= 0 && timeDiffSeconds < 60) {
                const existingEvent = Array.from(timeline.children).find(el => 
                    el.querySelector('strong').textContent === event.country &&
                    el.querySelector('.description').textContent.includes(event.description)
                );
    
                if (!existingEvent) {
                    const eventElement = await createEventElement(event, eventTime);
                    newEvents.push(eventElement);
                    newEventSound.play();
                    scrollTimelineToTop();
                    scrollPageToTop();
                }
            }

            if (newEvents.length > 0) {
                newEvents.forEach(eventElement => {
                    timeline.insertBefore(eventElement, timeline.firstChild);
                    setTimeout(() => {
                        eventElement.classList.add('slide-down');
                    }, 10);
                });
                
                // Scroll to show the newest event
                setTimeout(scrollToNewestEvent, 50);
            }
        }

        // Add new events in reverse order
        newEvents.reverse().forEach(eventElement => {
            timeline.appendChild(eventElement);
            setTimeout(() => {
                eventElement.classList.add('slide-down');
            }, 10);

            scrollTimelineToTop();

        });

        

        // Remove events older than 6 hours
        Array.from(timeline.children).forEach(eventElement => {
            const creationTime = parseInt(eventElement.dataset.creationTime);
            if (currentTime.valueOf() - creationTime >= 6 * 1000) {
                animateElementRemoval(eventElement);
            }
        });
    }

    // Add this function to create and display the welcome message
    function displayWelcomeMessage() {
        const welcomeEvent = {
            country: 'Welcome',
            greeting: 'Hello!',
            description: 'Welcome to People in Motion! This page displays a real-time timeline of events happening around the world. You\'ll see wake-up times, bedtimes, and other interesting events from various countries, all adjusted to your local time zone. Watch as new events appear and disappear throughout the day, giving you a glimpse into the daily rhythms of different cultures across the globe.',
            isWelcomeMessage: true
        };

        createEventElement(welcomeEvent).then(eventElement => {
            timeline.appendChild(eventElement);
            eventElement.classList.add('slide-down', 'welcome-message'); // Add 'full-size-welcome' class
            // Display immediately when page is loaded
            eventElement.style.display = 'block';

            // Scroll to the welcome message
            scrollPageToTop();
            scrollToWelcomeMessage();
        
        
            // Set a timeout to remove the welcome message after 30 seconds
            setTimeout(() => {
                //eventElement.style.opacity = '0';
                eventElement.style.transition = 'opacity 1s';
                setTimeout(() => eventElement.remove(), 7200000); // Remove after fade out (2 hours)
            }, 7200000); // 2 hours
        });
    }

    // Call the function to display the welcome message when the page loads
    displayWelcomeMessage();

    // Add demo events
    function loadRecentEvents() {
        const now = moment();
        const fourHoursAgo = moment().subtract(1, 'hours');

        // Find the welcome message if it exists
    const welcomeMessage = Array.from(timeline.children).find(el => el.classList.contains('welcome-message'));


        events.forEach(async (event) => {
            let eventTime;
            if (event.time.startsWith('+')) {
                const secondsToAdd = parseInt(event.time.slice(1));
                eventTime = moment(now).subtract(secondsToAdd, 'seconds');
            } else {
                eventTime = moment.tz(`${now.format('YYYY-MM-DD')} ${event.time}`, 'Europe/London');
                if (eventTime.isAfter(now)) {
                    eventTime.subtract(1, 'day');
                }
            }

            if (eventTime.isBetween(fourHoursAgo, now)) {
                const eventElement = await createEventElement(event, eventTime);

                
                
             //Insert the new event after the welcome message, or at the top if no welcome message
               if (welcomeMessage) {
                timeline.insertBefore(eventElement, welcomeMessage.nextSibling);
               } else {
                 timeline.insertBefore(eventElement, timeline.firstChild);
               }

                // Scroll to the top of the timeline after loading recent events
                
               // setTimeout(scrollTimelineToTop, 10);

                // Assuming welcomeMessage is always present
                //timeline.insertBefore(eventElement, welcomeMessage.nextSibling);
    
                setTimeout(() => {
                    eventElement.classList.add('slide-down');
                }, 600);
            }
        });
    }

    loadRecentEvents();

    

    scrollTimelineToTop();

    // Update current time and timeline on page load and when timezone is changed
    updateCurrentTime();
    updateTimeline();
    timezoneSelect.addEventListener('change', () => {
        updateCurrentTime();
        updateTimeline();
    });

    // Update current time every second
    setInterval(updateCurrentTime, 1000);

    // Update timeline every second
    setInterval(updateTimeline, 1000);
});


// Only for backend server

const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// In-memory cache for weather data
let weatherCache = {};

// Function to fetch weather data from the API
async function fetchWeatherData(location) {
    const apiKey = 'your_weather_api_key';
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;
    
    try {
        const response = await axios.get(url);
        return `${response.data.current.temp_c}°C, ${response.data.current.condition.text}`;
    } catch (error) {
        console.error('Error fetching weather:', error);
        return 'Weather data unavailable';
    }
}

// Function to update the weather cache
async function updateWeatherCache() {
    const locations = ['London', 'New York', 'Tokyo', 'Sydney', 'Paris']; // Add all your locations
    
    for (const location of locations) {
        weatherCache[location] = await fetchWeatherData(location);
    }
    
    console.log('Weather cache updated');
}

// Update weather cache every 30 minutes
setInterval(updateWeatherCache, 30 * 60 * 1000);

// Initial update
updateWeatherCache();

// Endpoint to get weather data
app.get('/weather/:location', (req, res) => {
    const location = req.params.location;
    res.json({ weather: weatherCache[location] || 'Weather data not available' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

