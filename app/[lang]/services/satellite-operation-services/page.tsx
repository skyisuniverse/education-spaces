import WithDictionary from '../../components/WithDictionary';
import SatelliteOperationServicesClient from './SatelliteOperationServicesClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <SatelliteOperationServicesClient dict={dict} />}
    </WithDictionary>
  );
}