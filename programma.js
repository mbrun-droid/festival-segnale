const contenitore = document.querySelector('.event-grid');

async function caricaProgramma() {
  // Stato 1: Caricamento
  contenitore.innerHTML = '<p>Caricamento del programma...</p>';

  try {
    const rispostaEventi = await fetch('dati/eventi.json');
    const rispostaSedi = await fetch('dati/sedi.json');

    if (!rispostaEventi.ok || !rispostaSedi.ok) {
      throw new Error('Errore nel caricamento dei dati');
    }

    const eventi = await rispostaEventi.json();
    const sedi = await rispostaSedi.json();

    // Stato 2: Vuoto
    if (eventi.length === 0) {
      contenitore.innerHTML = '<p>Nessun evento in programma.</p>';
      return;
    }

    // Stato 3: Successo
    contenitore.innerHTML = '';
    
    eventi.forEach(evento => {
      // Associazione della sede tramite sede_id
      const sede = sedi.find(s => s.id === evento.sede_id);
      const nomeSede = sede ? sede.nome : 'Sede da definire';

      // Formattazione della data
      const dataTesto = evento.data === '2026-06-12' ? 'Venerdì 12 giugno' : 'Sabato 13 giugno';

      const card = `
        <article class="event-card">
          <img src="${evento.immagine}" alt="${evento.immagine_alt}" width="900" height="600">
          <div class="event-body">
            <p class="event-meta">${dataTesto} · ${evento.orario} · ${evento.categoria}</p>
            <h3>${evento.titolo}</h3>
            <p>${evento.descrizione}</p>
            <p class="event-place"><strong>Sede:</strong> ${nomeSede}</p>
          </div>
        </article>
      `;
      contenitore.innerHTML += card;
    });

  } catch (errore) {
    // Stato 4: Errore
    contenitore.innerHTML = '<p>Il programma non è disponibile.</p>';
    console.error(errore);
  }
}

caricaProgramma();