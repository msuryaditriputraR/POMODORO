let isStart = false;

function start() {
    const workTimeElement = document.getElementById("working-time");
    const breakTimeElement = document.getElementById("break-time");
    const status = document.getElementById("status");

    workTimeElement.setAttribute("contenteditable", "false");
    breakTimeElement.setAttribute("contenteditable", "false");

    const workTimeDefault = workTimeElement.textContent;
    const breakTimeDefault = breakTimeElement.textContent;

    let isWorking = true;

    const workTime = workTimeDefault.split(":").map((e) => Number(e));
    const breakTime = breakTimeDefault.split(":").map((e) => Number(e));

    let [minWork, secWork] = workTime;
    let [minBreak, secBreak] = breakTime;

    window.interval = setInterval(() => {
        if (isWorking) {
            status.textContent = "WORKING";

            if (secWork === 0) {
                minWork--;
                secWork = 60;
            }

            secWork--;
            workTimeElement.textContent = `${
                minWork < 10 ? "0" + minWork : minWork
            } : ${secWork < 10 ? "0" + secWork : secWork}`;

            if (minWork === 0 && secWork === 0) {
                isWorking = false;
                workTimeElement.textContent = workTimeDefault;
                minWork = workTime[0];
                secWork = workTime[1];

                showNotification("Break Time");
            }
        } else {
            status.textContent = "BREAKING";

            if (secBreak === 0) {
                minBreak--;
                secBreak = 60;
            }

            secBreak--;
            breakTimeElement.textContent = `${
                minBreak < 10 ? "0" + minBreak : minBreak
            } : ${secBreak < 10 ? "0" + secBreak : secBreak}`;

            if (minBreak === 0 && secBreak === 0) {
                isWorking = true;
                breakTimeElement.textContent = breakTimeDefault;
                minBreak = breakTime[0];
                secBreak = breakTime[1];

                showNotification("Work Time");
            }
        }
    }, 1000);
}

function stop() {
    const workTimeElement = document.getElementById("working-time");
    const breakTimeElement = document.getElementById("break-time");

    workTimeElement.setAttribute("contenteditable", "true");
    breakTimeElement.setAttribute("contenteditable", "true");

    clearInterval(window.interval);

    workTimeElement.textContent = "25:00";
    breakTimeElement.textContent = "05:00";
}

document.getElementById("btn-start").addEventListener("click", function () {
    isStart = !isStart;

    if (isStart) {
        this.textContent = "STOP";
        start();
    } else {
        this.textContent = "START";
        stop();
    }
});

const showNotification = (msg) => {
    Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
            new Notification(msg);
        }
    });
};
