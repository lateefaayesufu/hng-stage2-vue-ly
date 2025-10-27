<template>
  <div class="auth-container">
    <div class="auth-card card">
      <h1 class="auth-title">Welcome Back</h1>

      <p
        v-if="errors.general"
        class="form-error"
        style="margin-bottom: 16px; text-align: center"
        role="alert"
      >
        {{ errors.general }}
      </p>

      <form @submit.prevent="handleSubmit" novalidate>
        <div class="form-group">
          <label for="email" class="form-label">Email Address</label>
          <input
            type="email"
            id="email"
            v-model="formData.email"
            class="form-input"
            :aria-describedby="errors.email ? 'error-email' : undefined"
            :aria-invalid="!!errors.email"
          />
          <p v-if="errors.email" id="error-email" class="form-error" role="alert">
            {{ errors.email }}
          </p>
        </div>

        <div class="form-group">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            id="password"
            v-model="formData.password"
            class="form-input"
            :aria-describedby="errors.password ? 'error-password' : undefined"
            :aria-invalid="!!errors.password"
          />
          <p v-if="errors.password" id="error-password" class="form-error" role="alert">
            {{ errors.password }}
          </p>
        </div>

        <button
          type="submit"
          class="btn btn-primary"
          style="width: 100%"
          :disabled="isSubmitting"
        >
          <span v-if="isSubmitting" class="spinner"></span>
          <span v-else>Login</span>
        </button>
      </form>

      <div class="auth-link">
        Don't have an account? <router-link to="/auth/signup">Sign up</router-link>
      </div>

      <div
        class="mt-3"
        style="
          padding: 16px;
          background: var(--bg);
          border-radius: var(--radius);
          font-size: 14px;
        "
      >
        <p class="text-muted" style="margin-bottom: 8px">Demo Credentials:</p>
        <p style="font-family: monospace">Email: demo@ticket.app</p>
        <p style="font-family: monospace">Password: password123</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { validateLogin, hasErrors } from '../services/validators';
import { useToast } from '../hooks/useToast';
import { useAuth } from '../hooks/useAuth';

const router = useRouter();
const { success } = useToast();
const { login } = useAuth();

const formData = ref({
  email: '',
  password: ''
});

const errors = ref({});
const isSubmitting = ref(false);

async function handleSubmit() {
  // Validate form
  const validationErrors = validateLogin(formData.value);

  if (hasErrors(validationErrors)) {
    errors.value = validationErrors;
    return;
  }

  isSubmitting.value = true;
  errors.value = {};

  // Simulate async operation
  setTimeout(async () => {
    try {
      await login(formData.value.email, formData.value.password);
      success('Login successful! Welcome back.');
      router.push('/dashboard');
    } catch (error) {
      errors.value = { general: error.message };
    } finally {
      isSubmitting.value = false;
    }
  }, 500);
}
</script>