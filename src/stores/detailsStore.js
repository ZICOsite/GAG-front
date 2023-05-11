import { defineStore } from "pinia";
import { Products } from "@/assets/js/connect";
const db = new Products();

export const useDetailsStore = defineStore('details', {
    state: () => ({
        details: null,
    }),
    actions: {
        async getDetails(id) {
            try {
                const detailsDB = await db.getDetails(id);
                this.details = detailsDB;
            } catch (error) {
                console.log(error);
            }
        }
    },
    persist: true,
})