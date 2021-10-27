using {People} from '../db/schema';

service ODataService {

  entity Peoples as projection on People;

}
