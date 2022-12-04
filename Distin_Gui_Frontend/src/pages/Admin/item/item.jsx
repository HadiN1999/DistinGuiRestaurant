import * as React from 'react';
import { Container, Card, Grid, Typography, Box, Modal } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { getCategories } from '../../../core/categories';
import CardScroll from '../../../components/card';

const Item =({setUser})=>{

    const [categories, setCategories] = useState([])

    useEffect(()=>{
        getCategories().then((res)=>{
            if(res.success) setCategories(categories)
        })
    },[])

      return (
      <Container sx={{marginTop:10}}>
        <Typography
            variant="h2"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block', color:'#a61d24' } }}
          >
           Admin Categories
         </Typography>

         {
            !categories.length && <Box sx={{cursor:'pointer',marginTop:10, display:'flex', justifyContent:'center'}}>
                <CardScroll isCategory={false}/>
            </Box>
         }

        {
            categories.length>0 && <Grid Container>
                {
                    categories.map((cat,index)=>{
                        return(
                            <></>
                        )
                    })
                }
            </Grid>
        }

        </Container>  
  );

}

export default Item