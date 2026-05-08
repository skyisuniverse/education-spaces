import WithDictionary from '../../components/WithDictionary';
import NanoassemblyBoostedSpacexClient from './NanoassemblyBoostedSpacexClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <NanoassemblyBoostedSpacexClient dict={dict} />}
    </WithDictionary>
  );
}