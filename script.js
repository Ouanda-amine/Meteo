fetchdata();


async function fetchdata() {
    try {
        const city = document.getElementById('rechville').value;
        let longt ; 
        let lalti;

       switch(city){
        case  'casablanca' : longt=25 ,  lalti = 33;
        case  'benimallal' : longt=-6 ,  lalti = 32;
        case  'madrid' : longt=-2.39 ,  lalti = 40.41;
        case  'rabat' : longt=-6.84 ,  lalti = 34.02;
        case  'newyork' : longt=73 ,  lalti = 40;
        case  'paris' : longt=20 ,  lalti = 48;
        case  'london' : longt=13.40 ,  lalti = 52.52;
       }

        

        let head = new Headers();
        let username = 'enaa_ouanda_mohammedamine';
        let password = '0V2PaTe58u';
        head.set('Authorization', 'Basic ' + btoa(username + ":" + password));

        const res = await fetch(`https://api.meteomatics.com/2025-01-22T12:00:00Z/t_2m:C/${lalti},${longt}_47.46,9.04:10+47.51,8.78:10+47.39,8.57:10/json`, {
            headers: head
        });

        if (!res.ok) {
            throw new Error("Erreur dans la deuxième requête");
        }

        const da = await res.json();
        console.log('Météo API Response:', da);

        const tt = document.getElementById('hh');
        if (da.data && da.data[0] && da.data[0].coordinates[1] && da.data[0].coordinates[1].dates[0]) {
            tt.innerHTML = da.data[0].coordinates[1].dates[0].value;
        } else {
            console.error('Données météorologiques manquantes ou chemin incorrect');
        }
    } catch (error) {
        console.log(error);
    }
}
