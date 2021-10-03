export function createShader(gl) {
  const vertextShaderCode = `
        attribute vec2 a_position;
        attribute vec3 a_color;
        varying vec3 v_color;
        uniform float uChange;
        void main() {
            gl_Position = vec4(a_position + uChange, 0.0, 1.0);
            v_color = a_color;
        }
  `;

  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertextShaderCode);
  gl.compileShader(vertexShader);

  const fragmentShaderCode = `
  precision mediump float;
        varying vec3 v_color;
        void main() {
            gl_FragColor = vec4(v_color, 1.0);
        }
  `;

  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderCode);
  gl.compileShader(fragmentShader);

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  return shaderProgram;
}
