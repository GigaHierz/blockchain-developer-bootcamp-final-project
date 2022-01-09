export default async function generateBabyName(): Promise<string> {
  return new Promise(function (resolve, reject) {
    // Constructor
    var request = new XMLHttpRequest();

    // Configuration
    request.open("GET", `https://random-word-api.herokuapp.com/word?number=1`);

    // Event Listener
    request.addEventListener("load", function () {
      // Response is ready
      if (request.status !== 200) {
        reject();
      }

      //Parse the response
      var response = JSON.parse(request.response);

      // Fulfill the Promise
      resolve(response);
    });

    // Invoking the request
    request.send();
  }).then((data: any) => data + " Octopus");
}
