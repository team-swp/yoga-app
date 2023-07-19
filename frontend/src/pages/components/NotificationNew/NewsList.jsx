import React, { useEffect, useState } from 'react'
// import MenuForm from './MenuForm'
import News from './News'
import axios from 'axios'
import yogaGif from "../../../assets/yoga-2.gif";
import Navigation from '../Header/Navigation/Navigation';
import MenuForm from './MenuForm';
import { Typography } from '@mui/material';
import Footer from '../Footer/Footer';
const baseUrl = 'http://localhost:3001/api/news/get'
function NewsList() {
  const [list, setList] = useState([])
  const [listOrigin, setListOrigin] = useState([])

  useEffect(()=>{
    function compare(a, b) {
      if (a.id < b.id) {
        return 1;
      }
      if (a.id > b.id) {
        return -1;
      }
      return 0;
    }
    const test= async()=>{
        const {data} = await axios.get(`${baseUrl}`)
        const filterData = data.filter((item) => item.status === true)
        setList(filterData.sort(compare))
        setListOrigin(filterData.sort(compare))
        console.log(data.createAt);
    }
    test()
  },[])
  return (
    <div
    style={{
      backgroundImage:
        "url('https://assets.entrepreneur.com/content/3x2/2000/20200429211042-GettyImages-1164615296.jpeg')",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
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
          gutterBottom
          style={{ fontFamily: "SangBleu Sunrise", marginTop: "10px" }}
        >
          News
        </Typography>
      </div>
    
      <div style={{
        display:'flex',gap:4, justifyContent:'space-evenly',marginTop:'40px',flexWrap:'wrap'}}>
        {list.map((item)=>(
          <News item={item} items={list}/>
        ))}
      </div>
      <Footer/>
    </div>
  )
}

export default NewsList