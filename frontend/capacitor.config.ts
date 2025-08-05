// capacitor.config.ts
import { CapacitorConfig } from '@capacitor/cli';

// 👉 Passe die beiden Konstanten an deine Werte an
const BACKEND_1 = 'http://45.133.9.54:8000'; // oder produktives HTTP-Backend

const config: CapacitorConfig = {
    appId:   'com.example.greenBerlin',
    appName: 'Green Berlin',
    webDir:  'dist',           // Vite-Build-Ordner (vite build → dist)
    /* ---------------------------------------------
     * Alles Relevante passiert im "server"-Block
     * --------------------------------------------- */
    server: {
        /* Erzwingt, dass die interne WebView selbst per
           HTTP (nicht https) ausgeliefert wird.          */
        androidScheme: 'http',

        /* Schaltet die Android-Sperre gegen klartext-Verkehr
           (API 28 +) ab. Ohne das würdest du
           "ERR_CLEARTEXT_NOT_PERMITTED" sehen.            */
        cleartext: true,          // ← wichtigste Zeile!

        /* Optional, aber praktisch: gestattete Ziele, zu
           denen die WebView intern navigieren darf.      */
        allowNavigation: [BACKEND_1],
    },
};

export default config;
