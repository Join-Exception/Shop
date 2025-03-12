<script>
    import { goto } from '$app/navigation';
    import NavBar from '$lib/basic/NavBar.svelte';
    import { onMount } from 'svelte';

    onMount(() => {
        const token = localStorage.getItem('token');
        if (!token ||  token == 'undefined') {
            console.log('No token found, redirecting to login...');
            goto('/login'); 
        } else {
            console.log('Token found:', token); 
        }
    });
</script>

<NavBar />
