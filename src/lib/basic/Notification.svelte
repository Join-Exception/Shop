<script>
    import { onMount } from 'svelte';

    let texts = ['Kostenloser Versand in DE ab 50€', 'Habt ihr neue Produktideen? Schreibt uns!'];
    let index = 0;
    let text = texts[index];
    let showAnimation = true;

    onMount(() => {
        setInterval(() => {
            showAnimation = false;

            setTimeout(() => {
                index = (index + 1) % texts.length;
                text = texts[index];
                showAnimation = true;
            }, 500);
        }, 6000);
    });
</script>

<style>
    .slide-in {
        animation: slideIn 0.2s ease-out forwards;
    }

    .slide-out {
        animation: slideOut 0.3s ease-out forwards;
    }

    @keyframes slideIn {
        0% {
            opacity: 0;
            transform: translateY(20px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideOut {
        0% {
            opacity: 1;
            transform: translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
</style>

<div class="bg-green-500 text-sm text-white flex justify-center items-center p-1">
    <p class="{showAnimation ? 'slide-in' : 'slide-out'}">{text}</p>
</div>
