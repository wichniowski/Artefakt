import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Track from "./Track";
import registerServiceWorker from "./registerServiceWorker";
if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(<Track />, document.getElementById("root"));
registerServiceWorker();
