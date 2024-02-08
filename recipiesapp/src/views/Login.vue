<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="login-card">
          <v-card-title class="text-h5">Login</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
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
            <v-btn color="primary" justify-center @click="login">Login</v-btn>
          </v-card-actions>
          <v-spacer></v-spacer>
          <div v-if="errorMsg">{{ errorMsg }}</div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.login-card {
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

<script>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { useRouter } from "vue-router";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const errorMsg = ref("");
    const valid = ref(false);

    const router = useRouter();

    const emailRules = [
      (v) => !!v || "Email is required",
      (v) => /.+@.+\..+/.test(v) || "Email must be valid",
    ];

    const passwordRules = [
      (v) => !!v || "Password is required",
      (v) => v.length >= 8 || "Password must be at least 8 characters",
    ];

    const login = async () => {
      try {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email.value,
          password.value
        );

        const user = userCredential.user;
        console.log("User login successfully:", user);
        const response = await fetch("http://localhost:3001/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.value,
            password: password.value,
          }),
        });

        if (user) {
          console.log("User CONNECTED!", user);
          router.push("/");
        } else {
          console.log("Error on login: No valid user received");
        }
      } catch (error) {
        console.error(error.code);
        errorMsg.value = error.message;
      }
    };

    return {
      email,
      password,
      errorMsg,
      valid,
      emailRules,
      passwordRules,
      login,
    };
  },
};
</script>
