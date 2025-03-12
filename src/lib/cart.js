// @ts-nocheck
import { writable, derived } from 'svelte/store';


const isBrowser = typeof window !== 'undefined';


const savedCart = isBrowser ? localStorage.getItem('cart') : null;
const initialCart = savedCart ? JSON.parse(savedCart) : [];


export const cart = writable(initialCart);


if (isBrowser) {
  cart.subscribe(($cart) => {
    localStorage.setItem('cart', JSON.stringify($cart));
  });
}

export const totalItems = derived(cart, $cart => 
  $cart.reduce((total, item) => total + (item.quantity || 1), 0)
);

export const totalPrice = derived(cart, $cart => {
    return $cart.reduce((total, item) => {
        const price = Number(item.price) || 0;  
        const quantity = item.quantity || 1; 
        return total + price * quantity;
    }, 0);
});


export const addToCart = (product, selectedColor, selectedKeycaps, selectedSwitch) => {
  cart.update(items => {
    const cartItem = {
      title: product.title,
      price: product.price,
      color: selectedColor,
      keycaps: product.keycaps ? selectedKeycaps : null,
      switches: product.switches ? selectedSwitch : null,
      quantity: 1
    };

    const existingItem = items.find(item => 
      item.title === product.title && 
      item.color === selectedColor && 
      item.keycaps === cartItem.keycaps && 
      item.switches === cartItem.switches
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      items.push(cartItem);
    }

    return [...items];
  });
};

export const removeFromCart = (productTitle, selectedColor, selectedKeycaps) => {
  cart.update(items => {
    return items
      .map(item => {
        if (
          item.title === productTitle && 
          item.color === selectedColor && 
          item.keycaps === selectedKeycaps
        ) {

          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return null;
          }
        }
        return item;
      })
      .filter(Boolean);
  });
};
