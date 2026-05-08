import WithDictionary from '../../components/WithDictionary';
import NanoAssembledSemiClient from './NanoAssembledSemiClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <NanoAssembledSemiClient dict={dict} />}
    </WithDictionary>
  );
}