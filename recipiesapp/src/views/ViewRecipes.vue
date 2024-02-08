<template>
  <div class="table-container">
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
          <td>
            <v-btn @click="deleteRecipe(item)">Delete</v-btn>
            <v-btn @click="editRecipe(item)">Edit</v-btn>
          </td>
        </tr>
      </tbody>
    </v-data-table>
  </div>
</template>

<script></script>

<style scoped>
.table-container {
  margin-top: 150px; /* Reducem spațiul de sus pentru a încăpea în pagină */
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}
</style>
