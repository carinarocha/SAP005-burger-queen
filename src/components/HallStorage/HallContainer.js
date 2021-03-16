import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles} from '@material-ui/core';


const useStyles = makeStyles((theme)=>({
    root:{
        minHeight: '100vh',
        width: '100%',
        paddingLeft: 0,
        paddingRight: 0,
    },
}));

export const HallContainer = ({children,...props})=>{
    const styles = useStyles();
    return(
        <Container 
            className={styles.root}
            component='main'
            {...props}
            >
            {children}
        </Container>
    );
};
