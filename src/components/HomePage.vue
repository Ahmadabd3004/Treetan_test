<script>
import '../assets/style.css'
import Swal from 'sweetalert2'
import { mapWritableState,mapActions } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default{
    name:"HomePage",
    computed:{
        ...mapWritableState(useCounterStore,['products'])
    },
    data(){
        return{
            cartList : [],
            totalPrice: 0
        }
    },
   methods:{
    ...mapActions(useCounterStore,['fetchData']),
    addProduct(title,price){
        let flag = false
        this.cartList.forEach(e => {
            if (e.title === title) {
                e.QTY += 1
                e.subTotal = e.price * e.QTY
                this.totalPrice += +e.price
                flag = true
            }
        });
        if (!flag) {
            this.cartList.push({
                title : title,
                price: price,
                QTY : 1,
                subTotal : price
            })
            this.totalPrice += +price
        }
    },
    deleteProduct(title,price){
        this.cartList.forEach(e => {
            if (e.title === title) {
                e.QTY -= 1
                e.subTotal = e.price * e.QTY
                this.totalPrice -= +e.price
            }
        });
       
        let filteredCartlist = this.cartList.filter(e=> e.QTY != 0)
        this.cartList = filteredCartlist
    },
    checkoutBtn(){
        Swal.fire(
                    'Success Checkout',
                    '',
                    'success'
        )
       this.cartList = []
       this.totalPrice = 0
    }
   },
   created(){
    this.fetchData()
   }
}
</script>
<template>
    <div class="nav">Shopping Cart App</div>
    <div class="containers">
        <div class="main-section">
            <div class="card-box" v-for="product in products" :key="product.id">
                <div class="card">
                   <img :src="product.thumbnail" alt="" class="img">
                    <div class="category"><span>{{product.category }}</span></div>
                   
                    <div class="details">
                        <span class="title">{{product.title }}</span>
                        <p class="description">{{product.description }}</p>
                        <span class="discount-price">$ {{product.discountPrice}}</span>
                        <div class="d-flex">
                            <div class="discount text-center"><span>{{product.discountPercentage}}%</span></div>
                            <span class="price">$ {{product.price}}</span>
                        </div>
                        <div class="rating bg-primary">
                            <img src="../assets/Vector.svg" alt="">
                            <span>{{product.rating}}</span>
                        </div>
                    </div>
                    <div class="btn-cart" @click="()=>{
                        product.QTY += 1
                        addProduct(product.title,product.discountPrice)}" v-if="!product.QTY">
                        <img src="../assets/cart.svg" alt="">
                        <span>Add To Cart</span>
                    </div>
                    <div class="total-product" v-if="product.QTY">
                        <button class="btn-qty" @click="()=>{
                            product.QTY -= 1
                            deleteProduct(product.title,product.discountPercentage)
                        }">-</button>
                        <p>{{product.QTY}}</p>
                        <button class="btn-qty" @click="()=> {
                            product.QTY += 1
                            addProduct(product.title,product.discountPrice)}">+</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="cart-section">
            <img class="img-blank" src="../assets/cart3.svg" alt="" v-if="!cartList.length">
            <h3 class="cart-title">Shopping cart</h3>
            <div class="table-wrapper">
                <table>
                    <thead>
                            <th>Name</th>
                            <th>QTY</th>
                            <th>Price</th>
                            <th>Sub Total</th> 
                    </thead>
                    <tbody>
                        <tr v-for="(item,idx) in cartList" :key="idx">
                            <td>{{item.title}}</td>
                            <td>{{item.QTY}}</td>
                            <td>$ {{item.price}}</td>
                            <td>$ {{item.subTotal}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <hr>
            <div class="total-price">
                <h3>Total</h3>
                <h2>$ {{totalPrice}}</h2>
            </div>

            <div class="btn-checkout" @click="()=>checkoutBtn()" v-if="cartList.length">
                <img src="../assets/cart.svg" alt="">
                <h3>Checkout</h3>
            </div>
           
        </div>
    </div>
</template>
