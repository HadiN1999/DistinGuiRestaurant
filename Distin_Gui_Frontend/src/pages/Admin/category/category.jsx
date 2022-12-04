import * as React from 'react';
import { Container, Card, Grid, Typography, Box, Modal, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { createCategories, getCategories, deleteCategory, updateCategory } from '../../../core/categories';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CardScroll from '../../../components/card';
import './category.css'
import ImageInput from '../../../components/inputImage';
import Snack from '../../../components/snackbar';
const Category =({setCategory,setIsCategories})=>{

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
    const [snackbarOption, setSnackbarOption] = useState({
        open:false,
        severity:'warning',
        message:'test'
    })

    const [loading, setLoading] = useState(false)

    const close=()=>{
        setSnackbarOption({...snackbarOption,
        open:false,
    })
    }
    const [categoryImage, setCategoryImage] = useState('')
    const [name, setName] = useState('')
    const [categories, setCategories] = useState([])
    const [modal, setModal] = useState({
        open:false,
        view:'add',
        id:''
    })

    const getCategory=()=>{
        getCategories().then((res)=>{
            console.log(res)
            if(res.success) setCategories(res.Categories)
        })
    }

    useEffect(()=>{
        getCategory()
    },[])

    const handleSubmit =(event)=>{
    setLoading(true)
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let paylaod = {
        name: data.get('name'),
        image: categoryImage,
        items:[]
    }

    if(modal.view === 'add')createCategories(paylaod).then((res)=>{
        if(res.success)
        {
            getCategory()
            setModal({...modal, open:false})
            setCategoryImage('')
            setSnackbarOption({...snackbarOption, open:true, message: res.message, severity:'success'})
            setLoading(false)
        }
    })
    else {
        console.log('modall===>', modal)
        paylaod ={...paylaod, items:categories.filter(i=>i._id === modal.id)[0].items}
        updateCategory(modal.id,paylaod).then((res)=>{
        if(res.success)
        {
            getCategory()
            setModal({...modal, open:false})
            setSnackbarOption({...snackbarOption, open:true, message: res.message, severity:'success'})
            setLoading(false)
        }
    })
    }
}

    const deletCat =(id)=>{
        console.log('id===>', id)
        deleteCategory(id).then((res)=>{
            if(res.success) {
                getCategory()
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
              label="Category Name"
              name="name"
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
             {modal.view==='add'?'Create Category':'Update Category'} 
            </Button>
          </Box>
                </Box>
            </Modal>
        <Box style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <Typography
            variant="h2"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block', color:'#a61d24' } }}
          >
           Admin Categories
         </Typography>
         <Typography
            variant="h5"
            noWrap
            component="div"
            onClick={()=> setDrag(!drag)}
            sx={{ cursor:'pointer', display: { xs: 'none', sm: 'block', color:'#a61d24' } }}
          >
           {drag?'Save order':'Allow Reordering'}
         </Typography>
        </Box>    
        

         {
            categories.length ===0 && <Box onClick={()=>setModal({...modal, open:true})} sx={{cursor:'pointer',marginTop:10, display:'flex', justifyContent:'center'}}>
                <CardScroll isCategory={false}/>
            </Box>
         }

         {
            categories.length>0 && !drag && 
                        <Grid 
                        container spacing={2} sx={{marginTop:5}}>
                        {
                            categories.map((cat,index)=>{
                              return   <Grid key={index} item lg={3}>
                                        <CardScroll setIsCategories={setIsCategories} setCategory={setCategory} setCategoryImage={setCategoryImage} setName={setName} modal={modal} setModal={setModal}  deleteCategory={deletCat} isCategory={true} item={cat}/>
                                    </Grid>
                            })
                        }
                        <Grid item lg={3}>
                            <Box onClick={()=>{
                                setModal({...modal, open:true, view:'add', id:''})
                                setCategoryImage('')
                                }}>
                            <CardScroll isCategory={false}/>
                            </Box>
                        </Grid> 
                        </Grid>

       }

        {
            categories.length>0 && drag && 
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId='droppable'>
                    {(provided) => {
                        return <Grid 
                        {...provided.droppableProps}
                        ref={provided.innerRef} 
                        container spacing={2} sx={{marginTop:5}}>
                        {
                            categories.map((cat,index)=>{
                              return   <Draggable
                            key={`Input-${index}`}
                            draggableId={`Input-${index}`}
                            index={index}
                          >
                            {(provided) => {
                                return(
                                    <Grid ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                   key={index} item lg={3}>
                                        <CardScroll setIsCategories={setIsCategories} setCategory={setCategory} setCategoryImage={setCategoryImage} setName={setName} modal={modal} setModal={setModal}  deleteCategory={deletCat} isCategory={true} item={cat}/>
                                    </Grid>
                                )
                            }}
                          </Draggable>
                            })
                        }
                        <Grid item lg={3}>
                            <Box onClick={()=>{
                                setModal({...modal, open:true, view:'add', id:''})
                                setCategoryImage('')
                                }}>
                            <CardScroll isCategory={false}/>
                            </Box>
                        </Grid> 
                        </Grid>
                    }}
                    </Droppable>
                </DragDropContext>
       }
        <Snack close={close} open={snackbarOption.open} severity={snackbarOption.severity} message={snackbarOption.message} />

        </Container>  
  );

}

export default Category