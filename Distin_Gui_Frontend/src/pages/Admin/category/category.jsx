import * as React from 'react';
import { Container, Card, Grid, Typography, Box, Modal, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { createCategories, getCategories } from '../../../core/categories';
import CardScroll from '../../../components/card';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { useRef } from 'react';
import './category.css'
const Category =({setUser})=>{

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 5,
    };
    const inputFile = useRef(null)
    const [categoryImage, setCategoryImage] = useState('')
    const [isDragging, setIsDraging] = useState(false)
    const [imageToUpload, setImageToUpload] = useState('')
    const [categories, setCategories] = useState([])
    const [modal, setModal] = useState({
        open:false,
        view:'add'
    })

    useEffect(()=>{
        getCategories().then((res)=>{
            console.log(res)
            if(res.success) setCategories(res.Categories)
        })
    },[])

    const handleSubmit =(event)=>{

    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let paylaod = {
        name: data.get('name'),
        image: categoryImage,
        items:[]
    }

    createCategories(paylaod).then((res)=>{
        if(res.success)
        {
            getCategories().then((res)=>{
            if(res.success) setCategories(res.Categories)
            })
            setModal({...modal, open:false})
        }
    })

}


const handleDrags = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setIsDraging(true)
    }

    const handleDragEnter = (e) => {
        handleDrags(e);
    }

    const handleDragOver = (e) => {
        handleDrags(e);
    }

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setIsDraging(false)
    }

    const uploadCSV = (e) => {
        const file = e.target.files[0];
        setImageToUpload(e.target.files[0])

        console.log(file)

        var reader = new FileReader();

        reader.onloadend = (e) => {

            if (['jpg', 'png', 'svg'].includes(file.name.split('.')[file.name.split('.').length - 1].toLowerCase())) {
                let imageUrl = e.target.result;
                setCategoryImage(imageUrl)
            } 
        }
        reader.readAsDataURL(file);
    }

    const handleDrop = (e) => {
        e.stopPropagation();
        e.preventDefault();

        const data = e.dataTransfer;
        const files = data.files;
        console.log("Oops...you dropped this: ", files);

        [].forEach.call(files, handleFiles);

        setIsDraging(false)
    }
    const handleFiles = (file) => {

        // this could be refactored to not use the file reader
        setImageToUpload(file)

        var reader = new FileReader();

        reader.onloadend = (e) => {

            if (['jpg', 'png', 'svg'].includes(file.name.split('.')[file.name.split('.').length - 1].toLowerCase())) {
                let imageUrl = e.target.result;
                setCategoryImage(imageUrl)
            } 

        }

        reader.readAsDataURL(file);
    }

    console.log(categories)

      return (
      <Container sx={{marginTop:10}}>
        <Modal
                open={modal.open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                onClose={()=>setModal({...modal, open:false})}
            >
                <Box sx={style}>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Category Name"
              name="name"
              autoFocus
            />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {categoryImage === '' && <div className={isDragging ? 'dragDrop dragging greyBorder' : 'dragDrop'}
                                        onDrop={handleDrop}
                                        onClick={() => inputFile.current.click()}
                                        onDragOver={handleDragOver}
                                        onDragEnter={handleDragEnter}
                                        onDragLeave={handleDragLeave} >
                    <div className="inside">
                        <div>
                            <FileUploadIcon sx={{ fontSize: '5vh', color: '#a61d24' }} className="icon" />
                        </div>
                        <Typography variant={'h6'} style={{ color: '#a61d24', fontStyle: 'italic' }} >
                            Drag Category image here or click
                        </Typography>
                    </div>
                    <input id='myInputFileId' type='file' onChange={(e) => uploadCSV(e)} ref={inputFile} style={{ display: 'none' }} />
                </div>}
                {
                    categoryImage !== '' && <Box className='documentUploaded' sx={{
                        width: '40% !important',
                        maxHeight: 300
                    }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} >
                            <DeleteIcon onClick={() => {
                                setCategoryImage('')
                            }} sx={{ cursor: 'pointer', color: '#a61d24', fontSize: '3vh' }} />
                        </Box>
                        <img src={categoryImage} style={{ maxWidth: '90%', maxHeight: '90%', marginLeft: 'auto', marginRight: 'auto' }} />
                    </Box>
                }
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor:'#a61d24',"&.MuiButtonBase-root:hover": {
                bgcolor: "#a61d24"
              } }}
            >
              Create Category
            </Button>
          </Box>
                </Box>
            </Modal>
        <Typography
            variant="h2"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block', color:'#a61d24' } }}
          >
           Admin Categories
         </Typography>

         {
            categories.length ===0 && <Box onClick={()=>setModal({...modal, open:true})} sx={{cursor:'pointer',marginTop:10, display:'flex', justifyContent:'center'}}>
                <CardScroll isCategory={false}/>
            </Box>
         }

        {
            categories.length>0 && <Grid container spacing={2} sx={{marginTop:5}}>
                {
                    categories.map((cat,index)=>{
                        return(
                            <Grid key={index} item lg={3}>
                                <CardScroll isCategory={true} item={cat}/>
                            </Grid>
                        )
                    })
                }
                <Grid item lg={3}>
                    <CardScroll isCategory={false}/>
                </Grid>
                <Box onClick={()=>setModal({...modal, open:true})}>
            </Box>
            </Grid>
        }

        </Container>  
  );

}

export default Category