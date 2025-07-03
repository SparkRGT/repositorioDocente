<script setup lang="ts">
import Movie from './Movie.vue'
import type { IMovie } from '../types/imovie'

const props = defineProps<{
  movies: IMovie[]
}>()

const emit = defineEmits<{
    'show-message': [movieId: number]
}>()

const showMessage = (movieId: number) => {
  emit('show-message', movieId)
}

</script>
<template>
  <div class="billboard">
    <Movie v-for="movie in props.movies" :key="movie.id" :movie="movie" @show-message="showMessage" />
  </div>
</template>

<style scoped>
.billboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
</style>