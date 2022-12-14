import * as React from 'react';
import { Container, Card, Grid, Typography, Box, Modal, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { createItem, deleteItem, getCategories, getItems, updateItem } from '../../../core/categories';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CardScroll from '../../../components/card';
import ImageInput from '../../../components/inputImage';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Snack from '../../../components/snackbar';
import Animations from '../../../components/skeleton';
const Item =({category,setIsCategories})=>{

    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingSkel, setLoadingSkel] = useState(false)
    const [snackbarOption, setSnackbarOption] = useState({
        open:false,
        severity:'warning',
        message:'test'
    })

    const close=()=>{
        setSnackbarOption({...snackbarOption,
        open:false,
    })
    }

    useEffect(()=>{
       getItem()
    },[category])

    const getItem =()=>{
        setLoadingSkel(true)
        getItems(category._id).then((res)=>{
            if(res.success) setCategories(res.items)
            setLoadingSkel(false)
        })
    }

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
    const [categoryImage, setCategoryImage] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [modal, setModal] = useState({
        open:false,
        view:'add',
        id:''
    })

    const handleSubmit =(event)=>{
        setLoading(true)
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let paylaod = {
        category:category._id,
        name: data.get('name'),
        description:data.get('description'),
        price:data.get('price'),
        image: categoryImage,
        
    }

    console.log('Payloaddd===>', paylaod)

    if(modal.view === 'add')createItem(paylaod).then((res)=>{
        if(res.success)
        {
            getItem()
            setModal({...modal, open:false})
            setCategoryImage('')
            setSnackbarOption({...snackbarOption, open:true, message: res.message, severity:'success'})
        setLoading(false)
        }
    })
    else {
        updateItem(modal.id,paylaod).then((res)=>{
        if(res.success)
        {
            getItem()
            setModal({...modal, open:false})
            setSnackbarOption({...snackbarOption, open:true, message: res.message, severity:'success'})
        setLoading(false)
        }
    })
    }
}

    const deletCat =(itemId)=>{
        deleteItem(category._id, itemId).then(res=>{
            if(res.success) {
                getItem()
                setSnackbarOption({...snackbarOption, open:true, message: res.message, severity:'success'})
            }
        })
    }

    const handleOnDragEnd =(result)=> {
    if (!result.destination) return;

    const items = Array.from(categories);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCategories(items);
  }


  const [drag, setDrag]= useState(false)

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
              defaultValue={modal.view==='edit'?name:''}
              required
              fullWidth
              id="name"
              label="Item Name"
              name="name"
              autoFocus
            />
            <TextField
              margin="normal"
              defaultValue={modal.view==='edit'?description:''}
              required
              fullWidth
              id="name"
              label="Description"
              name="description"
              autoFocus
            />
            <TextField
              margin="normal"
              defaultValue={modal.view==='edit'?price:''}
              required
              fullWidth
              type={'number'}
              id="Price"
              label="Price"
              name="price"
              autoFocus
            />
            <ImageInput categoryImage={categoryImage} setCategoryImage={setCategoryImage} />
            <Button
              type="submit"
              fullWidth
              disabled={loading}
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor:'#a61d24',"&.MuiButtonBase-root:hover": {
                bgcolor: "#a61d24"
              } }}
            >
             {modal.view==='add'?'Create Items':'Update Items'} 
            </Button>
          </Box>
                </Box>
            </Modal>
        <Box style={{display:'flex', alignItems:'center'}}>
            <ArrowBackIcon onClick={() => {
                setIsCategories(false)
              }} sx={{ cursor: 'pointer', color: '#a61d24', fontSize: '10vh' }} />    
        <Typography
            variant="h2"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block', color:'#a61d24' } }}
          >
           {category.name} Items
         </Typography>
            </Box>    


         {
            loadingSkel && <Animations/>
         }   
        

         {
            !categories.length && <Box onClick={()=>setModal({...modal, open:true})} sx={{cursor:'pointer',marginTop:10, display:'flex', justifyContent:'center'}}>
                <CardScroll isItem isCategory={false}/>
            </Box>
         }

        {
            categories.length>0 && !loadingSkel && <Grid container spacing={2} sx={{marginTop:5}}>
                {
                    categories.map((cat,index)=>{
                        return(
                            <Grid key={index} item lg={3}>
                                <CardScroll isItem setCategoryImage={setCategoryImage} setDescription={setDescription} setPrice={setPrice} setName={setName} modal={modal} setModal={setModal}  deleteCategory={deletCat} isCategory={true} item={cat}/>
                            </Grid>
                        )
                    })
                }
                <Grid item lg={3}>
                    <Box onClick={()=>{
                        setModal({...modal, open:true, view:'add', id:''})
                        setCategoryImage('')
                        }}>
                    <CardScroll isItem isCategory={false}/>
                    </Box>
                </Grid>
            </Grid>
        }
        <Snack close={close} open={snackbarOption.open} severity={snackbarOption.severity} message={snackbarOption.message} />

        </Container>  
  );

}

export default Item