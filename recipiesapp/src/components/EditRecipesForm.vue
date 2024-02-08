<template>
  <v-container>
    <v-form @submit.prevent="updateRecipe" class="editRecipesForm">
      <v-text-field v-model="editedRecipe.name" label="Name"></v-text-field>
      <v-text-field
        v-model="editedRecipe.timpAsteptare"
        label="Timp Asteptare"
      ></v-text-field>
      <v-text-field
        v-model="editedRecipe.instructions"
        label="Instructions"
      ></v-text-field>

      <v-btn type="submit" color="teal darken-2">Update Recipe</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      editedRecipe: {
        name: "",
        timpAsteptare: "",
        instructions: "",
      },
    };
  },
  methods: {
    updateRecipe() {
      const recipeId = this.$route.params.recipeId;

      fetch(`http://localhost:3001/updateRecipe/${recipeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.editedRecipe),
      })
        .then((response) => response.json())

        .then((data) => {
          console.log("Recipe updated successfully:", data);

          this.editedRecipe = {
            name: data.name,
            timpAsteptare: data.timpAsteptare,
            instructions: data.instructions,
          };
        })

        .catch((error) => {
          console.error("Error updating recipe:", error);
        });
    },
  },

  mounted() {
    const recipeId = this.$route.params.recipeId;

    console.log("Recipe ID in client:", recipeId);

    this.editedRecipe = {
      name: "Nume default",
      time: "Timp default",
      instructions: "Instrucțiuni default",
    };
  },
};
</script>

<style>
.editRecipesForm {
  margin-top: 150px;
}
</style>
