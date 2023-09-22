let selectedFrom = "";
let selectedTo = "";

async function fetchStations () {
  try {
    const response = await fetch("http://localhost:5000/api/v1/stations");
    const result = await response.json();
    console.log(result);
    addOptions(result);
  } catch (e) {
    console.log(e);
  }
}

function addOptions (stations) {
  const dataListFrom = document.getElementById("from");
  const dataListTo = document.getElementById("to");
  stations.forEach((stn) => {
    for (let i = 1; i <= 2; i++) {
      const option = document.createElement("option");
      option.setAttribute("value", stn[1]);
      option.innerHTML = `${stn[3]} (${stn[1]})`;
      if (i === 1) dataListFrom.appendChild(option);
      if (i === 2) dataListTo.appendChild(option);
    }
  })
  addEventListeners(stations);
}

function addEventListeners (stations) {
  const from = document.getElementById("fromInput");
  const to = document.getElementById("toInput");
  const submit = document.getElementById("submit");
  from.addEventListener("input", (e) => selectedFrom = e.target.value);
  to.addEventListener("input", (e) => selectedTo = e.target.value);
  submit.addEventListener("click", async () => {
    submit.innerHTML = "Calculating....";
    from.disabled = true;
    to.disabled = true;
    try {
      const response = await fetch(`http://localhost:5000/api/v1/distance/${selectedFrom}/${selectedTo}`);
      console.log(selectedFrom, selectedTo)
      const result = await response.json();
      console.log(result)
      if (response.ok) return endLoading(from, to, submit, `If you were a bird, you would fly ${result.distance}${result.unit} to get from ${result.from} to ${result.to}! 🦅`)
      else endLoading(from, to, submit, result.error )
    } catch (e) {
      console.log(e);
      endLoading(from, to, submit, "Something went wrong :(")
    }
  })
}

function endLoading (from, to, submit, string) {
  const answer = document.getElementById("answer");
  setTimeout(() => {
    answer.innerHTML = string;
    submit.innerHTML = "Submit";
    from.disabled = false;
    to.disabled = false;
  }, 1000);
}

fetchStations()