import WithDictionary from '../../components/WithDictionary';
import NanoAssemblerClient from './NanoAssemblerClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <NanoAssemblerClient dict={dict} />}
    </WithDictionary>
  );
}