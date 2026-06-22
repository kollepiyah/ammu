<template>
  <!-- v.20.72.0526: Reactions bar — 5 emoji like (kyai: gak perlu comments, cukup like) -->
  <div class="flex items-center gap-1.5 mt-2 pt-2 border-t border-[var(--border-subtle)]">
    <button
      v-for="r in REACTIONS"
      :key="r.emoji"
      @click="toggleReaction(r.emoji)"
      :class="[
        'flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-all',
        myReaction === r.emoji
          ? 'bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-200 ring-1 ring-teal-300'
          : 'bg-[var(--bg-muted)] text-[var(--text-secondary)] hover:bg-slate-200 dark:hover:bg-slate-600/40'
      ]"
      :title="r.label"
    >
      <span class="text-base leading-none">{{ r.emoji }}</span>
      <span v-if="counts[r.emoji]" class="font-bold text-[10px]">{{ counts[r.emoji] }}</span>
    </button>
  </div>
</template>

<script setup>
// v.F6e: post_reactions = tabel Supabase PK komposit (post_id,post_type,user_id),
//   tanpa kolom id/data → pakai supabase client LANGSUNG (adapter db.js PK-tunggal tak cocok).
import { ref, computed, onMounted, watch } from 'vue'
import { supabase } from '@/services/supabase'
import { useAuthStore } from '@/stores/auth'

const props = defineProps({
  postId: { type: String, required: true },
  collection: { type: String, default: 'beranda_post' }
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

const counts = computed(() => {
  const c = {}
  for (const r of reactions.value) {
    if (r.emoji) c[r.emoji] = (c[r.emoji] || 0) + 1
  }
  return c
})

const myReaction = computed(() => {
  const mine = reactions.value.find((r) => String(r.user_id) === myUid.value)
  return mine?.emoji || null
})

async function load() {
  if (!props.postId || !supabase) return
  const { data, error } = await supabase
    .from('post_reactions')
    .select('*')
    .eq('post_type', props.collection)
    .eq('post_id', String(props.postId))
  if (!error) reactions.value = data || []
}

async function toggleReaction(emoji) {
  if (!props.postId || !myUid.value || myUid.value === 'anon' || !supabase) return
  try {
    if (myReaction.value === emoji) {
      // toggle off
      await supabase
        .from('post_reactions')
        .delete()
        .eq('post_id', String(props.postId))
        .eq('post_type', props.collection)
        .eq('user_id', myUid.value)
    } else {
      await supabase.from('post_reactions').upsert(
        {
          post_id: String(props.postId),
          post_type: props.collection,
          user_id: myUid.value,
          emoji,
          created_at: new Date().toISOString()
        },
        { onConflict: 'post_id,post_type,user_id' }
      )
    }
  } catch (e) {
    /* silent */
  }
  await load()
}

onMounted(load)
watch(() => props.postId, load)
</script>
