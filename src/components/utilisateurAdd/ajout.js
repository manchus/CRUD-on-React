import React from "react";
import axios from "axios";

class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nomUser: "",
      nom: "",
      prenom: "",
      email: "",
      genre: "",
      age: "",
      loginName: "",
      loginId: "",
      userExist:true,
      userLoged : false,
    
    };

    this.onChangeNomUser = this.onChangeNomUser.bind(this); //Linking between actionListener and field
    this.onChangeNom = this.onChangeNom.bind(this);
    this.onChangePrenom = this.onChangePrenom.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeGenre = this.onChangeGenre.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {

  }

  onChangeNomUser(e) {
    this.setState({
      nomUser: e.target.value,
    });
  }
  onChangeNom(e) {
    this.setState({
      nom: e.target.value,
    });
  }
  onChangePrenom(e) {
    this.setState({
      prenom: e.target.value,
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }
  onChangeGenre(e) {
    this.setState({
      genre: e.target.value,
    });
  }
  onChangeAge(e) {
    this.setState({
      age: e.target.value,
    });
  }


  onSubmit(e) {
    e.preventDefault();

    const util = {
      nomUser: this.state.nomUser,
      nom: this.state.nom,
      prenom: this.state.prenom,
      email: this.state.email,
      genre: this.state.genre,
      age: this.state.age,
    };
    console.log(util);
    axios.post("http://10.30.40.121:3437/ecrireUtilisateur", util)
      //axios.post('http://localhost:3437/ecrireUtilisateur',util)
      .then((res) => {
        console.log(res.data);
       
       
      }).then((resLogin) => {
        axios.get('http://10.30.40.121:3437/lireUtilisateurByEmail/' +this.state.email)
        .then(response =>{
            console.log(response.data);   
            if(response.data.length>0){
                this.setState({
                    loginName : response.data[0].nomUser,
                    loginId : response.data[0]._id,
                    idQuestion : "",
                    userLoged : true,
                })
                const utilLog = {
                  nomUser: this.state.loginName,
                  idUser: this.state.loginId,
                  idQuestion: "",
                };
                axios.post("http://10.30.40.121:3437/ecrireLogin", utilLog)
                .then((res3) => {
                  console.log(res3.data);
                });
//                    window.location.replace("/accueil");
            }else{
              this.setState({
                userExist : false,
              }) 
            }
            
        }).catch((error)=>{
            console.log(error);    
        })

        
      });

    window.location.replace("/accueil");
    // });
  }

  loginBtn(){
        axios.get('http://10.30.40.121:3437/lireUtilisateurByEmail/' +this.state.email)
        //axios.get('http://localhost:3437/lireUtilisateurByEmail/' +this.state.email)
            .then(response =>{
                console.log(response.data);   
                if(response.data.length>0){
                    this.setState({
                        loginName : response.data[0].nomUser,
                        loginId : response.data[0]._id,
                        idQuestion : "",
                        userLoged : true,
                    })
                    const utilLog = {
                      nomUser: this.state.loginName,
                      idUser: this.state.loginId,
                      idQuestion: "",
                    };
                    axios.post("http://10.30.40.121:3437/ecrireLogin", utilLog)
                    .then((res3) => {
                      console.log(res3.data);
                    });
                    window.location.replace("/accueil/1");
                }else{
                  this.setState({
                    userExist : false,
                  }) 
                }
                
            }).catch((error)=>{
                console.log(error);    
            })

    }

  render() {
      if(this.state.userExist)
      return (
        <div className="container">
          <h3>Ouvrir une session</h3>
          <div className="col-md-8">
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <input
                    type="email"
                    placeholder="Adresse courriel"
                    required
                    className="form-control"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    />
                </div>
                <div className="form-group">
                    <input onClick={this.loginBtn.bind(this)} value="Ouvrir une session" className="btn btn-primary" />
                </div>
            </form>
          </div>
        </div>
      );
  
      else
        return (
        <div className="container">
            <h3>Ouvrir une session</h3>
            <div className="col-md-8">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            required
                            placeholder="Votre nickname"
                            className="form-control"
                            value={this.state.nomUser}
                            onChange={this.onChangeNomUser}
                        />
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <input
                                    type="text"
                                    placeholder="Nom de familie"
                                    required
                                    className="form-control"
                                    value={this.state.nom}
                                    onChange={this.onChangeNom}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <input
                                    type="text"
                                    placeholder="Prénom"
                                    required
                                    className="form-control"
                                    value={this.state.prenom}
                                    onChange={this.onChangePrenom}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Adresse courriel"
                            required
                            className="form-control"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                        />
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="row">
                                    <label>Sexe:</label>
                                </div>
                                <div className="row">
                                    <div className="form-group col-sd-2">
                                        <span className="form-control">
                                            <input
                                            type="radio"
                                            value="Homme"
                                            name="genre"
                                            onChange={this.onChangeGenre}
                                            />{" "}Homme
                                        </span>
                                    </div>
                                    <div className="form-group col-sd-2">
                                        <span className="form-control">
                                            <input
                                            type="radio"
                                            value="Femme"
                                            name="genre"
                                            onChange={this.onChangeGenre}
                                            />{" "}Femme
                                        </span>
                                    </div>
                                    <div className="form-group col-sd-2">
                                        <span className="form-control">
                                            <input
                                            type="radio"
                                            value="Autre"
                                            name="genre"
                                            onChange={this.onChangeGenre}
                                            />{" "}Personnalisé
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="row">
                                    <div className="col-md-4">
                                        <label>Anniversaire:</label>
                                    </div>
                                <div className="row">
                                <div>
                                  <div className="form-group date" data-provide="datepicker">
                                      <input
                                          type="date"
                                          required
                                          className="form-control"
                                          value={this.state.age}
                                          onChange={this.onChangeAge}
                                      />
                                  </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                                </div>

                    <div className="form-group">
                        <input type="submit" value="Ajout" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        </div>
        );
  }
}
export default AddUser;
