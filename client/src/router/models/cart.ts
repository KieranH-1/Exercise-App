import { ref } from 'vue'

const cart = ref([])

function addToCart({ name, price }) {
  cart.value.push({ name, price, quantity: 1 })
}
