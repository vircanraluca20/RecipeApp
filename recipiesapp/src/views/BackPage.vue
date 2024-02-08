<template>
  <v-btn color="success" class="backButton" @click="sendPostRequest"
    >BACK BUTTON</v-btn
  >
</template>

<script>
export default {
  methods: {
    async sendPostRequest() {
      try {
        const cifra = 6;
        const response = await fetch("http://localhost:3001/back", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cifra: cifra }),
        });

        // Verificați dacă răspunsul este OK
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        // Returnează conținutul text al răspunsului
        const data = await response.text();

        // Verificați răspunsul primit de la server
        if (data.includes("EROARE")) {
          // Dacă există o eroare, afișați mesajul de eroare
          console.error("EROARE:", data);
        } else {
          // Dacă nu există eroare, afișați rezultatele dorite
          console.log(data);
        }
      } catch (error) {
        // Gestionați orice eroare care ar putea apărea în timpul procesării cererii
        console.error("There was a problem with your fetch operation:", error);
      }
    },
  },
};
</script>

<style>
.backButton {
  position: absolute;
  top: 300px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
