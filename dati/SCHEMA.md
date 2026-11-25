# Schema Dati Evento-Sede

**1. Entità**
- SEDE
- EVENTO

**2. Campi, tipi ed esempi**
- SEDE: `id` (numero), `nome` (testo), `indirizzo` (testo)
- EVENTO: `id` (numero), `titolo` (testo), `data` (testo), `orario` (testo), `categoria` (testo), `descrizione` (testo), `immagine` (testo), `immagine_alt` (testo), `sede_id` (numero)

**3. Chiavi**
- Chiave primaria: `id` in entrambe le entità
- Chiave esterna: `sede_id` dentro l'entità EVENTO

**4. Relazione**
Una sede può ospitare zero o più eventi; ogni evento si svolge in una sede.

**5. Quantità**
- 6 eventi
- 3 sedi

**6. Diagramma ER Mermaid**
```mermaid
erDiagram
    SEDE ||--o{ EVENTO : ospita
    SEDE {
        number id
        string nome
        string indirizzo
    }
    EVENTO {
        number id
        string titolo
        string data
        string orario
        string categoria
        string descrizione
        string immagine
        string immagine_alt
        number sede_id
    }

    ## 7. Origine dei dati (Esercitazione 9)
I dati di `EVENTO` e `SEDE` sono stati migrati dai file JSON locali a un foglio Google pubblicato in formato CSV e letti tramite la libreria **Papa Parse**.
È stata inoltre aggiunta una terza scheda `notizie` alimentata tramite `IMPORTFEED` dal feed RSS di ANSA Piemonte (campi: `titolo`, `url`, `data`).