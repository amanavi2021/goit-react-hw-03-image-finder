import PropTypes from 'prop-types';
import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Gallery } from './ImageGallery.styled';

    export const ImageGallery = ({ images, onClick }) => {
           return (
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
            )
};

ImageGallery.propTypes = {
    searchQuery: PropTypes.arrayOf(PropTypes.shape
    ),
    onClick: PropTypes.func
};

