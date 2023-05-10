import axios from "axios";
import { loading } from "@/static";

const baseUrl = "http://api.g-amcent.uz/api/v1";

let lang = localStorage.getItem("user-locale") || import.meta.env.VITE_DEFAULT_LOCALE;

export class Products {
    constructor() {
        this.date = new Date().getFullYear();
        this.file = localStorage.getItem("file") || null;
        this.tel1 = localStorage.getItem("tel1") || null;
        this.tel2 = localStorage.getItem("tel2") || null;
        this.tel3 = localStorage.getItem("tel3") || null;
        this.email = localStorage.getItem("email") || null;
    }
    queries = async (url) => {
        loading.value = true;
        try {
            const res = await axios.get(url);
            loading.value = false;
            return res.data;
        } catch (error) {
            window.location = `http://api.g-amcent.uz/${lang}/error`;
            loading.value = false;
            console.log(`Cannot access to ${url}`, error);
            return error;
        }
    }
    getSlidesInfo = () => this.queries(`${baseUrl}/main_page/?lang=${lang}`)
    getNewsInfo = (page = 1) => this.queries(`${baseUrl}/news/?lang=${lang}&page=${page}`)
    getSoloNews = (id) => this.queries(`${baseUrl}/detail_page/${id}/?lang=${lang}`)
    getContacts = () => this.queries(`${baseUrl}/contacts/?lang=${lang}`)
    getVacancies = () => this.queries(`${baseUrl}/jobs/?lang=${lang}`)
    getDelivery = (page = 1) => this.queries(`${baseUrl}/delivery/?lang=${lang}&page=${page}`)
    getDirections = () => this.queries(`${baseUrl}/main_directions/?lang=${lang}`)
    getSearch = (page = 1, keyword) => this.queries(`${baseUrl}/product_card/?lang=${lang}&page=${page}&search=${keyword}`)
    getCatalog = (key = "", id = "", page = 1) => this.queries(`${baseUrl}/product_card/?lang=${lang}&${key}=${id}&page=${page}`)
    getDetails = (id) => this.queries(`${baseUrl}/product_detailpage/${id}/?lang=${lang}`)
    getBrands = () => this.queries(`${baseUrl}/company_logo/?lang=${lang}`)
    getFile = (file) => this.file = file;
    getTel1 = (tel1) => this.tel1 = tel1;
    getTel2 = (tel2) => this.tel2 = tel2;
    getTel3 = (tel3) => this.tel3 = tel3;
    getEmail = (email) => this.email = email;
}