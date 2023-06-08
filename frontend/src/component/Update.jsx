import React, { useEffect} from "react";
import {useForm} from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'


export default function  Update(){
    const {register , handleSubmit,setValue,reset} = useForm()
    // const [data,setData] = useState({})
    const Navigate = useNavigate()

    const {id}= useParams()




    useEffect(()=>{
        fetch("http://localhost:4000/update/"+id).then((res)=>{
            if(res.ok){
                return res.json()
               
            }
        }).then((data)=>{
            console.log(data)
                setValue("sku",data.sku)
                setValue("name",data.name)
                setValue("price",data.price)
                setValue("model",data.model)
                setValue("manufacturer",data.manufacturer)
        }).catch((error)=>{
            console.log(error)
        })
    },[])




    const onSubmit=(data)=>{

      fetch(`http://localhost:4000/update/${id}`,{
        headers:{
            "Content-Type":"application/json"
        },
        method:"PUT",
        body:JSON.stringify(data)
      }).then((res)=>{
        return res.json()
      }).then((data)=>{
          reset();
          Navigate("/")
      }).catch((error)=>{
        console.log(error)
      })




        console.log(data)
    
    }
    return(
        <>
          <div className="container">
            <div className="row">
              <div className="col-sm-4"></div>
              <div className="col-sm-4">
                <h1>Add Products!</h1>
                <form  onSubmit={handleSubmit(onSubmit)}>
                    <p>
                      <input type="number"
                      name="sku"
                      {...register('sku',{required:true})}
                      className="form-control" />
                    </p>
                    <p>
                      <input type="text"
                      name="name"
                      {...register('name',{required:true})}

                      className="form-control" />
                    </p>
                    <p>
                      <input type="number"
                      name="price"
                      {...register('price',{required:true})}
                      className="form-control" />
                    </p>
                    <p>
                      <input type="text"
                      name="model"
                      {...register('model',{required:true})}
                      className="form-control" />
                    </p>
                    <p>
                      <input type="text"
                      name="manufacturer"
                      {...register('manufacturer',{required:true})}
                      className="form-control" />
                    </p>
                    <input type="submit"
                    value="Update-Product"
                    className="btn btn-outline-success" />
                </form>
              </div>
              <div className="col-sm-4"></div>
            </div>
          </div>
        </>
    )
}