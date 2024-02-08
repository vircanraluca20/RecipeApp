<template>
  <v-container>
    <h1 class="heading primary--text">Please add a recipe</h1>
    <v-row>
      <v-col cols="12">
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-form @submit.prevent="addRecipe" class="addRecipesForm">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="name" label="Name"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="timpAsteptare"
            label="TimpAsteptare"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-text-field v-model="instructions" label="Instructions"></v-text-field>

      <v-row>
        <v-col>
          <v-btn color="success" type="submit" block class="mt-2"
            >ADD A RECIPE</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<style scoped>
.addRecipesForm {
  margin-top: 30px;
}

.heading {
  margin-top: 120px;
  font-size: 30px;
}
</style>

<script>
import { getAuth } from "firebase/auth";

export default {
  data() {
    return {
      name: "",
      timpAsteptare: "",
      instructions: "",
    };
  },
  methods: {
    async addRecipe() {
      try {
        const user = getAuth().currentUser;

        if (!user) {
          console.error("User is not authenticated.");
          return;
        }

        // Create an object with the recipe data
        const recipeData = {
          name: this.name,
          timpAsteptare: this.timpAsteptare,
          instructions: this.instructions,
          userId: user.uid,
        };

        // Send the POST request to the server
        const response = await fetch("http://localhost:3001/addRecipes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(recipeData),
        });

        if (response.ok) {
          console.log("Recipe added successfully.");
        } else {
          console.error("Error adding recipe in backend:", response.statusText);
        }
      } catch (error) {
        // Handle the case where an error occurs during addition
        console.error("Error adding recipe:", error);
      }
    },
  },
};
</script>
