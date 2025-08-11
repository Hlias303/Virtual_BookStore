import React, { useEffect, useState } from 'react'
import { Users , DeleteUser } from '../Services/EmployeeService'
import axios from "axios"
import Cookies from 'universal-cookie'


function ListEmployees() {

    const [employees,SetEmployees] = useState([])
    const cookies = new Cookies();

    async function FetchUsers() {
        
        const token = cookies.get("token");
        const REST_API_URL = "http://localhost:8080/Users";

        try{
            const response = await axios.get(REST_API_URL, {
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            }).then((response) => {
                SetEmployees(response.data)
            });

        } catch{
            console.log(error);
        }
    } 


    // useEffect(() => {
    //     Users().then((response) => { 
    //         SetEmployees(response.data);
    //     })

    // }, [])

    useEffect(() => {
        FetchUsers();
    },[])

    function RemoveUser(id){
        console.log(id);

        DeleteUser(id).then((response) =>{
            SetEmployees(prevEmployees => prevEmployees.filter(user => user.id !== id));

        }).catch(error => {
            console.error(error);
        })
    }

  return (
    <div className='.container-fluid '>

        <h2 className="text-center">Users</h2>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th className='text-center'>Id</th>
                    <th className='text-center'>Name</th>
                    <th className='text-center'>Password</th>
                    <th className='text-center'>Role</th>
                    <th className='text-center'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    employees.map(empl => 
                        <tr key = {empl.id}>
                            <td className='text-center'>{empl.id}</td>
                            <td className='text-center'>{empl.username}</td>
                            <td className='text-center'>{empl.password}</td>
                            <td className='text-center'>{empl.roles.map(role => role.name)}</td>
                            <td className='text-center'>
                                <button className='btn btn-info' onClick={() => RemoveUser(empl.id)}>Delete</button>
                            </td>
                        </tr>)
                }
            </tbody>
        </table>
    </div>
  )
}
export default ListEmployees
