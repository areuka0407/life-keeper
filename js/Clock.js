class Clock {
    constructor(worktime){
        this.worktime = worktime * 1000;
        this.startPoint = new Date();
        this.activePoint = new Date();
        this.current_time = 0;

        this.$app = document.querySelector("#app");

        this.$clock = document.querySelector("#clock");
        this.$hour = this.$clock.querySelectorAll(".hour span");
        this.$minute = this.$clock.querySelectorAll(".minute span");
        this.$second = this.$clock.querySelectorAll(".second span");

        this.$processor = document.querySelector("#processor");
        this.$p_line = document.querySelector("#processor .line");
        this.$p_point = document.querySelector("#processor .point");

        this.messages = [
            "설정 시각이 지났습니다. \n잠시 컴퓨터 하는 것을 멈추고, 스트레칭을 하는 것은 어떨까요?",
            "설정 시각이 지났어요~\n조금 정도 스트레칭을 해도 괜찮지 않을까요?"
        ];

        this.frame();
    }

    frame(){
        let leave = this.activePoint.getTime() - this.startPoint.getTime();
        this.current_time = this.worktime - leave;

        // 제한 시간이 끝났을 때
        if(this.current_time  <= 0 ){
            this.$app.classList.add("rest");
            this.$hour[0].innerText = this.$hour[1].innerText = "0";
            this.$minute[0].innerText = this.$minute[1].innerText = "0";
            this.$second[0].innerText = this.$second[1].innerText = "0";

            toast(this.messages[Math.floor(Math.random() * this.messages.length)], () => {
                this.worktime = 600 * 1000;
                this.startPoint = new Date();
                this.activePoint = new Date();
                log(this.startPoint, this.activePoint);
                this.frame();
            });
        }
        // 제한 시간이 남아있을 떄
        else {
            this.activePoint = new Date();
            this.timeUpdate();
            this.updateProcess();

            requestAnimationFrame(() => {
                this.frame();
            });
        }
    }

    timeUpdate(){
        let time = Math.ceil(this.current_time / 1000);
        let hour = Math.floor(time / 3600).toString();
        let minute = Math.floor((time % 3600) / 60).toString();
        let second = (time % 60).toString();

        while(hour.length < 2) hour = "0" + hour;
        while(minute.length < 2) minute = "0" + minute;
        while(second.length < 2) second = "0" + second;

        this.$hour[0].innerText = hour[0];
        this.$hour[1].innerText = hour[1];

        this.$minute[0].innerText = minute[0];
        this.$minute[1].innerText = minute[1];

        this.$second[0].innerText = second[0];
        this.$second[1].innerText = second[1];
    }


    updateProcess(){
        let percent = 100 - this.current_time * 100 / this.worktime;

        this.$p_line.style.width = percent + "%";
        this.$p_point.style.left = percent + "%";
    }
}