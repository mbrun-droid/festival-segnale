const meteoContainer = document.getElementById('meteo-box');

async function caricaMeteo() {
  try {
    // Chiamata all'API di Open-Meteo per Torino
    const risposta = await fetch('https://api.open-meteo.com/v1/forecast?latitude=45.0703&longitude=7.6869&current=temperature_2m,wind_speed_10m&timezone=Europe%2FRome');
    
    if (!risposta.ok) {
      throw new Error('Errore nella risposta della rete');
    }

    const dati = await risposta.json();
    const temperatura = dati.current.temperature_2m;
    const vento = dati.current.wind_speed_10m;

    // Inserimento dei dati nel riquadro con la corretta attribuzione
    meteoContainer.innerHTML = `
      <p><strong>Meteo a Torino adesso:</strong> ${temperatura}°C, vento a ${vento} km/h.</p>
      <p class="event-meta" style="margin-top: 0.5rem; font-size: 0.85em;">
        Fonte dati: <a href="https://open-meteo.com/" target="_blank">Open-Meteo</a>, CC BY 4.0
      </p>
    `;

  } catch (errore) {
    // Gestione dell'errore confinata al solo riquadro meteo
    meteoContainer.innerHTML = '<p>Dati meteo temporaneamente non disponibili.</p>';
    console.error('Impossibile caricare il meteo:', errore);
  }
}

caricaMeteo();