import {
    TouchableOpacity,
    View
  } from "react-native";

import { Feather } from '@expo/vector-icons';

import React, {useContext} from 'react'

import { AuthContext } from "../contexts/AuthContext"; 

export default function BotaoSair() {

    const {deslogarUsuario} = useContext(AuthContext)



    return(
        
        <TouchableOpacity onPress={deslogarUsuario} style={{marginRight:20}}>
            <Feather name="log-out" size={24} color="black" />
        </TouchableOpacity>
       
    )
}