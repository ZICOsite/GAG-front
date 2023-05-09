import { defineStore } from "pinia";
import { Products } from "@/assets/js/connect";
const db = new Products();

export const useDeliveryStore = defineStore('delivery', {
    state: () => ({
        deliveries: null,
        totalDeliveries: 0,
    }),
    actions: {
        async getDelivery(page) {
            try {
                const deliveriesDB = await db.getDelivery(page);
                this.deliveries = deliveriesDB.results;
                this.totalDeliveries = deliveriesDB.count;
            } catch (error) {
                console.log(error);
            }
        }
    },
    persist: true,
})