import { PostContext } from "./postcontext";
import { useState } from "react";
import axios from "axios";
const Postprovider = (props) => {
  const [data, setdata] = useState([]);
  const [post, setpost] = useState({label:"", photo_url:""})
  const [id, setid] = useState("");
  const fetchdata = () => {
    axios.get("http://localhost:5000/gallery").then((res) => {
      setdata(res.data.postdata.reverse());
    });
  };
  fetchdata();
  function Deletepost(){
    axios.delete(`http://localhost:5000/gallery/${id}`).then((res)=>{
       fetchdata()
    })
 }  
function postdata(){
    axios.post("http://localhost:5000/gallery", post).then((res)=>{
        fetchdata()
    })
}
  return (
    <PostContext.Provider value={{data, Deletepost, postdata, post, setpost, setid}}>{props.children}</PostContext.Provider>
  );
};
export default Postprovider;
