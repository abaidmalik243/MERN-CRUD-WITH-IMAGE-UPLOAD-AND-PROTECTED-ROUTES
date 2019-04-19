
import React, { Component } from 'react';
import axios from 'axios';


class UpdateBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            desc: '',
            showImage: "",
            isEditImage:false,
            imageUpload : null,
        }
    }
   
    componentDidMount (){
        const id = this.props.match.params.id;
       
    axios.get(`/api/books/`+id).then(
        resp =>
        this.setState({
            showImage:resp.data.imageUpload,
            imageUpload : resp.data.imageUpload,
            name:resp.data.name,
            desc:resp.data.desc
        })
        
        
    ).catch(err => {
        console.log(err);
    })

    }
    _changeHandler = e => {
        if (e.target.type === "file") {
          this.setState({
            [e.target.name]: e.target.files[0],
            showImage: URL.createObjectURL(e.target.files[0]),
            isEditImage:true
          });
        } else {
          this.setState({
            [e.target.name]: e.target.value
          });
        }
      };
    AddNewBook = (e) => {
        let data = new FormData();
        e.preventDefault();
        // alert(this.BookName.value);
        const frm =this.frm.reset();
            const { name ,desc,imageUpload} = this.state;
            const id = this.props.match.params.id;
            data.append("name", name);
            data.append("desc", desc);
            data.append("imageUpload", imageUpload);
            data.append("id",id);
        axios.put('/api/books/updateBook',data)
        .then(
            res => {
                if(res){  
                    console.log('update Response',res.data);
                    this.props.history.push("/showBook");
                    
                }
               
            } )
       
    }
    check = () => {
        const id = this.props.match.params.id;
        alert(id);
    }
    render() {
        const {name , desc,imageUpload} = this.state
        return (
            <div className="container jumbotron">
                <div className="col-md-6 col-md-offset-3">
                    <form method="post" onSubmit={this.AddNewBook} 
                    ref = {(el) => this.frm = el }
                    encType="multipart/form-data"
                    >
                        <h1 style={{ textAlign: 'center' }}>Add New Book</h1>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text"
                             name = 'name'   className="form-control"
                             value={name} onChange={this._changeHandler}
                                required />
                        </div>
                        <div className="form-group">
                            <label>desc</label>
                            <input type="text" name='desc'
                                className="form-control" value={desc}
                                onChange={this._changeHandler}
                                required />
                        </div>
                        <div className="form-group">
                            <label>Image</label>
                            <input type="file" name='imageUpload'
                                className="form-control" 
                                onChange={this._changeHandler}
                                required />
                                {this.state.isEditImage?<img src={this.state.showImage}/> :<img src={'/uploads/'+this.state.showImage}/>}
                        </div>
                        <button type="submit" className="btn btn-primary form-control">Submit</button>
                        
                    </form>
                </div>
                
            </div>
        )
    }
}
export default UpdateBook;