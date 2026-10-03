<template>
  <div>
    <h1>Fakturor</h1>
    <p v-if="error" role="alert" class="error">{{ error }}</p>
    <div class="card">
      <table>
        <tr>
          <th>Faktura</th><th>Period</th><th>Belopp</th><th>Förfaller</th><th>Status</th><th></th>
        </tr>
        <tr v-for="invoice in invoices" :key="invoice.id">
          <td>{{ invoice.id }}</td>
          <td>{{ invoice.period }}</td>
          <td>{{ invoice.amount }} kr</td>
          <td>{{ invoice.due }}</td>
          <td><StatusChip :invoice="invoice" /></td>
          <td>
            <!-- "Ladda ner" står på varje rad. Den dolda texten gör att en skärmläsare hör vilken faktura. -->
            <KButton variant="text" @click="downloadInvoice(invoice)">
              Ladda ner <span class="visually-hidden">faktura {{ invoice.id }}</span>
            </KButton>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchInvoices } from '../services/api'
import StatusChip from '../components/StatusChip.vue'
import KButton from '../components/KButton.vue'

const invoices = ref([])
const error = ref(null)

onMounted(async () => {
  try {
    invoices.value = await fetchInvoices()
  } catch {
    error.value = 'Vi kunde inte hämta dina fakturor just nu. Försök igen om en stund.'
  }
})

const downloadInvoice = (invoice) => {
  // PDF generation coming in phase 2 per the quote
  console.log('download', invoice.id)
  alert('Nedladdning kommer snart')
}
</script>

<style scoped>
.error { color: #d92d20; margin-bottom: 12px; }
</style>
