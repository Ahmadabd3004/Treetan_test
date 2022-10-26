import { defineStore } from "pinia";
import axios from "axios"
export const useCounterStore = defineStore('counter', {
  state: () => {
    return { products: [] }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    async fetchData(){
      try {
        const {data} = await axios.get("https://dummyjson.com/products")
        this.products = data.products.map((e,i)=>{
          let discountPrice =  e.price * ((100-e.discountPercentage)/100)
          e.discountPrice = discountPrice.toFixed()
          e.discountPercentage = e.discountPercentage.toFixed()
          e.QTY = 0
          return e
        })
        console.log(this.products)
      } catch (error) {
        console.log(error)
      }
    }
  },
})