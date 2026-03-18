<script setup>
import { ref, onMounted } from "vue"
import axios from "axios"

const API_URL = "http://localhost:3000"

const products = ref([])
const loading = ref(false)
const successMsg = ref("")
const errorMsg = ref("")
const selectedProduct = ref(null)

const form = ref({
    name: "",
    category: "",
    description: ""
})

const isEditMode = ref(false)
const editingId = ref(null)

const resetForm = () => {
    form.value = {
        name: "",
        category: "",
        description: ""
    }
}

const clearMessages = () => {
    successMsg.value = ""
    errorMsg.value = ""
}

const getProducts = async () => {
    loading.value = true
    try {
        const res = await axios.get(`${API_URL}/products`)
        products.value = res.data.data
    } catch (error) {
        errorMsg.value = "Failed to load products."
    } finally {
        loading.value = false
    }
}

const submitProduct = async () => {
    clearMessages()

    if (!form.value.name || !form.value.category || !form.value.description) {
        errorMsg.value = "Please fill all fields."
        return
    }

    try {
        if (isEditMode.value && editingId.value) {
            await axios.put(`${API_URL}/product/${editingId.value}`, form.value)
            successMsg.value = "Product updated successfully."
            isEditMode.value = false
            editingId.value = null
        } else {
            await axios.post(`${API_URL}/product`, form.value)
            successMsg.value = "Product created successfully."
        }

        resetForm()
        await getProducts()
    } catch (error) {
        errorMsg.value = "Failed to submit product."
    }
}

const showDetail = async (id) => {
    clearMessages()
    try {
        const res = await axios.get(`${API_URL}/product/${id}`)
        selectedProduct.value = res.data.data
    } catch (error) {
        errorMsg.value = "Failed to load product detail."
    }
}

const startUpdate = (product) => {
    clearMessages()
    isEditMode.value = true
    editingId.value = product.id
    form.value = {
        name: product.name,
        category: product.category,
        description: product.description
    }
}

const cancelUpdate = () => {
    isEditMode.value = false
    editingId.value = null
    resetForm()
}

const deleteProduct = async (id) => {
    clearMessages()
    const isConfirmed = window.confirm("Are you sure to delete this product?")
    if (!isConfirmed) return

    try {
        await axios.delete(`${API_URL}/product/${id}`)
        successMsg.value = "Product deleted successfully."
        if (selectedProduct.value?.id === id) {
            selectedProduct.value = null
        }
        await getProducts()
    } catch (error) {
        errorMsg.value = "Failed to delete product."
    }
}

onMounted(() => {
    getProducts()
})
</script>

<template>
    <div class="container mt-4 mb-5">
        <h1 class="mb-4 fw-bold page-title">Product Management</h1>

        <div v-if="successMsg" class="alert alert-success" role="alert">{{ successMsg }}</div>
        <div v-if="errorMsg" class="alert alert-danger" role="alert">{{ errorMsg }}</div>

        <div class="my-5">
            <form class="p-4 p-md-5 border rounded-3 form-wrapper" @submit.prevent="submitProduct">
                <div class="mb-3">
                    <label class="form-label">Product name</label>
                    <input v-model="form.name" type="text" class="form-control" placeholder="Enter product name">
                </div>
                <div class="mb-3">
                    <label class="form-label">Category</label>
                    <input v-model="form.category" type="text" class="form-control" placeholder="Enter category">
                </div>
                <div class="mb-3">
                    <label class="form-label">Description</label>
                    <input v-model="form.description" type="text" class="form-control" placeholder="Enter description">
                </div>

                <div class="d-flex gap-2">
                    <button type="submit" class="btn btn-dark">
                        {{ isEditMode ? "Update Product" : "Add Product" }}
                    </button>
                    <button v-if="isEditMode" type="button" class="btn btn-outline-secondary" @click="cancelUpdate">
                        Cancel
                    </button>
                </div>
            </form>
        </div>

        <div class="my-5">
            <h2 class="mb-4">Product List</h2>

            <div class="table-responsive shadow-sm rounded-3 border table-wrapper">
                <table class="table table-striped table-hover align-middle mb-0">
                    <thead class="table-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Category</th>
                            <th scope="col">Description</th>
                            <th scope="col" class="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="loading">
                            <td colspan="5" class="text-center py-4 text-muted">
                                <p class="spinner-border text-danger"><span class="text-primary">Loading...</span></p>
                            </td>
                        </tr>
                        <tr v-else-if="products.length === 0">
                            <td colspan="5" class="text-center py-4 text-muted">No products found.</td>
                        </tr>
                        <tr v-for="p in products" v-else :key="p.id">
                            <td>{{ p.id }}</td>
                            <td>{{ p.name }}</td>
                            <td>{{ p.category }}</td>
                            <td>{{ p.description }}</td>
                            <td>
                                <div class="d-flex justify-content-center gap-2">
                                    <button class="btn btn-sm btn-info text-white action-btn"
                                        @click="showDetail(p.id)">Detail</button>
                                    <button class="btn btn-sm btn-warning text-dark action-btn"
                                        @click="startUpdate(p)">Update</button>
                                    <button class="btn btn-sm btn-danger action-btn"
                                        @click="deleteProduct(p.id)">Delete</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div v-if="selectedProduct" class="card shadow-sm border-0 detail-card">
            <div class="card-body">
                <h5 class="card-title mb-3">Product Detail</h5>
                <p class="mb-2"><strong>ID: </strong> {{ selectedProduct.id }}</p>
                <p class="mb-2"><strong>Name: </strong> {{ selectedProduct.name }}</p>
                <p class="mb-2"><strong>Category: </strong> {{ selectedProduct.category }}</p>
                <p class="mb-0"><strong>Description: </strong> {{ selectedProduct.description }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.page-title {
    letter-spacing: 0.4px;
}

.form-wrapper {
    background: #ffffff;
}

.table-wrapper {
    overflow: hidden;
}

.action-btn {
    min-width: 76px;
}

.detail-card {
    max-width: 500px;
}
</style>