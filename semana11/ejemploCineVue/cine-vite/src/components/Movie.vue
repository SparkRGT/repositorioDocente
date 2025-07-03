<script setup lang="ts">
import type { IMovie } from '../types/imovie';

interface Props {
  movie: IMovie
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'show-message': [movieId: number]
}>()

const showMessage = (movieId: number) => {
  emit('show-message', movieId)
}
</script>
<template>
  <div class="movie-item">
    <h2>{{ props.movie.name}}</h2>
    <p>{{ props.movie.plot }}</p>
    <button @click="showMessage(props.movie.id)">Ver Message</button>
  </div>
</template>
<style scoped>
.movie-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
}
</style>