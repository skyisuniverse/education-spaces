import WithDictionary from '../../components/WithDictionary';
import QuantumDataCentersInSpaceClient from './QuantumDataCentersInSpaceClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <QuantumDataCentersInSpaceClient dict={dict} />}
    </WithDictionary>
  );
}