import WithDictionary from '../../components/WithDictionary';
import NanoAssemblyClient from './NanoAssemblyClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <NanoAssemblyClient dict={dict} />}
    </WithDictionary>
  );
}