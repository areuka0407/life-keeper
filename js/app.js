window.addEventListener("load", () => {
    const init_time = 3600;

    window.toast = function(message){

        let overlapRemove = new Promise(res => {
            // 기존 노드 삭제
            let exist = document.querySelectorAll(".toast-message");
            exist.forEach(elem => {
                elem.style.transition = "0.5s";
                elem.style.opacity = "0";
                elem.style.bottom = "50px";
                exist.animeQueue && clearTimeout(exist.animeQueue);
                exist.animeQueue = this.setTimeout(() => {
                    elem.remove();
                    res();
                }, 500);
            });
        });

        overlapRemove.then(() => {
            // 메세지 노드 생성
            let box = document.createElement("div")
            box.classList.add("toast-message");
            box.innerText = message;
            box.style.opacity = "0";
            box.style.bottom = "50px";
            box.style.transition = "0.5s";
            document.body.append(box);

            box.animeQueue = this.setTimeout(() => {
                box.style.opacity = "1";
                box.style.bottom = "80px";
            }, 100);
        });
    };

    let clock = new Clock(init_time);
});