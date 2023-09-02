function startMatter() {
    const canvas = document.querySelector(".c-matter-js-canvas");

    // module aliases
    const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint } = Matter;

    let elementWidth;
    let elementHeight;

    let engine;
    let render;

    function updateElementSize() {
        const element = document.querySelector(".c-matterjs");
        elementWidth = element.offsetWidth;
        elementHeight = element.offsetHeight;

        // create an engine
        engine = Engine.create();

        // create a renderer
        render = Render.create({
            canvas: canvas,
            engine: engine,
            options: {
                background: "transparent",
                wireframes: false,
                width: elementWidth,
                height: elementHeight,
            },
        });

        // Emoticon URLs
        const emoticonURLs = [
            "https://uploads-ssl.webflow.com/62b024630eca257981464bd8/64f2e8e37b83c6e1ba027d3e_L.svg",
            "https://uploads-ssl.webflow.com/62b024630eca257981464bd8/64f2e8e37b67749d7913436d_e.svg",
            "https://uploads-ssl.webflow.com/62b024630eca257981464bd8/64f2e8e3ccd100a57d514c02_g.svg",
            "https://uploads-ssl.webflow.com/62b024630eca257981464bd8/64f2e8e359342fcfba02ec7c_a.svg",
            "https://uploads-ssl.webflow.com/62b024630eca257981464bd8/64f2e94cccd100a57d51a9c7_l.svg",
        ];

        for (let url of emoticonURLs) {
            createObject(url);
        }

        createWalls();

        // run the renderer
        Render.run(render);

        // create runner
        const runner = Runner.create();

        // run the engine
        Runner.run(runner, engine);

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
    }

    function createObject(url) {
        const scale = Math.min(elementWidth / 20, elementHeight / 20);
        let x = Math.floor(Math.random() * elementWidth);
        let emoticon = Bodies.circle(x, 0, scale, {
            render: {
                sprite: {
                    texture: url,
                },
            },
        });

        if (elementWidth <= 767) {
            emoticon.render.sprite.xScale = 0.6;
            emoticon.render.sprite.yScale = 0.6;
        }

        Composite.add(engine.world, emoticon);
    }

    function createWalls() {
        // Walls code goes here...
        // (assuming it remains unchanged)
    }

    updateElementSize(); 
    window.addEventListener("resize", updateElementSize); 
}
document.addEventListener('DOMContentLoaded', function() {
    startMatter();
});
