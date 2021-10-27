using {People} from '../db/schema';


service ODataService @(requires : 'authenticated-user') {

  @(restrict : [
    {
      grant : 'WRITE',
      to    : 'people_write'
    },
    {
      grant : 'READ',
      to    : 'people_read'
    }
  ])
  entity Peoples as projection on People;

}
