const contenitore = document.querySelector('.event-grid');

const URL_EVENTI = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTfPw63StnbziV9xG9XUn1giHELk6eNwBOCxCNp9sDauJqNd5m8n-0ZDT6blXvXClBcgsZZ5WqDiNOQ/pub?gid=1887893279&single=true&output=csv';
const URL_SEDI = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTfPw63StnbziV9xG9XUn1giHELk6eNwBOCxCNp9sDauJqNd5m8n-0ZDT6blXvXClBcgsZZ5WqDiNOQ/pub?gid=1011109759&single=true&output=csv';

async function caricaProgramma() {
  // Stato 1: Caricamento
  contenitore.innerHTML = '<p>Caricamento del programma...</p>';

  try {
    const rispostaEventi = await fetch(URL_EVENTI);
    const rispostaSedi = await fetch(URL_SEDI);

    if (!rispostaEventi.ok || !rispostaSedi.ok) {
      throw new Error('Errore nel caricamento dei dati CSV');
    }

    const testoEventi = await rispostaEventi.text();
    const testoSedi = await rispostaSedi.text();

    // Controllo nel caso Google restituisca una pagina HTML di errore invece del CSV
    if (testoEventi.trim().startsWith('<') || testoSedi.trim().startsWith('<')) {
      throw new Error('Risposta non valida: formato HTML ricevuto al posto del CSV');
    }

    const eventi = Papa.parse(testoEventi, { header: true, skipEmptyLines: true }).data;
    const sedi = Papa.parse(testoSedi, { header: true, skipEmptyLines: true }).data;

    // Stato 2: Vuoto
    if (eventi.length === 0) {
      contenitore.innerHTML = '<p>Nessun evento in programma.</p>';
      return;
    }

    // Stato 3: Successo
    contenitore.innerHTML = '';

    eventi.forEach(evento => {
      // Confronto sicuro tra stringhe (nel CSV tutti i valori sono testo)
      const sede = sedi.find(s => String(s.id).trim() === String(evento.sede_id).trim());
      const nomeSede = sede ? sede.nome : 'Sede da definire';

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
    contenitore.innerHTML = '<p>Il programma non è disponibile. Riprova più tardi.</p>';
    console.error(errore);
  }
}

caricaProgramma();