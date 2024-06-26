export default class Cart {
    cartItems;
    #localStorageKey;

    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }

    #loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
    
        if (!this.cartItems) {
            this.cartItems = [
                {
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 2,
                    deliveryOptionId: '1'
                },
                {
                    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    quantity: 1,
                    deliveryOptionId: '2'
                }
            ];
        }
    }

    saveToStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }

    addToCart(productId) {
        let matchingItem;
    
        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });

        let quantity = 0;
        let addMessage;
        if(!matchingItem) {
            quantity = 1;
        }
        
        if (matchingItem) {
            quantity = Number(document.querySelector(`.js-quantity-selector-${matchingItem.productId}`).value);
            matchingItem.quantity += quantity;
            addMessage = document.querySelector(`.js-added-to-cart${matchingItem.productId}`);
        } else {
            this.cartItems.push(
                {
                    productId,
                    quantity,
                    deliveryOptionId: '1'
                }
            );
            addMessage = document.querySelector(`.js-added-to-cart${productId}`);
        }
    
        this.saveToStorage();

        addMessage.classList.add('added-to-cart-visible');

        let addedMessageTimeoutId;

        if(addedMessageTimeoutId) {
            clearTimeout(addedMessageTimeoutId);
        }

        addedMessageTimeoutId = setTimeout(() => {
            addMessage.classList.remove('added-to-cart-visible');
        }, 3000);
    }

    removeFromCart(productId) {
        const newCart = [];
    
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
                newCart.push(cartItem);
            }
        });
    
        this.cartItems = newCart;
    
        this.saveToStorage();
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;
    
        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });
    
        matchingItem.deliveryOptionId = deliveryOptionId;
    
        this.saveToStorage();
    }
}

export function loadCart() {
    return fetch('https://supersimplebackend.dev/cart');
  }