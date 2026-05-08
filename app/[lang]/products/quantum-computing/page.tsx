import WithDictionary from '../../components/WithDictionary';
import QuantumComputingClient from './QuantumComputingClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <QuantumComputingClient dict={dict} />}
    </WithDictionary>
  );
}