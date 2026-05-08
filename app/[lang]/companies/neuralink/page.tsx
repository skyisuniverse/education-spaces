import WithDictionary from '../../components/WithDictionary';
import NeuralinkClient from './NeuralinkClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <NeuralinkClient dict={dict} />}
    </WithDictionary>
  );
}