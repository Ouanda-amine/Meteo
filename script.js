
window.onload = function() { fetchdata(); };

async function fetchdata() {
    try {
        const city = document.getElementById('rechville').value;
        let longt ; 
        let lalti;
        let jour = 25;

        switch (city) { 
            case 'casablanca':
                 longt = 25;
                  lalti = 33;
                break; 
            case 'benimallal':
                 longt = -6;
                  lalti = 32;
                break;
            case 'madrid':
                 longt = -2.39;
                 lalti = 40.41;
                break;
            case 'rabat':
                     longt = -6.84;
                      lalti = 34.02;
                       break;
            case 'newyork': 
                        longt = 73;
                         lalti = 40;
                    break; 
             case 'paris':
                    longt = 20;
                    lalti = 48; 
                    break; 
            case 'london':
                    longt = 13.40; 
                    lalti = 52.52; 
                    break;
                default:
                    console.error('Ville non reconnue'); 
                    return;

        }

        let head = new Headers();
        let username = 'en_amine_amine';
        let password = '57I5r8ZfeP';
        head.set('Authorization', 'Basic ' + btoa(username + ":" + password));

        const res = await fetch(`https://api.meteomatics.com/2025-01-${jour}T12:00:00Z/t_2m:C/${lalti},${longt}_47.46,9.04:10+47.51,8.78:10+47.39,8.57:10/json`, {
            headers: head
        });

        if (!res.ok) {
            throw new Error("Erreur dans la deuxième requête");
        }

        const da = await res.json();
        console.log('Météo API Response:', da);
        const nomville = document.getElementById('nomville');
        const body = document.getElementById('bd');
        const tt = document.getElementById('hh');
        body.style.backgroundImage = '';
        if (da.data && da.data[0] && da.data[0].coordinates[1] && da.data[0].coordinates[1].dates[0]) {
            tt.innerHTML = da.data[0].coordinates[1].dates[0].value+'°';
            nomville.innerHTML=city;

            let temperature = da.data[0].coordinates[1].dates[0].value;
            const image = document.getElementById('icon')
            if (temperature < 30 && temperature > 20) {
                 image.src = 'animated/day.svg';
            }else if (temperature < 20  && temperature > 15){
                image.src = 'animated/cloudy-day-1.svg';
                

            }else if (temperature < 15  && temperature > 10){
                image.src = 'animated/cloudy-day-3.svg';
               

            }
            else if(temperature < 10  && temperature > 5){
                image.src = '/animated/rainy-1.svg';

            }  else if(temperature < 5  && temperature > 0){
                image.src = '/animated/rainy-7.svg';
                body.style.backgroundImage='url(snoooow.jpg)'

            }  else if(temperature < 0  && temperature > -5){
                image.src = '/animated/snowy-6.svg';

            }
            else if(temperature < -5){
                image.src = '/animated/thunder.svg';

            }
            image.style.display='block';

            for (let i = 1; i <= 4; i++) { 
                const forecastRes = await fetch(`https://api.meteomatics.com/2025-01-${jour + i}T12:00:00Z/t_2m:C/${lalti},${longt}_47.46,9.04:10+47.51,8.78:10+47.39,8.57:10/json`, { 
                 headers: head });
                  if (!forecastRes.ok) {
                     throw new Error(`Erreur dans la requête de prévision pour le jour ${i}`);
                     } 
                     const forecastData = await forecastRes.json(); 
                     const forecastTemp = forecastData.data[0].coordinates[1].dates[0].value; 
                     const forecastCol = document.getElementById(`day${i}`);
                     const img = document.getElementById(`img${i}`);
                    forecastCol.innerHTML = `Day ${i + 1}: <br> ${forecastTemp}°`;

                    if (forecastTemp < 30 && forecastTemp > 20) {
                        img.src = 'animated/day.svg';
                        iiimg.src = 'animated/day.svg';
                   }else if (forecastTemp < 20  && forecastTemp > 15){
                    img.src = 'animated/cloudy-day-1.svg';
                       
       
                   }else if (forecastTemp < 15  && forecastTemp > 10){
                    img.src = 'animated/cloudy-day-3.svg';
                      
       
                   }
                   else if(forecastTemp < 10  && forecastTemp > 5){
                    img.src = '/animated/rainy-1.svg';
       
                   }  else if(forecastTemp < 5  && forecastTemp > 0){
                    img.src = '/animated/rainy-7.svg';
       
                   }  else if(forecastTemp < 0  && forecastTemp > -5){
                    img.src = '/animated/snowy-6.svg';
       
                   }
                   else if(forecastTemp < -5){
                    img.src = '/animated/thunder.svg';
       
                   }
                    
            }
                 

              

        } else {
            console.error('Données météorologiques manquantes ou chemin incorrect');
        }
    }catch (error) {
        console.log(error);
    }
}
const filterList = document.getElementById('filterList'); 
const rechvilleInput = document.getElementById('rechville'); 
rechvilleInput.addEventListener('keyup', function() { 
    const filter = rechvilleInput.value.toUpperCase(); 
    const lis = filterList.getElementsByTagName('li');
     for (let i = 0; i < lis.length; i++) {
         const li = lis[i]; 
         const text = li.textContent.toUpperCase();
          if (text.indexOf(filter) > -1) {
             li.style.display = '';
            } else {
                 li.style.display = 'none';
            }
     }
     filterList.style.display = 'block';
});

rechvilleInput.addEventListener('blur', function() {
     setTimeout(() => { 
        filterList.style.display = 'none'; 
    }, 100); 
});

const lis = filterList.getElementsByTagName('li'); 
 for (let i = 0; i < lis.length; i++) { 
    lis[i].addEventListener('mousedown', function() { 
        rechvilleInput.value = this.textContent;
         fetchdata(); 
         filterList.style.display = 'none';
}); }

rechvilleInput.addEventListener('focus', function() { 
    filterList.style.display = 'block';
 });
 function updateDateTime() {
     const dateTimeSpan = document.getElementById('datetime');
      const now = new Date(); dateTimeSpan.textContent = now.toLocaleDateString(); 
    } setInterval(updateDateTime, 86400000); 
     updateDateTime();

