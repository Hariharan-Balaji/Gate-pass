import { TextField } from '@material-ui/core';
import './visitorForm.css'
import React, { useState } from 'react'
import './visitorForm.css';
import { useSelector } from 'react-redux';
import axios from 'axios';

function VisitorForm() {


  const residentData = useSelector(( state) => state.residentData.residentData);

  let date = new Date();

  console.log(date);
  



  const [ visitorData , setVisitorData] = useState( {

    name:"",
    email:"",
    roomNumber:"",
    purposeOfVisit:"",
    photo:"",
  })
  
  const handleChange = (e) => {

    const name = e.target.name;
   
    if(name==='photo')
    {
  
      setVisitorData({ ...visitorData , photo:URL.createObjectURL(e.target.files[0])});

    }
    else
    setVisitorData({ ...visitorData , [name]:e.target.value});
    
  }

  const handleClick = () => {


    
        
         const res =   residentData.filter( ( data , i ) => {
 
                 return data.roomNumber === visitorData.roomNumber
                     
      })
      

       const finalData = {...visitorData , "residentId":res[0].id , "timestamp" :date};


      
    console.log(finalData);
      axios.post(`http://localhost:3002/visitorResidentMapping` ,finalData);


    
  }

  return (
    <div className='visitor__form'>
          
          <div className='visitor__form__div'>
              <h1 className='visitor__heading'> Apply for a Gate Pass </h1>
          <form className='visitor__form__form'> 
                     <input placeholder='Name' name='name' className='visitor__input' type='text' size="30" onChange={(e) => handleChange(e)}/>

                     <input placeholder='Email' name='email' className='visitor__input' type='email' size="30" onChange={(e) => handleChange(e)}/>

                    <input placeholder='Room #' type='text' name='roomNumber' className='visitor__input' size="30" onChange={(e) => handleChange(e)}/>

                    <textarea placeholder='Purpose of Visit' name='purposeOfVisit' className='visitor__input2' rows="5" cols="30"  onChange={(e) => handleChange(e)} />
  
                      <div className='visitor__image'>

                      <label class="custom-file-upload" > 
                        <input type="file"  onChange={(e) => handleChange(e)} name='photo' />
                          Upload your photo
                          </label>
                    
                    { visitorData.photo !== "" && <img className='visitor__img__display' src={visitorData.photo}/>}
                      </div>
                    
                    <button type='button' className='visitor__btn' onClick={handleClick}> Apply </button>


         </form>      
          </div>
         
      
    </div>
  )
}

export default VisitorForm