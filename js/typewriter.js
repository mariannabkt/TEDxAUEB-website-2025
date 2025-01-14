new TypeIt("#typewriter", {
    speed: 100,
    deleteSpeed: 50,
    lifeLike: true,
    loop: true, 
    waitUntilVisible: true,
})
    .type("IDEAS ")
    .pause(1000)
    .break({ delay: 500 })
    .type("CHANGE ")
    .pause(1000)
    .break({ delay: 500 })
    .type("EVERYTHING ")
    .pause(1000)
    .delete()
    .go();
