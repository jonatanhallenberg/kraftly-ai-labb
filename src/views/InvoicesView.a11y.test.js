import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/vue'
import InvoicesView from './InvoicesView.vue'

vi.mock('../services/api', () => ({
  fetchInvoices: vi.fn().mockResolvedValue([
    { id: 'F-2026-06', period: 'Juni 2026', amount: 512, due: '2026-06-30', status: 'Betald' }
  ])
}))

describe('InvoicesView – tillgänglighet', () => {
  it('Ladda ner är en knapp som säger vilken faktura den gäller', async () => {
    render(InvoicesView)
    expect(await screen.findByRole('button', { name: 'Ladda ner faktura F-2026-06' })).toBeInTheDocument()
  })
})
