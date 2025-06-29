import { mount } from "./mount";

// ✅ Only run if standalone
const container = document.getElementById("container");
if (container) {
  mount(container);
}
