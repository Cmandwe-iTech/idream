import { PostContext } from "./postcontext";
import { useEffect, useState } from "react";
import axios from "axios";
const Postprovider = (props) => {
  const [data, setdata] = useState([]);
  const [post, setpost] = useState({ label: "", photo_url: "" });
  const [id, setid] = useState("");
  useEffect(() => {
    axios.get("https://dreamgallery.onrender.com/gallery").then((res) => {
      setdata(res.data.postdata.reverse());
    });
  }, [data]);
  function Deletepost() {
    axios
      .delete(`https://dreamgallery.onrender.com/gallery/${id}`)
      .then((res) => {
        console.log("ok");
      });
  }
  function postdata() {
    axios
      .post("https://dreamgallery.onrender.com/gallery", post)
      .then((res) => {
        setdata(res.data.postdata.reverse());
      });
  }
  return (
    <PostContext.Provider
      value={{ data, Deletepost, postdata, post, setpost, setid }}
    >
      {props.children}
    </PostContext.Provider>
  );
};
export default Postprovider;
