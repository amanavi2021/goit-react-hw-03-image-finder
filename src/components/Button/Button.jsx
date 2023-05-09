import ImageApiService from "services/image-service";
import { LoadMoreButton } from './Button.styled';
import { Component } from "react";
import PropTypes from 'prop-types';

 const imagesApiService = new ImageApiService();

export class Button extends Component {

    componentDidUpdate(prevProps, prevState) {
        const prevQuery = prevProps.searchQuery;
        const nextQuery = this.props.searchQuery;
        if (nextQuery !== prevQuery) {
            imagesApiService.resetPage();
        }

    };

    handleLoadMore = () =>{

        const { searchQuery, onClick } = this.props;
             
        imagesApiService.query = searchQuery;
        imagesApiService.incrementPage();
        imagesApiService.fetchImages()
        .then(images => onClick(images.hits)
        );
        }


render(){
    return (
        <LoadMoreButton 
        type="button"
        data-action="load-more"
        onClick={this.handleLoadMore}>
            Load more
        </LoadMoreButton>
    )
}
};

Button.propTypes = {
    searchQuery: PropTypes.string.isRequired,
    onClick: PropTypes.func
}


   
