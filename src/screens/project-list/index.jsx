import React,{useEffect, useState} from "react";
import {SearchPanel} from "./search-panel";
import {List} from "./list";
import {cleanObject} from "../../utils";
import qs from "qs";

/*
    npm start: 读.env.development文件中的REACT_APP_API_URL变量
    npm build: 读.env文件中的REACT_APP_API_URL变量
 */
const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () =>{
    const [users,setUsers] = useState([]);

    const [param,setParam] = useState({
        name: '',
        personId: ''
    });

    const [list,setList] = useState([]);

    useEffect(()=>{
       fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async response =>{
                if(response.ok){
                    setList(await response.json())
                }
            })
    },[param])

    useEffect(()=>{
       fetch(`${apiUrl}/users`)
            .then(
                async response =>{
                    if(response.ok){
                        setUsers(await response.json())
                    }
                }
            )

    },[])

    return <div>
        <SearchPanel param={param} setParam={setParam} users={users} />
        <List list={list} users={users}/>
    </div>
}