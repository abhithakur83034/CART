import React from "react";
import {useForm} from 'react-hook-form'

export default function Addproduct(){
  const {register , handleSubmit, reset} = useForm()


 const onSubmit=(data)=>{
  console.log("DAta" , data)
  const  file  = data.file;
  const fileName = file[0]?.name || ""; // Retrieve the filename
  
  console.log("Filename:", fileName);
  


//  data.file=fileName

  let url ="http://localhost:4000/register"
    
  fetch(url,{
    headers:{
      "Content-Type":"application/json"
    },
    method:"POST",
    body:JSON.stringify(data)
  }).then((res)=>{
    if(res.ok){
      alert('Product added successfully')
    }
  }).then(()=>{
        reset()
  }).catch((error)=>{
    console.log(error)
  })
 

  console.log(data.file)
 }
    return(
        <>
          <div className="container">
            <div className="row">
              <div className="col-sm-4"></div>
              <div className="col-sm-4">
                <h1>Add Products!</h1>
                <form  action="http://localhost:4000/register"  method="post" encType="multipart/form-data">
                    <p>
                    <input
                        type="file"
                        name="image"
                        {...register("image", { required: true })}
                        className="form-control"
                      />
                    </p>
                    <p>
                      <input type="number"
                      name="sku"
                      {...register('sku',{required:true})}
                      placeholder="Enter sku"
                      className="form-control" />
                    </p>
                    <p>
                      <input type="text"
                      name="name"
                      {...register('name',{required:true})}
                      placeholder="Enter name"
                      className="form-control" />
                    </p>
                    <p>
                      <input type="number"
                      name="price"
                      {...register('price',{required:true})}
                      placeholder="Enter price"
                      className="form-control" />
                    </p>
                    <p>
                      <input type="text"
                      name="model"
                      {...register('model',{required:true})}
                      placeholder="Enter model"
                      className="form-control" />
                    </p>
                    <p>
                      <input type="text"
                      name="manufacturer"
                      {...register('manufacturer',{required:true})}
                      placeholder="Enter manufacturer"
                      className="form-control" />
                    </p>
                   
                    <input type="submit"
                    value="Add-Product"
                    className="btn btn-outline-success" />
                </form>
              </div>
              <div className="col-sm-4"></div>
            </div>
          </div>
        </>
    )
}