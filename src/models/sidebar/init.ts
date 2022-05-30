import { $isSidebarOpen, closeSidebar, openSidebar } from ".";

$isSidebarOpen
  // on openSidebar event trigger set isSidebarOpen to true
  .on(openSidebar, () => true)
  // on closeSidebar event trigger set isSidebarOpen to false
  .on(closeSidebar, () => false);
