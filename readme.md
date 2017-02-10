##cronometro nucleo per roboval
1. ogni cronometro consiste di una scheda nucleo collegata tramite bluetooth ad un pc server
2. il pc server contine un database postgres che registra i dati e un'interfaccia per la gstione delle procedure di gara accessibile tramite il server
3. il server è scritto in nodejs: legge da seriale (bluetooth dongle) i dati dai cronometri e mette a disposizione in localhost un'interfaccia web che permette di accedere al database e di effettuale le procedure di gara
4. tabellone di gara realtime ottenuto con un raspberry in comunicazione con il server (rete locale)

##cronometri nucleo
* comunicazione seriale via bluetooth al pc server
* interfaccia utente: user button + led|display per iniziare una nuova gara e segnalare l'invio corretto dei dati

##database postgres
* salvataggio dei tempi gara
* salvataggio del codice arduino da caricare sui robot
* tabella team in gara
* come salvare i file binari?

##interfaccia di gestione
* accesso ad una rete locale
* struttura semplice: html e bootstrap
* gestione automatica risultati di gara

##tabellone interattivo
* visualizza lo stato della gara corrente
* visulizza i team che stanno partecipando, l'ordine di partenza
* visualizza messaggi di avviso per la chiamata dei team al banco gara
* visualizza lo stato della gara
