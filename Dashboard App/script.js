const htmlElements = {
    //SideBar
    sidebarTitle: $('.sidebar-list li'),
    sideBar: $('#sidebar'),
    toggleBtn: $('.toggle-btn'),
    logout: $('#sidebar button'),
    helloUserName: $('#sidebar h2'),
    //Login
    loginScreen: $('#login'),
    loginScreenBtn: $('.login-btn'),
    loginScreenUserName: $('#login .loginemail'),
    loginScreenPassword: $('#login .loginpassword'),
    loginScreenShowPassword: $(".checkbox-password"),
    loginLoader: $('.loader'),
    //App
    app: $('.app'),
    appRightScreen: $('.app-right-screen'),
    appTitle: $('.app-right-screen h1'),
    dataOnScreen: $(".data-on-screen"),
    //StudentInfo

    //CourseList
    coursesList: $(".course-btn-box"),
    pageing: $(".course-btn-box label"),
    coursePage: $(".allcurses"),


}


const dateData = {
    mounth: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    daysPerMounth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
}

const serverAPI = {

    getStudent: "https://rt-students.com/api/getStudent/", //[username] & [password]
    getCourses: "https://rt-students.com/api/getCourses/", //[studentID]
    getCalendar: "https://rt-students.com/api/getCalendar/", //[studentID]
    sendData: "https://rt-students.com/api/updateDetails", //[json]

}


const userProfile = {
    studentInfo: undefined,
    coursesList: undefined,
    coursesCalendar: undefined,


}

const coursesStas = {
    highScoreCourse: undefined,
    lowScoreCourse: undefined,
    avg: undefined
}

const courseListPagesConfig = {
    pageNumber: 0,
    coursesPagesHtml: [],
    itemPerPage: 3
}

const date = new Date()

let loginUser

/////////////////////////////////////// API Get/Set/////////////////////////////////////// 
const getDataFromServer = async(api, render, getData) => {

    await $(document).ready(() => {
        $.getJSON(api, (json, res, xhr) => {
            if (res === "success") {

                getData(json)
                render()

            } else {
                alert(res)


            }
        })

    })
}

const setDataOnServer = async(api, json) => {


    try {
        await $.post((api, json), (json, res, xhr) => {

            if (res === "error") {
                alert("Can't Connect to server")


            } else {
                alert('Data wer`e update.')
            }
        })
    } catch (err) {
        alert("error - data dosn't change on the server")
    }



}



/////////////////////////////////////// Student Info/////////////////////////////////////// not good
const initStudentInfo = () => {
    htmlElements.dataOnScreen.html('') //clean data
    htmlElements.loginLoader.show()
    const api = `${serverAPI.getStudent}${loginUser.userName}&${loginUser.password}`

    if (userProfile.studentInfo === undefined) {
        const json = getDataFromServer(api, renderStudentInfo, getStudentIndfo)

    } else {
        renderStudentInfo()
    }
}

$(document).on("click", ".btn-udpdate-data", (event) => {

    const option = event.target.textContent

    if (option === "Change data") {
        chnageStudentDetailes()
    } else if (option === "Update on server") {
        updateDataOnServer()

    }

})


const updateDataOnServer = () => {

    userProfile.studentInfo.firstName = $('.student-info table tr .firstName').val()
    userProfile.studentInfo.familyName = $('.student-info table tr .familyName').val()
    userProfile.studentInfo.email = $('.student-info table tr .email').val()
    userProfile.studentInfo.mobile = $('.student-info table tr .mobile').val()
    userProfile.studentInfo.studentID = $('.student-info table tr .studentID').val()
    userProfile.studentInfo.address = $('.student-info table tr .address').val()
    userProfile.studentInfo.registeryDate = $('.student-info table tr .registeryDate').val()

    const json = JSON.stringify(userProfile.studentInfo)


    setDataOnServer(serverAPI.sendData, json)
    $('.btn-change-data').text("Change data")

    initStudentInfo()

}

const chnageStudentDetailes = () => {
    $('.student-info table tr .firstName').replaceWith(`<input class="input-data-student firstName" value=${userProfile.studentInfo.firstName} type="text">`);
    $('.student-info table tr .familyName').replaceWith(`<input class="input-data-student familyName" value=${userProfile.studentInfo.familyName} type="text">`);
    $('.student-info table tr .email').replaceWith(`<input class="input-data-student email" value=${userProfile.studentInfo.email} type="text">`);
    $('.student-info table tr .mobile').replaceWith(`<input class="input-data-student mobile" value=${userProfile.studentInfo.mobileNumber} type="text">`);
    $('.student-info table tr .studentID').replaceWith(`<input class="input-data-student studentID" value=${userProfile.studentInfo.studentID} type="text">`);
    $('.student-info table tr .address').replaceWith(`<input class="input-data-student address" value=${userProfile.studentInfo.address} type="text">`);
    $('.student-info table tr .registeryDate').replaceWith(`<input class="input-data-student registeryDate" value=${userProfile.studentInfo.registeryDate} type="text">`);

    $('.btn-udpdate-data').text("Update on server")
}


const renderStudentInfo = () => {

    const html =
        `
<div class="student-info">

    <table>
        <tr>
            <td>First Name:</td>
            <td class="firstName">${userProfile.studentInfo.firstName}</td>
        </tr>

        <tr>
            <td>Last Name: </td>
            <td class="familyName">${userProfile.studentInfo.familyName}</td>
        </tr>
        <tr>
            <td>Email:</td>
            <td class="email">${userProfile.studentInfo.email}</td>
        </tr>

        <tr>
            <td>Mobile Number: </td>
            <td class="mobile">${userProfile.studentInfo.mobileNumber}</td>
        </tr>
        <tr>
            <td>Student ID:</td>
            <td class="studentID">${userProfile.studentInfo.studentID}</td>
        </tr>

        <tr>
            <td>Address:</td>
            <td class="address">${userProfile.studentInfo.address}</td>
        </tr>
        <tr>
        <td>Registery Date:</td>
        <td class="registeryDate">${userProfile.studentInfo.registeryDate}</td>
      
        </tr>
      
    </table>
    <button type="submit" class="btn btn-primary btn-lg btn-udpdate-data">Change data</button>
    </div>
   
`


    htmlElements.appTitle.html(`<i class="fas fa-id-card-alt"></i> Personal ID`)
    htmlElements.dataOnScreen.append(html)
    htmlElements.loginLoader.hide()


}

const getStudentIndfo = (json) => {
    userProfile.studentInfo = json[0]
}


/////////////////////////////////////// Courses List ///////////////////////////////////////



$(document).on("click", ".btn-gsc", (event) => {

    const html = `<div class="pop-up-graph">
    <button>X</button>
    <canvas id="graph-grades">
    </canvas>
</div>
</div>`

    htmlElements.dataOnScreen.html(html)
    draw()

});

$(document).on("click", ".pop-up-graph button", (event) => {
    htmlElements.dataOnScreen.html('')
    renderCoursesList()
});


const draw = () => {
    const canvas = document.getElementById("graph-grades") //$(".graph-grades")
    const ctx = canvas.getContext('2d')
    const n = userProfile.coursesList.length


    let X = 20 //first bar
    const Y = 0
    const width = ((canvas.width) / n) / 2 ///bar witdh
    const height = 0

    const h = (canvas.height) / n

    ctx.font = "bold 100% Arial";
    ctx.imageSmoothingQuality = "high"


    for (i = 0; i < 10; i++) {

        ctx.fillText((i + 1) * 10, 0, canvas.height - (h * i) - 10);
    }

    color = ["red", "yellow", "green"]


    for (i = 0; i < n; i++) {

        const name = userProfile.coursesList[i].courseName

        const score = parseInt((userProfile.coursesList[i].projectMark + userProfile.coursesList[i].examMark) / 2)

        if (score < 50) {
            ctx.fillStyle = color[0]

        } else if (score >= 50 && score < 75) {
            ctx.fillStyle = color[1]
        } else if (score >= 75) {
            ctx.fillStyle = color[2]
        }

        ctx.fillRect(X, canvas.height - (score / 10) * h, width, canvas.height);

        ctx.fillStyle = 'black'

        ctx.font = "bold 10px Arial";
        ctx.fillText(score, X, canvas.height - (score / 10) * h - 5, width, h);
        ctx.fillStyle = 'blue'

        ctx.font = "bold 5px Arial";
        for (j = 0; j < name.length; j++) {

            ctx.fillText(name[j], X + 5, (5 * (j + 1)));

        }
        X += width + 10

    }
}


$(document).on("click", ".courses-page-box label", (event) => {

    if (event.target.textContent === 'next') {
        courseListPagesConfig.pageNumber++
            changeCoursesListByPages()

    } else if (event.target.textContent === 'prev') {
        courseListPagesConfig.pageNumber--
            changeCoursesListByPages()
    }
});

$(document).on("click", ".btn-course", (event) => {

    const name = event.target.name
    userProfile.coursesList.forEach(current => {
        if (current.courseName === name) {
            changeCourseDetailesHTML(current)
            return
        }
    })
});


const initCoursesList = () => {
    htmlElements.dataOnScreen.html('') //clean data
    htmlElements.loginLoader.show()
    const api = `${serverAPI.getCourses}${loginUser.password}`

    if (userProfile.coursesList === undefined) {
        const json = getDataFromServer(api, renderCoursesList, getCoursesList)

    } else {
        renderCoursesList()
    }



}
const renderCoursesList = () => {

    const currentPageOfCursesHTML = getCurrentPageOfCursesHTML()
    const courseDetailesHTML = getCourseDetailesHTML()
    const coursesStatsHTML = getCoursesStatsHTML()


    htmlElements.dataOnScreen.append(currentPageOfCursesHTML + courseDetailesHTML + coursesStatsHTML)
    changeBtnView()

    htmlElements.appTitle.html(`<i class="fas fa-clipboard-list"></i> Courses List`)
    htmlElements.loginLoader.hide()
}

const getCoursesList = (json) => {

    userProfile.coursesList = json
    calcAvg()
    calcMinAndMaxScore()
    setCoursesListByPages()

}

const calcAvg = () => {

    let sumOfExamMark = 0;
    let sumOfProjectMark = 0;

    userProfile.coursesList.forEach(current => {
        sumOfExamMark += parseInt(current.examMark);
        sumOfProjectMark += parseInt(current.projectMark);
    });
    const avgOfExamMark = parseFloat(sumOfExamMark / userProfile.coursesList.length);
    const avgOfProjectMark = parseFloat(sumOfProjectMark / userProfile.coursesList.length);
    coursesStas.avg = parseFloat((avgOfProjectMark + avgOfExamMark) / 2)

}

const calcMinAndMaxScore = () => {
    let minScore = parseFloat((userProfile.coursesList + userProfile.coursesList.projectMark) / 2)
    let maxScore = parseFloat((userProfile.coursesList.examMark + userProfile.coursesList.projectMark) / 2)
    let maxCourse = userProfile.coursesList[0];
    let minCourse = userProfile.coursesList[0];

    userProfile.coursesList.forEach(current => {

        if (minScore > parseFloat((current.examMark + current.projectMark) / 2)) {
            minCourse = current;
        }
        if (maxScore < parseFloat((current.xamMark + current.projectMark) / 2)) {
            maxCourse = current;
        }
    })

    coursesStas.highScoreCourse = maxCourse
    coursesStas.lowScoreCourse = minCourse
}

const setCoursesListByPages = () => {

    //change this
    if (userProfile.coursesList !== undefined) {

        let html = ''
        const len = userProfile.coursesList.length;

        for (i = 0; i < len; i++) {
            for (j = 0; j < courseListPagesConfig.itemPerPage && (i + j) < len; j++) {
                courseName = userProfile.coursesList[(i + j)].courseName;
                html += `<ol><button name="${courseName}" class="btn btn-primary btn-lg btn btn-course">${courseName}</button></ol>`
            }
            courseListPagesConfig.coursesPagesHtml.push(html)
            i += courseListPagesConfig.itemPerPage
            html = ''

        }
    }

};

const getCurrentPageOfCursesHTML = () => {

    const html = `<div class="btn-chart-box">
    <button class="btn btn-primary btn-lg btn-gsc ">Show Grades Chart</button>
    </div>
    <div class="courses-page-box">
    <div class="allcourses">
        <h3>All Courses</h3>
        <ul class="course-btn-box">
        ${courseListPagesConfig.coursesPagesHtml[courseListPagesConfig.pageNumber]}
        <label class="prev-page">prev</label>
        <label class="next-page">next</label>
        </ul>
        </div>`

    return html

}

const getCourseDetailesHTML = (course = userProfile.coursesList[0]) => {
    const html = `
    <div class="courses-deatials">
    <h3>Course Deatials</h3>
    <table>
        <tr>
            <td>Course Name :</td>
            <td name="course-name">${course.courseName}</td>
        </tr>

        <tr>
            <td>Exam Mark :</td>
            <td name="exam">${course.examMark}</td>
        </tr>
        <tr>
            <td>Project Mark :</td>
            <td name="project">${course.projectMark}</td>
        </tr>
        <tr>
            <td>Course Code :</td>
            <td name="code">${course.code}</td>
        </tr>

    </table>
</div>`
    return html

}




const getCoursesStatsHTML = () => {
    const html = `<div class="courses-personal-details">
    <h3>Student Courses Stas</h3>
    <table>
            <tr>
                <td>AVG :</td>
                <td name="avg">${coursesStas.avg}</td>
            </tr>

            <tr>
                <td>Highest score :</td>
                <td name="highest-score">${coursesStas.highScoreCourse.courseName}, and the score is: (project: 0, exam: 0)</td>
            </tr>
            <tr>
                <td>Lowest score :</td>
                <td name="lowest-score">${coursesStas.lowScoreCourse.courseName}, and the score is: (project: 0, exam: 0)</td>
            </tr>
    </table>

</div>
</div>

</div>

`


    return html
}


const changeCourseDetailesHTML = (course) => {
    html = `
    <h3>Course Deatials</h3>
    <table>
        <tr>
            <td>Course Name :</td>
            <td name="course-name">${course.courseName}</td>
        </tr>

        <tr>
            <td>Exam Mark :</td>
            <td name="exam">${course.examMark}</td>
        </tr>
        <tr>
            <td>Project Mark :</td>
            <td name="project">${course.projectMark}</td>
        </tr>
        <tr>
            <td>Course Code :</td>
            <td name="code">${course.code}</td>
        </tr>

    </table>
`

    $(".courses-deatials").html(html)
    changeBtnView()


}

const changeCoursesListByPages = () => {
    html = `
    <h3>All Courses</h3>
    <ul class="course-btn-box">
    ${courseListPagesConfig.coursesPagesHtml[courseListPagesConfig.pageNumber]}
    <label class="prev-page">prev</label>
    <label class="next-page">next</label>
    </ul>
`

    $(".allcourses").html(html)
    changeBtnView()


}


const changeBtnView = () => {


    if (courseListPagesConfig.coursesPagesHtml.length === 1) {
        $('.prev-page').hide()
        $('.next-page').hide()


    } else if (courseListPagesConfig.pageNumber + 1 === courseListPagesConfig.coursesPagesHtml.length) {
        $('.prev-page').show()
        $('.next-page').hide()

    } else if (courseListPagesConfig.pageNumber === 0) {
        $('.prev-page').hide()
        $('.next-page').show()

    } else {
        $('.prev-page').show()
        $('.next-page').show()

    }
}





/////////////////////////////////////// Courses Calendar///////////////////////////////////////

$(document).on("click", ".calendar .mounth label", (event) => {

    const optinon = event.target.textContent

    if (optinon === ">>") {
        $(".calendar").html(changeCalendar(1))
    } else if (optinon === '<<') {
        $(".calendar").html(changeCalendar(-1))
    }
    renderCoursesCalendar()
});

$(document).on("click", ".day-in-table", (event) => {

    const day = event.target.textContent
    let updateData

    userProfile.coursesCalendar.forEach(cureent => {

        const classDate = new Date(cureent.sessionDate)

        if (classDate.getMonth() === date.getMonth()) {

            if (classDate.getDate().toString() === day) {
                updateData = cureent

                return
            }
        }
        $(".lesson-info").html(getLessonDetailsHTML(updateData))
    })


})

const changeCalendar = (addMounth) => {

    if (addMounth === -1) {
        if (date.getMonth() === 0) {
            date.setMonth(11), date.setFullYear(parseInt(date.getFullYear()) - 1)
        } else {
            date.setMonth(date.getMonth() - 1)
        }
    } else if (addMounth === 1) {
        if (date.getMonth() === 11) {
            date.setMonth(0), date.setFullYear(parseInt(date.getFullYear()) + 1)

        } else {
            date.setMonth(date.getMonth() + 1)
        }

    }

    //    const html = getCalendarByMounthHTML()
    //  htmlElements.dataOnScreen.html("")
    //htmlElements.dataOnScreen.html(html)


}

const renderCoursesCalendar = () => {

    const Calendarhtml = getCalendarByMounthHTML()


    htmlElements.loginLoader.hide()

    const now = new Date()
    let todayLesseon = undefined
        //if therse a lesson


    htmlElements.dataOnScreen.html(`<div class="calendar">` + Calendarhtml + '</div>')

    userProfile.coursesCalendar.forEach(cureent => {

        const classDate = new Date(cureent.sessionDate)

        if (classDate.getMonth() === date.getMonth()) {
            if (classDate.getDate() === now.getDate()) {

                todayLesseon = cureent

                $(`.day-number-${now.getDate()}`).css("color", "white")
            } else {

                $(`.day-number-${classDate.getDate()}`).css("color", "red")
            }

        }


    })
    htmlElements.appTitle.html(`<i class="far fa-calendar-alt"></i> Courses Calendar`)
    const lessonDetailsHTML = `<div class="lesson-info">` + getLessonDetailsHTML(todayLesseon) + `</div>`

    htmlElements.dataOnScreen.html(htmlElements.dataOnScreen.html() + lessonDetailsHTML)

}

const getLessonDetailsHTML = (todayLesseon) => {

    nowDate = (new Date).getDate().toString() + '/' + (new Date).getMonth().toString() + '/' + (new Date).getFullYear()

    let html
    if (todayLesseon === undefined) {
        html = `
        <h3>No lesson for today.</h3>
        <table>
            <tr>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td></td>
            </tr>
    
            <tr>
                <td></td>
                <td></td>
            </tr>
    
            <tr>
                <td></td>
                <td></td>
            </tr>
    
            <tr>
                <td></td>
                <td></td>
            </tr>
        </table>`
    } else {

        const lessonDate = new Date(todayLesseon.sessionDate).getDate().toString() + '/' + new Date(todayLesseon.sessionDate).getMonth().toString() + '/' + new Date(todayLesseon.sessionDate).getFullYear()
        let h3Text
        let lessonType
        const hour = new Date(todayLesseon.sessionDate).getHours().toString() + " - " + new Date(todayLesseon.sessionEndDate).getHours().toString()


        if (lessonDate === nowDate) {
            h3Text = `Today lesson (${nowDate})`
        } else {
            h3Text = `Lesson for ${lessonDate}`
        }

        switch (todayLesseon.sessionType) {

            case 1:
                {
                    lessonType = "Normal lesson"
                    break;
                }

            case 3:
                {
                    lessonType = "Test"
                    break;
                }

            case 4:
                {
                    lessonType = "Canceld lesson"
                    break;
                }
        }


        html = `
        <h3>${h3Text}</h3>
        <table>
            <tr>
                <td>Teacher : </td>
                <td>${todayLesseon.teacher}</td>
            </tr>
            <tr>
                <td>Lesson location : </td>
                <td>${todayLesseon.locationId} Floor</td>
            </tr>
            <tr>
                <td>Lesson type : </td>
                <td>${lessonType}</td>
            </tr>
            <tr>
                <td>Lesson number : </td>
                <td>${todayLesseon.sessionNum}</td>
            </tr>
    
            <tr>
                <td>Time : </td>
                <td>${hour}</td>
            </tr>
    
            <tr>
                <td>Code : </td>
                <td>${todayLesseon.code}</td>
            </tr>
        </table>`

    }

    return html
}


const initCoursesCalendar = () => {
    htmlElements.dataOnScreen.html('') //clean data
    htmlElements.loginLoader.show()
    const api = `${serverAPI.getCalendar}${loginUser.password}`

    if (userProfile.coursesCalendar === undefined) {
        const json = getDataFromServer(api, renderCoursesCalendar, getCoursesCalendar)

    } else {
        renderCoursesCalendar()
    }



}

const getCoursesCalendar = (json) => {
    userProfile.coursesCalendar = json
}

const getCalendarByMounthHTML = () => {
    const date1 = date
        //date.setMonth(mounth)
        //date.setFullYear(year)
    date1.setDate(1)


    const yearAndMouthhtml = `

    <div class="mounth">


    <label><<</label><span>   ${dateData.mounth[date.getMonth()]}   </span><label>>></label>
        <br>
        <span>${date.getFullYear()}</span>

    </div>`

    let daysNameHTML = `<div class="days">
    <table>
        <tr class="days-of-week">
            <td>Sun</td>
            <td>Mun</td>
            <td>Tue</td>
            <td>Wed</td>
            <td>Thu</td>
            <td>Fri</td>
            <td>Sat</td>
        </tr>`


    let n = dateData.daysPerMounth[date.getMonth()]


    let j = 0

    if (date.getFullYear() % 4 === 0) {
        n++;
    }


    if (date1.getDay() !== 0) {
        daysNameHTML += `<tr class="days">`
        for (j = 0; j < date.getDay(); j++) {
            daysNameHTML += `<td></td>`
        }

    }
    let day = 1
    let add = 0
    let emtptyCellToAdd = 0

    for (i = 1; i <= n; i++) {

        while (j < 7 && i <= n) {
            daysNameHTML += `<td class="day-in-table day-number-${i}">${i}</td>`
            j++
            i++
            emtptyCellToAdd = j

        }
        i--
        j = 0
        daysNameHTML += `</tr>`
        daysNameHTML += `<tr class="days">`

    }


    emtptyCellToAdd = 7 - emtptyCellToAdd

    daysNameHTML += `<tr class="days">`



    daysNameHTML += `<tr class="days">`
    daysNameHTML += `</table> </div>`


    const html = yearAndMouthhtml + daysNameHTML
    return html

}


/////////////////////////////////////// Contact Us///////////////////////////////////////

const renderContactUs = () => {
    htmlElements.dataOnScreen.html('') //clean data


    const html = `<form class="Contact-us" action="mailto:info@rt-ed.co.il‏" method="POST" enctype="text/plain">

    <div class="ContcatUsItem-Body ContcatUsItem-Body-fullname">
        <span class="label-input">Full Name</span>
        <br>
        <input class="input-contactUs" type="text" name=" Name" placeholder="Enter Your Name">

    </div>



    <div class="ContcatUsItem-Body ContcatUsItem-Body-Email">
        <span class="label-input">Email</span>
        <br>
        <input class="input-contactUs" type="email" name="Email " placeholder="Enter Your Name">

    </div>


    <div class="ContcatUsItem-Body ContcatUsItem-Body-Phone">
        <span class="label-input">Phone</span>
        <br>
        <input class="input-contactUs" type="text" name="Phone " placeholder="Enter Your Name">

    </div>


    <div class="ContcatUsItem-Body-Message">
        <span class="label-input">Write You're Email Here:</span>
        <br>
        <textarea class="text-message" name="message " cols="60" rows="10"></textarea>
        <button type="submit" class="btn btn-primary btn-lg btn-submit-form">Send</button>

    </div>



</form>

</div>
</div>`
    htmlElements.appTitle.html('<i class="fas fa-mail-bulk"></i> Contact Us')
    htmlElements.dataOnScreen.html(html)

}










/////////////////////////////////////// Sidebar navigate///////////////////////////////////////
const navigateApp = (title) => {

    switch (title) {

        case ' Personal ID':
            {
                initStudentInfo()
                break;
            }
        case ' Courses List':
            {
                initCoursesList()
                break;
            }
        case ' Courses Calendar':
            {

                initCoursesCalendar()
                break;
            }
        case ' Contact Page':
            {
                renderContactUs()
                break;
            }
        default:
            {
                break;
            }


    }
}

//click on sidebar title
$(document).ready(() => {
    htmlElements.sidebarTitle.click((event) => {
        const navItem = event.target.textContent;
        navigateApp(navItem)

    })
})


/////////////////////////////////////// Login///////////////////////////////////////
const persistData = () => {

    const json = JSON.stringify(loginUser)
    localStorage.setItem('loginUser', json);

}

const readStorage = () => {

    const storage = JSON.parse(localStorage.getItem('loginUser'));

    if (storage) {
        loginUser = storage;
        login()

    }
}

const login = async() => {

    await $(document).ready(() => {


            htmlElements.loginScreen.hide()
            htmlElements.loginLoader.css('visibility', 'visible');
            try {

                $(document).load(`${serverAPI.getStudent}${loginUser.userName}&${loginUser.password}`, (json, res, xhr) => {


                    if (res === "error") {
                        htmlElements.loginLoader.hide()
                        htmlElements.loginScreen.show()
                        alert("wrong password or username!")

                    } else {
                        persistData();
                        htmlElements.loginLoader.hide()
                        htmlElements.app.css('visibility', 'visible');
                        htmlElements.helloUserName.text(`Hi ${loginUser.userName.substring(0, loginUser.userName.indexOf('@'))}`)
                    }
                })


            } catch (error) {


            }



        }

    )
}

htmlElements.loginScreenShowPassword.click(() => {

    if (htmlElements.loginScreenShowPassword[0].checked === true) {
        htmlElements.loginScreenPassword[0].type = "text";

    } else {
        htmlElements.loginScreenPassword[0].type = "password";
    }

})

htmlElements.loginScreenBtn.click(() => {

    const userName = htmlElements.loginScreenUserName.val();
    const password = htmlElements.loginScreenPassword.val();
    loginUser = { userName: userName, password: password }

    login()

})



const init = () => {
    readStorage()

}


htmlElements.logout.click(() => {
    loginUser = null
    persistData()
    htmlElements.app.hide()
    htmlElements.loginScreen.show()
})

init()

/////////////////////////////////////// Phone///////////////////////////////////////
htmlElements.toggleBtn.click(() => {
    //change it in the css file
    if (htmlElements.sideBar.css('left') === '0px') {
        htmlElements.sideBar.css('left', '-255px');
    } else {
        htmlElements.sideBar.css('left', '0')

    }

})
$(window).on('resize', () => {
    if ($(window).width() > 1300) {
        htmlElements.sideBar.css('left', '0')

    }
})

//