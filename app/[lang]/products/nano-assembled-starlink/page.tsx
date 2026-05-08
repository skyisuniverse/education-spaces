import WithDictionary from '../../components/WithDictionary';
import NanoAssembledStarlinkClient from './NanoAssembledStarlinkClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <NanoAssembledStarlinkClient dict={dict} />}
    </WithDictionary>
  );
}