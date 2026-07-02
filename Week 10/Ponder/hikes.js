const hikes = [
  {
    name: "Bechler Falls",
    stub: "bechler_falls",
    imgSrc:
      "https://wdd131.netlify.app/examples/hikes/images/bechler-falls.jpg",
    imgAlt: "Image of Bechler Falls",
    distance: "3 miles",
    tags: ["Caves", "Yellowstone", "Waterfall"],
    difficulty: 1,
    description:
      "Beautiful short hike in Yellowstone along the Bechler river to Bechler Falls",
    directions:
      "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road.Drive to the end of the Cave Falls road. There is a parking area at the trailhead.",
    trailhead: [44.14457, -110.99781]
  },
  {
    name: "Teton Canyon",
    stub: "teton_canyon",
    imgSrc: "https://wdd131.netlify.app/examples/hikes/images/teton-canyon.jpg",
    imgAlt: "Image of Teton Canyon",
    distance: "3 miles",
    tags: ["Canyon", "Tetons"],
    difficulty: 1,
    description: "Beautiful short (or long) hike through Teton Canyon.",
    directions:
      "Take Highway 33 East to Driggs. Turn left onto Teton Canyon Road. Follow that road for a few miles then turn right onto Staline Raod for a short distance, then left onto Alta Road. Veer right after Alta back onto Teton Canyon Road. There is a parking area at the trailhead.",
    trailhead: [43.75567, -110.91521]
  },
  {
    name: "Denanda Falls",
    stub: "denanda_falls",
    imgSrc:
      "https://wdd131.netlify.app/examples/hikes/images/denanda-falls.jpg",
    imgAlt: "Image of Denanda Falls",
    distance: "7 miles",
    tags: ["Caves", "Yellowstone", "Waterfall"],
    difficulty: 3,
    description: "Beautiful hike through Bechler meadows to Denanda Falls",
    directions:
      "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead.",
    trailhead: [44.14974, -111.04564]
  },
  {
    name: "Coffee Pot Rapids",
    stub: "coffee_pot",
    imgSrc: "https://wdd131.netlify.app/examples/hikes/images/coffee-pot.jpg",
    imgAlt: "Image of Bechler Falls",
    distance: "2.2 miles",
    tags: ["Rafting"],
    difficulty: 1,
    description:
      "Beautiful hike along the Henry's Fork of the Snake River to a set of rapids.",
    directions:
      "Take Highway 20 north to Island Park. Continue almost to Mack's in. From Highway 20, turn west on Flatrock Road for 1 mile then turn off on Coffee Pot Road and travel one-half mile to the campground entrance road. There is a parking lot right outside the campground.",
    trailhead: [44.49035, -111.36619]
  },
  {
    name: "Menan Butte",
    stub: "menan_butte",
    imgSrc: "https://wdd131.netlify.app/examples/hikes/images/menan-butte.jpg",
    imgAlt: "Image of Menan Butte",
    distance: "3.4 miles",
    tags: ["Volcanic", "View"],
    difficulty: 2,
    description:
      "A steep climb to one of the largest volcanic tuff cones in the world. 3.4 miles is the full loop around the crater, can be shortened.",
    directions:
      "Take Highway 33 West out of Rexburg for about 8 miles. Turn left onto E Butte Road, the right onto Twin Butte road after about a mile. Follow that road for about 3 miles. You will see the parking lot/trailhead on the left.",
    trailhead: [43.78555, -111.98996]
  }
];


// Search: string in the 'hike name', 'hike description', 'tags array'
// Display: 'difficulty' by number of boots 🥾 & ▫️

// Filter -> Sort by the 'distance' of each hike


// 1. Get html tag where you wanna place the search result
// 2. filter hikes with given input, sort by distance
// 3. organize the sorted hikes with templates
// 4. render the html (when open the website, init random hike from hikes)

// hike html content template
// <!-- <div id="hike-container">
      // <div class="hike-card">
      //   <div class="hike-content">
      //     <h2>Teton Canyon</h2>
      //     <div class="hike-tags">
      //       <button>Canyon</button>
      //       <button>Tetons</button>
      //     </div>
      //     <p>Beautiful short (or long) hike through Teton Canyon.</p>
      //     <p><span class="rating" role="img" aria-label="1 out of 5">🥾</span></p> --></div>

function search() {
  document.querySelector("#hike-container").innerHTML = "";
  let hikeSearch = document.querySelector('#search').value.toLowerCase();

  let hikeMatch = hikes.filter(function(hike){ // return the hike that matches these conditions
    return(
      hike.name.toLowerCase().includes(hikeSearch) || 
      hike.description.toLowerCase().includes(hikeSearch) ||
      hike.tags.find(tag => tag.toLowerCase().includes(hikeSearch))
    );
  })

  // hikeMatch is an array of hike
  
  // return sorted hikes in HTML templates
  hikeMatch.sort((a, b) => {
    const mileA = a.distance.split(" ")[0];
    const mileB = b.distance.split(" ")[0];
    return (mileA - mileB); // sort ascendingly
    // or you can:
    // hikeMatch.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
  });

  renderHike(hikeMatch);
}

function toHtmlTemplate(hike) { // input: each single 'hike'

  const buttonsHtml = hike.tags
    .map(tag => `<button>${tag}</button>`)
    .join("");

  const bootDifficulty = "🥾".repeat(hike.difficulty) + "▫️".repeat(5 - hike.difficulty);

  return (
    `<div class="hike-card">
        <div class="hike-content">
          <h2>${hike.name}</h2>
          <div class="hike-tags">
            ${buttonsHtml}
          </div>
          <p>${hike.description}</p>
          <p><span class="rating" role="img" aria-label="Rating: ${hike.difficulty} out of 5">Difficulty: ${bootDifficulty}</span></p> 
        </div>
      </div>`
  );
}

function renderHike(hikeList) {
  let hikeContainer = document.querySelector("#hike-container");
  let html = hikeList.map(toHtmlTemplate).join("");
  hikeContainer.innerHTML += html;
} 

let input = document.querySelector('input');
input.addEventListener('keypress', handleEnter);
function handleEnter(event) {
  if (event.key === 'Enter') {
    search();
  }
}

// main 

// random hike generation
let randomNum = Math.floor(Math.random() * hikes.length);
renderHike([hikes[randomNum]]);

let searchBtn = document.querySelector("#searchBtn")
searchBtn.addEventListener('click', search);


// when open the website, pull a random hike



// name: "Teton Canyon",
// stub: "teton_canyon",
// imgSrc: "https://wdd131.netlify.app/examples/hikes/images/teton-canyon.jpg",
// imgAlt: "Image of Teton Canyon",
// distance: "3 miles",
// tags: ["Canyon", "Tetons"],
// difficulty: 1,
// description: "Beautiful short (or long) hike through Teton Canyon.",
// directions:
//   "Take Highway 33 East to Driggs. Turn left onto Teton Canyon Road. Follow that road for a few miles then turn right onto Staline Raod for a short distance, then left onto Alta Road. Veer right after Alta back onto Teton Canyon Road. There is a parking area at the trailhead.",
// trailhead: [43.75567, -110.91521]