for (var i = 0; i < 5; i++) {
    (function(shikaka) {
        setTimeout(() => {
            console.log(shikaka);
        }, 2000);
    })(i);
}
