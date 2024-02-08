// Composables
import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Adaugă această linie de import

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Home",
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("@/views/Home.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/Login.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/recipies",
    component: () => import("@/views/Recipies.vue"),
  },
  {
    path: "/register",
    component: () => import("@/views/Register.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/addRecipes",
    component: () => import("@/views/AddRecipesPage.vue"),
  },

  {
    path: "/editRecipes/:recipeId",
    component: () => import("@/views/EditRecipesPage.vue"),
  },
  {
    path: "/myrecipes",
    name: "myrecipes",
    component: () => import("@/views/MyRecipes.vue"),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/back",
    component: () => import("@/views/BackPage.vue"),
  },
];

// Funcție pentru a obține starea curentă a utilizatorului
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Middleware pentru a gestiona rutele care necesită autentificare și cele care necesită oaspeți
router.beforeEach(async (to, from, next) => {
  const auth = getAuth();
  const currentUser = await getCurrentUser();

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (currentUser) {
      next();
    } else {
      alert("Nu aveți acces!");
      next("/");
    }
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    if (!currentUser) {
      next();
    } else {
      alert("Sunteți deja autentificat!");
      next("/");
    }
  } else {
    next();
  }
});

export default router;
