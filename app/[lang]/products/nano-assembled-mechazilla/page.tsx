import WithDictionary from '../../components/WithDictionary';
import NanoAssembledMechazillaClient from './NanoAssembledMechazillaClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <NanoAssembledMechazillaClient dict={dict} />}
    </WithDictionary>
  );
}