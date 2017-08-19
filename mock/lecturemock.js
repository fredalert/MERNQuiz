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

  const naziLecture={

        lecture:"The nazi lecture",
        lectureImage:"/images/Nazis on parade..jpg"

          questions: [{
              question:"When did hitler die?",
              correctAnswer:"1945",
              comment: "Color is a nice thing",
              image: "Red",
              answers: [{answer:"1945"},
                        {answer:"1928"},
                        {answer:"1901"},
                        {answer:"1933"}]
          },



          {
            isVideo:true,
            videoUrl:"/images/S2-Connect-React-to-Store.mp4"
          },

          {
              question:"What was Hitlers favorite animal?",
              correctAnswer:"Dog",
              comment: "",
              image: "",
              answers: [{answer:"Dog"},
                        {answer:"Cat"},

                        ]
          },
          ],

    }


  axios.post("/api/lectures", naziLecture).
      then(function(response){
        console.log("succesfully added coolQuiz, then respones is: ", response.data)
      })
      .catch(function(err){
        console.log("someting wrong when adding cool quiz")})
