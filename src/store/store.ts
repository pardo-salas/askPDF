import { defineStore } from 'pinia'

export const APP_STATUS = {
    INIT: 0,
    LOADING: 1,
    CHAT_MODE: 2,
    ERROR: -1,
};

export const useAppStatusStore = defineStore('app_status', {
    state: () => {
        return {
            status: APP_STATUS.INIT,
            id: '',
            url: '',
            pages:0
        }
    },
    actions: {
        changeState(state=-1){
            this.status = state
        },
        changeInfoPDF(id:string,url:string,pages:number){
            this.id = id
            this.url = url
            this.pages = pages
        }
    },
});
