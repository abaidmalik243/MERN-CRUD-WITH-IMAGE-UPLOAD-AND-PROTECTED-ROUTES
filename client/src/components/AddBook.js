import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      desc: "",
      showImage: "",
      imageUpload: null
    };
  }
  componentDidMount() {
    const currentuser = localStorage.getItem("currentuser");
    console.log(JSON.parse(currentuser));
  }
  logOut = () => {
    localStorage.removeItem("currentuser");
    this.props.history.push("/");
    toast.success("Successfully Logout");
  };
  _changeHandler = e => {
    if (e.target.type === "file") {
      this.setState({
        [e.target.name]: e.target.files[0],
        showImage: URL.createObjectURL(e.target.files[0])
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  };
  AddNewBook = e => {
    let data = new FormData(); //formdata object
    e.preventDefault();
    // alert(this.BookName.value);
    const frm = this.frm.reset();
    const { name, desc, imageUpload } = this.state;
    data.append("name", name);
    data.append("desc", desc);
    data.append("imageUpload", imageUpload);
    console.log("data insert time", data.get("imageUpload"));
    axios
      .post("/api/books/add", data)
      .then(res => {
        if (res) {
          toast.success("Record Save");
		  this.props.history.push("/showBook");
        }
      })
      .catch(err => {
        toast.error(err);
      });
  };
  render() {
    const { name, desc, imageUpload } = this.state;
    return (
      <div className="container jumbotron">
        <div className="btn btn-info">
          <a href={null} onClick={this.logOut}>
            Logout
          </a>
        </div>
        <div className="col-md-6 col-md-offset-3">
          <form
            method="post"
            onSubmit={this.AddNewBook}
            ref={el => (this.frm = el)}
            encType="multipart/form-data"
          >
            <h1 style={{ textAlign: "center" }}>Add New Book</h1>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={name}
                onChange={this._changeHandler}
                required
              />
            </div>
            <div className="form-group">
              <label>desc</label>
              <input
                type="text"
                name="desc"
                className="form-control"
                value={desc}
                onChange={this._changeHandler}
                required
              />
            </div>
            <div className="form-group">
              <label>Image</label>
              <input
                type="file"
                name="imageUpload"
                className="form-control"
                onChange={this._changeHandler}
                required
              />
              <img src={this.state.showImage} />
            </div>
            <button type="submit" className="btn btn-primary form-control">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default AddBook;
