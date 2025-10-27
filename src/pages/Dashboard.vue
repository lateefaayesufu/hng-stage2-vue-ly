<template>
  <section style="padding: 60px 0">
    <div class="container">
      <!-- Welcome Section -->
      <div class="mb-4">
        <h1 style="font-size: 40px; font-weight: 700; margin-bottom: 8px">
          Welcome back, {{ user?.name || 'User' }}! 
        </h1>
        <p class="text-muted" style="font-size: 18px">
          Here's what's happening with your tickets today
        </p>
      </div>

      <!-- Stats Grid -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value">{{ stats.total }}</div>
          <div class="stat-label">Total Tickets</div>
        </div>

        <div class="stat-card">
          <div
            class="stat-value"
            style="
              background: linear-gradient(135deg, var(--status-open), var(--secondary));
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            "
          >
            {{ stats.open }}
          </div>
          <div class="stat-label">Open Tickets</div>
        </div>

        <div class="stat-card">
          <div
            class="stat-value"
            style="
              background: linear-gradient(135deg, var(--status-in-progress), var(--tertiary));
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            "
          >
            {{ stats.inProgress }}
          </div>
          <div class="stat-label">In Progress</div>
        </div>

        <div class="stat-card">
          <div
            class="stat-value"
            style="
              background: linear-gradient(135deg, var(--status-closed), var(--text-muted));
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            "
          >
            {{ stats.closed }}
          </div>
          <div class="stat-label">Resolved Tickets</div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="mt-4">
        <h2 style="font-size: 28px; font-weight: 700; margin-bottom: 24px">
          Quick Actions
        </h2>

        <div class="grid grid-2">
          <router-link to="/tickets/new" class="card" style="text-decoration: none">
            <div style="font-size: 40px; margin-bottom: 12px">➕</div>
            <h3 class="card-title">Create New Ticket</h3>
            <p class="card-description">
              Report a new issue or request and start tracking it immediately
            </p>
          </router-link>

          <router-link to="/tickets" class="card" style="text-decoration: none">
            <div style="font-size: 40px; margin-bottom: 12px">📋</div>
            <h3 class="card-title">View All Tickets</h3>
            <p class="card-description">
              Browse, search, and manage all your tickets in one place
            </p>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getTicketStats, initializeDemoData } from '../services/storage';
import { useAuth } from '../hooks/useAuth';

const { user } = useAuth();

const stats = ref({
  total: 0,
  open: 0,
  inProgress: 0,
  closed: 0
});

onMounted(() => {
  // Initialize demo data if needed
  initializeDemoData();

  // Load stats
  stats.value = getTicketStats();
});
</script>