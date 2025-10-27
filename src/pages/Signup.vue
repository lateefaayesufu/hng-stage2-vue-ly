<template>
  <div class="auth-container">
    <div class="auth-card card">
      <h1 class="auth-title">Create Account</h1>

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
          <label for="name" class="form-label">Full Name</label>
          <input
            type="text"
            id="name"
            v-model="formData.name"
            class="form-input"
            :aria-describedby="errors.name ? 'error-name' : undefined"
            :aria-invalid="!!errors.name"
          />
          <p v-if="errors.name" id="error-name" class="form-error" role="alert">
            {{ errors.name }}
          </p>
        </div>

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

        <div class="form-group">
          <label for="confirmPassword" class="form-label">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="formData.confirmPassword"
            class="form-input"
            :aria-describedby="errors.confirmPassword ? 'error-confirmPassword' : undefined"
            :aria-invalid="!!errors.confirmPassword"
          />
          <p
            v-if="errors.confirmPassword"
            id="error-confirmPassword"
            class="form-error"
            role="alert"
          >
            {{ errors.confirmPassword }}
          </p>
        </div>

        <button
          type="submit"
          class="btn btn-primary"
          style="width: 100%"
          :disabled="isSubmitting"
        >
          <span v-if="isSubmitting" class="spinner"></span>
          <span v-else>Create Account</span>
        </button>
      </form>

      <div class="auth-link">
        Already have an account? <router-link to="/auth/login">Login</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from '../hooks/useToast';
import { useAuth } from '../hooks/useAuth';

const router = useRouter();
const { success } = useToast();
const { signup } = useAuth();

const formData = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const errors = ref({});
const isSubmitting = ref(false);

async function handleSubmit() {
  isSubmitting.value = true;
  errors.value = {};

  // Simulate async operation
  setTimeout(async () => {
    try {
      await signup(
        formData.value.name,
        formData.value.email,
        formData.value.password,
        formData.value.confirmPassword
      );

      success('Account created successfully! Welcome to Ticketrak.');
      router.push('/dashboard');
    } catch (error) {
      errors.value = { general: error.message };
    } finally {
      isSubmitting.value = false;
    }
  }, 500);
}
</script>