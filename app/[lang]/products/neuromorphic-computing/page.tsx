import WithDictionary from '../../components/WithDictionary';
import NeuromorphicComputingClient from './NeuromorphicComputingClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <NeuromorphicComputingClient dict={dict} />}
    </WithDictionary>
  );
}