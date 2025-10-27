<template>
  <section style="padding: 60px 0; min-height: calc(100vh - 200px)">
    <div class="container">
      <!-- Header -->
      <div style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 32px;
        flex-wrap: wrap;
        gap: 16px;
      ">
        <div>
          <h1 style="font-size: 40px; font-weight: 700; margin-bottom: 8px">
            Tickets
          </h1>
          <p class="text-muted" style="font-size: 18px">
            Manage and track all your tickets
          </p>
        </div>
        <router-link to="/tickets/new" class="btn btn-primary">
          + Create Ticket
        </router-link>
      </div>

      <!-- Filters -->
      <div style="display: flex; gap: 12px; margin-bottom: 32px; flex-wrap: wrap">
        <button
          @click="filter = 'all'"
          :class="['btn', filter === 'all' ? 'btn-primary' : 'btn-secondary', 'btn-small']"
        >
          All ({{ tickets.length }})
        </button>
        <button
          @click="filter = 'open'"
          :class="['btn', filter === 'open' ? 'btn-primary' : 'btn-secondary', 'btn-small']"
        >
          Open ({{ tickets.filter(t => t.status === 'open').length }})
        </button>
        <button
          @click="filter = 'in_progress'"
          :class="['btn', filter === 'in_progress' ? 'btn-primary' : 'btn-secondary', 'btn-small']"
        >
          In Progress ({{ tickets.filter(t => t.status === 'in_progress').length }})
        </button>
        <button
          @click="filter = 'closed'"
          :class="['btn', filter === 'closed' ? 'btn-primary' : 'btn-secondary', 'btn-small']"
        >
          Closed ({{ tickets.filter(t => t.status === 'closed').length }})
        </button>
      </div>

      <!-- Tickets List -->
      <div v-if="filteredTickets.length === 0" class="card text-center" style="padding: 80px 20px">
        <div style="font-size: 64px; margin-bottom: 24px">📋</div>
        <h3 style="font-size: 28px; font-weight: 700; margin-bottom: 12px">
          No tickets found
        </h3>
        <p class="text-muted mb-3" style="font-size: 18px">
          {{ filter === 'all'
            ? "Create your first ticket to get started"
            : `No tickets with status "${filter.replace('_', ' ')}"` }}
        </p>
        <router-link v-if="filter === 'all'" to="/tickets/new" class="btn btn-primary">
          Create Your First Ticket
        </router-link>
      </div>

      <div v-else class="ticket-list">
        <div
          v-for="ticket in filteredTickets"
          :key="ticket.id"
          class="ticket-card"
        >
          <div class="ticket-info">
            <div style="
              display: flex;
              align-items: center;
              gap: 12px;
              margin-bottom: 12px;
              flex-wrap: wrap;
            ">
              <h3 class="ticket-title">{{ ticket.title }}</h3>
              <span :class="['status-badge', `status-${ticket.status}`]">
                {{ ticket.status.replace('_', ' ') }}
              </span>
            </div>

            <p
              v-if="ticket.description"
              class="text-muted"
              style="font-size: 15px; margin-bottom: 16px; line-height: 1.6"
            >
              {{ ticket.description.length > 150
                ? ticket.description.substring(0, 150) + '...'
                : ticket.description }}
            </p>

            <div class="ticket-meta">
              <span>📅 {{ formatDate(ticket.createdAt) }}</span>
              <span
                v-if="ticket.priority"
                :style="{
                  textTransform: 'capitalize',
                  color: ticket.priority === 'high' ? 'var(--tertiary)' :
                         ticket.priority === 'medium' ? 'var(--status-in-progress)' :
                         'var(--text-muted)'
                }"
              >
                🎯 {{ ticket.priority }}
              </span>
            </div>
          </div>

          <div class="ticket-actions" style="
            display: flex;
            gap: 8px;
            align-items: flex-start;
            flex-wrap: wrap;
          ">
            <select
              :value="ticket.status"
              @change="handleStatusChange(ticket.id, $event.target.value)"
              class="form-select"
              style="width: 150px; padding: 8px 12px; font-size: 14px"
              :aria-label="`Change status for ${ticket.title}`"
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>

            <router-link
              :to="`/tickets/${ticket.id}`"
              class="btn btn-secondary btn-small"
            >
              ✏️ Edit
            </router-link>

            <button
              @click="handleDelete(ticket.id)"
              class="btn btn-danger btn-small"
              :aria-label="`Delete ${ticket.title}`"
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <ModalConfirm
      :is-open="deleteModal.isOpen"
      title="Delete Ticket"
      message="Are you sure you want to delete this ticket? This action cannot be undone."
      confirm-text="Delete"
      cancel-text="Cancel"
      @close="deleteModal = { isOpen: false, ticketId: null }"
      @confirm="confirmDelete"
    />
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import ModalConfirm from '../components/ModalConfirm.vue';
import { getTickets, deleteTicket, updateTicket } from '../services/storage';
import { useToast } from '../hooks/useToast';

const { success, error: showError } = useToast();

const tickets = ref([]);
const filter = ref('all');
const deleteModal = ref({ isOpen: false, ticketId: null });

const filteredTickets = computed(() => {
  if (filter.value === 'all') return tickets.value;
  return tickets.value.filter(ticket => ticket.status === filter.value);
});

function loadTickets() {
  try {
    tickets.value = getTickets();
  } catch (err) {
    showError('Failed to load tickets. Please retry.');
  }
}

function handleDelete(ticketId) {
  deleteModal.value = { isOpen: true, ticketId };
}

function confirmDelete() {
  try {
    deleteTicket(deleteModal.value.ticketId);
    loadTickets();
    success('Ticket deleted successfully.');
    deleteModal.value = { isOpen: false, ticketId: null };
  } catch (err) {
    showError('Failed to delete ticket. Please try again.');
  }
}

function handleStatusChange(ticketId, newStatus) {
  try {
    updateTicket(ticketId, { status: newStatus });
    loadTickets();
    success('Ticket status updated.');
  } catch (err) {
    showError('Failed to update ticket status.');
  }
}

function formatDate(timestamp) {
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

onMounted(() => {
  loadTickets();
});
</script>