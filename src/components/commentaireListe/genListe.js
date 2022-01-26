import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Delete from "@material-ui/icons/Delete";
class GenList extends React.Component {

    constructor(props){
        super(props);  
        this.state={
            nomUser:"",
            idUser:"",
            idQuestion:"",
            idLogin:"",
            userLoged: false,
            
        }
    }
    componentDidMount() {
        this.loadUtilisateur();
      }
  
      componentDidUpdate() {
         this.loadUtilisateur();
      }
      loadUtilisateur(){
          if(!this.state.userLoged){
              axios.get('http:///10.30.40.121:3437/lireLogin')
              //axios.get('http://localhost:3437/lireLogin')
              .then(response =>{
              //  console.log(response.data);
                  if(response.data.length>0){
                      this.setState({
                          nomUser : response.data[0].nomUser,
                          idUser: response.data[0].idUser,
                          idQuestion : "",
                          idLogin: response.data[0]._id,
                          userLoged : true,
                      })
                  }
              })
              .catch((error)=>{
                  console.log(error);
              })
          }
      }

      
    render(){
        return (

              <div className="col-sm-12 border border-primary">
                <div className="row border border-secondary">
                    <div className="col-sm-9">
                        <b>{this.props.commentaire.titleQuestion}</b>
                    </div>
                    <div className="col-sm-3">
                        <div className="row border border-success">
                            <div>
                                {this.props.commentaire.date}
                            </div>
                            <div>
                            {this.state.userLoged?<a href="#" onClick={()=> {this.props.deleteCommentaire(this.props.commentaire._id)}}><Delete /></a>:""}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row border border-primary">
                     {this.props.commentaire.description}
                </div>
                <tr>
                    <td></td>
                    <td>{this.props.commentaire.notePositive}</td>
                    <td>{this.state.nomUser}</td>
                    <td>
                    {/* <Link to={"/edit/"+this.props.commentaire._id}>édition</Link> | */}
                    
                    </td>
                </tr>
               
            </div>
            
        )
    }
}
export default GenList;