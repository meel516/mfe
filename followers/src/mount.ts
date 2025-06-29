import { loadSharedStore } from "./store-loader";

export const mount = async (container: HTMLElement) => {
  const html = `
    <div id="app">Loading...</div>
    <button id="increment">Increment</button>
  `;
  container.innerHTML = html;

  const appEl = container.querySelector("#app");
  const btn = container.querySelector("#increment");

  const store = await loadSharedStore();

  // store.state$.subscribe((state: any) => {
  //   appEl!.textContent = `Count: ${state.count}`;
  // });

  // Subscribe to store updates
  const unsubscribe = store.subscribe(() => {
    appEl!.textContent = JSON.stringify(store.getState().user)
  });


  console.log(store)

  btn?.addEventListener("click", () => {
    // store.increment();
  });
};
