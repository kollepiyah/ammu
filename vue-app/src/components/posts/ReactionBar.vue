<template>
  <!-- v.20.72.0526: Reactions bar — 5 emoji like (kyai: gak perlu comments, cukup like) -->
  <div class="flex items-center gap-1.5 mt-2 pt-2 border-t border-slate-100 dark:border-slate-700">
    <button
      v-for="r in REACTIONS"
      :key="r.emoji"
      @click="toggleReaction(r.emoji)"
      :class="[
        'flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-all',
        myReaction === r.emoji
          ? 'bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-200 ring-1 ring-teal-300'
          : 'bg-slate-100 dark:bg-slate-700/40 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600/40'
      ]"
      :title="r.label"
    >
      <span class="text-base leading-none">{{ r.emoji }}</span>
      <span v-if="counts[r.emoji]" class="font-bold text-[10px]">{{ counts[r.emoji] }}</span>
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { doc, collection, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { useAuthStore } from '@/stores/auth'

const props = defineProps({
  postId: { type: String, required: true }
})

const auth = useAuthStore()
const myUid = computed(() => String(auth.sesiAktif?.id || 'anon'))

const REACTIONS = [
  { emoji: '👍', label: 'Suka' },
  { emoji: '❤️', label: 'Cinta' },
  { emoji: '🎉', label: 'Selamat' },
  { emoji: '😢', label: 'Sedih' },
  { emoji: '🔥', label: 'Keren' }
]

const reactions = ref([])
let unsub = null

const counts = computed(() => {
  const c = {}
  for (const r of reactions.value) {
    if (r.emoji) c[r.emoji] = (c[r.emoji] || 0) + 1
  }
  return c
})

const myReaction = computed(() => {
  const mine = reactions.value.find((r) => r.userId === myUid.value)
  return mine?.emoji || null
})

function subscribe() {
  if (unsub) try { unsub() } catch {}
  if (!props.postId) return
  const col = collection(db, 'posts', props.postId, 'reactions')
  unsub = onSnapshot(col, (snap) => {
    reactions.value = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
  })
}

async function toggleReaction(emoji) {
  if (!props.postId || !myUid.value || myUid.value === 'anon') return
  const ref = doc(db, 'posts', props.postId, 'reactions', myUid.value)
  if (myReaction.value === emoji) {
    // toggle off
    try { await deleteDoc(ref) } catch (e) { /* silent */ }
  } else {
    try {
      await setDoc(ref, {
        userId: myUid.value,
        emoji,
        nama: auth.sesiAktif?.nama || '',
        created_at: new Date().toISOString()
      })
    } catch (e) { /* silent */ }
  }
}

onMounted(subscribe)
onUnmounted(() => { if (unsub) try { unsub() } catch {} })
watch(() => props.postId, subscribe)
</script>
