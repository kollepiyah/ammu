<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="stroke"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path :d="d" />
  </svg>
</template>

<script setup>
// Port ikon garis (Office-style) dari design_handoff app/ammu-icons.jsx.
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 20 },
  stroke: { type: [Number, String], default: 1.7 }
})

const P = {
  home: 'M3 11.2 12 4l9 7.2M5 10v9a1 1 0 0 0 1 1h4v-5h4v5h4a1 1 0 0 0 1-1v-9',
  'chart-pie': 'M21 12A9 9 0 1 1 12 3v9z M12 3a9 9 0 0 1 9 9h-9z',
  'chart-line': 'M4 4v16h16 M7 14l3-4 3 3 4-6',
  calendar: 'M4 6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zM4 9h16M8 3v4M16 3v4',
  'calendar-days':
    'M4 6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zM4 9h16M8 3v4M16 3v4M8 13h.01M12 13h.01M16 13h.01M8 16h.01M12 16h.01',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 20c0-3.3 3.6-6 8-6s8 2.7 8 6',
  users:
    'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM2 20c0-3 3.1-5 7-5s7 2 7 5M16 4.2A3.5 3.5 0 0 1 16 11M17 15c2.8.4 5 2.2 5 5',
  megaphone: 'M3 11v2a1 1 0 0 0 1 1h2l9 5V5L6 10H4a1 1 0 0 0-1 1ZM18 8a4 4 0 0 1 0 8',
  broadcast:
    'M12 13a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM7.8 7.8a6 6 0 0 0 0 8.4M16.2 7.8a6 6 0 0 1 0 8.4M5 5a9 9 0 0 0 0 14M19 5a9 9 0 0 1 0 14',
  clipboard:
    'M9 4h6v3H9zM7 5H6a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-1M9 12l2 2 4-4',
  help: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM9.5 9.2a2.5 2.5 0 0 1 4.9.8c0 1.7-2.4 2-2.4 4M12 17h.01',
  edit: 'M5 19h3l9.5-9.5a1.8 1.8 0 0 0-2.5-2.5L5.5 16.5 5 19ZM14 7l3 3',
  gear:
    'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM19.4 13.5a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2v.2a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-2.9-1.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0-1.2-2.9H3a2 2 0 0 1 0-4h.1A1.7 1.7 0 0 0 4.4 6.6l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 10 2.6V2.5a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 2.9 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0 1.2 2.9h.2a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.6 1.2Z',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7v5l3 2',
  bell: 'M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6ZM10 19a2 2 0 0 0 4 0',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM21 21l-4.3-4.3',
  save: 'M5 5a1 1 0 0 1 1-1h10l3 3v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1zM8 4v5h7V4M8 20v-6h8v6',
  undo: 'M9 14 4 9l5-5M4 9h11a5 5 0 0 1 0 10h-3',
  redo: 'M15 14l5-5-5-5M20 9H9a5 5 0 0 0 0 10h3',
  'arrow-left': 'M19 12H5M11 6l-6 6 6 6',
  'arrow-right': 'M5 12h14M13 6l6 6-6 6',
  refresh: 'M20 12a8 8 0 1 1-2.3-5.6M20 4v4h-4',
  book: 'M5 4h11a2 2 0 0 1 2 2v14H7a2 2 0 0 0-2 2zM18 20H7a2 2 0 0 0-2 2M9 8h6M9 12h6',
  file: 'M7 3h7l5 5v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1ZM14 3v5h5M9 13h6M9 17h4',
  image:
    'M4 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zM4 16l4-4 4 4 3-3 5 5M9 9.5a1.2 1.2 0 1 0 0-.1Z',
  layers: 'M12 3 3 8l9 5 9-5zM3 13l9 5 9-5M3 17.5l9 5 9-5',
  grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  trophy: 'M7 4h10v4a5 5 0 0 1-10 0zM7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3M9 17h6M12 13v4M8 20h8',
  mosque: 'M12 3c-3 3-5 4-5 7v0h10v0c0-3-2-4-5-7ZM5 12h14v8H5zM12 14v6M4 20h16M9 12v-1M15 12v-1',
  lock: 'M6 11h12a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1ZM8 11V8a4 4 0 0 1 8 0v3',
  logout: 'M15 4h3a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3M10 12h9M16 8l3 4-3 4M10 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h5',
  language:
    'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3 12h18M12 3c2.5 2.4 4 5.6 4 9s-1.5 6.6-4 9c-2.5-2.4-4-5.6-4-9s1.5-6.6 4-9Z',
  shield: 'M12 3 5 6v6c0 4 3 6.5 7 9 4-2.5 7-5 7-9V6zM9 12l2 2 4-4',
  printer: 'M7 9V4h10v5M7 18H6a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-1M7 15h10v6H7zM17 12h.01',
  download: 'M12 4v11M8 11l4 4 4-4M5 20h14',
  'chevron-down': 'M6 9l6 6 6-6',
  plus: 'M12 5v14M5 12h14',
  folder: 'M4 6a1 1 0 0 1 1-1h4l2 2h8a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z',
  info: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 11v6M12 7.5h.01',
  check: 'M5 12l5 5L20 7',
  comment: 'M4 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-4 4v-4H5a1 1 0 0 1-1-1z',
  archive: 'M4 4h16v4H4zM5 8v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8M9 12h6',
  send: 'M21 3 3 11l7 2 2 7zM21 3l-9 11',
  theme: 'M12 3a9 9 0 1 0 0 18zM12 3a9 9 0 0 1 0 18',
  ribbon: 'M3 5h18M3 5v6h18V5M7 9h4M14 9h3M5 14h14v5H5z',
  moon: 'M21 13A8.5 8.5 0 0 1 11 3a7 7 0 1 0 10 10Z',
  sun: 'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19',
  minimize: 'M5 12h14',
  maximize: 'M5 5h14v14H5z',
  restore: 'M8 8V5h11v11h-3M5 8h11v11H5z',
  close: 'M6 6l12 12M18 6 6 18',
  doc: 'M7 3h7l5 5v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1ZM14 3v5h5M9 13h6M9 17h4',
  wallet:
    'M3 8a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2H5a1 1 0 0 0 0 2h14a1 1 0 0 1 1 1v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM16 13a1.5 1.5 0 0 0 0 3h4v-3z'
}

const d = computed(() => P[props.name] || P.grid)
</script>
