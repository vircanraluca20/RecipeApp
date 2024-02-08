<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12" class="text-center">
          <h2 class="mb-5">About GastroDelights</h2>
          <p class="motto">Savor every moment!</p>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="8" style="margin-top: 130px">
          <h1>Welcome to CookBook</h1>
          <p class="subheading font-weight">
            Discover a world of culinary delights! Explore thousands of
            delicious recipes from all over the globe, from classic comfort food
            to innovative gourmet creations. Share your own culinary creations
            and inspire others in our vibrant community.
          </p>

          <v-btn color="success" class="v-btn--large mt-2"
            >Explore recepies</v-btn
          >
        </v-col>

        <v-col cols="4">
          <v-img
            src="../assets/burgerB.png"
            alt="GastroDelights Image"
            class="mx-auto"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="6">
          <v-card>
            <v-card-title>About Us</v-card-title>
            <v-card-text>
              <p>CookBook it's a culinary hub where food lovers connect.</p>
            </v-card-text>
            <v-card-actions>
              <v-btn color="success">FIND ABOUT US </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-divider></v-divider>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
