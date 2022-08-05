<script lang="ts">
  import MindMap from './components/mindmap/MindMap.svelte';
  import { draw } from "svelte/transition"
  import { onMount } from 'svelte';
  import Logo from './components/icons/Logo.svelte';
import Editor from './components/editor/Editor.svelte';

  let visible = false;
  onMount(() => {
    visible=true
  })
</script>

<main>
  {#if visible}
  <Logo />
  {/if}
  <h1>Hello Mind Mapper!</h1>

  <p>
    Visit <a href="https://svelte.dev">svelte.dev</a> to learn how to build Svelte
    apps.
  </p>

  <p>
    Check out <a href="https://github.com/sveltejs/kit#readme">SvelteKit</a> for
    the officially supported framework, also powered by Vite!
  </p>
  <MindMap />
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4rem;
    font-weight: 100;
    line-height: 1.1;
    margin: 2rem auto;
    max-width: 14rem;
  }

  p {
    max-width: 14rem;
    margin: 1rem auto;
    line-height: 1.35;
  }

  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }

    p {
      max-width: none;
    }
  }
</style>
