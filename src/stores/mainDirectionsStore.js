import { defineStore } from "pinia";
import { Products } from "@/assets/js/connect";
const db = new Products();

export const useMainDirections = defineStore('mainDirections', {
    state: () => ({
        products: null,
        count: 0,
        breadcrump: null
    }),
    actions: {
        async getDirections() {
            try {
                const mainDirections = await db.getDirections();
                this.products = mainDirections.results;
                this.count = mainDirections.count;
                this.breadcrump = this.products[this.breadcrumpId]?.title_ru || this.products[this.breadcrumpId]?.title_en;
            } catch (error) {
                console.log(error);
            }
        }
    },
    persist: true,
    getters: {
        getTotalCount: (state) => {
            return (id) => state.products[id].category.reduce((acc, item) => acc += item.child_count, 0)
        },
        getFiveProducts: (state) => (start, end) => {
            return state.products.slice(start, end);
        },
        getTitle: (state) => (id, id2) => {
            if(id && !id2) {
                const idx = state.products.find(c => c.id == id);
                return idx.title_ru || idx.title_en;
            }
            else {
                const idx = state.products.find(c => c.id == id2);
                const idx2 = idx.category.find(c => c.id == id);
                return idx2.title_ru || idx2.title_en;
            }
        }
    }
})