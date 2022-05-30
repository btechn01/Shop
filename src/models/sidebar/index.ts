import { createDomain } from "effector";

// create sidebar domain
export const sidebarDomain = createDomain("sidebar");

// create is sidebar open store
export const $isSidebarOpen = sidebarDomain.createStore(false);

// create open sidebar event which will be set isSidebarOpen to true
export const openSidebar = sidebarDomain.createEvent();

// create close sidebar event which will be set isSidebarOpen to false
export const closeSidebar = sidebarDomain.createEvent();
