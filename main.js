// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'
const errorModal = document.querySelector("#modal");

// Your JavaScript code goes here!

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM content has loaded ")
  //Add the `.hidden` class to the error modal in the HTML so it does not appear
  //Adding a class to an element (everything on the webpage is considered an element)
  errorModal.classList.add("hidden")
  console.log(errorModal);

  //CALL FIND LIKES

  //findLikes();

  clickListener();

})

function hideError() {
  errorModal.classList.add("hidden") //because we have this arguement in mulitple places we make it a function
}

//When a user clicks on an empty heart:
// Invoke `mimicServerCall` to simulate making a server request
// Need an event listener (look at hearts and see what needs to be targeted)

function findLikes() { //listens for each Like click 
  const likeArr = document.querySelectorAll(".like-glyph")

  likeArr.forEach(singlularLike => {
    singlularLike.addEventListener("click", () => console.log("YOU FOUND ME! LIKE!"))
  })
}

function clickListener() { //will listen for click anywhere on screen but coded it to only target Like button
  document.addEventListener('click', (event) => {
    //if I click on the hear then console.log("YOU FOUND ME! LIKE!") otherwise, eh...do nothing 
    if (event.target.classList[0] === 'like-glyph') {
      //Invoke `mimicServerCall` to simulate making a server request
      mimicServerCall()
        .then(resp => {
          const activated = event.target.classList.contains("activated-heart")
          if (activated) {
            event.target.classList.remove("activated-heart")
            event.target.innerHTML = EMPTY_HEART
          } else {
            event.target.classList.add("activated-heart")
            event.target.innerHTML = FULL_HEART
          }
        })
        .catch(error => {
          console.log(error);
          //errorModal.classList.remove("hidden")
          setTimeout(() => {
            hideError()
          }, 3000)
        }) //PROMISE fails, .catch -> catches it 

    }
  })
}
//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url = "http://mimicServer.example.com", config = {}) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
