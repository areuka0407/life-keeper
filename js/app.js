window.addEventListener("load", () => {
    const work_time = 5;
    const rest_time = 5;

    window.log = console.log;

    window.toast = function(message, callback = null){
        const moveEnd = 30;

        let overlapRemove = new Promise(res => {
            // 기존 노드 삭제
            let exist = document.querySelectorAll(".toast-message");
            if(exist.length > 0){
                exist.forEach(elem => {
                    elem.close();
                });
                res();
            }
            else res();
        });

        overlapRemove.then(() => {
            // 메세지 노드 생성
            let box = document.createElement("div")
            box.classList.add("toast-message");
            box.innerHTML = `<div>${message}</div>`;

            let st = box.firstChild.style;
            st.opacity = "0";
            st.transform = "translateX(-50%) translateY(0)";
            st.transition = "0.5s";
            document.body.append(box);

            box.close = function(){
                let bst = box.style;
                bst.transition = "0.5s";
                bst.opacity = "0";
                st.transform = "translateX(-50%) translateY(0)";
                box.animeQueue && clearTimeout(box.animeQueue);
                box.animeQueue = setTimeout(() => {
                    box.remove();
                    callback && callback();
                }, 500);
            }

            box.animeQueue = this.setTimeout(() => {
                st.opacity = "1";
                st.transform = `translateX(-50%) translateY(${moveEnd}px)`;
            }, 100);

            box.addEventListener("click", e => {
                box.close();
            });
        });
    };

    let clock = new Clock(work_time, rest_time);
});