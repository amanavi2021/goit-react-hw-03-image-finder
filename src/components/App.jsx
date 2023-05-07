import { Component } from "react";
import { Searchbar } from "components/Searchbar/Searchbar";

export class App extends Component {

  state = {
    pictureName: '',
  };

   handleSearchFormSubmit = pictureName=> {
    this.setState({ pictureName });
   };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleSearchFormSubmit}/>
      </div>
    );
  };
  
};
