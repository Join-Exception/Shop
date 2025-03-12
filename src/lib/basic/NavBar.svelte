<script>
  import { onMount } from 'svelte';
  import { writable, derived } from 'svelte/store';
  import { LogOut, User, ShoppingCart, Menu, X } from 'lucide-svelte'; 
  import { goto } from '$app/navigation';
  import { totalItems } from '$lib/cart.js';

  const loggedIn = writable(false);
  const menuOpen = writable(false);
  const userEmail = writable('');

  onMount(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      loggedIn.set(true);
      userEmail.set(payload.email);
    }
  });

  function handleLogout() {
    console.log("User logged out");
    localStorage.setItem('token', ""); 
    loggedIn.set(false);
    goto('/');
  }

  function toggleMenu() {
    menuOpen.update(open => !open);
  }
</script>

<nav class="flex justify-between items-center p-7 md:p-7 bg-black text-white sticky top-0 z-50">
  <a href="/" class="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-3">
    <img src="/black_Warrior.jpg" class="w-55 h-17 rounded-full z-99" alt="Warrior Logo" />
  </a>

  <div class="hidden md:flex ml-auto text-[17.5px] font-bold relative z-99">
    <ul class="flex items-center font-medium">
      {#if $loggedIn}
      <div class="flex items-center mr-10">
        <p class="text-white font-normal">{$userEmail}</p>
      </div>
      {/if}
      {#if !$loggedIn}
        <div class="flex items-center mr-10">
          <a href="/login">
            <User stroke-width="1.5" size={22} class="text-white" />  
          </a>
        </div>
      {/if}

      {#if $loggedIn}
        <div class="flex items-center mr-7">
          <a href="/dashboard">
            <User stroke-width="1.5" size={22} class="text-white" />  
          </a>
        </div>
        <button on:click={handleLogout} class="mr-9">
          <LogOut stroke-width="1.5" size={22} class="text-white" />  
        </button>
      {/if}

      <div class="relative flex items-center mr-10">
        <p class="absolute top-1 right-5 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[0.6rem] text-black">
          {$totalItems}
        </p>
        <a href="/cart">
          <ShoppingCart stroke-width="1.5" size={22} class="text-white" />
        </a>
      </div>
    </ul>
  </div>

  <!-- Mobile -->
  <button class="md:hidden focus:outline-none z-50" on:click={toggleMenu}>
    {#if $menuOpen}
      <X size={28} class="text-white" />
    {:else}
      <Menu size={28} class="text-white" />
    {/if}
  </button>
</nav>

<!-- Mobile Dropdown -->
{#if $menuOpen}
  <div class="fixed top-[84px] left-0 w-full bg-black bg-opacity-90 p-8 rounded-b-lg z-40 shadow-lg">
    <div class="flex flex-col items-center gap-6 mt-8">
      {#if !$loggedIn}
        <a href="/login" class="text-lg flex items-center space-x-2">
          <User size={28} class="text-white" />
          <span class="text-white">Login / Register</span>
        </a>
      {/if}

      {#if $loggedIn}
        <a href="/dashboard" class="text-lg flex items-center space-x-2">
          <User size={28} class="text-white" />
          <span class="text-white">Dashboard</span>
        </a>
        <button on:click={handleLogout} class="text-lg flex items-center space-x-2">
          <LogOut size={27} class="text-white" />
          <span class="text-white">Logout</span>
        </button>
      {/if}

      <a href="/cart" class="text-lg flex items-center space-x-2">
        <ShoppingCart size={28} class="text-white" />
        <span class="text-white">Cart ({$totalItems})</span>
      </a>
    </div>
  </div>
{/if}
