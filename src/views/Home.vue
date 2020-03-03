<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <LiterCard />
    <ResLiter></ResLiter>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import LiterCard from '@/components/LiteratureCard.vue';
import ResLiter from '@/components/ResLiter.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
    LiterCard,
    ResLiter
  }
};
</script>
