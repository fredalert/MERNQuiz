const coolQuiz={

      lecture:"The nazi quiz",

        questions: [{
            question:"When did Hitler die?",
            correctAnswer:"1945",
            comment: "Color is a nice thing",
            image: "cool",
            answers: [{answer:"1943"},
                      {answer:"1945"},
                      {answer:"1912"},
                      {answer:"2003"}]
        },

        {
            question:"Who was the leader of the nazis?",
            correctAnswer:"Hitler",
            comment: "Biking is a nice thing",
            image: "asd",
            answers: [{answer:"a cool bike"},
                      {answer:"Hitler"},
                      {answer:"Göring"},
                      {answer:"A cool guy"}]
        },

        {
          isVideo:true,
          videoUrl:"/public/videos/naziVideoUrl"
        },

        {
            question:"What is the swastika?",
            correctAnswer:"The symbol og the reich",
            comment: "The nazis had many symbols. One of them was the swastika.",
            image: "",
            answers: [{answer:"The symbol og the reich"},
                      {answer:"A rabbit"},
                      {answer:"Your grandma"},
                      {answer:"A cat"}]
        },
        ],

  }

  axios.post("/api/lectures", coolQuiz).
      then(function(response){
        console.log("succesfully added coolQuiz, then respones is: ", response.data)
      })
      .catch(function(err){
        console.log("someting wrong when adding cool quiz")})
