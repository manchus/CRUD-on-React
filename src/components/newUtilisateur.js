import React from 'react';
import AddUser from './utilisateurAdd/ajout';


class NewUtilisateur extends React.Component{
    render(){

        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-3">
                        {/* <LstQuestion/> */}
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

export default NewUtilisateur;