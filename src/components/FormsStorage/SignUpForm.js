import React,{useState}  from 'react';
import '../../../src/App.css';
import {FormsContainer} from '../FormsStorage/FormsContainer';
import {Forms} from '../FormsStorage/Forms';
import {Inputs} from '../FormsStorage/Inputs';
import {FormsButton} from '../FormsStorage/FormsButtons';
import {yupResolver}  from '@hookform/resolvers/yup';
import schema from '../ValidationStorage/ValidationSingUp';
import { useForm } from 'react-hook-form';
import Logo from '../LogoStorage/Logo';
import {useHistory} from 'react-router-dom'
import {makeStyles} from '@material-ui/core';
import KitchenIcon from '@material-ui/icons/Kitchen';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from  '@material-ui/core/FormLabel'
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme)=>({
    root:{
        color: 'white',
    },
    icon:{
        background: 'linear-gradient(45deg,#333, #999)',
        borderRadius: 10,
        padding: 2,
    }
}));



export const SignUpForm= ()=> {
    const styles = useStyles();
    const {register, handleSubmit, errors} = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema),
    });
    const [nome, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    
    const history = useHistory();
    const routerHall=()=>{
        history.push('/hall')
    }
    const routerKitchen=()=>{
        history.push('/kitchen')
    }

    const onSubmit = ()=>{
        alert('Sucesso, nenem');
    }
    
    const data=()=>{
        fetch('https://lab-api-bq.herokuapp.com/users', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'accept': 'application/json'
                    },
            body: `email=${email}&password=${password}&role=${role}&restaurant=subsolo&name=${nome}`
            })
            .then((response) => response.json())
            .then((json)=> {
            const token = json.token    
            const tokenUser = localStorage.setItem("token", token)
            if(tokenUser!== null && json.role === "hall") {
                routerHall()
            }
            if(tokenUser!== null && json.role === "kitchen") {
                routerKitchen()
                }
            })
    }
    return(
        <FormsContainer>
            <Logo/>
            <Forms onSubmit={handleSubmit(onSubmit)}>
                <Inputs
                    onChange={(event) => setName(event.target.value)}
                    value={nome}
                    type='text'
                    id='name' 
                    name='name' 
                    ref={register}
                    label='Name'
                    helperText={errors.name?.message}
                />
                <Inputs
                    onChange={(event) => setEmail(event.target.value)}
                    value={email}
                    type='text'
                    id='email' 
                    name='email' 
                    ref={register}
                    label='Email'
                    helperText={errors.email?.message}
                />
                <Inputs
                    onChange={(event) => setPassword(event.target.value)}
                    value={password}
                    type='password' 
                    id='password'
                    name='password' 
                    ref={register}
                    label='Senha'
                    helperText={errors.password?.message}
                />
                <FormLabel  className={styles.root}
                component="legend"
                onChange={(event) => setRole(event.target.value)}
                value={role}
                name='role' 
                ref={register}
                >
                    Local
                </FormLabel>
                <FormControlLabel className={styles.root}
                    control={<Checkbox icon={<KitchenIcon className={styles.icon}/>} 
                    checkedIcon={<KitchenIcon />} name="checkedH" />}
                    label="Cozinha"
                    value='kitchen'
                    color='secondary'
                />
                <FormControlLabel className={styles.root}
                    control={<Checkbox icon={<RestaurantIcon className={styles.icon}/>} 
                    checkedIcon={<RestaurantIcon/>} name="checkedH" />}
                    label="Salão"
                    value='hall'
                    color='secondary'
                />
                <FormsButton onClick={()=>{data();}}>Cadastrar</FormsButton>
            </Forms>
        </FormsContainer>
    );
};
