<template>
  <section style="padding: 60px 0">
    <div v-if="loading" class="container" style="padding: 60px 0; text-align: center">
      <span class="spinner" style="width: 40px; height: 40px"></span>
      <p class="text-muted mt-2">Loading ticket...</p>
    </div>

    <div v-else class="container" style="max-width: 800px">
      <!-- Header -->
      <div class="mb-4">
        <router-link
          to="/tickets"
          class="text-muted"
          style="
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 16px;
          "
        >
          ← Back to Tickets
        </router-link>
        <h1 style="font-size: 40px; font-weight: 700; margin-bottom: 8px">
          {{ isEditMode ? 'Edit Ticket' : 'Create New Ticket' }}
        </h1>
        <p class="text-muted">
          {{ isEditMode ? 'Update ticket details' : 'Fill in the details to create a new ticket' }}
        </p>
      </div>

      <!-- Form -->
      <div class="card">
        <form @submit.prevent="handleSubmit" novalidate>
          <div class="form-group">
            <label for="title" class="form-label">
              Title <span style="color: var(--tertiary)">*</span>
            </label>
            <input
              type="text"
              id="title"
              v-model="formData.title"
              class="form-input"
              placeholder="Enter ticket title"
              :aria-describedby="errors.title ? 'error-title' : undefined"
              :aria-invalid="!!errors.title"
              aria-required="true"
            />
            <p v-if="errors.title" id="error-title" class="form-error" role="alert">
              {{ errors.title }}
            </p>
          </div>

          <div class="form-group">
            <label for="status" class="form-label">
              Status <span style="color: var(--tertiary)">*</span>
            </label>
            <select
              id="status"
              v-model="formData.status"
              class="form-select"
              :aria-describedby="errors.status ? 'error-status' : undefined"
              :aria-invalid="!!errors.status"
              aria-required="true"
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
            <p v-if="errors.status" id="error-status" class="form-error" role="alert">
              {{ errors.status }}
            </p>
          </div>

          <div class="form-group">
            <label for="priority" class="form-label">Priority</label>
            <select
              id="priority"
              v-model="formData.priority"
              class="form-select"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div class="form-group">
            <label for="description" class="form-label">Description</label>
            <textarea
              id="description"
              v-model="formData.description"
              class="form-textarea"
              placeholder="Provide details about the ticket"
              rows="6"
              :aria-describedby="errors.description ? 'error-description' : undefined"
              :aria-invalid="!!errors.description"
            />
            <p
              v-if="errors.description"
              id="error-description"
              class="form-error"
              role="alert"
            >
              {{ errors.description }}
            </p>
            <p class="text-muted" style="font-size: 14px; margin-top: 4px">
              {{ formData.description.length }}/1000 characters
            </p>
          </div>

          <div style="display: flex; gap: 12px; justify-content: flex-end">
            <router-link to="/tickets" class="btn btn-secondary">
              Cancel
            </router-link>
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting" class="spinner"></span>
              <span v-else>{{ isEditMode ? 'Update Ticket' : 'Create Ticket' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { validateTicket, hasErrors } from '../services/validators';
import { createTicket, getTicketById, updateTicket } from '../services/storage';
import { useToast } from '../hooks/useToast';

const router = useRouter();
const route = useRoute();
const { success, error: showError } = useToast();

const isEditMode = computed(() => !!route.params.id);

const formData = ref({
  title: '',
  status: 'open',
  description: '',
  priority: 'medium'
});

const errors = ref({});
const isSubmitting = ref(false);
const loading = ref(isEditMode.value);

onMounted(() => {
  if (isEditMode.value) {
    const ticket = getTicketById(route.params.id);
    if (ticket) {
      formData.value = {
        title: ticket.title,
        status: ticket.status,
        description: ticket.description || '',
        priority: ticket.priority || 'medium'
      };
      loading.value = false;
    } else {
      showError('Ticket not found.');
      router.push('/tickets');
    }
  }
});

async function handleSubmit() {
  // Validate form
  const validationErrors = validateTicket(formData.value);

  if (hasErrors(validationErrors)) {
    errors.value = validationErrors;
    return;
  }

  isSubmitting.value = true;

  // Simulate API call
  setTimeout(() => {
    try {
      if (isEditMode.value) {
        updateTicket(route.params.id, formData.value);
        success('Ticket updated successfully.');
      } else {
        createTicket(formData.value);
        success('Ticket created successfully.');
      }
      router.push('/tickets');
    } catch (err) {
      showError('Failed to save ticket. Please try again.');
    } finally {
      isSubmitting.value = false;
    }
  }, 300);
}
</script>