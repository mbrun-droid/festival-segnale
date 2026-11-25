## Sessione Esercitazione 8 - 18 Novembre
**Richieste e proposte:** Ho chiesto supporto per completare l'Esercitazione 8 (passaggio dai contenuti ai dati). L'IA mi ha fornito la struttura dei file `eventi.json` e `sedi.json`, il codice per il diagramma `SCHEMA.md` e gli script per generare la pagina dinamicamente.
**Uso e modifiche:** Ho integrato i dati, svuotato la griglia HTML statica e collegato `programma.js` e `info.js` per richiamare i file JSON e l'API Open-Meteo.
**Problemi e soluzioni:** Abbiamo risolto il blocco di sicurezza del browser (CORS) passando dall'apertura classica (`file://`) all'estensione Live Preview (`http://127.0.0.1`). Abbiamo anche risolto un errore di posizionamento del file `info.js` nell'albero delle cartelle e un problema di sintassi dell'interpolazione per una collega.
**Verifica:** Controllato tramite Live Preview, 6 eventi generati correttamente e meteo funzionante.

## Sessione Esercitazione 9 - 25 Novembre
**Richieste e proposte:** Ho chiesto supporto per convertire i file JSON (`eventi.json` e `sedi.json`) in formato CSV, configurare Google Sheets con il feed RSS ANSA (`IMPORTFEED`) e aggiornare `programma.html` e `programma.js` usando la libreria Papa Parse.
**Uso e modifiche:** Ho creato `dati/eventi.csv` e `dati/sedi.csv`, importato i dati su Google Sheets disattivando la conversione automatica dei formati e pubblicato le tre schede (`eventi`, `sedi`, `notizie`) in CSV. Ho collegato gli URL pubblicati in `programma.js` gestendo il confronto testuale per `sede_id`.
**Problemi e soluzioni:** Ho verificato che i link pubblicati differiscono solo per il parametro `gid`. Ho spostato `resoconto-ai.md` nella cartella corretta `progettazione/`.
**Verifica:** Controllato tramite Live Preview che i 6 eventi e le relative sedi si carichino correttamente dal foglio Google.