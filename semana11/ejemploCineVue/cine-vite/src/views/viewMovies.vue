<script setup lang="ts">
import { ref } from 'vue'
import type { IMovie } from '../types/imovie'
import Billboard from '../components/Billboard.vue'

const movies = ref<IMovie[]>([
    {
        id: 1,
        name: 'The Dark Knight',
        plot: 'A superhero movie about a superhero who fights crime.',
        urlImage: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
    },
    {
        id: 2,
        name: 'The Dark Knight',
        plot: 'A superhero movie about a superhero who fights crime.',
        urlImage: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
    },
    {
        id: 3,
        name: 'The Dark Knight',
        plot: 'A superhero movie about a superhero who fights crime.',
        urlImage: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
    }
])

const showMessage = (movieId: number) => {
  console.log(`Movie ${movieId} clicked`)
}

</script>
<template>
    <h1>Billboard</h1>
  <Billboard :movies="movies" @show-message="showMessage" />
</template>

<style scoped>
h1 {
    text-align: center;
}
</style>
