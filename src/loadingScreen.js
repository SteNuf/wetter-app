import { rootElement } from "./main";

export async function renderLoadingScreen(message = "Lade...Test") {
  //  const weatherLoadingData = await weather;
  renderLoadingView(message);
}

function renderLoadingView(message) {
  rootElement.innerHTML = getLoadingScreen(message);
}

function getLoadingScreen(message) {
  return `
      <div class="loader-wrapper" id="loader-root">
        <div class="loader-wrapper" id="loader">
            <div class="lds-ring">
               <span class="loader-text"> ${message} </span>
               <div></div>
               <div></div>
               <div></div>
               <div></div>
             </div>
         </div>
      </div>
`;
}
