const store = new Vuex.Store({
  state: {
    cart: JSON.parse(localStorage.getItem('cart')) || [] // Carga el carrito del localStorage
  },
  mutations: {
    ADD_TO_CART(state, product) {
      const cartItem = state.cart.find(item => item.id === product.id);
      if (cartItem) {
        cartItem.quantity++;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(state.cart)); // Guarda el carrito en localStorage
    },
    REMOVE_FROM_CART(state, product) {
      const cartItem = state.cart.find(item => item.id === product.id);
      if (cartItem) {
        if (cartItem.quantity > 1) {
          cartItem.quantity--;
        } else {
          state.cart = state.cart.filter(item => item.id !== product.id);
        }
      }
      localStorage.setItem('cart', JSON.stringify(state.cart)); // Actualiza el carrito en localStorage
    },
    CLEAR_CART(state) {
      state.cart = []; // Vacía el carrito
      localStorage.removeItem('cart'); // Elimina el carrito del localStorage
    }
  },
  getters: {
    cart: state => state.cart,
    cartTotal: state => state.cart.reduce((total, product) => total + product.price * product.quantity, 0)
  }
});

new Vue({
  el: "#app",
  store,
  data() {
    return {
      products: [
        { id: 1, name: 'Jarrón de marfil', price: 100000 },
        { id: 2, name: 'Proyector Astronauta', price: 160000 },
        { id: 3, name: 'Cubo de Tulipanes', price: 60000 },
        { id: 4, name: 'Mesa de noche', price: 190000 },
        { id: 5, name: 'Portaretratos', price: 40000 }
      ]
    };
  },
  computed: {
    cart() {
      return this.$store.getters.cart;
    },
    cartTotal() {
      return this.$store.getters.cartTotal;
    }
  },
  methods: {
    addToCart(product) {
      this.$store.commit('ADD_TO_CART', product);
    },
    removeFromCart(product) {
      this.$store.commit('REMOVE_FROM_CART', product);
    },
    clearCart() {
      this.$store.commit('CLEAR_CART'); // Método para vaciar el carrito
    }
  }
});

window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});
