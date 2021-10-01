import "./style.css";

import LeaftLeave from "./components/LeftLeave";
import RightLeave from "./components/RightLeave";

function main() {
  const canvas = document.getElementById("webgl");
  const gl = canvas.getContext("webgl");
  if (!gl) {
    return;
  }

  LeaftLeave(gl);
  RightLeave(gl);

  // function render() {
  //   if ((change >= 0.5) | (change <= -0.5)) {
  //     speed = -speed;
  //   }
  //   change += speed;
  //   gl.uniform1f(uChange, change);
  //   gl.clearColor(0, 0, 0, 1);
  //   gl.clear(gl.COLOR_BUFFER_BIT);
  //   gl.drawArrays(gl.LINE_LOOP, 0, 2);
  //   requestAnimationFrame(render);
  // }
  // render();
}

main();
