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

  postReservation = ({start, end, persons, category}) => { //destructuring
    return fetch(`${this.url}admin/booking/try-booking?
    start=${start}&end=${end}&persons=${persons}$category${category}`, {
      credentials: this.credentials,
      method: "POST",
      // headers: this.headers
      body: JSON.stringify({
        "customer": {
          "firstName": "string",
          "lastName": "string",
          "phone": "string",
          "email": "string",
          "address": {
            "street": "string",
            "zipcode": "string",
            "city": "string",
            "country": "string"
          }
        }
      })
    })
      .then(function (response) {
        if (response.status !== 2011) {
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
