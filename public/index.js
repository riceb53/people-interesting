/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Welcome to Vue.js!",
      people: [
        {
          name: "brian",
          bio: "I do the stuff",
          bioVisible: true
        },{
          name: "laura",
          bio: "asdklfjasdf",
          bioVisible: true
        },{
          name: "billy",
          bio: "billybillybilly",
          bioVisible: true
        }
      ],
      newPerson: {name: "", bio: "", bioVisible: ""}
    };
  },
  created: function() {
    // runs right when the object is created
    axios.get("http://localhost:3000/v1/people").then(function(response) {
      console.log(response.data);
      this.people = response.data;
      console.log("inside ajax call this");
      console.log(this);
    }.bind(this));
  },
  methods: {
    addPerson: function() {
      if (this.newPerson.name) {
        var theParameters = {
          name: this.newPerson.name,
          bio: this.newPerson.bio
        };
        // make a web request to the create action
        // send along the appropriate information
        axios.post("/v1/people", theParameters).then(function(response) {
          this.people.push(this.newPerson);
          this.counter = this.people.length;
          console.log(response.data);
        }.bind(this));
      }
    },
    getPeople: function() {

    },
    deletePerson: function(thePerson) {
      axios.delete("/v1/people/" + thePerson.id).then(function(response) {
        var index = this.people.indexOf(thePerson);
        this.people.splice(index, 1);
      }.bind(this));
    },
    toggleBio: function(thePerson) {
      thePerson.bioVisible = !thePerson.bioVisible;
    }
  },
  computed: {},
  mounted: function() {
    var uluru = {lat: -25.363, lng: 131.044};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: uluru
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });

  }
};

var router = new VueRouter({
  routes: [{ path: "/", component: HomePage }],
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router
});

