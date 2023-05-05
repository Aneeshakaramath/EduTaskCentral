const printPdf = async function (questionPaper, courseDetail) {
    
    console.log(courseDetail);
    let style = `<style>table, th, td {
        border:1px solid black;
        border-collapse: collapse;
      }
      .align-center {
        text-align: center;
      }
      .underline {
        text-decoration: underline
      }
      </style>`
    let topLog = window.environment == 'development' ?
                    `<div class="align-center"><img src="src/assets/images/cresent_logo.jpeg"></img></div>`:
                    `<div class="align-center"><img src="cresent_logo/cresent_logo.jpeg"></img></div>`
    let partA = `<h2 style="text-align: center; font-size: 20px;" class="underline">PART A (${getTotalMarks(questionPaper.partA)} marks)</h2>` +
                '<p style="text-align: center; font-size: 15px; font-weight: bold;">(ANSWER ALL QUESTIONS)</p>';
    let partB = `<h2 style="text-align: center; font-size: 20px;" class="underline">PART B (${getTotalMarksBig(questionPaper.partB)} marks)</h2>`;
    let partC = `<h2 style="text-align: center; font-size: 20px;" class="underline">PART C (${getTotalMarksBig(questionPaper.partC)} marks)</h2>`;

    let questionCount = 1;
    let heading = `<div><h1 style="text-align: center; font-size: 20px;">${getExamTypeName(questionPaper.examType)},&nbsp;${formatDate(questionPaper.examDate)}</h1>`
                + `<div style="display:block;">
                        <table align="right">
                        <tr>
                            <th>&nbsp; RRN &nbsp;</th>
                            <th>&nbsp; &nbsp;</th>
                            <th>&nbsp; &nbsp;</th>
                            <th>&nbsp; &nbsp;</th>
                            <th>&nbsp; &nbsp;</th>
                            <th>&nbsp; &nbsp;</th>
                            <th>&nbsp; &nbsp;</th>
                            <th>&nbsp; &nbsp;</th>
                            <th>&nbsp; &nbsp;</th>
                            <th>&nbsp; &nbsp;</th>
                            <th>&nbsp; &nbsp;</th>
                            <th>&nbsp; &nbsp;</th>
                            <th>&nbsp; &nbsp;</th>
                        </tr>
                        </table>
                    </div>`
                + `<div><p><span style="font-weight: bold;">Semester:</span> ${questionPaper.semester}</p><p><span style="font-weight: bold;">Course Code & Name:</span> ${courseDetail.code} ${courseDetail.name}</p>`
                +`<p><span style="font-weight: bold;">Session:</span> ${questionPaper.session}</p><p><span style="font-weight: bold;">Duration:</span> ${questionPaper.duration.hours}hours ${questionPaper.duration.mins}mins</p>`
                +`<p><span style="font-weight: bold;">Maximum Marks:</span> ${questionPaper.totalMarks}</p>`
                +`</div>`
                + `</div>`;

    questionPaper.partA.forEach(element => {
        partA = `${partA} <div> ${questionCount}. ${element.question} <span style="float:right;font-weight: bold;"> (${element.marks}) </span> </div>`;
        questionCount++;
    });


    questionPaper.partB.forEach(subQuestions => {
        subQuestions.questions.forEach((element,index) => {
            partB = `${partB} <div> ${index==0?questionCount:'&nbsp;'} ${(index + 10).toString(36)}. ${element.question} <span style="float:right;font-weight: bold;"> (${element.marks}) </span></div>`;
        });
        partB =`${partB} <br>`
        questionCount++;
    });
    
    questionPaper.partC.forEach(subQuestions => {
        subQuestions.questions.forEach((element,index) => {
            partC = `${partC} <div> ${index==0?questionCount:'&nbsp;'} ${(index + 10).toString(36)}. ${element.question} <span style="float:right;font-weight: bold;"> (${element.marks}) </span></div>`;
        });
        partC =`${partC} <br>`
        questionCount++;
    });

    var mywindow = window.open("", "PRINT", "height=600,width=600");
    mywindow.document.write(`${style} ${topLog} ${heading} ${partA} ${partB} ${partC}`);
    mywindow.document.close();
    mywindow.focus();
    mywindow.print();
    return true;

};

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

function getTotalMarks(questionArray) {
    let sum = 0;
    questionArray.forEach((element)=> {
        sum+=element.marks;
    })
    return sum;
}

function getTotalMarksBig(questionArray) {
    let sum = 0;
    questionArray.forEach((subQuestions)=> {
        sum+=getTotalMarks(subQuestions.questions);
    });
    return sum;
}

function getExamTypeName(examType) {
    if(examType == 'CAT_1') {
        return 'CONTINUOUS ASSESSMENT TEST-1';
    }
    if(examType == 'CAT_2') {
        return 'CONTINUOUS ASSESSMENT TEST-2'
    }
    if(examType == 'SEM')
    {
        return 'SEMESTER END EXAMINATIONS';
    }
    return ''
}
export default printPdf;