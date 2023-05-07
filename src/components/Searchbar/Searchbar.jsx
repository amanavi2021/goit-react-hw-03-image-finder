import { Component } from "react";
import PropTypes from 'prop-types';
import { SearchBar, SearchForm, SearchFormButton, SearchFormLabel, SearchFormInput} from "./Searchbar.styled";

export class Searchbar extends Component {
    state = {
        pictureName:'',
    };

    handleNameChange = event => {
        this.setState({pictureName: event.currentTarget.value.toLowerCase()})
    };

    handleSubmit = event => {
        event.preventDefault();
        if(this.state.pictureName.trim() === ''){
            return alert('Ввeдите название картинки')
        };

        this.props.onSubmit(this.state.pictureName);
        this.setState({pictureName: ''})
    };
   
    render() {
        return (
            <SearchBar>
            <SearchForm onSubmit={this.handleSubmit}>
              <SearchFormButton type="submit">
                <SearchFormLabel>Search</SearchFormLabel>
              </SearchFormButton>          
              <SearchFormInput
                type="text"
                autocomplete="off"
                autoFocus
                placeholder="Search images and photos"
                value={this.state.pictureName}
                onChange={this.handleNameChange}
              />
            </SearchForm>
          </SearchBar> 
        )
    }

};

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
}