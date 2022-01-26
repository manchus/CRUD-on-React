import React from 'react';
import LstQuestion from './questionListe/liste';
import AddUser from './utilisateurAdd/ajout';


class LoginUtilisateur extends React.Component{
    render(){

        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-4">
                        <LstQuestion/>
                    </div>
                    <div className="col-sm-8">
                        <div className="row">
                            <AddUser/>
                        </div>
                        <div className="row">
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginUtilisateur;