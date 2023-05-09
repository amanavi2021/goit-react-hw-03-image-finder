import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ smallImage, largeImage, alt, onClick }) => (
    <GalleryItem>
     <GalleryItemImage 
     src={smallImage} 
     alt={alt}
     data-image={largeImage}
     onClick={onClick}/>
   </GalleryItem>
)

ImageGalleryItem.propTypes = {
    smallImage: PropTypes.string.isRequired,
    largeImage: PropTypes.string.isRequired,
    alt: PropTypes.number.isRequired,
    onClick: PropTypes.func
}