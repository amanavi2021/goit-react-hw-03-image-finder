import { Component } from "react";
import PropTypes from 'prop-types';
import { toast } from "react-toastify";

import { FcSearch } from 'react-icons/fc';
import { SearchBar, SearchForm, SearchFormButton, SearchFormLabel, SearchFormInput} from "./Searchbar.styled";

export class Searchbar extends Component {
    state = {
      searchQuery:'',
    };

    handleNameChange = event => {
        this.setState({searchQuery: event.currentTarget.value.toLowerCase()})
    };

    handleSubmit = event => {
        event.preventDefault();
        if(this.state.searchQuery.trim() === ''){
          return toast('Ввeдите название картинки');  
        };

        this.props.onSubmit(this.state.searchQuery);

    };
   
    render() {
        const { searchQuery } = this.state;
        return (
            <SearchBar>
            <SearchForm onSubmit={this.handleSubmit}>
              <SearchFormButton type="submit">
              <FcSearch size="32" />
                <SearchFormLabel>Search</SearchFormLabel>
              </SearchFormButton>          
              <SearchFormInput
                type="text"
                autocomplete="off"
                autoFocus
                placeholder="Search images and photos"
                value={searchQuery}
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