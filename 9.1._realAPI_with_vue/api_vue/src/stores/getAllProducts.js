import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useGetAllProducts = defineStore('getAllProducts', () => {
    const API_URL = "http://localhost:3000/products"
    const products = ref([]);

    const getProducts = async () => {
        try{
            const res = await axios.get(API_URL);
            console.log(res.data);
        }catch(err){
            console.log(err);
            
        }
    }
    return {products, getProducts}
})