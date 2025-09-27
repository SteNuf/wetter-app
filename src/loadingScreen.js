export function renderLoadingScreen(message = "Lade...") {
  const rootElement = document.getElementById("loader");
}

function getLoadingScreen(message) {
  return `  

<div class="loader-wrapper" id="loader">
      <div class="lds-ring">
        Lade Wetter für ${message}
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>

`;
}
