const printPdf = async function (payload) {
    
    let questionPaper = payload[0];
    let partA = '<h2>Part A </h2>';
    let partB = '<h2>Part B </h2>';
    let partC = '<h2>Part C </h2>';

    let questionCount = 1;
    let heading = `<h1>${questionPaper.examType}</h1>`

    questionPaper.partA.forEach(element => {
        partA = `${partA} <div> ${questionCount}. ${element.question}</div>`;
        questionCount++;
    });


    questionPaper.partB.forEach(subQuestions => {
        partB = `${partB} <p>${questionCount}</p>`
        subQuestions.questions.forEach((element,index) => {
            partB = `${partB} <div> ${(index + 10).toString(36)}. ${element.question} </div>`;
        });
        questionCount++;
    });
    
    questionPaper.partC.forEach(subQuestions => {
        partC = `${partC} <p>${questionCount}</p>`
        subQuestions.questions.forEach((element,index) => {
            partC = `${partC} <div> ${(index + 10).toString(36)}. ${element.question} </div>`;
        });
        questionCount++;
    });

    var mywindow = window.open("", "PRINT", "height=600,width=600");
    mywindow.document.write(`${heading} ${partA} ${partB} ${partC}`);
    mywindow.document.close();
    mywindow.focus();
    mywindow.print();
    return true;

};

export default printPdf;