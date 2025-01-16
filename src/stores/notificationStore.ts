import { writable } from "svelte/store";

export const notificationStore = writable({
    message: "",
    type: "",
    show: false,
});

export const showNotification = (message: string, type: string) => {
    notificationStore.set({ message, type, show: true });
};

export const hideNotification = () => {
    notificationStore.set({ message: "", type: "", show: false });
};