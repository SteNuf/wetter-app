export function renderLoadingScreen(message = "Lade...") {
  let rootElement = document.getElementById("loader-root");

  if (!rootElement) {
    rootElement = document.createElement("div");
    rootElement.id = "loader-root";
    document.body.appendChild(rootElement);
  }

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
