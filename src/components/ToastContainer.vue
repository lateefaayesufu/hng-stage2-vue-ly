<template>
  <div class="toast-container" role="region" aria-live="polite" aria-label="Notifications">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      :class="['toast', `toast-${toast.type}`]"
      role="alert"
    >
      <div class="toast-icon" style="font-size: 20px">
        {{ getIcon(toast.type) }}
      </div>
      <div class="toast-content">
        <div class="toast-title">{{ getTitle(toast.type) }}</div>
        <div class="toast-message">{{ toast.message }}</div>
      </div>
      <button
        class="toast-close"
        @click="removeToast(toast.id)"
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  </div>
</template>

<script setup>
import { useToast } from '../hooks/useToast';

const { toasts, removeToast } = useToast();

function getIcon(type) {
  switch (type) {
    case 'success':
      return '✓';
    case 'error':
      return '✕';
    default:
      return 'ℹ';
  }
}

function getTitle(type) {
  switch (type) {
    case 'success':
      return 'Success';
    case 'error':
      return 'Error';
    default:
      return 'Info';
  }
}
</script>