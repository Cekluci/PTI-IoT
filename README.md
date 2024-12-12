# IoT Beadandó 2024 ősz

A feladat egy hőmérséklet és páratartalom mérésére szolgáló DHT11 szenzor beüzemelése Raspberry PI 4 segítségével, ahol a backend API GET kérés érkezésekor beolvassa a
szenzor adatokat, majd egy JSON objektumban tárolja őket.
A frontend React-ban készült, és a frissítés ezen az oldalon található. A frontend másodpercenként küld GET kéréseket a backendnek, ami visszaadja a pillanatnyi szenzoradatokat.
A frontend az előző 10 értéket menti, így egy vonaldiagramon is ábrázolható a legutóbbi 10 olvasás eredménye.

# Fontosabb file-ok

**A backend file, ami folyamatosan fut a raspberry PI-on:** dht11_backend.py
**A frontend file, ami indítja a GET kéréseket, és megjeleníti a chartokat:** /src/App.js
**Képek az összeszerelésről és screenshotok a weboldalról:** /media

# Csapat
Szilágyi Patrik
Verba Tamás

**1. Ötletelés, összeszerelés:** Közös munka
**2. Backend:** Verba Tamás
**3. Frontend:** Szilágyi Patrik ~60%, Verba Tamás: ~40%

