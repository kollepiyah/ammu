// Composable wrapper — drop-in replacement legacy `_konfirmasiHapus`
import { useUiStore } from '@/stores/ui'

export function useConfirm() {
  const ui = useUiStore()
  return ui.confirm
}
