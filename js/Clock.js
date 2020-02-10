class Clock {
    constructor(init_time){
        this.init_time = init_time * 1000;
        this.startPoint = new Date();
        this.activePoint = new Date();
        this.current_time = 0;

        this.$hour = document.querySelectorAll("#clock .hour span");
        this.$minute = document.querySelectorAll("#clock .minute span");
        this.$second = document.querySelectorAll("#clock .second span");

        this.$processor = document.querySelector("#processor");
        this.$p_line = document.querySelector("#processor .line");
        this.$p_point = document.querySelector("#processor .point");

        this.frame();
    }

    frame(){
        let leave = this.activePoint.getTime() - this.startPoint.getTime();
        this.current_time = this.init_time - leave;

        // 제한 시간이 끝났을 때
        if(this.current_time  <= 0 ){
            toast("10초가 지났습니다.\n신속하게 운동을 해 주시기 바랍니다.");
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
        let time = Math.floor(this.current_time / 1000);
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
        let percent = 100 - this.current_time * 100 / this.init_time;

        this.$p_line.style.width = percent + "%";
        this.$p_point.style.left = percent + "%";
    }
}