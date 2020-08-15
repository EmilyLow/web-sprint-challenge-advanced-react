import React, { Component } from "react";
import axios from "axios";

export default class PlantList extends Component {
  // add state with a property called "plants" - initialize as an empty array
  constructor() {
    super();
    this.state = {
      plants: [],
      rawPlants: [],
      filterField: "",
      activeFilter: ""
    }
  }

  // when the component mounts:
  //   - fetch data from the server endpoint - http://localhost:3333/plants
  //   - set the returned plants array to this.state.plants

    componentDidMount() {
      axios
      .get("http://localhost:3333/plants")
      .then((res) => {
          
          this.setState({plants: res.data.plantsData, rawPlants: res.data.plantsData});
          console.log(this.state.plants);
          
        }
      ) 
      .catch((err) => console.log("Plant data error"));
      
    }

    filterPlants() {
      // console.log("Updated");
      if(this.state.activeFilter != "") {
        this.setState({plants: this.state.rawPlants});
        console.log("filtering");
        let filteredPlants = this.state.plants.filter((plant) => {

          return plant.name.includes(this.state.activeFilter);
        }
        );
        this.setState({plants: filteredPlants})
      };
      
    }

    //Attempting filter
   handleSubmit = e => {
     e.preventDefault();
     console.log("submit");
     this.setState({activeFilter: this.state.filterField});
    //  console.log("Active filter", this.state.activeFilter);
    this.filterPlants();
   }
   handleChange = e => {
    console.log("change");
    this.setState({filterField: e.target.value});
    // console.log("Filter field,", this.state.filterField);
  }

  /*********  DON'T CHANGE ANYTHING IN THE RENDER FUNCTION *********/
  //Altering for Filter Stretch
  render() {
    return (
      <main className="plant-list">
        {/* Filter stretch begins */}
        <form onSubmit={this.handleSubmit}>
          <label>
            Filter:
            <input
              name = "filterBy"
              value = {this.state.filterField}
              onChange = {this.handleChange}
             />
          </label>
          <button>Submit</button>
        </form>
        {/* Filter stretch ends */}
        {this.state?.plants?.map((plant) => (
          <div className="plant-card" key={plant.id}>
            <img className="plant-image" src={plant.img} alt={plant.name} />
            <div className="plant-details">
              <h2 className="plant-name">{plant.name}</h2>
              <p className="plant-scientific-name">{plant.scientificName}</p>
              <p>{plant.description}</p>
              <div className="plant-bottom-row">
                <p>${plant.price}</p>
                <p>☀️ {plant.light}</p>
                <p>💦 {plant.watering}x/month</p>
              </div>
              <button
                className="plant-button"
                onClick={() => this.props.addToCart(plant)}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </main>
    );
  }
}
