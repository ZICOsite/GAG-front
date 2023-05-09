import { defineStore } from "pinia";
import { Products } from "@/assets/js/connect";
const db = new Products();

export const useNewStore = defineStore('new', {
    state: () => ({
        newSingle: null,
    }),
    actions: {
        async getNew(id) {
            try {
                const newDB = await db.getSoloNews(id);
                this.newSingle = newDB;
            } catch (error) {
                console.log(error);
            }
        }
    },
    persist: true,
})