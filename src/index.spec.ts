import * as si from 'systeminformation';
import { formaterDonnees } from './index';

function isSystemInformation(object: any){
  if (typeof object === "string" && object.includes("{\"ISystemInforesmation\"")) {
    return true;
  }else{
    return false;
  }
}


describe('typeScript test suite', () => {
  it('should be the right format', async () => {
    formaterDonnees().then(data => expect(isSystemInformation(JSON.stringify(data))).toBe(true));
  });
});
