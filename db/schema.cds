using {
  cuid,
  managed
} from '@sap/cds/common';


type PeopleName : {
  FirstName  : String(255);
  MiddleName : String(255);
  LastName   : String(255);
  NickName   : String(255);
}


entity People : cuid, managed {

  @assert.unique
  UserName : String(128);
  Name     : PeopleName;

}

entity TechUser : managed {
  key UserId    : String(255);
      EPassword : String(255);
      Scopes    : String(255);
}
