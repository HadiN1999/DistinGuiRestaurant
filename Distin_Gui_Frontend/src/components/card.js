import * as React from 'react';
import {Card, CardContent,CardMedia,Typography,CardActionArea} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
const CardScroll = ({isCategory, item}) => {

  return (
    <Card sx={{ maxWidth: 345, padding:5, cursor:'pointer' }}>
      {isCategory&&<CardActionArea>
        <img src={item.image} style={{ maxWidth: '90%', maxHeight: '90%', marginLeft: 'auto', marginRight: 'auto' }} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.name}
          </Typography>
        </CardContent>
      </CardActionArea>}
        {
            !isCategory && <CardActionArea>
        <CardContent>
        <AddIcon sx={{fontSize:78, color:'#a61d24'}}/>
          <Typography sx={{color:'#a61d24'}} gutterBottom variant="h5" component="div">
            Create Category
          </Typography>
        </CardContent>
      </CardActionArea>
        }
    </Card>
  );
}

export default CardScroll