var waktu_timer=1000;
var current_timestamp = 0;
    var run;
var control;
var display;
(function(){
    
    display = {
        getApp: document.getElementById('app'),

        // Updates DOM on start/restart of the quiz
        mainPage: function() {
            var newEl = '<div class="quest-number"><p id="questNumber"></p></div><h1 id="questionDisplay" class="h3"></h1>';
                newEl += '<ul><li><label><input type="radio" name="answers" id="input1" value="1"><span class="outer"><span class="inner"></span></span><div class="font_besar" id="answerDisplay1"></div></label></li>';
                newEl += '<li><label><input type="radio" name="answers" id="input2" value="2"><span class="outer"><span class="inner"></span></span><div class="font_besar" id="answerDisplay2"></div></label></li>';
                newEl += '<li><label><input type="radio" name="answers" id="input3" value="3"><span class="outer"><span class="inner"></span></span><div class="font_besar" id="answerDisplay3"></div></label></li></ul>';
                 newEl += '<ul><li><label><input type="radio" name="answers" id="input4" value="4"><span class="outer"><span class="inner"></span></span><div class="font_besar" id="answerDisplay4"></div></label></li>';
                newEl += '<div class="points-wrap"><p id="currentPoints"></p></div>';

            this.getApp.innerHTML = newEl;
        },

        // Updates DOM with each question
        updateMainPage: function() {
            var getQuestNumber = document.getElementById('questNumber'),
                getQuestion = document.getElementById('questionDisplay'),
                getAnswer1 = document.getElementById('answerDisplay1'),
                getAnswer2 = document.getElementById('answerDisplay2'),
                getAnswer3 = document.getElementById('answerDisplay3'),
				 getAnswer4 = document.getElementById('answerDisplay4'),
			    getAnswer5 = document.getElementById('answerDisplay5'),
               
                getCurrentPoints = document.getElementById('currentPoints'),
                sumOfQuestions = data.quizContent.length;
                
            getQuestNumber.innerHTML = control.count + 1 + '/' + sumOfQuestions;
            getQuestion.innerHTML = data.quizContent[control.count].question;
            getAnswer1.innerHTML = data.quizContent[control.count].answer1;
            getAnswer2.innerHTML = data.quizContent[control.count].answer2;
            getAnswer3.innerHTML = data.quizContent[control.count].answer3;
         
            getCurrentPoints.innerHTML = 'Points:' + ' ' + data.points;
            this.newElement('button', 'submit', 'Submit Answer');
        },
        addAnswer: function(showMessage) {
            var sumOfQuestions = data.quizContent.length;

            if(showMessage === 'correct') {
                this.newElement('p', 'showAnswer', 'Jawaban Anda Benar');
            } else {
                
                var x=data.quizContent[control.count].fact
              
                
                
                this.newElement('p', 'showAnswer', 'Jawaban Anda Salah !'+x );
            }

            if (control.count < sumOfQuestions - 1) {
                start_countdown(0);
                this.newElement('button', 'nextQuest', 'Pertanyaan Selanjutnya');
            } else {
                this.newElement('button', 'result', 'Lihat Hasil Anda');
            }
        },
        removeAnswer: function(event) {
            var getShowAnswer = document.getElementById('showAnswer');
            var getShowAnswerParent = getShowAnswer.parentNode;
            getShowAnswerParent.removeChild(getShowAnswer);
            var clickedEl = event.target;
            var clickedElParent = clickedEl.parentNode;
            clickedElParent.removeChild(clickedEl);
            var radioButtons = document.getElementsByName('answers');
            var allRadioButtons = radioButtons.length;
            var i;

            for(i = 0; i < allRadioButtons; i++) {
                radioButtons[i].checked = false;
            }
        },

        // Displays final page of the quiz
        resultPage: function() {
            this.getApp.innerHTML = '<h1 class="h3">Kamu punya ' + data.points + ' Jawaban yang dijawab dengan benar</h1>';
            this.newElement('button', 'restart', 'Ulang lagi');
        },
        newElement: function(elem, elemId, elemText) {
            var newElem = document.createElement(elem);
            var newElemText = document.createTextNode(elemText);
            newElem.appendChild(newElemText);
            newElem.id = elemId;
            this.getApp.appendChild(newElem);
        }
    };

    control = {
        init: function() {
            var start = document.getElementById('start') || document.getElementById('restart');
            start.addEventListener('click', function() {
                display.mainPage();
                control.update();
//                waktu_timer=10;
//                document.getElementById("timer").innerHTML= "Waktu tersisa "+waktu_timer + " Detik";
//                setInterval(start_countdown(),10000 );
                
                current_timestamp = Math.floor(Date.now() / 1000);
                start_countdown(1);
                document.getElementById("timer").innerHTML= "Waktu tersisa "+ (waktu_timer) + " Detik";
            }, false);
        },
        update: function() {
            display.updateMainPage();
            var submit = document.getElementById('submit');
            submit.addEventListener('click', this.checkAnswer, false);
        },

        /**
        * Alerts if none of the radios is checked on submit 
        * Verifies correct/incorrect answer
        * Directs quiz to the next question or to the final page
        */
        checkAnswer: function(event) {
            var radioButtons = document.getElementsByName('answers'),
                allRadioButtons = radioButtons.length,
                isChecked = false,
                checkedRadio,
                clickedEl = event.target,
                clickedElParent = clickedEl.parentNode,
                i;

            for (i = 0; i < allRadioButtons; i++) {
                if (radioButtons[i].checked) {
                    isChecked = true;
                    checkedRadio = +radioButtons[i].value;
                }
            }

            if (isChecked === false) {
                alert('Please choose the answer!');
            } else {
                clickedElParent.removeChild(clickedEl);
                if (checkedRadio === data.quizContent[control.count].correctAnswer) {
                    display.addAnswer('correct');
                    data.points++;
                } else {
                    display.addAnswer();
                }

                var nextQuestion = document.getElementById('nextQuest'),
                    result = document.getElementById('result');

                if (nextQuestion) {
                    nextQuestion.addEventListener('click', function(event) {
                        control.count++;
                        display.removeAnswer(event);
                        control.update();
                        current_timestamp = Math.floor(Date.now() / 1000);
                        start_countdown(1);
                        document.getElementById("timer").innerHTML= "Waktu tersisa "+ (waktu_timer) + " Detik";
                    }, false);
                } else {
                    result.addEventListener('click', function() {
                        display.resultPage();
                        control.init();
                        control.count = 0;
                        data.points = 0;
                    }, false);
                }
            }
        },

        // Used for incrementing/looping through the quiz questions and answers
        count: 0
    };

    control.init();
function next_pertanyaan()
{   
    display.addAnswer();
    document.getElementById("submit").remove();
    console.log(control);
    var nextQuestion = document.getElementById('nextQuest'),
    result = document.getElementById('result');

    if (nextQuestion) {
        nextQuestion.addEventListener('click', function(event) {
            control.count++;
            display.removeAnswer(event);
            control.update();
            current_timestamp = Math.floor(Date.now() / 1000);
            start_countdown(1);
            document.getElementById("timer").innerHTML= "Waktu tersisa "+ (waktu_timer) + " Detik";
        }, false);
    } else {
        result.addEventListener('click', function() {
            display.resultPage();
            control.init();
            control.count = 0;
            data.points = 0;
        }, false);
    }
}
function start_countdown(mulai)
{
    var transactionTime = 0; //Initial time of timer
    var timeStamp = Math.floor(Date.now() / 1000);
    var deltaDelay = 1;
    console.log(mulai);
    if(mulai)
    {
            
   run = setInterval(function () {
//        if (transactionTime != 0 && (Math.floor(Date.now() / 1000) - timeStamp) > deltaDelay) {
//                transactionTime += (Math.floor(Date.now() / 1000) - timeStamp);
//            }
            timeStamp = Math.floor(Date.now() / 1000);
            selisih = timeStamp - current_timestamp;
            if(mulai)
            {
                if(selisih > waktu_timer)
                {
                    next_pertanyaan();
                    clearInterval(run);
                    document.getElementById("timer").innerHTML= "Waktu tersisa 0 Detik";
                } else {
                    document.getElementById("timer").innerHTML= "Waktu tersisa "+ (waktu_timer-selisih) + " Detik";
                }  
            }
        }, 1000);
    }else {
        console.log(run);
        clearInterval(run);
    }

}    
})();


