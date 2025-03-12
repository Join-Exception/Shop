<script>
    import { goto } from '$app/navigation';
    import NavBar from '$lib/basic/NavBar.svelte';

    let firstName = '';
    let lastName = '';
    let email = '';
    let password = '';
    let errorMessage = '';

    const handleSubmit = async (/** @type {{ preventDefault: () => void; }} */ event) => {
        event.preventDefault();

        if (!email.includes('@')) {
            errorMessage = 'Bitte gib eine gültige E-Mail-Adresse ein.';
            return;
        }

        if (password.length < 6) {
            errorMessage = 'Das Passwort muss mindestens 6 Zeichen lang sein.';
            return;
        }

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, firstname: firstName, lastname: lastName }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Registration successful:', data);
                localStorage.setItem('token', data.token);
                goto('/');
            } else {
                errorMessage = data.message || 'Registrierung fehlgeschlagen. Bitte versuche es erneut.';
            }
        } catch (error) {
            console.error('Error registering:', error);
            errorMessage = 'Ein Fehler ist aufgetreten. Bitte versuche es später erneut.';
        }
    };
</script>

<NavBar />
<div class="bg-[#191919] min-h-screen flex items-center justify-center">
    <main class="text-white w-[420px] sm:w-[350px] mx-auto p-8 sm:p-10 border border-gray-800 rounded shadow-md bg-[#2e2e2e]">
        <h1 class="text-2xl font-bold mb-6 text-center">Registrieren</h1>

        {#if errorMessage}
            <p class="text-red-500 text-sm mb-4">{errorMessage}</p>
        {/if}

        <form on:submit={handleSubmit}>
            <!-- Name Input Fields -->
            <div class="mb-4">
                <label for="firstName" class="block font-medium mb-2 text-white">Vorname:</label>
                <input 
                    type="text" 
                    id="firstName"
                    bind:value={firstName} 
                    required 
                    class="w-full p-2 bg-[#333333] text-white border border-green-900 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>

            <div class="mb-4">
                <label for="lastName" class="block font-medium mb-2 text-white">Nachname:</label>
                <input 
                    type="text" 
                    id="lastName"
                    bind:value={lastName} 
                    required 
                    class="w-full p-2 bg-[#333333] text-white border border-green-900 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>

            <!-- Email Input Field -->
            <div class="mb-4">
                <label for="email" class="block font-medium mb-2 text-white">E-Mail:</label>
                <input 
                    type="email" 
                    id="email" 
                    bind:value={email} 
                    required 
                    class="w-full p-2 bg-[#333333] text-white border border-green-900 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>

            <!-- Password Input Field -->
            <div class="mb-4">
                <label for="password" class="block font-medium mb-2 text-white">Passwort:</label>
                <input 
                    type="password" 
                    id="password" 
                    bind:value={password} 
                    required 
                    class="w-full p-2 bg-[#333333] text-white border border-green-900 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
            </div>

            <button 
                type="submit" 
                class="w-full p-2 bg-green-700 text-white rounded hover:bg-green-800 transition">
                Registrieren
            </button>

            <div class="flex flex-row justify-center p-3 mt-4">
                <p class="text-white">Hast du ein Konto?</p>
                <a href="/login" class="text-blue-500 ml-[5px] hover:text-blue-300 transition">Login</a>
            </div>
        </form>
    </main>
</div>
