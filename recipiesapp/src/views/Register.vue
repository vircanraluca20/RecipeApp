<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="register-card">
          <v-card-title class="text-h5">Register</v-card-title>
          <v-card-text>
            <v-form ref="form" lazy-validation>
              <v-text-field
                label="Email"
                required
                v-model="email"
                :rules="emailRules"
              ></v-text-field>
              <v-text-field
                label="Password"
                type="password"
                required
                v-model="password"
                :rules="passwordRules"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" justify-center @click="register"
              >Register</v-btn
            >
          </v-card-actions>
          <v-spacer></v-spacer>
          <div v-if="errorMessage">{{ errorMessage }}</div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const router = useRouter();

    const emailRules = [
      (v) => !!v || "Email is required",
      (v) => /.+@.+\..+/.test(v) || "Email must be valid",
    ];

    const passwordRules = [
      (v) => !!v || "Password is required",
      (v) => v.length >= 8 || "Password must be at least 8 characters",
    ];

    const register = async () => {
      try {
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.value,
          password.value
        );

        console.log("User registered successfully:", userCredential.user);

        // Faceți solicitarea POST către server
        const response = await fetch("http://localhost:3001/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.value,
            password: password.value,
          }),
        });

        // Verifică statusul răspunsului
        if (response.ok) {
          console.log("User registered successfully on the server.");
          router.push("/");
        } else {
          console.error("Server registration error:", response.statusText);
          errorMessage.value =
            "An error occurred during registration on the server.";
        }
      } catch (error) {
        console.error("Error during registration:", error);
        errorMessage.value = "An error occurred during registration.";
      }
    };

    return {
      email,
      password,
      errorMessage,
      emailRules,
      passwordRules,
      register,
    };
  },
};
</script>

<style scoped>
.register-card {
  margin-top: 200px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.v-btn {
  width: 100%;
  padding: 10px 20px;
  font-size: 18px;
  font-weight: bold;
}
</style>
