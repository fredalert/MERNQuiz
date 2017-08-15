const habaneroQuiz={

      lecture:"The habanero lecture",
      lectureImage:"images/habanero.jpg"

        questions: [{
            question:"What is the color of the habanero?",
            correctAnswer:"Red",
            comment: "Color is a nice thing",
            image: "Red",
            answers: [{answer:"Red"},
                      {answer:"Green"},
                      {answer:"Pink"},
                      {answer:"Blue"}]
        },



        {
          isVideo:true,
          videoUrl:"/images/S2-Connect-React-to-Store.mp4"
        },

        {
            question:"Is the habanero strong?",
            correctAnswer:"Yes",
            comment: "",
            image: "",
            answers: [{answer:"Yes"},
                      {answer:"No"},

                      ]
        },
        ],

  }

  axios.post("/api/lectures", coolQuiz).
      then(function(response){
        console.log("succesfully added coolQuiz, then respones is: ", response.data)
      })
      .catch(function(err){
        console.log("someting wrong when adding cool quiz")})
