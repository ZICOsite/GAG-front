import { defineStore } from "pinia";
import { Products } from "@/assets/js/connect";
const db = new Products();

export const useSearchStore = defineStore('search', {
    state: () => ({
        searchArr: null,
        searchWord: "",
        count: 0,
    }),
    actions: {
        async getSearch(page, keyword) {
            try {
                const searchDB = await db.getSearch(page, keyword);
                this.searchArr = searchDB.results;
                this.searchWord = keyword;
                this.count = searchDB.count;
            } catch (error) {
                console.log(error);
            }
        }
    },
    persist: true,
})