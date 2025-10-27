import { ref, computed } from "vue";
import * as storage from "../services/storage";
import { validateSignup, hasErrors } from "../services/validators";

// Global auth state
const user = ref(null);
const loading = ref(true);

// Initialize auth state
function initializeAuth() {
  const session = storage.getSession();
  if (session) {
    user.value = session.user;
  }
  loading.value = false;
}

// Call initialize immediately
initializeAuth();

export function useAuth() {
  const isAuthenticated = computed(() => !!user.value);

  async function login(email, password) {
    // Find user by email
    const foundUser = storage.findUserByEmail(email);
    if (!foundUser) {
      throw new Error("Invalid email or password");
    }

    // Check password
    if (foundUser.password !== password) {
      throw new Error("Invalid email or password");
    }

    // Generate token and create session
    const token = `token_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    const userData = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
    };

    storage.setSession(token, userData);
    user.value = userData;

    return userData;
  }

  async function signup(name, email, password, confirmPassword) {
    // Validate signup data
    const validationErrors = validateSignup({
      name,
      email,
      password,
      confirmPassword,
    });

    if (hasErrors(validationErrors)) {
      const firstError = Object.values(validationErrors)[0];
      throw new Error(firstError);
    }

    // Check if user already exists
    const existingUser = storage.findUserByEmail(email);
    if (existingUser) {
      throw new Error("An account with this email already exists");
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
    };

    storage.addUser(newUser);

    // Generate token and create session
    const token = `token_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    const userData = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };

    storage.setSession(token, userData);
    user.value = userData;

    return userData;
  }

  function logout() {
    storage.clearSession();
    user.value = null;
  }

  return {
    user,
    loading,
    isAuthenticated,
    login,
    signup,
    logout,
  };
}
