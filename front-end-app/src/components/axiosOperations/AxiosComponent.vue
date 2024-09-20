<template>
    <div class="p-m-4">
      <h1>Gestion des produits</h1>
  
      <PrimeButton label="Ajouter un produit" icon="pi pi-plus" class="p-mb-3" @click="openAddDialog" :style="{margin: '25px' }" />
      <PrimeButton label="Deconnexion" class="disconnectButton" @click="disconnectMethod"/>
  
      <PrimeDataTable :value="products" class="p-mb-3" selectionMode="single">
        <PrimeColumn field="title" header="Nom" />
        <PrimeColumn field="price" header="Prix" />
        <PrimeColumn field="description" header="Description" />
        <PrimeColumn field="categorie" header="Catégorie" />
        <PrimeColumn header="Actions">
          <template #body="slotProps">
            <PrimeButton icon="pi pi-pencil" class="p-button-rounded p-button-success p-mr-2" @click="openUpdateDialog(slotProps.data)" :style="{margin: '10px' }"/>
            <PrimeButton icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="deleteProducts(slotProps.data._id)" :style="{margin: '10px' }"/>
          </template>
        </PrimeColumn>
      </PrimeDataTable>
  
      <PrimeDialog header="Produit" v-model:visible="showDialog" :modal="true" :closable="false" style="width: 30vw">
        <div class="divDialog">
          <div style="margin-bottom: 10px;">
            <label for="title">Nom du produit</label>
            <PrimeInputText style="margin-left: 20px;" id="title" v-model="product.title" />
          </div>
  
          <div style="margin-bottom: 10px;">
            <label for="price">Prix</label>
            <PrimeInputText style="margin-left: 20px;" id="price" v-model="product.price" />
          </div>
  
          <div style="margin-bottom: 10px;">
            <label for="description">Description</label>
            <PrimeInputText style="margin-left: 20px;" id="description" v-model="product.description" />
          </div>
  
          <div style="margin-bottom: 10px;">
            <label for="categorie">Catégorie</label>
            <PrimeInputText style="margin-left: 20px;" id="categorie" v-model="product.categorie" />
          </div>
        </div>
  
        <div class="buttonsDialog">
          <PrimeButton label="Annuler" class="p-mr-2" @click="showDialog = false" />
          <PrimeButton label="Enregistrer" @click="saveProduct" />
        </div>
      </PrimeDialog>
    </div>
  </template>
  

<script>
import axios from 'axios';
import PrimeButton from 'primevue/button';
import PrimeDataTable from 'primevue/datatable';
import PrimeColumn from 'primevue/column';
import PrimeDialog from 'primevue/dialog';
import PrimeInputText from 'primevue/inputtext';

export default {
    name: 'AxiosComponent', 
    components: {
        PrimeButton,
        PrimeDataTable,
        PrimeColumn,
        PrimeDialog,
        PrimeInputText
    }, 
    data() {
        return {
            products: [], 
            product: {
                categorie: "", 
                title: "", 
                description: "", 
                price: 0, 
                img_ref: "", 
                is_mine: true
            }, 
            isEditMode: false, 
            showDialog: false,
        }
    }, 

    mounted() {
        this.fetchProducts()
    },
    methods: {
        openUpdateDialog(product) {
            this.isEditMode = true, 
            this.product = { ...product }, 
            this.showDialog = true
        }, 
        openAddDialog() {
            this.isEditMode = false, 
            this.reset_product_data(),
            this.showDialog = true
        },
        reset_product_data() {
            this.product = {
                categorie: "", 
                title: "", 
                description: "", 
                price: 0, 
                img_ref: "", 
                is_mine: true   
            }
        },
        saveProduct() {
            if (this.isEditMode) {
                this.updateProducts()
            } else {
                this.addProducts()
            }
            this.showDialog = false
        },
        disconnectMethod() {
            this.$emit('updateDisconnect', {isLogged: false, isRegistered: false})
            location.reload()
            //this.$router.push({ name: '/'})
        },
        async fetchProducts() {
            try {
                const result = await axios.get("http://localhost:3000/products")
                this.products = result.data.data
            } catch (error) {
                console.error("error get the products", error)
            }
        },
        async addProducts() {
            try {
                const result = await axios.post("http://localhost:3000/products", this.product)
                this.products.push(result.data.data)
                this.reset_product_data()
            } catch (error) {
                console.error("error create a new product", error)
            }
        }, 
        async deleteProducts(productID) {
            try {
                const result_delete = this.products.find(product => product._id === productID);
                if (!result_delete) {
                console.error("Product not found with ID:", productID);
                return;
                }

                console.log("ID à supprimer (frontend):", result_delete._id);
                const response = await axios.delete(`http://localhost:3000/products/${result_delete._id}`);
                console.log("Réponse du backend:", response.data);

                this.fetchProducts();
            } catch (error) {
                console.error("Erreur lors de la suppression du produit par ID", error);
            }
        },
        async updateProducts() {
            try {
                await axios.put(`http://localhost:3000/products/${this.product._id}`, this.product)
                this.fetchProducts()
                this.reset_product_data()
            } catch (error) {
                console.error("error update specific product by id", error)
            }
        },
    }
}
</script>

<style scoped>
p {
    border: 1px solid black;
    color: black;
}

.buttonsDialog {
    display: flex;
    justify-content: space-around;
    margin: 20px;
}
.divDialog {
    padding: 15px;
    margin-left: 7px;
}
.disconnectButton {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}
</style>
