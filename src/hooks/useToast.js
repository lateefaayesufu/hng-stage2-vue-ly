import { ref } from "vue";

// Global toast state
const toasts = ref([]);

export function useToast() {
  function addToast(message, type = "info") {
    const id = Date.now() + Math.random();
    const toast = { id, message, type };

    toasts.value.push(toast);

    // Auto remove after 4 seconds
    setTimeout(() => {
      removeToast(id);
    }, 4000);

    return id;
  }

  function removeToast(id) {
    toasts.value = toasts.value.filter((toast) => toast.id !== id);
  }

  function success(message) {
    return addToast(message, "success");
  }

  function error(message) {
    return addToast(message, "error");
  }

  function info(message) {
    return addToast(message, "info");
  }

  return {
    toasts,
    success,
    error,
    info,
    removeToast,
  };
}
