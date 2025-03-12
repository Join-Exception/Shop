<script>
    import { page } from '$app/stores';
    import Footer from '$lib/basic/Footer.svelte';
    import NavBar from '$lib/basic/NavBar.svelte';
    import Notification from '$lib/basic/Notification.svelte';
    import { addToCart } from '$lib/cart.js';

    const productData = {
        keyboards: [
            { 
                title: "Custom Keyboard", 
                price: "79.99", 
                colors: {
                    black: "/custompcb.png",
                    blue: "/custompcb.png",
                    white: "/custompcb.png"
                },
                keycaps: {
                    white: "/customkeycaps-white.png",
                    black: "/customkeycaps-black.png",
                    blue: "/customkeycaps-blue.png",
                },
                switches: {
                    red: "/mechanical-switch.png",
                    blue: "/optical-switch.png",
                    brown: "/optical-switch.png",
                }
            },
            { 
                title: "RGB Keyboard", 
                price: "49.99", 
                colors: {
                    white: "/cheap.png",
                },
                switches: {
                    red: "/mechanical-switch.png",
                    blue: "/optical-switch.png",
                    brown: "/optical-switch.png",
                }
            }
        ],
        mouses: [
            { 
                title: "Wireless Gaming Mouse", 
                price: "39.99", 
                colors: {
                    black: "https://example.com/image3.png",
                    white: "https://example.com/image3-white.png"
                }
            },
            { 
                title: "Ergonomic Mouse", 
                price: "29.99", 
                colors: {
                    gray: "https://example.com/image4.png",
                    pink: "https://example.com/image4-pink.png"
                }
            }
        ]
    };

 
    const { category, product } = $page.params;

    // @ts-ignore
    const selectedProduct = productData[category]?.find(p => 
        p.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '') === product
    ) || null;

    let selectedColor = selectedProduct ? Object.keys(selectedProduct.colors)[0] : null;
    let selectedKeycaps = selectedProduct?.keycaps ? Object.keys(selectedProduct.keycaps)[0] : null;
    let selectedSwitches = selectedProduct?.switches ? Object.keys(selectedProduct.switches)[0] : null;
    
    const addToCartHandler = () => {
        if (selectedProduct) {
            addToCart(selectedProduct, selectedColor, selectedProduct.keycaps ? selectedKeycaps : null);
        }
    };
</script>

<Notification />
<NavBar />

<div class="bg-[#191919] min-h-screen py-20 sm:py-60">
    {#if selectedProduct}
        <div class="max-w-9xl mx-auto px-6 sm:px-6 lg:px-8">
            <div class="flex flex-col items-center space-x-8 sm:flex-row">
                <!-- Text left -->
                <div class="flex-1 pl-0 sm:pl-30">
                    <h3 class="text-xl font-semibold text-white">{selectedProduct.title}</h3>
                    
                    <!-- Color Selection Dropdown -->
                    <label class="block text-white mt-5">Color:</label>
                    <select 
                        class="mt-2 p-2 rounded bg-[#171717] text-white border border-gray-600"
                        bind:value={selectedColor}
                    >
                        {#each Object.keys(selectedProduct.colors) as color}
                            <option class="bg-[#171717]" value={color}>{color}</option>
                        {/each}
                    </select>

                    <!-- Keycaps Selection -->
                    {#if selectedProduct.keycaps}
                        <label class="block text-white mt-5">Keycaps:</label>
                        <select 
                            class="mt-2 p-2 rounded bg-[#171717] text-white border border-gray-600"
                            bind:value={selectedKeycaps}
                        >
                            {#each Object.keys(selectedProduct.keycaps) as keycap}
                                <option class="bg-[#171717]" value={keycap}>{keycap}</option>
                            {/each}
                        </select>
                    {/if}

                    <!-- Switches Selection -->
                    {#if selectedProduct.switches}
                        <label class="block text-white mt-5">Switches:</label>
                        <select 
                            class="mt-2 p-2 rounded bg-[#171717] text-white border border-gray-600"
                            bind:value={selectedSwitches}
                        >
                            {#each Object.keys(selectedProduct.switches) as switchType}
                                <option class="bg-[#171717]" value={switchType}>{switchType}</option>
                            {/each}
                        </select>
                    {/if}

                    <!-- Mobile Image -->
                    <div class="flex justify-center mt-20 sm:hidden">
                        <img 
                            src={selectedProduct.colors[selectedColor]}  
                            class="w-full h-auto object-contain rounded-lg" 
                        />
                    </div>

                    <p class="mt-30 mb-10 text-xl font-bold text-white">€ {selectedProduct.price}</p>
                    <a href="#" class="rounded p-3 text-center text-white bg-green-500 hover:bg-green-700" on:click={addToCartHandler}>Add to Cart</a>
                </div>

                <!-- Image PC -->
                <div class="flex-shrink-0 w-1/2 hidden sm:flex justify-center relative">
                    <!-- PCB Image-->
                    <img 
                        src={selectedProduct.colors[selectedColor]} 
                        class="w-[80%] h-auto object-contain rounded-lg max-h-[400px]
" 
                    />

                    <!-- Keycaps Overlay -->
                    {#if selectedProduct.keycaps}
                        <img 
                            src={selectedProduct.keycaps[selectedKeycaps]} 
                            class="absolute top-0 left-0 w-[80%] h-auto object-contain opacity-75"
                        />
                    {/if}

                    <!-- Switches Overlay -->
                    {#if selectedProduct.switches && selectedSwitches}
                        <img 
                            src={selectedProduct.switches[selectedSwitches]} 
                            class="absolute top-0 left-0 w-[80%] h-auto object-contain opacity-75"
                        />
                    {/if}
                </div>
            </div>
        </div>
    {:else}
        <p class="text-center text-red-500">Product not found</p>
    {/if}
</div>

<Footer />
