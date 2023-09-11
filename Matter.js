ocument.addEventListener("DOMContentLoaded", () => {
    const canvasMatter = document.querySelector(".c-matter-js-canvas");
    console.log(canvasMatter);
    
        // Assuming you want the canvas' width and height.
        let elementWidth = canvasMatter.clientWidth;
        let elementHeight = canvasMatter.clientHeight;
    
        // module aliases
        let Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Bodies = Matter.Bodies,
            Body = Matter.Body,
            Vector = Matter.Vector,
            Composite = Matter.Composite,
            Mouse = Matter.Mouse,
            MouseConstraint = Matter.MouseConstraint;
    
        // create an engine
        let engine = Engine.create();
    
        // create a renderer
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
    
          const createObjectL = () => {
            // Calculate the scale factor based on the element width and height
            const scale = Math.min(elementWidth / 20, elementHeight / 20);
    
            // Generate a random x position between 0 and 800, rounded down to the nearest whole number
            let x = Math.floor(Math.random() * elementWidth);
            let legalL = Bodies.rectangle(x, 0, scale, {
              render: {
                sprite: {
                  texture:
                    "https://uploads-ssl.webflow.com/62b024630eca257981464bd8/64f2e8e37b83c6e1ba027d3e_L.svg",
                },
              },
            });
    
            if (elementWidth <= 767) {
              legalL.render.sprite.xScale = 0.6; // Double the width of the texture
              legalL.render.sprite.yScale = 0.6; // Double the height of the texture
            }
            Composite.add(engine.world, legalL);
          };
    
    const groundThickness = 60;
    const ground = Bodies.rectangle(
        elementWidth / 2,
        elementHeight + (groundThickness / 2),
        20000,
        groundThickness, 
        { 
           isStatic: true,
            render: {
                fillStyle: 'red'
            }
        }
    );
    let wallTop = Bodies.rectangle(
    elementWidth / 2,
    0 - (groundThickness / 2),
    20000,
    groundThickness,
    {
            isStatic: true,
            render: {
              fillStyle: "red",
            },
          });
    let wallLeft = Bodies.rectangle(
    0 - (groundThickness / 2),
    elementHeight / 2,
    groundThickness,
    elementHeight,
    {
            isStatic: true,
            render: {
              fillStyle: 'red',
            },
          });
    let wallRight = Bodies.rectangle(
    elementWidth + (groundThickness / 2),
    elementHeight / 2,
    groundThickness, 
    elementHeight,
    {
            isStatic: true,
            render: {
              fillStyle: 'red',
            },
          });
        // add all of the bodies to the world
        Composite.add(engine.world, [legalL, ground, wallTop, wallLeft, wallRight]);
    
    
        // run the renderer
        Render.run(render);
    
        // create runner
        const runner = Runner.create();
        
        // run the engine
        Runner.run(runner, engine);
    
        // add mouse control (if you want user interaction)
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
    
        // keep the mouse in sync with rendering
        render.mouse = mouse;
        
    function handleResize(canvasMatter) {
      // set canvas size to new values
      render.canvas.width = canvasMatter.clientWidth;
      render.canvas.height = canvasMatter.clientHeight;
      console.log('Canvas resized to:', canvasMatter.clientWidth, 'x', canvasMatter.clientHeight);
        
      // reposition ground
      Body.setPosition(
      ground,
        Vector.create(
          canvasMatter.clientWidth / 2,
          canvasMatter.clientHeight + (groundThickness / 2)
        )
      );
      // reposition right wall
      Body.setPosition(
        wallRight,
        Vector.create(
          canvasMatter.clientWidth + (groundThickness / 2),
          canvasMatter.clientHeight / 2
        )
      );
    }
    window.addEventListener("resize", () => handleResize(canvasMatter));
    });