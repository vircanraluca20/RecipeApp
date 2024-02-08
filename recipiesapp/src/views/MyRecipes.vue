<template>
  <div class="table-container">
    <h1 class="heading primary--text">Edit a recipe</h1>
    <v-row>
      <v-col cols="12">
        <v-divider></v-divider>
      </v-col>
    </v-row>

    <v-table>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Timp Asteptare</th>
          <th class="text-left">Instructions</th>
          <th class="text-left">Delete</th>
          <th class="text-left">Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="recipe in filteredRecipes" :key="recipe.id">
          <td>{{ recipe.name }}</td>
          <td>{{ recipe.timpAsteptare }}</td>
          <td>{{ recipe.instructions }}</td>
          <td>
            <v-btn color="success" @click="deleteRecipe(recipe.id)"
              >DELETE</v-btn
            >
          </td>
          <td>
            <router-link :to="'/editRecipes/' + recipe.id">
              <v-btn color="success">EDIT</v-btn>
            </router-link>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export default {
  data() {
    return {
      recipes: [],
      currentUser: null,
    };
  },

  computed: {
    filteredRecipes() {
      if (!this.currentUser || !Array.isArray(this.recipes)) {
        return [];
      }

      return this.recipes.filter(
        (recipe) => recipe.userId === this.currentUser.uid
      );
    },
  },

  methods: {
    async deleteRecipe(recipeId) {
      try {
        // Construiește URL-ul complet pentru cererea DELETE
        const apiUrl = `http://localhost:3001/recipes/${recipeId}`;
        console.log("DELETE request to:", apiUrl);

        // Trimite o cerere DELETE către server
        const response = await fetch(apiUrl, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Verifică dacă ștergerea s-a realizat cu succes în backend
        if (response.ok) {
          // Poți adăuga orice logică suplimentară aici în cazul ștergerii reușite
          console.log("Recipe deleted successfully.");
        } else {
          // Tratează cazul în care ștergerea nu a fost reușită
          console.error(
            "Error deleting recipe in backend:",
            response.statusText
          );
        }
      } catch (error) {
        // Tratează cazul în care apare o eroare în timpul ștergerii
        console.error("Error deleting recipe:", error);
      }
    },
  },

  async created() {
    const auth = getAuth();
    const db = getFirestore();

    onAuthStateChanged(auth, async (user) => {
      this.currentUser = user;

      if (user) {
        const recipesCollection = collection(db, "recipes");
        const recipesQuery = query(
          recipesCollection,
          where("userId", "==", user.uid)
        );

        const snapshot = await getDocs(recipesQuery);
        this.recipes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Recipes fetched:", this.recipes);
      }
    });
  },
};
</script>

<style scoped>
.table-container {
  margin-top: 150px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}

.heading {
  margin-bottom: 30px;
  font-size: 50px;
}
</style>
