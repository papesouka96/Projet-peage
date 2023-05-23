export interface User {
email?: String;
password?: String;
nom?: String;
prenom?: String;
etat?:Boolean;
role?:String;
matricule?:String;

data?:{
    token: String;
    email:String;
    nom: String;
    prenom: String;
    etat:Boolean;
    role:String;
};
}
