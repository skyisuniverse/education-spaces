import WithDictionary from '../../components/WithDictionary';
import Falcon9HeavyNanoAssemblyClient from './Falcon9HeavyNanoAssemblyClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <Falcon9HeavyNanoAssemblyClient dict={dict} />}
    </WithDictionary>
  );
}