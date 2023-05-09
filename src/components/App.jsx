import { Component } from "react";
import { Searchbar } from "components/Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from "components/Modal/Modal";
import { GalleryApp } from './App.styled';


export class App extends Component {

  state = {
    searchQuery: '',
    showModal: false,
    currentImageUrl: ''
  };

   handleSearchFormSubmit = searchQuery=> {
    this.setState({ searchQuery });
   };

   handleImageClick = (event) =>{
    this.setState({currentImageUrl:event.currentTarget.dataset.image});
    this.toggleModal();
   }

   toggleModal = () => {
    this.setState(({ showModal })=> ({
      showModal: !showModal,
    }));
   };

  render() {
    const { searchQuery, showModal, currentImageUrl } = this.state;
    return (
      <GalleryApp>
        <Searchbar onSubmit={this.handleSearchFormSubmit}/>
        <ImageGallery searchQuery={searchQuery} onClick={this.handleImageClick}/>
        { showModal && <Modal imageURL={currentImageUrl} onClose={this.toggleModal}/>}
        <ToastContainer/>
      </GalleryApp>
      
    );
  };
  
};
