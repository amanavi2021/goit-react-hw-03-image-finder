import { Component } from "react";
import { Searchbar } from "components/Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from "components/Modal/Modal";
import { Loader } from 'components/Loader/Loader';
import { Button } from "components/Button/Button"
import ImageApiService from "services/image-service";

import { GalleryApp, ErrorMessage } from './App.styled';

const imagesApiService = new ImageApiService();

export class App extends Component {

  state = {
    searchQuery: '',
    images:[],
    error: null,
    isLoading: false,
    showModal: false,
    currentImageUrl: '',
  };  
  
 componentDidUpdate(preProps, prevState) {
    const prevQuery = prevState.searchQuery;
        const nextQuery = this.state.searchQuery;
        if (prevQuery !== nextQuery) {
          imagesApiService.resetPage();
          this.getImages();
                   
      }
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

   async getImages() {
    const {searchQuery} = this.state;
    try{
      this.setState({isLoading: true});
      imagesApiService.query = searchQuery;
      const images = await imagesApiService.fetchImages();
      if (images.hits.length === 0){
        this.setState({images: [], isLoading: false, error: "Unfortunately there are no such images"})
      } else {

        this.setState({images: images.hits, isLoading: false, error: null});
      }

    } catch (error) {
      this.setState({error: error, isLoading: false})
    }

   };

   async getMoreImages() {
    const {searchQuery, images} = this.state;
    try{
      this.setState({isLoading: true});
      imagesApiService.query = searchQuery;
      const newImages = await imagesApiService.fetchImages();

      if (newImages.hits.length === 0){
        this.setState({images: [], isLoading: false, error: "Unfortunately there are no such images"})
      } else {

        this.setState({images: [...images, ...newImages.hits], isLoading: false, error: null});
      }

    } catch (error) {
      this.setState({error: error, isLoading: false})
    }

   };

   handleLoadMore = () => {
       this.getMoreImages();  
   };

   render() {
    const { showModal, currentImageUrl, images, isLoading, error } = this.state;
    return (
      <GalleryApp>
        <Searchbar onSubmit={this.handleSearchFormSubmit}/>
        {isLoading && <Loader/>}
        {images.length ===  0 ? <ErrorMessage><p>{error}</p></ErrorMessage> : 
        <ImageGallery 
        images={images}
        onClick={this.handleImageClick}/>
         } 
        {images.length >= 12 && <Button 
        onClick={this.handleLoadMore} 
        />}
        { showModal && <Modal imageURL={currentImageUrl} onClose={this.toggleModal}/>}
        <ToastContainer/>
      </GalleryApp>
      
    );
  };
  
};
