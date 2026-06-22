// Composable wrapper untuk toast — drop-in replacement legacy `_toast`
import { useUiStore } from '@/stores/ui'

export function useToast() {
  const ui = useUiStore()
  return ui.toast
}
