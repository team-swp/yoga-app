import React, { useEffect, useState } from 'react'


import axios from 'axios'
import yogaGif from "../../../assets/yoga-2.gif";
import Navigation from '../Header/Navigation/Navigation';
import moment from "moment";
import { Menu, MenuItem, Typography } from '@mui/material';
import Footer from '../Footer/Footer';
const baseUrl = 'https://yoga-app-swp.onrender.com/api/news/get'
function NewsList() {
  const [list, setList] = useState([])
  const [listOrigin, setListOrigin] = useState([])





useEffect(() => {
  const test= async()=>{
    const {data} = await axios.get(`${baseUrl}`)
    data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Lấy phần tử có ngày tạo lớn nhất (phần tử đầu tiên sau khi đã sắp xếp)
    const latestItem = data[0];

    // Cập nhật state listOrigin với phần tử có ngày tạo lớn nhất
    setListOrigin([latestItem]);
    console.log(latestItem);
  }
test()
},[]
)



  useEffect(()=>{
    function compare(a, b) {
      if (a.createdAt < b.createdAt) {
        return 1;
      }
      if (a.createdAt > b.createdAt) {
        return -1;
      }
      return 0;
    }
    const test= async()=>{
        const {data} = await axios.get(`${baseUrl}`)
        const filterData = data.filter((item) => item.status === true)
        setList(filterData.sort(compare))
       
        console.log(data.createAt);
    }
    test()
  },[])



 




  return (
    <div
    style={{
     
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",marginBottom :'10px'
    }}>
      <Navigation/>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {" "}
        <Typography
          variant="h4"
     gutterTop
          style={{ fontFamily: "SangBleu Sunrise" }}
        >
          NOTIFICATIONS
        </Typography>
      </div>
    
      <div style={{
        display:'flex',gap:4, justifyContent:'space-evenly',marginTop:'10px',flexWrap:'wrap', marginBottom:'10px'}}>
        <div className="card px-3 pt-3" style={{ maxWidth: '60rem' }}>


      <div>
        {listOrigin.map((newses,index) =>{
          return (
            <>
             <div className="bg-image hover-overlay shadow-1-strong ripple rounded-5 mb-4" data-mdb-ripple-color="light">
          <img src="https://mdbcdn.b-cdn.net/img/new/fluid/city/113.webp" className="img-fluid" />
         
            <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
         
        </div>

        <div className="row mb-3">
         

          <div className=" text-end">
          <h4> TOP NEWS</h4>
          </div>
        </div>

       
          <h4><strong>{newses.subject}</strong></h4>

          <p style={{marginTop: '10px'}}>
           {newses.content}
          </p>
       

        <hr />
        </>
          )
        })}
       




{/* ---------------------------------------------------------------------------------------------------------------- */}
<div>
{list.map((news,index) => {
  return (
   
    <div className="row mb-4 border-bottom pb-2">
      <div className="col-3" style={{marginTop:'10px'}}>
        <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/041.webp" className="img-fluid shadow-1-strong rounded" alt="Hollywood Sign on The Hill" />
      </div>
  
      <div className="col-9">
      <strong >
            {news.subject}
          </strong>
        <p>
          <u> {moment(news.createdAt).format("DD/MM/YY")}</u>
        </p>
        <div>{news.content}</div>
      </div>
    </div>
 
  )
  
 
})}
</div>





     
      </div>
    </div>
      </div>
      <Footer/>
    </div>
  )
}

export default NewsList