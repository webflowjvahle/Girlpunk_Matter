document.addEventListener("DOMContentLoaded", () => {
  const canvasMatter = document.querySelector(".c-matter-js-canvas");
  const canvasParent = document.querySelector("#matter-parent");

  // console.log(canvasMatter);
  // console.log(canvasParent);

  let elementWidth = canvasParent.clientWidth;
  let elementHeight = canvasParent.clientHeight;

  // Import Matter.js modules
  const { Engine, Render, Runner, Bodies, Body, Vector, Composite, Mouse, MouseConstraint } = Matter;

  // create an engine
  let engine = Engine.create();

  let render = Render.create({
    canvas: canvasMatter,
    engine: engine,
    options: {
      background: "transparent",
      wireframes: false,
      width: elementWidth,
      height: elementHeight,
    },
  });




const boxA = Bodies.rectangle(elementWidth * 0.2, 0, 151, 255, {
    render: {
    			friction: 0.3,
          frictionAir: 0.00001,
          restitution: 0.8,
           fillStyle: '#FF0000', // red color
        sprite: {
            texture: 'https://uploads-ssl.webflow.com/62b024630eca257981464bd8/64f2e8e37b83c6e1ba027d3e_L.svg',
            xScale: 1,
            yScale: 1
        }
    }
});
const boxB = Bodies.rectangle(elementWidth * 0.33, 50, 181, 197, {
    render: {
          friction: 0.3,
          frictionAir: 0.00001,
          restitution: 0.8,
        sprite: {
            texture: 'https://uploads-ssl.webflow.com/62b024630eca257981464bd8/64f2e8e37b67749d7913436d_e.svg',
            xScale: 1,
            yScale: 1
        }
    }
});
const boxC = Bodies.rectangle(elementWidth * 0.36, 50, 173, 258, {
    render: {
          friction: 0.3,
          frictionAir: 0.00001,
          restitution: 1,
        sprite: {
            texture: 'https://uploads-ssl.webflow.com/62b024630eca257981464bd8/64f2e8e3ccd100a57d514c02_g.svg',
            xScale: 1,
            yScale: 1
        }
    }
});
const boxD = Bodies.rectangle(elementWidth * 0.43, 20, 165, 198, {
    render: {
          friction: 0.3,
          frictionAir: 0.00001,
          restitution: 1.5,
        sprite: {
            texture: 'https://uploads-ssl.webflow.com/62b024630eca257981464bd8/64f2e8e359342fcfba02ec7c_a.svg',
            xScale: 1,
            yScale: 1
        }
    }
});
const boxE = Bodies.rectangle(elementWidth * 0.46, 0, 33, 255, {
    render: {
          friction: 0.3,
          frictionAir: 0.00001,
          restitution: 1,
        sprite: {
            texture: 'https://uploads-ssl.webflow.com/62b024630eca257981464bd8/64f2e94cccd100a57d51a9c7_l.svg',
            xScale: 1,
            yScale: 1
        }
    }
});

  const groundThickness = 60;
  const ground = Bodies.rectangle(elementWidth / 2, elementHeight + (groundThickness / 2), 20000, groundThickness, {
    isStatic: true,
    render: {
      fillStyle: 'red'
    }
  });

  let wallTop = Bodies.rectangle(elementWidth / 2, 0 - (groundThickness / 2), 20000, groundThickness, {
    isStatic: true,
    render: {
      fillStyle: "red",
    },
  });
  
  let wallLeft = Bodies.rectangle(0 - (groundThickness / 2), elementHeight / 2, groundThickness, elementHeight, {
    isStatic: true,
    render: {
      fillStyle: 'red',
    },
  });
  
  let wallRight = Bodies.rectangle(elementWidth + (groundThickness / 2), elementHeight / 2, groundThickness, elementHeight, {
    isStatic: true,
    render: {
      fillStyle: 'red',
    },
  });

  Composite.add(engine.world, [boxA, boxB, boxC, boxD, boxE, ground, wallTop, wallLeft, wallRight]);

const mouse = Mouse.create(render.canvas);
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false,
      },
    },
  });

  Composite.add(engine.world, mouseConstraint);
  render.mouse = mouse;
  // allow scroll through the canvas
	mouseConstraint.mouse.element.removeEventListener(
  "mousewheel",
  mouseConstraint.mouse.mousewheel
);
	mouseConstraint.mouse.element.removeEventListener(
  "DOMMouseScroll",
  mouseConstraint.mouse.mousewheel
);

// run the renderer
Render.run(render);

// create runner
const runner = Runner.create();

// run the engine
Runner.run(runner, engine);

function scaleForBreakpoints() {
    const currentWidth = canvasMatter.clientWidth;
    let scaleFactor = 1; // default scale

    if (currentWidth <= 991 && currentWidth > 767) {
        scaleFactor = 0.3;
    } else if (currentWidth <= 767 && currentWidth > 320) {
        scaleFactor = 0.3;
    } else if (currentWidth <= 320) {
        scaleFactor = 0.3;
    }

    Body.scale(boxA, scaleFactor, scaleFactor);
    boxA.render.sprite.xScale = boxA.render.sprite.xScale * scaleFactor;
    boxA.render.sprite.yScale = boxA.render.sprite.yScale * scaleFactor;

    Body.scale(boxB, scaleFactor, scaleFactor);
    boxB.render.sprite.xScale = boxB.render.sprite.xScale * scaleFactor;
    boxB.render.sprite.yScale = boxB.render.sprite.yScale * scaleFactor;
    
    Body.scale(boxC, scaleFactor, scaleFactor);
    boxC.render.sprite.xScale = boxC.render.sprite.xScale * scaleFactor;
    boxC.render.sprite.yScale = boxC.render.sprite.yScale * scaleFactor;
    
    Body.scale(boxD, scaleFactor, scaleFactor);
    boxD.render.sprite.xScale = boxD.render.sprite.xScale * scaleFactor;
    boxD.render.sprite.yScale = boxD.render.sprite.yScale * scaleFactor;
		
    Body.scale(boxE, scaleFactor, scaleFactor);
    boxE.render.sprite.xScale = boxE.render.sprite.xScale * scaleFactor;
    boxE.render.sprite.yScale = boxE.render.sprite.yScale * scaleFactor;
}

function handleResize() {
    const previousWidth = elementWidth;  // Store the previous width for scale calculation
    elementWidth = canvasMatter.clientWidth;
    elementHeight = canvasMatter.clientHeight;
    
    // Update render settings
    render.canvas.width = elementWidth;
    render.canvas.height = elementHeight;
    render.bounds.max.x = canvasMatter.clientWidth;
    render.bounds.max.y = canvasMatter.clientHeight;
    render.options.width = canvasMatter.clientWidth;
    render.options.height = canvasMatter.clientHeight;

    // Calculate a uniform scaling factor based on width
let scaleFactor = elementWidth / previousWidth;

// Apply the scaling factor uniformly for both dimensions
Body.scale(boxA, scaleFactor, scaleFactor);
boxA.render.sprite.xScale = boxA.render.sprite.xScale * scaleFactor;
boxA.render.sprite.yScale = boxA.render.sprite.yScale * scaleFactor;

Body.scale(boxB, scaleFactor, scaleFactor);
boxB.render.sprite.xScale = boxB.render.sprite.xScale * scaleFactor;
boxB.render.sprite.yScale = boxB.render.sprite.yScale * scaleFactor;

Body.scale(boxC, scaleFactor, scaleFactor);
boxC.render.sprite.xScale = boxC.render.sprite.xScale * scaleFactor;
boxC.render.sprite.yScale = boxC.render.sprite.yScale * scaleFactor;

Body.scale(boxD, scaleFactor, scaleFactor);
boxD.render.sprite.xScale = boxD.render.sprite.xScale * scaleFactor;
boxD.render.sprite.yScale = boxD.render.sprite.yScale * scaleFactor;

Body.scale(boxE, scaleFactor, scaleFactor);
boxE.render.sprite.xScale = boxE.render.sprite.xScale * scaleFactor;
boxE.render.sprite.yScale = boxE.render.sprite.yScale * scaleFactor;

    // Reposition the walls
    Body.setPosition(ground, Vector.create(elementWidth / 2, elementHeight + (groundThickness / 2)));
    Body.setPosition(wallRight, Vector.create(elementWidth + (groundThickness / 2), elementHeight / 2));

// Update the engine and renderer after all changes
Engine.update(engine);
Render.world(render);
//console.log('Canvas resized to:', canvasMatter.width, 'x', canvasMatter.height);
}

    if (elementWidth <= 767) {
        // Change the properties for mobile
        Body.setPosition(boxA, { x: elementWidth * 0.23, y: 0 });
        Body.setPosition(boxB, { x: elementWidth * 0.3, y: 0 });
        Body.setPosition(boxC, { x: elementWidth * 0.33, y: 0 });
        Body.setPosition(boxD, { x: elementWidth * 0.4, y: 0 });
        Body.setPosition(boxE, { x: elementWidth * 0.43, y: 0 });
    }

window.addEventListener("resize", handleResize);
handleResize();
scaleForBreakpoints();
});