// have object of questions

// Execute this code when the DOM has fully loaded.
$(document).ready(function() {

	// VARIABLE DECLERATION
	// ===============================================

	// Creating an object to hold trivia questions
	var question = {
		"one" : {
			q: "what is generally considered the first pony car?",
			c1: "Pontiac Firebird",
			c2: "Mercury Cougar",
			c3: "Ford Mustang",
			c4: "Cheverolet Camaro",
			a: "Ford Mustang"
		},
		"two" : {
			q: "What was the first Japanese car to be produced in the United States?",
			c1: "HONDA ACCORD",
			c2: "MAZDA MIATA",
			c3: "TOYOTA CAMRY",
			c4: "NISSAN MAXIMA",
			a: "HONDA ACCORD"
		},
		"three" : {
			q:'What car sold more than one million units in 1965, setting a record that still stands today?',
			c1:'BUICK WILDCAT',
			c2:'PONTIAC GTO',
			c3:'FORD THUNDERBIRD',
			c4:'CHEVROLET IMPALA',
			a:'CHEVROLET IMPALA'
		},
		'four' : {
			q:'What year was the Corvette first introduced?',
			c1:'1943',
			c2:'1953',
			c3:'1963',
			c4:'1965',
			a:'1953'

		},
		'five' : {
			q:'How much horsepower did the first Porsche 911 have?',
			c1:'35 HP',
			c2:'90 HP',
			c3:'130 HP',
			c4:'180 HP',
			a:'130 HP'
		}
	};

	//Creating an object used to keep track of user score
	var score = {
		correct:0,
		inccorect:0,
		unanswered:0,
		// save initial values
		  init: function() {
		      var origValues = {};
		      for (var prop in this) {
		          if (this.hasOwnProperty(prop) && prop != "origValues") {
		              origValues[prop] = this[prop];
		          }
		      }
		      this.origValues = origValues;
		  },
		  // restore initial values
		  reset: function() {
		      for (var prop in this.origValues) {
		          this[prop] = this.origValues[prop];
		      }
		  }
	}

	score.init()

	//variable that holds how much time per each question
	var count=10;

	//Blank array use to hold key value pairs of question variable
	var qArr = []

	// variable used to keep track of what question user is on
	var qnum = 0

	//Counter function that runs every second invokking timer function
	var counter;

	var myVar;


	


	//FUNCTION DECLERATION
	//===================================================



	Object.keys(question).forEach(function (key) {
   		// do something with obj[key]
   		qArr.push(question[key])
	});

		//timer function thats runs every second
	function timer() {
  		count--
  		if (count < 0) {
  			console.log('lick')
     		
     		//counter ended,
     		$('#choices').empty();
			$('#question').html('Out of Time!: THE CORRECT ANSWER IS ' +qArr[qnum].a)
			$('#timer').hide();
			qnum++
			score.unanswered++
			myFunction()
			console.log(score)
     		clearInterval(counter);

     		return;
     		
  		}

	  //code for showing the number of seconds here

	 		$('#timer').html(count);
		}

	//Dynamic create list function
	function list(arr,count) {
		for(var i = 1; i<=4;i++) {
			$('<li/>').text(arr[count]['c'+i]).addClass('list-group-item ui').appendTo('#choices')
		}
	}


	function myFunction() {
		if(qnum == qArr.length) {
		$('#choices').empty();
		// $('#question').empty()
		$('#timer').hide();
		$('#question').append("<div>Correct: "+score.correct+"</div>");
		$('#question').append("<div>Inccorect: "+score.inccorect+"</div>");
		$('#question').append("<div>Unanswered: "+score.unanswered+"</div>");
		$('#question').append($('<button/>', {
        text: 'Reset',
        class: 'btn btn-primary',
        click: function () { 
        	qnum = 0;
        	$('#timer').show()
        	counter=setInterval(timer, 1000);
			$('#question').html(qArr[qnum].q)
			list(qArr,qnum);
			score.reset()

        }
    }));

	} 

		else {
			myVar = setTimeout(nextQuestion, 1000)
		}
	}

	//used to iterate to the next question
	function nextQuestion() {
		$('#timer').show()
		$('#question').html(qArr[qnum].q)
		count = 10
		counter = setInterval(timer,1000)
		list(qArr,qnum);
}


	//On click start intializes game
	$('#start').on('click', function() {
		counter=setInterval(timer, 1000);	
		$('#start').hide();
		$('#question').html(qArr[qnum].q)
		list(qArr,qnum);

	})


	//on click function for user choice
	$(document).on('click','.ui',function() {
		userChoice = $(this).html()
		if(userChoice == qArr[qnum].a) {
			$('#choices').empty();
			$('#question').html('CORRECT: THE CORRECT ANSWER IS ' +qArr[qnum].a)
			$('#timer').hide();
			clearInterval(counter);
			score.correct++
			qnum++
			myFunction()

		}
		else {
			$('#choices').empty();
			$('#question').html('WRONG!: THE CORRECT ANSWER IS ' +qArr[qnum].a)
			$('#timer').hide();
			clearInterval(counter);
			qnum++
			score.inccorect++
			myFunction()
			console.log(score)
		}
	})



});