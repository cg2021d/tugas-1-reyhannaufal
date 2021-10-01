import { leftVertices } from "../constant/vertices";
export default function leaftLeaf(gl) {
  const vertices = [
    -0.5, 0.5, 1.0, 0.0, 0.0, 0.5, 0.5, 0.0, 1.0, 0.0, 0.5, -0.5, 1.0, 0.0, 0.0,
    -0.5, -0.5, 0.0, 0.0, 1.0,
  ];

  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(leftVertices),
    gl.STATIC_DRAW
  );

  const vertexShaderSource = `
        attribute vec2 a_position;
        attribute vec3 a_color;
        varying vec3 v_color;
        uniform float uChange;
        void main() {
            gl_Position = vec4(a_position + uChange, 0.0, 1.0);
            v_color = a_color;
        }
    `;
  const fragmentShaderSource = `
        precision mediump float;
        varying vec3 v_color;
        void main() {
            gl_FragColor = vec4(v_color, 1.0);
        }
    `;

  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderSource);
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderSource);
  gl.compileShader(vertexShader);
  gl.compileShader(fragmentShader);
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.log(gl.getShaderInfoLog(vertexShader));
    return;
  }

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);
  gl.useProgram(shaderProgram);

  const a_position = gl.getAttribLocation(shaderProgram, "a_position");
  gl.vertexAttribPointer(
    a_position,
    2,
    gl.FLOAT,
    false,
    5 * Float32Array.BYTES_PER_ELEMENT,
    0
  );
  gl.enableVertexAttribArray(a_position);

  const a_color = gl.getAttribLocation(shaderProgram, "a_color");
  gl.vertexAttribPointer(
    a_color,
    3,
    gl.FLOAT,
    false,
    5 * Float32Array.BYTES_PER_ELEMENT,
    2 * Float32Array.BYTES_PER_ELEMENT
  );
  gl.enableVertexAttribArray(a_color);

  const speedRaw = 4;
  let speed = speedRaw / 600;
  let change = 0;
  const uChange = gl.getUniformLocation(shaderProgram, "uChange");
  gl.uniform1f(uChange, 0);

  gl.drawArrays(gl.LINE_LOOP, 0, 2);
}
