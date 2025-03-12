<script>
    import Footer from '$lib/basic/Footer.svelte';
    import NavBar from '$lib/basic/NavBar.svelte';
    import { cart, removeFromCart, totalItems, totalPrice } from '$lib/cart.js';

    /**
	 * @type {string | any[]}
	 */
    let cartItems = [];
    cart.subscribe(value => {
        cartItems = value;
    });

    const handleRemove = (/** @type {{ title: any; color: any; keycaps: any; }} */ item) => {
        removeFromCart(item.title, item.color, item.keycaps);
    };
</script>

<NavBar />
<div class="bg-[#191919] min-h-screen py-20 sm:py-60">
    <div class="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-semibold text-white mb-5">Your Cart</h2>

        {#if cartItems.length === 0}
            <p class="text-center text-white">Your cart is empty.</p>
        {:else}
            <div class="space-y-4">
                {#each cartItems as item (item.title + item.color + item.keycaps)}
                    <div class="flex justify-between items-center bg-[#171717] p-4 rounded-md">
                        <div class="flex items-center space-x-4">
                            <img 
                                src={item.keycaps ? item.keycaps : item.color} 
                                alt={item.title}
                                class="w-16 h-16 object-contain rounded-lg"
                            />
                            <div>
                                <h3 class="text-lg font-semibold text-white">{item.title}</h3>
                                <p class="text-sm text-white">Farbe: {item.color}</p>
                                {#if item.keycaps}
                                    <p class="text-sm text-white">Keycaps: {item.keycaps}</p>
                                {/if}
                                {#if item.switches}
                                    <p class="text-sm text-white">Switches: {item.switches}</p>
                                {/if}
                                <p class="text-sm text-white">Preis: {item.price}</p>
                            </div>
                        </div>
                        <div class="flex items-center space-x-4">
                            <p class="text-sm text-white">Anzahl: {item.quantity}</p>
                            <button 
                                class="text-red-500 hover:text-red-700 text-md"
                                on:click={() => handleRemove(item)}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                {/each}
            </div>
        {/if}

        {#if cartItems.length > 0}
            <div class="mt-8 text-right">
                <p class="text-xl font-normal text-white">
                    Total Items:<span class="font-semibold">{$totalItems}</span>
                </p>
                <p class="text-xl font-normal text-white">
                    Preis: <span class="font-semibold">{$totalPrice.toFixed(2)}</span> €
                </p>
                <a 
                    href="/checkout" 
                    class="mt-5 font-normaö inline-block rounded p-3 text-center text-white bg-green-700 hover:bg-green-700"
                >
                    Jetzt Bezahlen
                </a>
            </div>
        {/if}
    </div>
</div>
<Footer />
