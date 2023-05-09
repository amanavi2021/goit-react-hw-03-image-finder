import { Component } from "react";
import PropTypes from 'prop-types';
// import { toast } from "react-toastify";
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Loader } from 'components/Loader/Loader';
import { Button } from "components/Button/Button"
import ImageApiService from "services/image-service";

import { Gallery, ErrorMessage } from './ImageGallery.styled';

const imagesApiService = new ImageApiService();

export class ImageGallery extends Component {
    state = {
        images:[],
        error: null,
        status:'idle'

    };

      componentDidUpdate(prevProps, prevState) {
        const prevQuery = prevProps.searchQuery;
        const nextQuery = this.props.searchQuery;
        if (prevQuery !== nextQuery) {
          
            this.fetchImages(nextQuery);
        }
    };

     fetchImages = (query) => {
        this.setState({status: 'pending'});
        imagesApiService.resetPage();
        imagesApiService.query = query;
        imagesApiService.fetchImages()
        .then(images => {
            if (images.hits.length !== 0) {
                this.setState({images:images.hits, status:'resolved'});
            } else {
                this.setState({images:[], error: 'Нет картинок', status: 'rejected'});
            }
        })
        .catch(error => this.setState({error, status: 'rejected'}));

    };

        handleLoadMore = newImages => {
        this.setState({images: [...this.state.images, ...newImages]});
    };
    
    
    render() {
        const { images, error, status } = this.state;
        const { searchQuery, onClick } = this.props;
        if (status === 'pending') {
            return <Loader/>
        };
        if (status === 'rejected') {
            return (
                <ErrorMessage>
                <p>{error}</p>
                </ErrorMessage>)
        };
        
        if (status === 'resolved') {
            return (
            <div>
            <Gallery>
                {images.map(({ id, webformatURL, largeImageURL}) => 
                <ImageGalleryItem
                key={id} 
                alt={id} 
                smallImage={webformatURL}
                largeImage={largeImageURL}
                onClick={onClick}                
                />
                )}
            </Gallery>
             <Button searchQuery={searchQuery} onClick={this.handleLoadMore} />
            </div>
            
            )
        }
    };

};

ImageGallery.propTypes = {
    searchQuery: PropTypes.string.isRequired,
    onClick: PropTypes.func
};

