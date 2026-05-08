import WithDictionary from '../../components/WithDictionary';
import HardwareDevelopmentServicesClient from './HardwareDevelopmentServicesClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <HardwareDevelopmentServicesClient dict={dict} />}
    </WithDictionary>
  );
}