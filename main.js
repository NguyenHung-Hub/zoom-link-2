const subjects = [
    {
        id: 1,
        name: "PLDC",
        day: "Monday",
        time: "Tiết 7-9",
        link: "https://zoom.us/j/91367799722?pwd=TWE3Tmhvem16QjhSRG1PcDU2N0RBQT09",
        user: "Hung"
    },
    {
        id: 2,
        name: "WWW",
        day: "Monday",
        time: "Tiết 13-15",
        link: "https://zoom.us/j/2828559985?pwd=dDJrN2dlUzNCQUpKaDhIMHBxczdJUT09",
        user: "Hung"
    },

    {
        id: 3,
        name: "LTDD",
        day: "Tuesday",
        time: "Tiết 7-9",
        link: "https://zoom.us/j/97314779930?pwd=YW1oTXg1OG9Qb05aNW5xQW1RdDJnZz09",
        user: "Hung"
    },
    {
        id: 4,
        name: "Testing",
        day: "Thursday",
        time: "Tiết 4-6",
        link: "https://zoom.us/j/91682455812?pwd=ZXlGYXMxRVZuU2VSc0VOR0FmZlQ0dz09",
        user: "Hung"
    },
    {
        id: 5,
        name: "WWW-TH",
        day: "Friday",
        time: "Tiết 13-15",
        link: "https://zoom.us/j/96361366217?pwd=VUZxdVBCMmh5N1ptYkdPSkdHV290UT09",
        user: "Hung"
    },
    {
        id: 6,
        name: "TT-HCM",
        day: "Sunday",
        time: "Tiết 7-8",
        link: "https://zoom.us/j/91465492372?pwd=ZmVXUWZzUFdvNWdiZThnaGhwV3h4dz09",
        user: "Hung"
    },
    {
        id: 7,
        name: "Phát triển ứng dụng cn web",
        day: "Monday",
        time: "Tiết 1-3",
        link: "https://zoom.us/j/99150297936?pwd=VllNTkR2dXlHQVFLY3RQOXlhK2JkUT09",
        user: "Uyen"
    },
    {
        id: 8,
        name: "Hệ quản trị csdl",
        day: "Monday",
        time: "Tiết 7-9",
        link: "https://zoom.us/j/95417118871?pwd=b2xEeWNGN2dWUlpVb1VBQjVPUGpKQT09",
        user: "Uyen"
    },

    {
        id: 9,
        name: "Lập trình web",
        day: "Tuesday",
        time: "Tiết 10-12",
        link: "https://zoom.us/j/5271561289?pwd=aXJ1eVg5d3ZncVVwNmV3SmpnbjhqZz09",
        user: "Uyen"
    },
    {
        id: 10,
        name: "Marketing số",
        day: "Wednesday",
        time: "Tiết 10-12",
        link: "https://zoom.us/j/99066565864?pwd=OTNONndmNE4zTkh5UEhDRVpJUWlmQT09",
        user: "Uyen"
    },
    {
        id: 11,
        name: "TH HQTCSDL",
        day: "Thursday",
        time: "Tiết 7-9",
        link: "https://zoom.us/j/95041958680?pwd=ZkVDcUp0aWVRdXZpTEVZdGJWaUVOQT09",
        user: "Uyen"
    }

];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const main = document.querySelector('.main');
const scheduleTop = document.querySelector('.schedule-top');
const scheduleBottom = document.querySelector('.schedule-bottom');
const users = [...new Set(subjects.map(item => item.user))].reverse();//lấy ra các user khác nhau trong object
let maxRows = [];

function countSubjectOfDay(arr, day, user) {
    return arr.filter(item => item.day == day && item.user == user).length
}

//main
//    box user
//        row
//            col
//thêm key user và value
users.forEach(user => {
    maxRows.push({ user: user });
});

users.forEach(user => {
    days.forEach(i => {
        maxRows.map(element => {
            const temp = countSubjectOfDay(subjects, i, user);
            if (element.max) {
                return element["max"] = temp > element.max ? temp : element.max;
            }
            return element["max"] = temp;
        });
    });
});

function createBoxUser(user) {
    let box = document.createElement('div');
    box.classList.add(`schedule-box`);
    box.classList.add(`schedule-${user}`);
    return box;
}

function createRows(maxRow, user) {
    for (let index = 1; index <= maxRow; index++) {
        let row = document.createElement('div');
        row.classList.add('row');
        row.classList.add(`row-${index}`);
        document.querySelector(`.schedule-${user}`).appendChild(row);
    }
}

function createColumn(maxRow, user) {
    days.forEach(i => {
        const subjectOfDay = subjects.filter(sub => sub.day === i && sub.user === user);

        for (let index = 0; index < maxRow; index++) {
            const col = document.createElement('div');
            col.classList.add('col');
            col.classList.add('col-7');

            let box;
            if (subjectOfDay[index] == null) {
                box = `<div class="box-empty center-text"></div>`;
            } else {
                box = `
                <div class="box">
                    <div class="schedule-time">
                        <i class="fa-solid fa-calendar-days"></i> 
                        ${subjectOfDay[index].time}
                    </div>
                    <div class="subject-title">${subjectOfDay[index].name}</div>
                    <a
                        class="link-zoom"
                        href="${subjectOfDay[index].link}"
                        target="_blank"
                        >Mở zoom</a
                    >
                </div>`;
            }
            col.innerHTML = box;

            let boxUser = document.querySelector(`.schedule-${user}`);
            boxUser.querySelector(`.row-${index + 1}`).appendChild(col);
        }
    });
}

maxRows.forEach(element => {
    let box = createBoxUser(element.user);
    main.append(box);
    //
    createRows(element.max, element.user);
    createColumn(element.max, element.user);
});

//sort theo tứ tự tiết học trong 1 ngày


