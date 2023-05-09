import { defineStore } from "pinia";
import { Products } from "@/assets/js/connect";
const db = new Products();

export const useCompanyCatalogStore = defineStore('companyCatalog', {
    state: () => ({
        products: null,
        count: 0,
    }),
    actions: {
        async getCatalog(key, id, page) {
            try {
                const companyCatalog = await db.getCatalog(key, id, page);
                this.products = companyCatalog.results;
                this.count = companyCatalog.count;
            } catch (error) {
                console.log(error);
            }
        }
    },
    persist: true,
})