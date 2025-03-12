<script>
    import { goto } from "$app/navigation";
    import NavBar from "$lib/basic/NavBar.svelte";

    let email = '';
    let password = '';
    let errorMessage = '';
    let username = '';

    // @ts-ignore
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email.includes('@')) {
            errorMessage = 'Please enter a valid email.';
            return;
        }

        if (password.length < 6) {
            errorMessage = 'Password must be at least 6 characters.';
            return;
        }

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Login successful:', data);
                localStorage.setItem('token', data.token);
                goto('/');
            } else {
                errorMessage = data.message || 'Login failed. Please try again.';
            }
        } catch (error) {
            console.error('Error logging in:', error);
            errorMessage = 'An error occurred. Please try again later.';
        }
    };
</script>

<NavBar />
<div class="bg-[#191919] min-h-screen flex items-center justify-center">
    <main class="max-w-md mx-auto p-10 border border-gray-800 rounded shadow-md bg-[#2e2e2e]">
        <h1 class="text-2xl font-bold mb-4 text-center text-white">Login</h1>

        {#if errorMessage}
            <p class="text-red-500 text-sm mb-2">{errorMessage}</p>
        {/if}

        <form on:submit={handleSubmit}>
            <div class="mb-4">
                <label for="email" class="block font-medium mb-2 text-white">Email:</label>
                <input 
                    type="email" 
                    id="email" 
                    bind:value={email} 
                    required 
                    class="w-full p-2 bg-[#333333] text-white border border-green-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div class="mb-4">
                <label for="password" class="block font-medium mb-2 text-white">Password:</label>
                <input 
                    type="password" 
                    id="password" 
                    bind:value={password} 
                    required 
                    class="w-full p-2 bg-[#333333] text-white border border-green-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <button 
                type="submit" 
                class="w-full p-2 bg-green-700 text-white rounded hover:bg-green-800 transition">
                Login
            </button>

            <div class="flex flex-row justify-center p-2 mt-4">
                <p class="text-white">Hast du keinen Account?</p>
                <a href="/register" class="text-blue-500 ml-[5px] hover:text-blue-300 transition">Register</a>
            </div>
        </form>
    </main>
</div>
