import WithDictionary from '../../components/WithDictionary';
import PerspectiveNeuralinkBCIsClient from './PerspectiveNeuralinkBCIsClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <PerspectiveNeuralinkBCIsClient dict={dict} />}
    </WithDictionary>
  );
}