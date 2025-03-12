<script>
    import { page } from '$app/stores';
    import Footer from '$lib/basic/Footer.svelte';
    import NavBar from '$lib/basic/NavBar.svelte';
    import Notification from '$lib/basic/Notification.svelte';
    import { derived } from 'svelte/store';

    const productData = {
        keyboards: [
            { title: "Custom Keyboard", price: "€ 79.99", image: "https://nyfter.com/cdn/shop/files/2_7ebdd659-0866-4bfe-9bda-47a9916576f1.png?v=1732470638&width=2000" },
            { title: "RGB Keyboard", price: "€ 49.99", image: "https://nyfter.com/cdn/shop/files/2_7ebdd659-0866-4bfe-9bda-47a9916576f1.png?v=1732470638&width=2000" }
        ],
        mouses: [
            { title: "Wireless Gaming Mouse", price: "€ 39.99", image: "https://nyfter.com/cdn/shop/files/2_7ebdd659-0866-4bfe-9bda-47a9916576f1.png?v=1732470638&width=2000" },
            { title: "Ergonomic Mouse", price: "€ 29.99", image: "https://nyfter.com/cdn/shop/files/2_7ebdd659-0866-4bfe-9bda-47a9916576f1.png?v=1732470638&width=2000" }
        ],
        test: [
            { title: "Test Product 1", price: "€ 19.99", image: "https://nyfter.com/cdn/shop/files/2_7ebdd659-0866-4bfe-9bda-47a9916576f1.png?v=1732470638&width=2000" },
            { title: "Test Product 2", price: "€ 24.99", image: "https://nyfter.com/cdn/shop/files/2_7ebdd659-0866-4bfe-9bda-47a9916576f1.png?v=1732470638&width=2000" }
        ]
    };

    const category = derived(page, ($page) => $page.params.category);

    // @ts-ignore
    const products = derived(category, ($category) => productData[$category] || []);
</script>

<Notification />
<NavBar />

<div class="bg-[#191919] min-h-screen py-10">
    <div class="mx-[15%] text-center">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {#each $products as product}
                <a href={`/products/${$category}/${product.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '')}`} class="block">
                    <div class="bg-[#1C1C1C] rounded-lg p-6 flex flex-col">

                        <div class="flex flex-grow items-center justify-center">
                            <img src={product.image} 
                                 alt={product.title} 
                                 class="w-full h-[200px] object-contain rounded-lg">
                        </div>
                        
                        <div class="flex flex-col mt-4 text-left">
                            <p class="text-white font-sans font-bold text-xl">{product.title}</p>
                            <p class="mt-2 text-gray-400">
                                <span class="text-green-400">{product.price}</span>
                            </p>
                        </div>
                    </div>
                </a>
            {/each}
        </div>      
    </div>
</div>

<Footer />
