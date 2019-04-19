import React , { Component } from 'react';
import axios from 'axios';
import AddBook from './AddBook';
import {Link} from 'react-router-dom';
 

class Book extends Component{
constructor(props){
    super(props);
    this.state = {
        books : []
    }
}


componentDidMount(){
axios.get('/api/books/getAllBooks')
.then( res => 
this.setState({books : res.data})

)
.catch(err => console.log(err));
}

addBook = () => {
    
 return(
     <AddBook/>
 )   

  }

  DeleteBook = (id) => {
      axios.delete('/api/books/deleteBook',{data :{id : id}})
      .then( res => {
          if(res) {
            axios.get('/api/books/getAllBooks')
            .then( res => 
            this.setState({books : res.data})
            
            )
            .catch(err => console.log(err));
          }
      })
      .catch(err => console.log(err))

}

render(){
    const { books } = this.state;
    return(
        <div className=" container jumbotron">
        <h1 style={{textAlign : 'center'}}>Book Store  </h1>
        <br/>

        <a className="btn btn-primary" href="/addBook">Add Book</a>
        <br/>
        <br/>
        <table className="table table-hover table-bordered">
        <thead>
        <tr>
            <th>Name</th>
            <th>Desc</th>
            <th>Image</th>
            <th>Action</th>
            </tr>
            </thead>
            <tbody>
        { books.map((book , index) => {
            return(
                
                <tr key={index}>
                <td>
                {book.name}
                </td>
                <td>{book.desc}</td>
                <td><img src={'/uploads/'+book.imageUpload}/></td>
                <td><button className="btn btn-danger" onClick={() => this.DeleteBook(book._id)}>Delete</button>
            <Link to={`/updateBook/${book._id}`} className="btn btn-success" style={{marginLeft:'20px'}}>Update</Link></td>
                    </tr>
                    
            )
        } 
        
        )}
        </tbody>
        </table>

            </div>
    )
}


}
export default Book;