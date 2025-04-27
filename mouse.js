const mouse = document.getElementById('mouse')

const animatableSquare = createAnimatable('#mouse', {
  x: 250, // Define the x duration to be 500ms
  y: 250, // Define the y duration to be 500ms
  ease: 'out(3)',
});


const onMouseMove = e => {
  let bounds = mouse.getBoundingClientRect();
  const x = e.clientX + bounds.width/1.1
  const y = e.clientY + bounds.height/1.1
  animatableSquare.x(x); // Animate the x value in 500ms
  animatableSquare.y(y); // Animate the y value in 500ms
}

window.addEventListener('mousemove', onMouseMove);