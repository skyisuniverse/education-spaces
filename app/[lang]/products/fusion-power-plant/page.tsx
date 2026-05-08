import WithDictionary from '../../components/WithDictionary';
import FusionPowerPlantClient from './FusionPowerPlantClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <FusionPowerPlantClient dict={dict} />}
    </WithDictionary>
  );
}