import * as React from 'react';
import { Container, Card, Grid, Typography, Box, Modal } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { getCategories } from '../../core/categories';
import CardScroll from '../../components/card';
import Category from './category/category';
import Item from './item/item';

const Admin =({setUser})=>{

    const [iscategories, setIsCategories] = useState(false)

    const changeView =()=>{
        return !iscategories?  <Category/> : <Item/>
    }

      return (
      <Container sx={{marginTop:10}}>
        
        {changeView()}

      </Container>  
  );

}

export default Admin