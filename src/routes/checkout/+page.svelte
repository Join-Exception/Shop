<script>
    import Footer from '$lib/basic/Footer.svelte';
    import NavBar from '$lib/basic/NavBar.svelte';
    import { cart, removeFromCart, totalItems, totalPrice } from '$lib/cart.js';

    /**
	 * @type {string | any[]}
	 */
    let cartItems = [];
    // Subscribe to the cart store so cartItems always stays updated
    cart.subscribe(value => {
        cartItems = value;
    });

    const handleRemove = (/** @type {{ title: any; color: any; keycaps: any; }} */ item) => {
        removeFromCart(item.title, item.color, item.keycaps);
    };
</script>

<NavBar />
<div class="bg-[#191919] min-h-screen py-20 sm:py-60">
</div>
<Footer />
