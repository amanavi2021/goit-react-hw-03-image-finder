import { Component } from "react";
import PropTypes from 'prop-types';
import { Overlay, ImageModal } from './Modal.styled';

export class Modal extends Component {
    
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    };

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }
    
    handleKeyDown = event => {
        if (event.code === "Escape") {
            this.props.onClose();
        };
    };

    handleBackdropClick = event => {
        if (event.currentTarget === event.target) {
            this.props.onClose();
        }
    };


    render() {
     const { imageURL } = this.props;
     return (
        <Overlay onClick={this.handleBackdropClick}>
            <ImageModal>
                <img src={imageURL} alt="" />
            </ImageModal>
        </Overlay>
     )   
    }
};

Modal.propTypes = {
    imageURL: PropTypes.string.isRequired,
    onClose: PropTypes.func
}