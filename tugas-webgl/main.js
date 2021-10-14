import { vertices } from "./constants/vertices";
import "./style.css";

function main() {
  const canvas = document.getElementById("webgl-canvas");
  const gl = canvas.getContext("webgl");

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  const vertexShaderSource = `
        attribute vec2 aPosition;
        attribute vec3 aColor;
        varying vec3 vColor;
        uniform float uChange;
        void main() {
            gl_Position = vec4(aPosition.x, aPosition.y, 1.0, 1.0);
            vColor = aColor;
        }
    `;

  const fragmentShaderSource = `
        precision mediump float;
        varying vec3 vColor;
        void main() {
            gl_FragColor = vec4(vColor, 1.0);
        }
    `;

  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderSource);
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderSource);

  gl.compileShader(vertexShader);
  gl.compileShader(fragmentShader);

  const shaderProgram = gl.createProgram();

  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);

  gl.linkProgram(shaderProgram);

  gl.useProgram(shaderProgram);

  const aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
  gl.vertexAttribPointer(
    aPosition,
    2,
    gl.FLOAT,
    false,
    5 * Float32Array.BYTES_PER_ELEMENT,
    0
  );
  gl.enableVertexAttribArray(aPosition);
  const aColor = gl.getAttribLocation(shaderProgram, "aColor");
  gl.vertexAttribPointer(
    aColor,
    3,
    gl.FLOAT,
    false,
    5 * Float32Array.BYTES_PER_ELEMENT,
    2 * Float32Array.BYTES_PER_ELEMENT
  );
  gl.enableVertexAttribArray(aColor);

  let speed = 0.0195;
  let change = 0;
  const uChange = gl.getUniformLocation(shaderProgram, "uChange");

  function moveVertices() {
    if (vertices[31] < -1.0 || vertices[31] > 1.0) {
      speed = speed * -1;
    }

    for (let i = 31; i < vertices.length; i += 5) {
      vertices[i] = vertices[i] + speed;
    }
  }

  function render() {
    moveVertices();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    change = change + speed;
    gl.uniform1f(uChange, change);

    gl.clearColor(152, 251, 0.3, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    var primitive = gl.TRIANGLES;
    var offset = 0;
    var nVertex = 12;
    gl.drawArrays(primitive, offset, nVertex);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

main();
