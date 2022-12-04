import * as React from 'react';
import {Card, CardContent,CardMedia,Typography,CardActionArea, Box} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

const CardScroll = ({setDescription,
setPrice,isItem,setIsCategories,isCategory, item, deleteCategory,modal,setModal,setCategoryImage, setName,setCategory}) => {

  return (
    <Card sx={{ maxWidth: 345,  padding:5, cursor:'pointer' }}>
      {isCategory&&<CardActionArea>
        <img src={item.image} style={{ maxWidth: '90%', maxHeight: '90%', marginLeft: 'auto', marginRight: 'auto' }} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.name}
          </Typography>
          {isItem&&<>
          <Typography gutterBottom variant="h5" component="div">
            Description: {item.description}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            Price: {item.price}$
          </Typography>
          </>}
          
        </CardContent>
        <Box style={{display:'flex', alignItems:'center', justifyContent:isItem?'space-evenly':'space-between'}}>
            <EditIcon onClick={() => {
                setModal({...modal, open:true, view:'edit', id:item._id})
                setName(item.name)
                setCategoryImage(item.image)
                if(isItem){
                  setPrice(item.price)
                  setDescription(item.description)
                }
              }} sx={{ cursor: 'pointer', color: '#a61d24', fontSize: '3vh' }} />
            {!isItem&&<VisibilityIcon onClick={() => {
              setCategory(item)
              setIsCategories(true)
              }} sx={{ cursor: 'pointer', color: '#a61d24', fontSize: '3vh' }} />}
            <DeleteIcon onClick={() => {
              console.log('item====>', item._id)
              deleteCategory(item._id)
              }} sx={{ cursor: 'pointer', color: '#a61d24', fontSize: '3vh' }} />
          </Box>
      </CardActionArea>}
        {
            !isCategory && <CardActionArea>
        <CardContent>
        <AddIcon sx={{fontSize:78, color:'#a61d24'}}/>
          <Typography sx={{color:'#a61d24'}} gutterBottom variant="h5" component="div">
            {isItem?'Create Item':'Create Category'}
          </Typography>
        </CardContent>
      </CardActionArea>
        }
    </Card>
  );
}

export default CardScroll