class FetchData {
  constructor() {
    this.url = "http://localhost:8000/";
    // this.headers = headers: {
    //      "Content-Type": "application/json",
    //      Authorization: "Basic " + btoa( "admin:admin") // btoa = encodage en base 64
    //    }
    this.credentials = "same-origin";
  }
  getReservations = () => {
    return fetch(`${this.url}admin/reservations`, {
      credentials: this.credentials,
      method: "GET",
      // headers: this.headers
    })
      .then(function (response) {
        if (response.status !== 200) {
          throw new Error("Erreur : " + response.status);
        }
        return response.json(); // teste si c'est bien du json
      })
      .then(function (data) {
        console.log("data : ", data); // j'ai ma donnée au format json
        return data;
      });
  };
}

export default FetchData;
