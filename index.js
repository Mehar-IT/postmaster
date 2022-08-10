console.log(`post master project`);

let addedParamCount = 0;

function getElemetFromString(param) {
  let div = document.createElement("div");
  div.innerHTML = param;
  return div.firstElementChild;
}

let parameterBox = document.getElementById("parameterBox");
parameterBox.style.display = "none";

let jsonType = document.getElementById("json");
jsonType.addEventListener("click", () => {
  document.getElementById("parameterBox").style.display = "none";
  document.getElementById("jsonBox").style.display = "block";
});

let paramType = document.getElementById("params");
paramType.addEventListener("click", () => {
  document.getElementById("jsonBox").style.display = "none";
  document.getElementById("parameterBox").style.display = "block";
});

let addParam = document.getElementById("addParam");
addParam.addEventListener("click", () => {
  let paramsElements = document.getElementById("paramsElements");
  let string = `
    <div class="form-row my-2">
    <label for="inputParams" class="col-sm-2 col-form-label"
      >Parameter ${addedParamCount + 2}</label
    >
    <div class="col-md-4">
      <input
        type="text"
        class="form-control"
        id="paramKey${addedParamCount + 2}"
        placeholder="input param key here"
      />
    </div>
    <div class="col-md-4" id="paramMargin">
      <input
        type="text"
        class="form-control"
        id="paramValue${addedParamCount + 2}"
        placeholder="input param value here"
      />
    </div>
    <button id="deleteParam" class="btn btn-primary deleteParam" style="width:37px">-</button>
  </div>
     `;
  addedParamCount++;

  let params = getElemetFromString(string);
  paramsElements.appendChild(params);

  let deleteParam = document.getElementsByClassName("deleteParam");
  for (const item of deleteParam) {
    item.addEventListener("click", (e) => {
      e.target.parentElement.remove();
    });
  }
});

let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
  document.getElementById("responseCode").innerText =
    "your response is loading.....";

  let url = document.getElementById("inputUrl").value;
  let requestType = document.querySelector(
    "input[name=requestType]:checked"
  ).value;
  let contentType = document.querySelector(
    "input[name=contentType]:checked"
  ).value;

  if (contentType == "params") {
    data = {};
    for (i = 0; i < addedParamCount + 1; i++) {
      if (document.getElementById("paramKey" + (i + 1)) != undefined) {
        let key = document.getElementById("paramKey" + (i + 1)).value;

        let value = document.getElementById("paramValue" + (i + 1)).value;

        data[key] = value;
      }
    }
    data = JSON.stringify(data);
  } else {
    data = document.getElementById("jsonRequest").value;
  }

  if (requestType == "post") {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        document.getElementById("responseCode").innerHTML = JSON.stringify(
          data,
          null,
          2
        );
        Prism.highlightAll();
      });
  } else {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        document.getElementById("responseCode").textContent = JSON.stringify(
          data,
          null,
          2
        );
        Prism.highlightAll();
      });
  }
});
