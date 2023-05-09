import { defineStore } from "pinia";
import { Products } from "@/assets/js/connect";
const db = new Products();

export const useNewsStore = defineStore('news', {
    state: () => ({
        news: null,
        totalNews: 0,
    }),
    actions: {
        async getNews(page) {
            try {
                const newsDB = await db.getNewsInfo(page);
                this.news = newsDB.results;
                this.totalNews = newsDB.count;
            } catch (error) {
                console.log(error);
            }
        }
    },
})