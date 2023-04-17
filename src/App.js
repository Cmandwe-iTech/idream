import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [data, setdata] = useState([]);
  const [post, setpost] = useState({ label: "", photo_url: "" });
  const [text, settext] = useState("");
  const [fd, setfd] = useState([]);
  const [btn, setbtn] = useState(false);
  const [btns, setbtns] = useState(false);
  const [id, setid] = useState("");
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
  useEffect(() => {
    axios.get("https://dreamgallery.onrender.com/gallery").then((res) => {
      setdata(res.data.postdata.reverse());
    });
  }, [data]);
  useEffect(() => {
    if (text === "") {
      setfd(data);
    } else {
      let arr = data.filter((item, i) =>
        item.label.toLocaleLowerCase().includes(text)
      );
      setfd(arr);
    }
  }, [data, text, setfd]);
  return (
    <div className="post-container">
      <div className="header">
        <span>
          <h6>Chhatrapati</h6>
          <p>cm@gmail.com</p>
        </span>
        <input
          type="text"
          onChange={(e) => settext(e.target.value)}
          placeholder="search by name"
        />
        <button
          type="button"
          className="btn btn-success"
          onClick={() => setbtn(true)}
        >
          Add a photo
        </button>
      </div>
      <div className={btn ? "add-photo" : "display"}>
        <h4>Add new photo</h4>
        <h6>Label</h6>
        <input
          type="text"
          placeholder="nature"
          className="inputphoto"
          onChange={(e) => {
            setpost({ ...post, label: e.target.value });
          }}
        />
        <h6>Photo URL</h6>
        <input
          type="text"
          placeholder="https://th.bing.com/th?id=OIP.fzSnClvueUiDCZNJINMWywHaEK&w=333&h=187&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
          className="inputphoto"
          onChange={(e) => {
            setpost({ ...post, photo_url: e.target.value });
          }}
        />
        <div className="float">
          <button id="cncl" onClick={() => setbtn(false)}>
            cancel
          </button>
          <button
            id="sbmt"
            onClick={() => {
              setbtn(false);
              postdata();
            }}
          >
            submit
          </button>
        </div>
      </div>
      <div className={btns ? "div1" : "div2"}>
        <h6>Are you sure?</h6>
        <input type="password" id="in"/>
        <div className="float">
          <button id="cncls" onClick={() => setbtns(false)}>
            cancel
          </button>
          <button
            id="dlt"
            onClick={() => {
              setbtns(false);
              Deletepost();
            }}
          >
            delete
          </button>
        </div>
      </div>
      <div className={!btn ? "post-gallery" : "opacity"}>
        {fd.map((item, i) => {
          return (
            <div key={i} className={!btns?"data-flex":"data"}>
              <p>{item.label}</p>
              <button
                onClick={() => {
                  setid(item._id);
                  setbtns(true);
                }}
                className="dltbtn"
              >
                delete
              </button>
              <img src={item.photo_url} alt="" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
