import * as React from 'react';
import { Container, Card, Grid, Typography, Box } from '@mui/material';
import { useState, useRef } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import './home.css'
import CardScroll from '../../components/card';
import { getCategories } from '../../core/categories';
import { useEffect } from 'react';
import Animations from '../../components/skeleton';

const Home =({setUser})=>{


    const [categories, setCategories] = useState([])
    const [pageRef , setPageRef] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
      setLoading(true)
      getCategories().then((res)=>{
            console.log(res)
            if(res.success) {
              let ref = []
              res.Categories.map((cat)=>{
                const re = React.createRef();
                ref.push(re)
              })
              setPageRef(ref)
              setCategories(res.Categories)
              setLoading(false)
            }
        }).catch(e=> setLoading(false))
    },[])

    const scrollToRef = ref => ref.current.scrollIntoView({ behavior: "smooth" });
    const scrollToPane = num => scrollToRef(pageRef[num]);

      return (
      <Container sx={{marginTop:10, marginBottom:10}}>
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
           Menu
            </Typography>
        </Box>

        {
          loading && <Animations/>
        }

    <ScrollMenu>
    {
          categories.map((cat,index)=>{
            return <Box onClick={() => {scrollToPane(index)}} key={index} style={{cursor:'pointer',width:300, heigth:300,boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', padding:5, margin:20}}>
               <img src={cat.image} style={{ maxWidth: '90%', maxHeight: '90%', marginLeft: 'auto', marginRight: 'auto' }} />
              <Typography>
                {cat.name}
              </Typography>
            </Box>
          })
        }
    </ScrollMenu>

        {
          categories.map((cat,index)=>{
            return <Box ref={pageRef[index]} key={index}>
            <Box sx={{marginTop:5, alignItems:'flex-start', display:'flex'}}>
            <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block', color:'#a61d24' } }}
          >
            {cat.name}
            </Typography>
            </Box>
            {
                !cat.items.length && <Box style={{display:'flex', justifyContent:'center'}}>
                  <Typography>
                  No Items For this Category
                </Typography>
                  </Box>
              }
            <Grid container spacing={2} sx={{marginTop:5}}>
           
{
              cat.items.map((item, index1)=>{
                return <Grid key={index1} item lg={3}>
                  <Box style={{boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', padding:5}}>
               <img src={item.image} style={{ maxWidth: '90%', maxHeight: '90%', marginLeft: 'auto', marginRight: 'auto' }} />
              <Typography>
                {item.name}
              </Typography>
              <Typography>
                {item.description}
              </Typography>
              <Typography>
                {item.price}$
              </Typography>
            </Box>
                  </Grid>
              })
            }
            </Grid>
            </Box>
          })
        }

    </Container>  
  );

}

export default Home