import "../style/index.css";

/**
 *  EDIT ONLY INSIDE THIS RENDER FUNCTION
 *  This function is called every time the user changes types or changes any input
 * 
    {
        includeCover: true, // if includeCover is true the algorithm should
        background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da", // this is the url of the image that will used as background for the profile cover
        avatarURL: "https://randomuser.me/api/portraits/women/42.jpg", // this is the url for the profile avatar
        socialMediaPosition: "left", // social media bar position (left or right)
        
        twitter: null, // social media usernames
        github: null,
        linkedin: null,
        instagram: null,

        name: OK,
        lastname: OK,
        role: null,
        country: null,
        city: null
    }
 */
function render(variables = {}) {
  console.log("These are the current variables: ", variables); //print on the console
  // here we ask the logical questions to make decisions on how to build the html
  // if includeCover==false then we reset the cover code without the <img> tag to make the cover transparent.
  let cover = `<div class="cover"><img src="${variables.background}" /></div>`;
  let fullName = `<h1>${variables.name} ${variables.lastname}</h1>`;
  if (variables.name == null && variables.lastname == null) {
    fullName = "<h1>Lucy Boilet</h1>";
  } else if (variables.includeCover == false) {
    cover = "<div class='cover'></div>";
  } else if (variables.lastname == null) {
    fullName = `<h1>${variables.name} Boilet</h1>`;
  } else if (variables.name == null) {
    fullName = `<h1>Lucy ${variables.lastname}</h1>`;
  }
  let github = `<a href="https://github.com/${variables.github}"><i class="fa-brands fa-github"></i></a>`;
  if (variables.github == null) {
    github = `<a href="https://github.com/"><i class="fa-brands fa-github"></i></a>`;
  }
  let twitter = `<a href="https://twitter.com/${variables.twitter}"><i class="fa-brands fa-square-twitter"></i></i></a>`;
  if (variables.twitter == null) {
    twitter = `<a href="https://twitter.com/"><i class="fa-brands fa-square-twitter"></i></a>`;
  }
  let linkedin = `href="https://linkedin.com/${variables.linkedin}"`;
  if (variables.linkedin == null) {
    linkedin = `href="https://linkedin.com/"`;
  }
  let instagram = `href="https://instagram.com/${variables.instagram}"`;
  if (variables.instagram == null) {
    instagram = `href="https://instagram.com/"`;
  }
  let socialMediaPosition = variables.socialMediaPosition;
  let smClass = "";
  if (socialMediaPosition == "position-left") {
    smClass = `class="position-left"`;
  } else if (socialMediaPosition == "position-right") {
    smClass = `class="position-right"`;
  }
  let position = variables.role;
  if (position == null) {
    position = "Freelance";
  }
  let city = variables.city;
  let country = variables.country;
  let location = "";
  if (city == null) {
    location = country;
  }
  if (city == null && country == null) {
    location = "Around the World";
  }
  switch (city) {
    case "Miami":
      country = "USA";
      location = `${city}, ${country}`;
      break;
    case "Munich":
      country = "Germany";
      location = `${city}, ${country}`;
      break;
    case "Caracas":
      country = "Venezuela";
      location = `${city}, ${country}`;
      break;
    case "Toronto":
      country = "Canada";
      location = `${city}, ${country}`;
      break;
  }

  // reset the website body with the new html output
  document.querySelector("#widget_content").innerHTML = `<div class="widget">
            ${cover}
          <img src="${variables.avatarURL}" class="photo" />
          <h1>${fullName}</h1>
          <h2>${position}</h2>
          <h3>${location}</h3>
          <ul ${smClass}>
            <li>${twitter}</li>
            <li>${github}</li>
            <li><a ${linkedin}><i class="fa-brands fa-linkedin"></i></a></li>
            <li><a ${instagram}><i class="fa-brands fa-instagram"></i></a></li>
          </ul>
        </div>
    `;
}

/**
 * Don't change any of the lines below, here is where we do the logic for the dropdowns
 */
window.onload = function() {
  window.variables = {
    // if includeCover is true the algorithm should
    includeCover: true,
    // this is the url of the image that will used as background for the profile cover
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    // this is the url for the profile avatar
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    // social media bar position (left or right)
    socialMediaPosition: "position-left",
    // social media usernames
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastname: null,
    role: null,
    country: null,
    city: null
  };
  render(window.variables); //render the card for the first time

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      // <- add a listener to every input
      const attribute = e.target.getAttribute("for"); // when any input changes, collect the value
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values)); // render again the card with new valus
    });
  });
};
