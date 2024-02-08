<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link to="/" class="navbar-brand text-decoration-none"
        >CookBook</router-link
      >

      <div class="navbar-nav">
        <router-link to="/" class="nav-item nav-link">Home</router-link>
        <router-link to="/recipies" class="nav-item nav-link"
          >Recipes</router-link
        >

        <router-link v-if="!isLoggedIn" to="/login" class="nav-item nav-link"
          >Login</router-link
        >
        <router-link v-if="!isLoggedIn" to="/register" class="nav-item nav-link"
          >Register</router-link
        >

        <router-link v-if="isLoggedIn" to="/myrecipes" class="nav-item nav-link"
          >My Recipes</router-link
        >

        <router-link v-if="isLoggedIn" to="/back" class="nav-item nav-link"
          >Back</router-link
        >

        <router-link
          v-if="isLoggedIn"
          to="/addRecipes"
          class="nav-item nav-link"
          >Add Recipe</router-link
        >

        <v-btn
          color="success"
          class="sign-out-button"
          @click="handleSignOut"
          v-if="isLoggedIn"
          >SIGN OUT</v-btn
        >
      </div>
    </div>
  </nav>

  <router-view />
</template>

<script>
import { ref } from "vue";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "vue-router";

export default {
  setup() {
    const auth = getAuth();
    const isLoggedIn = ref(false);
    const router = useRouter();

    auth.onAuthStateChanged((user) => {
      isLoggedIn.value = !!user;
    });

    const handleSignOut = async () => {
      try {
        await signOut(auth);
        isLoggedIn.value = false; // Actualizăm starea direct aici
        console.log("Utilizator deconectat!");

        // Redirecționează către pagina implicită după deconectare
        router.push("/");
      } catch (error) {
        console.error(error.code);
        alert(error.message);
      }
    };

    return {
      isLoggedIn,
      handleSignOut,
    };
  },
};
</script>

<style scoped>
.navbar {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
  padding: 10px 20px;
  border-radius: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
}

.navbar-brand {
  font-weight: bold;
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

.navbar-nav {
  display: flex;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
}

.nav-item {
  margin-left: 0;
}

.nav-link {
  display: block;
  padding: 10px 20px;
  text-decoration: none;
  margin-left: 20px;
  color: #333;
}

.nav-link.active {
  background-color: #007bff;
  color: #fff;
}

.nav-link:hover {
  background-color: #eee;
}

.v-btn {
  margin-top: 5px;
  padding: 5px 10px;
  margin-left: 20px;
}
</style>
