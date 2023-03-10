import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import { Avatar, Button } from '@material-ui/core';
import './gatepassdata.css';

function GatePassData() {

  const [residentVisitorData , setresidentVisitorData] = useState([]);
  const {id} = useParams();
  
  useEffect(() => {
    
      const getResidentVisitorData = async () => {

      const res = await axios.get('http://localhost:3002/visitorResidentMapping');
      // console.log(res.data);
      
         const resArr =  res.data.filter( ( data , i) =>  ( data.residentId == id));

          
        // //  console.log(_.sortBy(resArr, 'timestamp'));

         
        //  const sortedArray = _.orderBy(resArr, [(obj) => new Date(obj.timestamp)], ['desc'])
        //  console.log(sortedArray)
      
        // //  const sortedArr = resArr.sort(( a , b) => new Date(b.timestamp).getDate()- new Date(a.timestamp).getDate());

        // //  console.log(sortedArr);
  
         setresidentVisitorData(resArr);

    }
    getResidentVisitorData();
      
  } ,[])




  console.log(residentVisitorData)


  

  

  return (
        <div>

          
          { 
             residentVisitorData.length == 0 ? <p> ZERO</p>

             :

             <div className='main__card'>
                     {residentVisitorData.map( (data , i) => {

                        return (
                          <>
                          <div className='cover__photo'></div>
                          <div className='photo'>

                           { data.photo ? <img  className='img' src={data.photo} /> : <Avatar className='img' > { data.name.charAt(0)}</Avatar>}
                          </div>

                          <div className="content">
                            <h2 className='name'>{data.name}</h2>
                            <p> 📧 {data.email}</p>
                            <p> Purpose of Visit : { data.purposeOfVisit} vaction vation avcaacaacac vaaaaaa</p>
                          </div>

                          <div className ='button'>
                            <Button variant='contained'> Approve </Button>
                            <Button variant='outlined'> Deny </Button>
                          </div>
                          </>

                          
                        )
                     })}
            </div>
          }
        </div>
  )
}

export default GatePassData