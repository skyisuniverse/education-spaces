import WithDictionary from '../../components/WithDictionary';
import EngineeringSimulationToolClient from './EngineeringSimulationToolClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <EngineeringSimulationToolClient dict={dict} />}
    </WithDictionary>
  );
}