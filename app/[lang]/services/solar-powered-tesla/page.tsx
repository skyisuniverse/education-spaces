import WithDictionary from '../../components/WithDictionary';
import SolarPoweredTeslaClient from './SolarPoweredTeslaClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <SolarPoweredTeslaClient dict={dict} />}
    </WithDictionary>
  );
}