<template>
  <div class="table-container">
    <h1 class="heading primary--text">Find your perfect recipes</h1>
    <v-row>
      <v-col cols="12">
        <v-divider></v-divider>
      </v-col>
    </v-row>

    <v-data-table :items="recipesList">
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Time</th>
          <th class="text-left">Instructions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in recipesList" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.timpAsteptare }}</td>
          <td>{{ item.instructions }}</td>
        </tr>
      </tbody>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "Recipes",
  data() {
    return {
      recipesList: [],
      proprietateEditata: {
        id: "",
        location: "",
        bedrooms: 0,
        max_prices: 0,
        propertyType: "",
      },
      selectedRecipeDetails: null,
    };
  },
  methods: {
    async fetchRecipes() {
      try {
        const response = await fetch("http://localhost:3001/recipies");

        if (!response.ok) {
          throw new Error(
            `Network response was not ok, status: ${response.status}`
          );
        }

        const data = await response.json();
        this.recipesList = data; // Stochează datele în proprietatea recipesList
      } catch (error) {
        console.error("Error fetching recipes:", error);
        this.recipesList = [];
      }
    },
  },

  mounted() {
    this.fetchRecipes();
  },
};
</script>

<style scoped>
.table-container {
  margin-top: 150px; /* Reducem spațiul de sus pentru a încăpea în pagină */
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}

.addRecipesBtn {
  position: fixed;
  top: 160px;
  right: 20px;
  height: 50px;
}

.heading {
  margin-bottom: 30px;
  font-size: 40px;
}
</style>
