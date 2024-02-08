const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

const serviceAccount = require("./db/recipiesappvuetify-firebase-adminsdk-rbwyx-2c436e11b8.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

//server app => express
const express = require("express");
const app = express();
const logger = require("morgan");
const cors = require("cors");
const port = 3001;

const fs = require("fs");

app.use(logger("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Ruta GET pentru a prelua rețetele utilizatorului conectat
app.get("/myrecipes", async (req, res) => {
  console.log("Accesat /myrecipes");
  try {
    const idUtilizator = req.user.uid;

    // Interogare colecția de rețete pentru rețetele utilizatorului
    const snapshotRetete = await db
      .collection("retete")
      .where("idUtilizator", "==", idUtilizator)
      .get();

    const reteteUtilizator = [];
    snapshotRetete.forEach((doc) => {
      const dateReteta = doc.data();
      reteteUtilizator.push({ id: doc.id, ...dateReteta });
    });

    res.json(reteteUtilizator);
  } catch (error) {
    console.error("Eroare la preluarea rețetelor utilizatorului:", error);
    res.status(500).send("Eroare internă a serverului");
  }
});

app.get("/recipies", async (req, res) => {
  try {
    console.log("Fetching recipes...");

    const recipesSnapshot = await db.collection("recipes").get();
    const recipes = recipesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/recipes/:recipeId", async (req, res) => {
  try {
    const recipeId = req.params.recipeId;

    console.log(`Deleting recipe with ID: ${recipeId}`);

    await db.collection("recipes").doc(recipeId).delete();

    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    res
      .status(200)
      .json({ message: "User registered successfully on the server." });
  } catch (error) {
    console.error("Error during registration on the server:", error);
    res
      .status(500)
      .json({ error: "An error occurred during registration on the server." });
  }
});

app.post("/addRecipes", async (req, res) => {
  try {
    const recipeToAdd = req.body;

    const recipe = await db.collection("recipes").add(recipeToAdd);

    res.json({ id: recipe.id });
  } catch (error) {
    console.error("Error adding recipe:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Ruta pentru actualizare (update)
app.put("/updateRecipe/:recipeId", async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    const updatedRecipeData = req.body;

    await db.collection("recipes").doc(recipeId).update(updatedRecipeData);

    res.json({ success: true });
  } catch (error) {
    console.error("Error updating recipe:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email && password && email.trim() !== "" && password.trim() !== "") {
      res.status(200).json({ message: "Utilizator conectat cu succes!" });
    } else {
      res
        .status(401)
        .json({ error: "Eroare la conectare. Verificați datele introduse." });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res
      .status(500)
      .json({ error: "A apărut o eroare la conectare. Încercați din nou." });
  }
});

// Ruta pentru POST /back
app.post("/back", (req, res) => {
  const cifra = req.body.cifra;

  if (cifra < 5) {
    res.status(400).json({ error: "EROARE: Cifra este mai mică decât 5" });
  } else {
    res.json([
      { id: 6, name: "Mihai" },
      { id: 7, name: "Elena" },
    ]);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
