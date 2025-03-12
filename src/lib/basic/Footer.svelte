<script>
    import { Instagram, Youtube } from 'lucide-svelte';
</script>

<footer class="bg-black text-white p-4">
    <div class="flex flex-col md:flex-row justify-between mx-auto max-w-screen-xl">
        <!-- TEXT -->
        <div class="flex-1 flex flex-col justify-center items-center text-center">
            <p class="text-lg font-bold">GAMING ERLEBNIS VERBESSERN</p>
        </div>

        <!-- SOCIAL MEDIA -->
        <div class="flex-1 flex flex-col justify-center items-center text-center mt-6 md:mt-0">
            <p class="text-lg font-bold">SOCIAL MEDIA</p>
            <div class="flex justify-center space-x-4 mt-2">
                <a href="https://tiktok.com" class="hover:text-gray-400">TikTok</a>
                <a href="https://www.instagram.com/" class="hover:text-gray-400">
                    <Instagram size={24} class="text-white" />
                </a>
                <a href="https://www.youtube.com/" class="hover:text-gray-400">
                    <Youtube size={24} class="text-white" />
                </a>
            </div>
        </div>

        <!-- CONTACT -->
        <div class="flex-1 flex flex-col justify-center items-center text-center mt-6 md:mt-0">
            <p class="text-lg font-bold">CONTACT / SUPPORT</p>
            <p>Email: info@badio.de</p>
            <p>Telefon: +49 ********</p>
            <a href="https://discord.gg/jVEvVQKQvT" class="text-gray-200 hover:text-gray-400">Discord</a>
        </div>
    </div>

    <div class="mt-8 text-center text-sm">
        <p>© 2025 WARRIOR</p>
    </div>
</footer>
