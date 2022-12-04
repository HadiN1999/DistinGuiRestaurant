import * as React from 'react';
import { Container, Card, Grid, Typography, Box } from '@mui/material';
import { useState } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import './home.css'
import CardScroll from '../../components/card';
const images = [{
    url:'https://graceandabes.com/wp-content/uploads/2019/06/Pizza-Home-Hero.jpg'
},{
    url:'https://media.istockphoto.com/id/1081422898/photo/pan-fried-duck.jpg?b=1&s=170667a&w=0&k=20&c=RRljEgn_wsgIq_9bHcX1pJi6E842KKxr82xzftiDe8I='
},{
    url:'https://cdn.boatinternational.com/bi_prd/bi/library_images/1uWaIIyTamwJb91nKEih_fine-dining-ss.jpg'
}]

const Home =({setUser})=>{


      return (
      <Container sx={{marginTop:10}}>
        <Box sx={{position:'relative'}} >
        <img
        width={'100%'}
        src={`https://png.pngtree.com/thumb_back/fh260/background/20190220/ourmid/pngtree-food-spicy-and-seductive-lobster-shellfish-chinese-meal-background-image_6705.jpg`}
        srcSet={`https://png.pngtree.com/thumb_back/fh260/background/20190220/ourmid/pngtree-food-spicy-and-seductive-lobster-shellfish-chinese-meal-background-image_6705.jpg`}
        loading="lazy"
      />

      <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ position:'absolute', display: { xs: 'none', sm: 'block', color:'white' }, top:'50%', right:450 }}
          >
           Welcome To Distin Gui Restaurant
        </Typography>

        </Box>

        <Box sx={{marginTop:5, alignItems:'flex-start', display:'flex'}}>
            <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block', color:'#a61d24' } }}
          >
           Categories
            </Typography>
        </Box>

    <ScrollMenu>
        <CardScroll/>
        <CardScroll/>
        <CardScroll/>
        <CardScroll/>
        <CardScroll/>
        <CardScroll/>

    </ScrollMenu>

    </Container>  
  );

}

export default Home