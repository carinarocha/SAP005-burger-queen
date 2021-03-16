import React, {useState, useEffect} from 'react';
import {Card, CardContent, Typography,CardActions, Button, Grid, Avatar} from '@material-ui/core';
import {makeStyles} from '@material-ui/core';
import {KitchenContainer} from './KitchenContainer';
//import '../App.css';


const useStyles = makeStyles({
  root: {
    width: 205,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  avatar:{
    width: '100%',
    borderRadius: 0,
  }
});
function KitchenContent() {
    const styles = useStyles();
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        fetch('https://lab-api-bq.herokuapp.com/orders', {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "accept": "application/json",
              "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhcm9sQGFqdWRhLmNvbSIsImlkIjo4NTEsImlhdCI6MTYxNDExOTg1MiwiZXhwIjoxNjQ1Njc3NDUyfQ.yO3dmWDkQKzVgh4AqqsraSB0QfSCLTah2XO9oGA-JGQ"
            } 
          })
      .then((response) => response.json())
            .then((json) => {
                const pending = json.filter(item => item.status === "pending")
                setOrders (pending)
              console.log(pending)
            })
    }, [])
    
    return (
        <>
        <KitchenContainer>
        <Grid container direction='row' justify='center'>
        {orders && orders.map(product => (
          <Card className={styles.root} variant="outlined">
            <Avatar className={styles.avatar}>
              {product.client_name}
            </Avatar>
          <CardContent>
        <Typography className={styles.title} color="textSecondary" gutterBottom
          id = {product.id}  
          key = {product.id}
          >
        </Typography>
        <Typography variant="body2" component="p">
          {product.createdAt}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small"
        disabled = {product.qtd && product.qtd != 0} 
        onClick = { () => (product)}
        >
          Preparar pedido
        </Button>
      </CardActions>
    </Card>
    ))}
    </Grid>
    </KitchenContainer>
      </>
  )
  };
export default KitchenContent;