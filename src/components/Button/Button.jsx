import PropTypes from 'prop-types';
import { LoadMoreButton } from './Button.styled';

export const Button = ({onClick}) => {

    return (
        <LoadMoreButton 
        type="button"
        data-action="load-more"
        onClick={onClick}
        >
            Load more
        </LoadMoreButton>
    )
};

Button.propTypes = {
    onClick: PropTypes.func
}


   
