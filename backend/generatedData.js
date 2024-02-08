const faker = require("faker");
const fs = require("fs");

// Generează datele pentru retete
function generateRecipes(users) {
  const recipes = [];
  for (let i = 0; i < 10; i++) {
    const recipe = {
      title: faker.lorem.words(),
      description: faker.lorem.sentence(),
      user_id: users[i % users.length].user_id, // Asigură distribuirea corectă a user_id-urilor în rețete
      // Alte detalii despre reteta...
    };
    recipes.push(recipe);
  }
  return recipes;
}

// Generează datele pentru utilizatori
function generateUsers() {
  const users = [];
  for (let i = 0; i < 5; i++) {
    const user = {
      user_id: i + 1, // Adaugă user_id ca și cheie primară
      username: faker.internet.userName(),
      email: faker.internet.email(),
      // Alte detalii despre utilizator...
    };
    users.push(user);
  }
  return users;
}

// Alte funcții pentru generarea altor date...

// Salvează datele generate într-un fișier JSON
const users = generateUsers();
const recipes = generateRecipes(users);

const data = {
  recipes,
  users,
  // Alte date generate...
};

fs.writeFileSync("generatedData.json", JSON.stringify(data, null, 2));

console.log("Date generate cu succes!");
